import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { city, pet } = req.query

    try {
        logic.searchPetsitters(city, pet)
            .then(petsitters => res.json(petsitters))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }

}