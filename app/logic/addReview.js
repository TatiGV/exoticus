import { validate, errors } from '../com/index.js'

const { SystemError, DuplicityError } = errors

export default (userId, petsitterId, comment, rate) => {
    validate.id(userId, 'userId')
    validate.id(petsitterId, 'petsitterId')
    validate.string(comment, 'comment')
    validate.number(rate, 'rate')

    return fetch(`${import.meta.env.VITE_API_URL}/petsitters/${petsitterId}/review`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, comment, rate })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 201) return

            return response.json()
                .then(body => {
                    const { error, message } = body

                    if (status === 409) {
                        throw new DuplicityError('ya has hecho una review a este petsitter')
                    }

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}