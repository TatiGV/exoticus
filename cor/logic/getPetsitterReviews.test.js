import 'dotenv/config'
import mongoose from 'mongoose'

import getPetsitterReviews from './getPetsitterReviews.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getPetsitterReviews('66ddc6e8b28e9805501b001c'))
    .then(petsitter => console.log(petsitter))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())