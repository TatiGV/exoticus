import 'dotenv/config'
import updateUser from './updateUser.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updateUser('66dabf24964af8fa7aa0d6c4', 'https://hospitalveterinariodonostia.com/', 'Tatiana', 'Garcia'))
    .then(() => console.log('user updated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())