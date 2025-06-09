import { validate, errors } from '../com/index.js'

const { SystemError } = errors

export default (city, pet = null) => {
    validate.city(city, 'city')

    if (pet) {
        validate.string(pet, 'pet')
    }

    return fetch(`${import.meta.env.VITE_API_URL}/petsitters/search?city=${city}&pet=${pet}`)
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 200) {
                return response.json()
                    .then(
                        petsitters => petsitters
                    )
            }

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}