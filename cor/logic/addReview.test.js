import 'dotenv/config'

import mongoose from 'mongoose'

import addReview from './addReview.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => addReview('66e0516f7971e473351e9dba', '66e054efcbfb026be7bc2992', 'son los mejores', 5))
    .then(() => console.log('review made'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())