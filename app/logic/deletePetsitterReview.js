import { validate, errors } from '../../com/index.js'

const { SystemError } = errors

export default (reviewId) => {
    validate.id(reviewId, 'reviewId')

    return fetch(`${import.meta.env.VITE_API_URL}/review/${reviewId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${sessionStorage.token}` }
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