import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import addReview from './addReview.js'
import { User, Review } from '../data/models.js'

import { errors } from '../../com/index.js'

const { ValidationError, NotFoundError, DuplicityError } = errors

describe('addReviews', () => {
    before(() => mongoose.connect(`${process.env.MONGODB_URI}`))

    beforeEach(() => Promise.all([User.deleteMany(), Review.deleteMany()]))

    it('succeds on new review without rating', () => {
        return User.create({ image: 'https://www.ngenespanol.com/', name: 'Tatiana', surname: 'Garcia', email: 'tati@garcia.com', password: '123123123', passwordRepeat: '123123123', role: 'regular' })
            .then(user => {
                return User.create({ image: 'https://hospitalveterinariodonostia.com/', name: 'Tatiana', city: 'Barcelona', description: 'Por favor, funciona de una santa vez', email: 'pep@garcia.com', phoneNumber: '655454545', password: '123123123', passwordRepeat: '123123123', role: 'petsitter', pets: ['conejos', 'cobayas'] })
                    .then(petsitter => {
                        return addReview(petsitter.id, user.id, 'me encanta esta guarderia')
                    })
                    .then(() => {
                        return Review.findOne({ author: user._id })
                            .then(review => {
                                expect(review.comment).to.equal('me encanta esta guarderia')
                                expect(review.rate).to.equal(0)
                            })
                    })
            })
    })

    it('succeds on new review with rating', () => {
        return User.create({ image: 'https://www.ngenespanol.com/', name: 'Tatiana', surname: 'Garcia', email: 'tati@garcia.com', password: '123123123', passwordRepeat: '123123123', role: 'regular' })
            .then(user => {
                return User.create({ image: 'https://hospitalveterinariodonostia.com/', name: 'Tatiana', city: 'Barcelona', description: 'Por favor, funciona de una santa vez', email: 'pep@garcia.com', phoneNumber: '655454545', password: '123123123', passwordRepeat: '123123123', role: 'petsitter', pets: ['conejos', 'cobayas'] })
                    .then(petsitter => {
                        return addReview(petsitter.id, user.id, 'me encanta esta guarderia', 5)
                    })
                    .then(() => {
                        return Review.findOne({ author: user._id })
                            .then(review => {
                                expect(review.comment).to.equal('me encanta esta guarderia')
                                expect(review.rate).to.equal(5)
                            })
                    })
            })

    })

    it('fails on non existing author', () => {
        let error

        return addReview('66cc32b55e0e1ff3003b3efa', '66cc32b55e0e1ff3003b3efa', 'me encanta esta guarderia', 5)
            .catch(_error => error = _error)
            .finally(() => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('usuario no encontrado')
            })
    })

    it('fails on non existing petsitter', () => {
        let error

        return User.create({ image: 'https://www.ngenespanol.com/', name: 'Tatiana', surname: 'Garcia', email: 'tati@garcia.com', password: '123123123', passwordRepeat: '123123123', role: 'regular' })
            .then(user => addReview('66cc32b55e0e1ff3003b3efa', user.id, 'me encanta esta guarderia', 5))
            .catch(_error => error = _error)
            .finally(() => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('petsitter no encontrado')
            })
    })

    it('fails on non string userId', () => {
        let error

        try {
            addReview('66cc32b55e0e1ff3003b3efa', 123, 'me encanta esta guarderia', 5)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId no es una cadena')
        }
    })

    it('fails on non string petsitterId', () => {
        let error

        try {
            addReview(123, '66cc32b55e0e1ff3003b3efa', 'me encanta esta guarderia', 5)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('petsitterId no es una cadena')
        }
    })

    it('fails on invalid petsitterId', () => {
        let error

        try {
            addReview('', '66cc32b55e0e1ff3003b3efa', 'me encanta esta guarderia', 5)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('petsitterId invalido')
        }
    })

    it('fails on non-string comment', () => {
        let error

        try {
            addReview('66cc32b55e0e1ff3003b3efa', '66cc32b55e0e1ff3003b3efa', 123, 5)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('comment no es una cadena')
        }
    })

    it('fails on non-number rate', () => {
        let error

        try {
            addReview('66cc32b55e0e1ff3003b3efa', '66cc32b55e0e1ff3003b3efa', 'me encanta esta guarderia', 'hghg')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('rate no es un numero')
        }
    })

    it('should throw DuplicityError if the user has already reviewed the petsitter', () => {
        return User.create({ image: 'https://www.ngenespanol.com/', name: 'Tatiana', surname: 'Garcia', email: 'tati@garcia.com', password: '123123123', passwordRepeat: '123123123', role: 'regular' })
            .then(user => {
                return User.create({ image: 'https://hospitalveterinariodonostia.com/', name: 'Tatiana', city: 'Barcelona', description: 'Por favor, funciona de una santa vez', email: 'josep@garcia.com', phoneNumber: '655454545', password: '123123123', passwordRepeat: '123123123', role: 'petsitter', pets: ['conejos', 'cobayas'] })
                    .then(petsitter => {
                        return addReview(petsitter.id, user.id, 'Buena experiencia', 4)
                            .then(() => {
                                return addReview(petsitter.id, user.id, 'Experiencia meh', 1)
                            })
                    })
            })
            .catch(error => {
                expect(error).to.be.instanceOf(DuplicityError)
                expect(error.message).to.equal('ya has hecho una review a este petsitter')
            })
    })


    afterEach(() => Promise.all([User.deleteMany(), Review.deleteMany()]))

    after(() => mongoose.disconnect())
})
