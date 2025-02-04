import 'dotenv/config'
import registerUser from './registerUser.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => registerUser('https://www.ngenespanol.com/wp-content/uploads/2024/03/estos-son-los-animales-que-no-deberias-tener-como-mascotas.jpg', 'Samuele', 'Spinetti', 'samuele@spinetti.com', '123123123', '123123123'))
    .then(() => console.log('user registered'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())