import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

const { ObjectId } = Types

import getUser from './getUser.js'
import { User } from '../data/models.js'

import { errors } from '../../com/index.js'
const { NotFoundError, ValidationError } = errors

describe('getUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () => {
        return User.create({ image: 'https://hospitalveterinariodonostia.com/', name: 'Tatiana', city: 'Barcelona', description: 'Por favor, funciona de una santa vez', email: 'tati@garcia.com', phoneNumber: '655454545', password: '123123123', passwordRepeat: '123123123', role: 'petsitter', pets: ['conejos', 'cobayas'] })
            .then(user => getUser(user.id)
                .then(user => {
                    expect(user.image).to.equal('https://hospitalveterinariodonostia.com/')
                    expect(user.name).to.equal('Tatiana')
                    expect(user.city).to.equal('Barcelona')
                    expect(user.description).to.equal('Por favor, funciona de una santa vez')
                    expect(user.email).to.equal('tati@garcia.com')
                    expect(user.phoneNumber).to.equal('655454545')
                    expect(user.pets).to.deep.equal(['conejos', 'cobayas'])

                }))
    })

    it('fails on non-existing user', () => {
        let _error
        return getUser(new ObjectId().toString())
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('usuario no encontrado')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            getUser(123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId no es una cadena')
        }
    })

    it('removes password from the returned user object', () => {
        return User.create({ image: 'https://hospitalveterinariodonostia.com/', name: 'Tatiana', city: 'Barcelona', description: 'Por favor, funciona de una santa vez', email: 'tati@garcia.com', phoneNumber: '655454545', password: '123123123', role: 'petsitter', pets: ['conejos', 'cobayas'] })
            .then(user => getUser(user.id))
            .then(user => {
                expect(user).to.have.property('id');
                expect(user).to.not.have.property('_id');
                expect(user).to.not.have.property('password');
            })
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})