import 'dotenv/config'

import getAllPetsitters from './getAllPetsitters.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllPetsitters())
    .then(petsitters => console.log(petsitters))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())