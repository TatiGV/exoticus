import bcrypt from 'bcryptjs'

import { User } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { NotFoundError, CredentialsError, SystemError } = errors

export default (email, password) => {
    validate.email(email, 'email')
    validate.password(password)

    return User.findOne({ email }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('usuario no encontrado')

            return bcrypt.compare(password, user.password)
                .catch(error => { throw new SystemError(error.message) })
                .then(match => {
                    if (!match)
                        throw new CredentialsError('password incorrecto')

                    user.id = user._id.toString()
                    delete user._id

                    return {
                        id: user.id,
                        role: user.role
                    }
                })
        })
}