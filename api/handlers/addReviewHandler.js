import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { petsitterId } = req.params

    const { userId, comment, rate } = req.body

    try {
        logic.addReview(userId, petsitterId, comment, rate)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}