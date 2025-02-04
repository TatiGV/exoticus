import { User } from '../data/models.js'
import { validate, errors } from '../../com/index.js'

const { SystemError, NotFoundError } = errors

export default function (userId, newImage, newName, newCity, newDescription, newLinkPage, newContactEmail, newPhoneNumber, newPets) {
    validate.id(userId, 'userId')
    validate.image(newImage, 'newImage')
    validate.name(newName, 'newName')
    validate.city(newCity, 'newCity')
    validate.description(newDescription, 'newDescription')
    validate.linkPage(newLinkPage, 'newLinkPage')
    validate.email(newContactEmail, 'newContactEmail', true)
    validate.phoneNumber(newPhoneNumber, 'newPhoneNumber')
    validate.pets(newPets, 'newPets')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(petsitter => {
            if (!petsitter) throw new NotFoundError('petsitter no encontrado')

            return User.findByIdAndUpdate(userId, { image: newImage, name: newName, city: newCity, description: newDescription, linkPage: newLinkPage, contactEmail: newContactEmail, phoneNumber: newPhoneNumber, pets: newPets })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}