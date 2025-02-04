import registerUser from './registerUser';
import registerPetsitterUser from './registerPetsitterUser';
import getUser from './getUser';
import getUserId from './getUserId';
import getUserRole from './getUserRole';
import loginUser from './loginUser';
import isUserLoggedIn from './isUserLoggedIn';
import logoutUser from './logoutUser';
import updateUser from './updateUser';
import searchPetsitters from './searchPetsitters';
import getAllPetsitters from './getAllPetsitters';
import getPetsitterDetails from './getPetsitterDetails';
import addReview from './addReview';
import getPetsitterReviews from './getPetsitterReviews';
import deletePetsitterReview from './deletePetsitterReview';
import updatePetsitterUser from './updatePetsitterUser';
import getUserName from './getUserName';
import createChat from './createChat';
import getMessages from './getMessages';
import sendMessage from './sendMessage';

const logic = {
    registerUser,
    registerPetsitterUser,
    getUser,
    getUserId,
    getUserRole,
    loginUser,
    isUserLoggedIn,
    logoutUser,
    updateUser,
    searchPetsitters,
    getAllPetsitters,
    getPetsitterDetails,
    addReview,
    getPetsitterReviews,
    deletePetsitterReview,
    updatePetsitterUser,
    getUserName,
    createChat,
    getMessages,
    sendMessage
};

export default logic;