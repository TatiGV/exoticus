import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    try {
        const { petsitterId } = req.params

        logic.getPetsitterDetails(petsitterId)
            .then(petsitter => res.json(petsitter))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}