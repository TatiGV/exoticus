import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import updatePetsitterUser from './updatePetsitterUser.js'
import { User } from '../data/models.js'

import { errors } from '../../com/index.js'

const { ValidationError, NotFoundError } = errors

describe('updatePetsitterUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on updating existing petsitter', () => {
        return User.create({
            image: 'https://hospitalveterinariodonostia.com/',
            name: 'Tatiana',
            city: 'Madrid',
            description: 'Experta en conejos y cobayas',
            email: 'tatiana@pets.com',
            phoneNumber: '655454545',
            password: '123123123',
            role: 'petsitter',
            pets: ['conejos', 'cobayas']
        })
            .then(petsitter => {
                return updatePetsitterUser(
                    petsitter.id,
                    'https://tse1.mm.bing.net/th?id=OIP.ThSvUMPscWe4Y80JlBFPhgHaFj&pid=Api&P=0&h=180',
                    'Vetpoint',
                    'Barcelona',
                    'Somos veterinarios pero cuidamos animales',
                    'https://www.vetpointclinicaveterinaria.com/es/homepage/',
                    'vetpoint@gmail.com',
                    '655454545',
                    ['conejos', 'ratas', 'cobayas']
                )
                    .then(() => User.findById(petsitter.id).lean())
                    .then(updatedPetsitter => {
                        expect(updatedPetsitter.image).to.equal('https://tse1.mm.bing.net/th?id=OIP.ThSvUMPscWe4Y80JlBFPhgHaFj&pid=Api&P=0&h=180')
                        expect(updatedPetsitter.name).to.equal('Vetpoint')
                        expect(updatedPetsitter.city).to.equal('Barcelona')
                        expect(updatedPetsitter.description).to.equal('Somos veterinarios pero cuidamos animales')
                        expect(updatedPetsitter.linkPage).to.equal('https://www.vetpointclinicaveterinaria.com/es/homepage/')
                        expect(updatedPetsitter.contactEmail).to.equal('vetpoint@gmail.com')
                        expect(updatedPetsitter.phoneNumber).to.equal('655454545')
                        expect(updatedPetsitter.pets).to.deep.equal(['conejos', 'ratas', 'cobayas'])
                    })
            })
    })

    it('fails on non-existing petsitter', () => {
        let _error

        return updatePetsitterUser(
            '66dab954cdcb2f4bc079f52c',
            'https://newimage.com/image.jpg',
            'NewName',
            'NewCity',
            'New description',
            'https://newlinkpage.com',
            'newcontact@pets.com',
            '655123456',
            ['conejos', 'ratas', 'cobayas']
        )
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('petsitter no encontrado')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            updatePetsitterUser(
                123,
                'https://tse1.mm.bing.net/th?id=OIP.ThSvUMPscWe4Y80JlBFPhgHaFj&pid=Api&P=0&h=180',
                'Vetpoint',
                'Barcelona',
                'Somos veterinarios pero cuidamos animales',
                'https://www.vetpointclinicaveterinaria.com/es/homepage/',
                'vetpoint@gmail.com',
                '655454545',
                ['conejos', 'ratas', 'cobayas']
            )
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
            updatePetsitterUser(
                '66dab954cdcb2f4bc079f52c',
                'https://tse1.mm.bing.net/th?id=OIP.ThSvUMPscWe4Y80JlBFPhgHaFj&pid=Api&P=0&h=180',
                'Vetpoint',
                'Barcelona',
                'Somos veterinarios pero cuidamos animales',
                'hfjhfjhfg',
                'vetpoint@gmail.com',
                '655454545',
                ['conejos', 'ratas', 'cobayas']
            )
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('newLinkPage no es una URL valida')
        }
    })

    it('fails on non-string name', () => {
        let error

        try {
            updatePetsitterUser(
                '66dab954cdcb2f4bc079f52c',
                'https://tse1.mm.bing.net/th?id=OIP.ThSvUMPscWe4Y80JlBFPhgHaFj&pid=Api&P=0&h=180',
                123,
                'Barcelona',
                'Somos veterinarios pero cuidamos animales',
                'https://www.vetpointclinicaveterinaria.com/es/homepage/',
                'vetpoint@gmail.com',
                '655454545',
                ['conejos', 'ratas', 'cobayas']
            )
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('newName no es una cadena')
        }
    })

    it('fails on invalid city', () => {
        let error

        try {
            updatePetsitterUser(
                '66dab954cdcb2f4bc079f52c',
                'https://tse1.mm.bing.net/th?id=OIP.ThSvUMPscWe4Y80JlBFPhgHaFj&pid=Api&P=0&h=180',
                'Vetpoint',
                '',
                'Somos veterinarios pero cuidamos animales',
                'https://www.vetpointclinicaveterinaria.com/es/homepage/',
                'vetpoint@gmail.com',
                '655454545',
                ['conejos', 'ratas', 'cobayas']
            )
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('el campo no puede estar vacio')
        }
    })

    it('fails on invalid contact email', () => {
        let error

        try {
            updatePetsitterUser(
                '66dab954cdcb2f4bc079f52c',
                'https://tse1.mm.bing.net/th?id=OIP.ThSvUMPscWe4Y80JlBFPhgHaFj&pid=Api&P=0&h=180',
                'Vetpoint',
                'Barcelona',
                'Somos veterinarios pero cuidamos animales',
                'https://www.vetpointclinicaveterinaria.com/es/homepage/',
                '123',
                '655454545',
                ['conejos', 'ratas', 'cobayas']
            )
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('newContactEmail invalido')
        }
    })

    it('fails on non selected any pets', () => {
        let error

        try {
            updatePetsitterUser(
                '66dab954cdcb2f4bc079f52c',
                'https://tse1.mm.bing.net/th?id=OIP.ThSvUMPscWe4Y80JlBFPhgHaFj&pid=Api&P=0&h=180',
                'Vetpoint',
                'Barcelona',
                'Somos veterinarios pero cuidamos animales',
                'https://www.vetpointclinicaveterinaria.com/es/homepage/',
                '',
                '655454545',
                []
            )
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('debe seleccionarse al menos una mascota')
        }
    })

    it('fails on non array pets', () => {
        let error

        try {
            updatePetsitterUser(
                '66dab954cdcb2f4bc079f52c',
                'https://tse1.mm.bing.net/th?id=OIP.ThSvUMPscWe4Y80JlBFPhgHaFj&pid=Api&P=0&h=180',
                'Vetpoint',
                'Barcelona',
                'Somos veterinarios pero cuidamos animales',
                'https://www.vetpointclinicaveterinaria.com/es/homepage/',
                '',
                '655454545',
                123
            )
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('pets no es un array')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})
