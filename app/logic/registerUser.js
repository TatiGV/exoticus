import { errors, validate } from '../com/index.js'

const { SystemError } = errors

export default (image, name, surname, email, password, passwordRepeat) => {
    validate.image(image, 'image')
    validate.name(name, 'name')
    validate.surname(surname)
    validate.email(email)
    validate.password(password)
    validate.password(passwordRepeat, 'passwordRepeat')

    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image, name, surname, email, password, passwordRepeat })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 201) return

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)

                })
        })
}