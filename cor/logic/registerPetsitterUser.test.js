import 'dotenv/config'
import registerPetsitterUser from './registerPetsitterUser.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Vetpoint', 'Madrid', 'Por favor, funciona de una santa vez', 'veterinario@vetpoint.com', '', '', '655454545', '123123123', '123123123', ['conejos']))
    .then(() => console.log('petsitter registered'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())