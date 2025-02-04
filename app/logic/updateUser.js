import { errors, validate } from '../../com/index.js'
import extractPayLoadFromToken from '../util/extractPayLoadFromToken'

const { SystemError } = errors

export default (image, name, surname) => {
    validate.image(image, 'image')
    validate.name(name, 'name')
    validate.surname(surname, 'surname')

    const { sub: userId } = extractPayLoadFromToken(sessionStorage.token)

    return fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image, name, surname })
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