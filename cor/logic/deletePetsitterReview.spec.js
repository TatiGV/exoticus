import 'dotenv/config'
import deletePetsitterReview from './deletePetsitterReview.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Review } from '../data/models.js'

import { errors } from '../../com/index.js'

const { NotFoundError, ValidationError } = errors

describe('deletePetsitterReview', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Review.deleteMany()]))



    it('succeeds on deleting review', () => {
        return User.create({ image: 'https://www.ngenespanol.com/', name: 'Tatiana', surname: 'Garcia', email: 'tati@garcia.com', password: '123123123', passwordRepeat: '123123123', role: 'regular' })
            .then(petsitter => {
                return User.create({ image: 'https://www.vetpointclinicaveterinaria.com/', name: 'Vetpoint', city: 'Barcelona', description: 'Somos veterinarios, pero cuidamos animales en vacaciones', email: 'vetpoint@gmail.com', linkPage: '', contactEmail: '', phoneNumber: '935555555', password: '123123123', pets: ['conejos'] })
                    .then(user => {
                        return Review.create({
                            author: user.id,
                            petsitter: petsitter.id,
                            comment: 'Me ha encantado la guarderia',
                            rate: 5
                        })
                            .then(review => deletePetsitterReview(user.id, review.id))
                    })
            })
            .then(() => {
                return Review.find()
                    .then(reviews => {
                        expect(reviews).to.be.an('array')
                        expect(reviews.length).to.equal(0)
                    })
            })
    })

    it('fails on non string userId', () => {
        let error

        try {
            deletePetsitterReview(123, '66cc32b55e0e1ff3003b3efa')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId no es una cadena')
        }
    })

    it('fails on non-existing user', () => {
        let _error

        return User.create({ image: 'https://www.vetpointclinicaveterinaria.com/', name: 'Vetpoint', city: 'Barcelona', description: 'Somos veterinarios, pero cuidamos animales en vacaciones', email: 'vetpoint@gmail.com', linkPage: '', contactEmail: '', phoneNumber: '935555555', password: '123123123', pets: ['conejos'] })
            .then(petsitter => {
                return Review.create({
                    author: new ObjectId(),
                    petsitter: petsitter.id,
                    comment: 'Me ha encantado la guarderia',
                    rate: 5
                })
            })
            .then(review => deletePetsitterReview('66cc32b55e0e1ff3003b3efa', review.id))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('usuario no encontrado')
            })
    })

    it('fails on invalid userId', () => {
        let error

        try {
            deletePetsitterReview('', '66cc32b55e0e1ff3003b3efa')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId invalido')
        }
    })

    it('fails on non string reviewId', () => {
        let error

        try {
            deletePetsitterReview('66cc32b55e0e1ff3003b3efa', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('reviewId no es una cadena')
        }
    })


    it('fails on invalid reviewId', () => {
        let error

        try {
            deletePetsitterReview('66cc32b55e0e1ff3003b3efa', '')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('reviewId invalido')
        }
    })



    afterEach(() => Promise.all([User.deleteMany(), Review.deleteMany()]))

    after(() => mongoose.disconnect())
})