import { User } from '../data/models.js'

import { errors } from '../../com/index.js'

const { SystemError } = errors

export default () => {

    return User.find({ role: 'petsitter' }, { __v: 0 }).sort({ name: 1 }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(petsitters => {
            return petsitters.map(petsitter => ({
                id: petsitter._id.toString(),
                image: petsitter.image,
                name: petsitter.name,
                city: petsitter.city,
                description: petsitter.description,
                email: petsitter.email,
                linkPage: petsitter.linkPage,
                contactEmail: petsitter.contactEmail,
                phoneNumber: petsitter.phoneNumber,
                pets: petsitter.pets
            }))
        })
}