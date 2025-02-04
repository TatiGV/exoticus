import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId } = req

    try {
        logic.getUserName(userId)
            .then(name => res.json(name))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}