import jwt from 'jsonwebtoken'

import { logic } from '../../cor/index.js'
import { errors } from '../../com/index.js'

const { SessionError } = errors

export default (req, res, next) => {
    const { email, password } = req.body

    try {
        logic.authenticateUser(email, password)
            .then(user =>
                jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, (error, token) => {
                    if (error) {
                        next(new SessionError(error.message))

                        return
                    }

                    res.json(token)
                })
            )
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}