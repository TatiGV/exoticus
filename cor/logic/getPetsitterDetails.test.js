import 'dotenv/config'

import getPetsitterDetails from './getPetsitterDetails.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getPetsitterDetails('66ddc4f79e263fa4a44bff7d'))
    .then(petsitters => console.log(petsitters))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())