import 'dotenv/config'
import authenticateUser from './authenticateUser.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => authenticateUser('samuele@spinetti.com', '123123123'))
    .then((petsitter) => console.log('user authenticated', petsitter))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())