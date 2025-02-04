import 'dotenv/config'
import { expect } from 'chai'
import mongoose, { Types } from 'mongoose'
import { User } from '../data/models.js'

import { errors } from '../../com/index.js'
import getPetsitterDetails from './getPetsitterDetails.js'
const { NotFoundError, ValidationError } = errors

const { ObjectId } = Types

describe('getPetsitterDetails', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany()]))

    it('succeeds on existing petsitter', () => {
        const petsitterData = {
            image: 'https://hospitalveterinariodonostia.com/',
            name: 'Tatiana',
            city: 'Barcelona',
            description: 'Por favor, funciona de una santa vez',
            email: 'tati@garcia.com',
            linkPage: '',
            constactEmail: '',
            phoneNumber: '655454545',
            password: '123123123',
            passwordRepeat: '123123123',
            role: 'petsitter',
            pets: ['conejos', 'cobayas']
        }

        return User.create(petsitterData)
            .then(petsitter => {
                return getPetsitterDetails(petsitter._id.toString())
                    .then(result => {
                        expect(result).to.be.an('object')
                        expect(result).to.have.property('id', petsitter.id.toString())
                        expect(result).to.have.property('name', petsitterData.name)
                        expect(result).to.have.property('city', petsitterData.city)
                        expect(result).to.have.property('email', petsitterData.email)
                        expect(result).to.have.property('role', petsitterData.role)
                        expect(result).to.not.have.property('_id')
                    })
            })
    })

    it('fails on non-existing petsitter', () => {
        let _error

        return getPetsitterDetails(new ObjectId().toString())
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('petsitter no encontrado')
            })
    })

    it('fails on invalid petsitterId', () => {
        let error

        try {
            getPetsitterDetails('')

        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('petsitterId invalido')
        }

    })


    afterEach(() => Promise.all([User.deleteMany()]))

    after(() => mongoose.disconnect())
})