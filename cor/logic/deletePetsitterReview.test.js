import 'dotenv/config'
import deletePetsitterReview from './deletePetsitterReview.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => deletePetsitterReview('66d988a804fc191d11113029', '66d989d27d3c64a43a97d317'))
    .then(() => console.log('review deleted'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())