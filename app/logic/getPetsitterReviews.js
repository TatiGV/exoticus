import { validate, errors } from '../com/index.js'

const { SystemError } = errors

export default (petsitterId) => {
    validate.id(petsitterId, 'petsitterId')

    return fetch(`${import.meta.env.VITE_API_URL}/petsitters/${petsitterId}/reviews`)
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 200)
                return response.json()
                    .then(reviews => reviews)

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })

}