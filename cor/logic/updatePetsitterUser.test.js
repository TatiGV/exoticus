import 'dotenv/config'
import updatePetsitterUser from './updatePetsitterUser.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updatePetsitterUser('66dab954cdcb2f4bc079f52c', 'https://hospitalveterinariodonostia.com/', 'Vetpoint', 'Barcelona', 'Somos veterinarios pero cuidamos animales', 'https://www.vetpointclinicaveterinaria.com/es/homepage/', 'info@vetpoint.com', '936555555', ['conejos', 'ratas']))
    .then(() => console.log('petsitterUser updated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())