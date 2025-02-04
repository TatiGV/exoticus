import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

const { ObjectId } = Types


import getPetsitterReviews from './getPetsitterReviews.js'
import { User, Review } from '../data/models.js'

import { errors } from '../../com/index.js'

const { NotFoundError, ValidationError } = errors

describe('getPetsitterReviews', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Review.deleteMany()]))

    it('succeeds on existing petsitter returning the petsitter\'s reviews', () => {
        return User.create({ image: 'https://hospitalveterinariodonostia.com/', name: 'Vetpoint', city: 'Barcelona', description: 'Somos veterinarios pero también cuidamos mascotas', email: 'vetpoint@fgmail.com', phoneNumber: '655454545', password: '123123123', passwordRepeat: '123123123', role: 'petsitter', pets: ['conejos', 'cobayas'] })
            .then(petsitter => {
                return User.create({ image: 'https://www.ngenespanol.com/', name: 'Tatiana', surname: 'Garcia', email: 'tati@garcia.com', password: '123123123', passwordRepeat: '123123123', role: 'regular' })
                    .then(author => {
                        return Review.create({
                            author: author.id,
                            petsitter: petsitter.id,
                            comment: 'Me ha encantado la guardería',
                            rate: 5
                        })
                            .then(() => {
                                return getPetsitterReviews(petsitter.id)
                            })
                    })
            })
            .then(reviews => {
                expect(reviews[0].author.name).to.equal('Tatiana')
                expect(reviews[0].rate).to.equal(5)
            })
    })

    it('fails on non-existing petsitter', () => {
        let _error

        return Review.create({
            author: new ObjectId(),
            petsitter: new ObjectId(),
            comment: 'Me ha encantado la guardería',
            rate: 5
        })
            .then(() => getPetsitterReviews('66cc32b55e0e1ff3003b3efa'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('petsitter no encontrado')
            })
    })

    it('fails on non-existing author', () => {
        let _error

        return User.create({ image: 'https://hospitalveterinariodonostia.com/', name: 'Vetpoint', city: 'Barcelona', description: 'Somos veterinarios pero también cuidamos mascotas', email: 'vetpoint@fgmail.com', phoneNumber: '655454545', password: '123123123', passwordRepeat: '123123123', role: 'petsitter', pets: ['conejos', 'cobayas'] })
            .then(user => {
                return Review.create({
                    author: new ObjectId('66cc32b55e0e1ff3003b3efa'),
                    petsitter: user.id,
                    comment: 'Me ha encantado la guardería',
                    rate: 5
                })
                    .then(() => getPetsitterReviews(user.id))
            })
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('author no encontrado')
            })
    })

    it('fails on non string petsitterId', () => {
        let error

        try {
            getPetsitterReviews(123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('petsitterId no es una cadena')
        }
    })


    afterEach(() => Promise.all([User.deleteMany(), Review.deleteMany()]))

    after(() => mongoose.disconnect())
})