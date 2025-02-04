import { errors } from '../../com/index.js'

const { ValidationError, DuplicityError, CredentialsError, NotFoundError, SessionError } = errors

export default (error, req, res, next) => {
    let status = 500

    if (error instanceof ValidationError)
        status = 400
    else if (error instanceof DuplicityError)
        status = 409
    else if (error instanceof CredentialsError)
        status = 401
    else if (error instanceof NotFoundError)
        status = 404
    else if (error instanceof SessionError)
        status = 498

    res.status(status).json({ error: error.constructor.name, message: error.message })
}