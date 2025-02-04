import 'dotenv/config'
import searchPetsitters from './searchPetsitters.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => searchPetsitters('Madrid'))
    .then(petsitters => console.log(petsitters))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())