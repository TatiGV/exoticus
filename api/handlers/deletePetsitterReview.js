import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId } = req

    const { reviewId } = req.params

    try {
        logic.deletePetsitterReview(userId, reviewId)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}