import jwt from 'jsonwebtoken'

import { errors } from '../../com/index.js'

const { SessionError } = errors

export default (req, res, next) => {
    const { authorization } = req.headers

    const token = authorization.slice(7)

    jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
        if (error) {
            res.status(498).json({ error: SessionError.name, message: error.message })

            return
        }

        const { sub: userId } = payload

        req.userId = userId

        next()
    })
}