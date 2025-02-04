import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId } = req

    const { image: newImage, name: newName, surname: newSurname } = req.body

    try {
        logic.updateUser(userId, newImage, newName, newSurname)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}