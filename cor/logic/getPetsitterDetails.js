import { User } from '../data/models.js'
import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default (petsitterId) => {
    validate.id(petsitterId, 'petsitterId')

    return User.findById(petsitterId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(petsitter => {
            if (!petsitter) throw new NotFoundError('petsitter no encontrado')

            petsitter.id = petsitter._id.toString()

            delete petsitter._id
            delete petsitter.__v

            return petsitter
        })
}