import 'dotenv/config'
import express from 'express'

import { mongoose } from '../cor/index.js'

import { cors, jsonBodyParser, jwtVerifier, errorHandler } from './middlewares/index.js'

import {
    registerUserHandler,
    authenticateUserHandler,
    getUserHandler,
    getUserNameHandler,
    updateUserHandler,
    registerPetsitterUserHandler,
    getAllPetsittersHandler,
    searchPetsittersHandler,
    getPetsitterDetailsHandler,
    addReviewHandler,
    getPetsitterReviewsHandler,
    deletePetsitterReview,
    updatePetsitterUserHandler

} from './handlers/index.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.info(`API connected to ${process.env.MONGODB_URI}`)

        const api = express()

        api.use(cors)

        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/petsitterUser', jsonBodyParser, registerPetsitterUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users/:userId', jwtVerifier, getUserHandler)

        api.get('/users/:userId/name', jwtVerifier, getUserNameHandler)

        api.get('/petsitters', getAllPetsittersHandler)

        api.get('/petsitters/search', searchPetsittersHandler)

        api.get('/petsitters/:petsitterId', getPetsitterDetailsHandler)

        api.get('/petsitters/:petsitterId/reviews', getPetsitterReviewsHandler)

        api.post('/petsitters/:petsitterId/review', jsonBodyParser, addReviewHandler)

        api.patch('/users/:userId', jwtVerifier, jsonBodyParser, updateUserHandler)

        api.patch('/petsitters/:userId', jwtVerifier, jsonBodyParser, updatePetsitterUserHandler)

        api.delete('/review/:reviewId', jwtVerifier, deletePetsitterReview)

        api.use(errorHandler)

        api.listen(process.env.PORT, () => console.info(`API listening on PORT ${process.env.PORT}`))
    })
    .catch(error => console.error(error))