import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

const { ObjectId } = Types

import getUserName from './getUserName.js'
import { User } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError } = errors

describe('getUserName', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () => {
        return User.create({ image: 'https://www.ngenespanol.com/', name: 'Tatiana', surname: 'Garcia', email: 'tati@garcia.com', password: '123123123', passwordRepeat: '123123123', role: 'regular' })
            .then(user => getUserName(user.id)
                .then(userName => expect(userName).to.equal('Tatiana')))
    })

    it('fails on non existing user', () => {
        let _error

        return getUserName(new ObjectId().toString())
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('usuario no encontrado')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            getUserName(123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId no es una cadena')
        }
    })


    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})