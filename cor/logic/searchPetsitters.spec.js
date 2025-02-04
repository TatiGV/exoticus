import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import searchPetsitters from './searchPetsitters.js'
import { User } from '../data/models.js'

import { errors } from '../../com/index.js'

const { ValidationError } = errors

describe('searchPetsitters', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on returning petsitters by city', () => {
        return Promise.all([
            User.create({
                image: 'https://hospitalveterinariodonostia.com/',
                name: 'Tatiana',
                city: 'Barcelona',
                description: 'Experta en conejos y cobayas',
                email: 'tatiana@pets.com',
                phoneNumber: '655454545',
                password: '123123123',
                role: 'petsitter',
                pets: ['conejos', 'cobayas']
            }),
            User.create({
                image: 'https://hospitalveterinariodonostia.com/',
                name: 'Alberto',
                city: 'Barcelona',
                description: 'Experto en reptiles',
                email: 'alberto@pets.com',
                phoneNumber: '655454546',
                password: '123123123',
                role: 'petsitter',
                pets: ['reptiles']
            })
        ])
            .then(() => searchPetsitters('Barcelona'))
            .then(petsitters => {
                expect(petsitters).to.have.lengthOf(2)
                expect(petsitters[0].city).to.equal('Barcelona')
                expect(petsitters[1].city).to.equal('Barcelona')
            })
    })

    it('succeeds on returning petsitters by city and pet type', () =>
        Promise.all([
            User.create({
                image: 'https://hospitalveterinariodonostia.com/',
                name: 'Tatiana',
                city: 'Barcelona',
                description: 'Experta en conejos y cobayas',
                email: 'tatiana@pets.com',
                phoneNumber: '655454545',
                password: '123123123',
                role: 'petsitter',
                pets: ['conejos', 'cobayas']
            }),
            User.create({
                image: 'https://hospitalveterinariodonostia.com/',
                name: 'Alberto',
                city: 'Madrid',
                description: 'Experto en reptiles',
                email: 'alberto@pets.com',
                phoneNumber: '655454546',
                password: '123123123',
                role: 'petsitter',
                pets: ['reptiles']
            })
        ])
            .then(() => searchPetsitters('Barcelona', 'conejos'))
            .then(petsitters => {
                expect(petsitters).to.have.lengthOf(1)
                expect(petsitters[0].name).to.equal('Tatiana')
                expect(petsitters[0].pets).to.include('conejos')
            })
    )

    it('fails on non-string city', () => {
        let error

        try {
            searchPetsitters(123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('city no es una cadena')
        }
    })

    it('fails on invalid city', () => {
        let error

        try {
            searchPetsitters('')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('el campo no puede estar vacio')
        }
    })

    it('succeeds on no petsitters found in city', () => {
        return searchPetsitters('NonExistingCity')
            .then(petsitters => {
                expect(petsitters).to.have.lengthOf(0)
            })
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})
