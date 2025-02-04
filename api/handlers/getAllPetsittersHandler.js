import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    try {
        logic.getAllPetsitters()
            .then(petsitters => res.json(petsitters))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }

}