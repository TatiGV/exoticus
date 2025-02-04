import registerUser from './registerUser.js'
import authenticateUser from './authenticateUser.js'
import registerPetsitterUser from './registerPetsitterUser.js'
import getUser from './getUser.js'
import updateUser from './updateUser.js'
import getAllPetsitters from './getAllPetsitters.js'
import searchPetsitters from './searchPetsitters.js'
import getPetsitterDetails from './getPetsitterDetails.js'
import addReview from './addReview.js'
import getPetsitterReviews from './getPetsitterReviews.js'
import deletePetsitterReview from './deletePetsitterReview.js'
import updatePetsitterUser from './updatePetsitterUser.js'
import getUserName from './getUserName.js'

const logic = {
    registerUser,
    registerPetsitterUser,
    authenticateUser,
    getUser,
    updateUser,
    getAllPetsitters,
    searchPetsitters,
    getPetsitterDetails,
    addReview,
    getPetsitterReviews,
    deletePetsitterReview,
    updatePetsitterUser,
    getUserName
}

export default logic