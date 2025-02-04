import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId } = req

    const { image: newImage, name: newName, city: newCity, description: newDescription, linkPage: newLinkPage, contactEmail: newContactEmail, phoneNumber: newPhoneNumber, pets: newPets } = req.body

    try {
        logic.updatePetsitterUser(userId, newImage, newName, newCity, newDescription, newLinkPage, newContactEmail, newPhoneNumber, newPets)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}