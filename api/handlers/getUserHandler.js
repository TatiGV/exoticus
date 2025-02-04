import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId } = req

    try {
        logic.getUser(userId)
            .then(user => res.json(user))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}