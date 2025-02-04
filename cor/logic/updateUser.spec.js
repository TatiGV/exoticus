import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import updateUser from './updateUser.js'
import { User } from '../data/models.js'

import { errors } from '../../com/index.js'

const { ValidationError, NotFoundError } = errors

describe('updateUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on updating existing user', () => {
        return User.create({
            image: 'https://hospitalveterinariodonostia.com/',
            name: 'Tatiana',
            surname: 'Garcia',
            email: 'tatiana@pets.com',
            phoneNumber: '655454545',
            password: '123123123',
            role: 'petsitter',
        })
            .then(user => {
                return updateUser(user.id, 'https://newimage.com/image.jpg', 'Alberto', 'Garcia')
                    .then(() => User.findById(user.id).lean())
                    .then(updatedUser => {
                        expect(updatedUser.image).to.equal('https://newimage.com/image.jpg')
                        expect(updatedUser.name).to.equal('Alberto')
                        expect(updatedUser.surname).to.equal('Garcia')
                    })
            })
    })

    it('fails on non-existing user', () => {
        let _error

        return updateUser('66dab954cdcb2f4bc079f52c', 'https://newimage.com/image.jpg', 'NewName', 'NewSurname')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('usuario no encontrado')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            updateUser(123, 'https://newimage.com/image.jpg', 'NewName', 'NewSurname')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId no es una cadena')
        }
    })

    it('fails on invalid image URL', () => {
        let error

        try {
            updateUser('66dab954cdcb2f4bc079f52c', 'invalid-url', 'NewName', 'NewSurname')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('newImage invalida')
        }
    })

    it('fails on non-string name', () => {
        let error

        try {
            updateUser('66dab954cdcb2f4bc079f52c', 'https://newimage.com/image.jpg', 12345, 'NewSurname')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('newName no es una cadena')
        }
    })

    it('fails on non-string surname', () => {
        let error

        try {
            updateUser('66dab954cdcb2f4bc079f52c', 'https://newimage.com/image.jpg', 'NewName', 12345)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('surname no es una cadena')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})
