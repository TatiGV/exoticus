import { errors, validate } from '../com/index.js'
import extractPayLoadFromToken from '../util/extractPayLoadFromToken'

const { SystemError } = errors

export default (image, name, city, description, linkPage, contactEmail, phoneNumber, pets) => {
    validate.image(image, 'image')
    validate.name(name, 'name')
    validate.city(city, 'city')
    validate.description(description, 'description')
    validate.linkPage(linkPage, 'linkPage')
    validate.email(contactEmail, 'contactEmail', true)
    validate.phoneNumber(phoneNumber, 'phoneNumber')
    validate.pets(pets, 'pets')

    const { sub: userId } = extractPayLoadFromToken(sessionStorage.token)

    return fetch(`${import.meta.env.VITE_API_URL}/petsitters/${userId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image, name, city, description, linkPage, contactEmail, phoneNumber, pets })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 204) return

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}