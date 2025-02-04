import { User } from '../data/models.js'
import { validate, errors } from '../../com/index.js'

const { SystemError, NotFoundError } = errors

export default function (userId, newImage, newName, newSurname) {
    validate.id(userId, 'userId')
    validate.image(newImage, 'newImage')
    validate.name(newName, 'newName')
    validate.surname(newSurname, 'newSurname')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('usuario no encontrado')

            return User.findByIdAndUpdate(userId, { image: newImage, name: newName, surname: newSurname })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}