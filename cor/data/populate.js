import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from './models.js';

mongoose.connect(process.env.MONGODB_URI)
    .then(() => User.deleteMany())
    .then(() => {
        return bcrypt.hash('123123123', 8)
            .then(hashedPassword => {
                return User.create([
                    { image: 'https://tse4.mm.bing.net/th?id=OIP.BbK5rb3HPL_ICOjjOrklYgHaDQ&pid=Api&P=0&h=180', name: 'Vetpoint', city: 'Barcelona', description: 'Somos veterinarios pero cuidamos animales', email: 'veterinario@vetpoint.com', linkPage: 'https://www.vetpointclinicaveterinaria.com/es/homepage/', contactEmail: 'info@vetpoint.com', phoneNumber: '936555555', password: hashedPassword, role: 'petsitter', pets: ['cobayas'] },
                    { image: 'https://pymstatic.com/99363/conversions/animales-compania-mas-populares-wide_webp.webp', name: 'Marina Garcia', city: 'Zaragoza', description: 'Cuido conejos y cobayas', email: 'marina@gmail.com', linkPage: '', contactEmail: '', phoneNumber: '666666666', password: hashedPassword, role: 'petsitter', pets: ['conejos', 'cobayas'] },
                    { image: 'https://es.aap.eu/wp-content/uploads/sites/6/2022/10/Petaura_AAP.jpg', name: 'Claudia Fernandez', city: 'Valencia', description: 'Soy una cuidadora de aves que está en Valencia', email: 'claudia@gmail.com', linkPage: 'https://es.aap.eu/mascotismo-de-exoticos/top-7/', contactEmail: 'claudia@gmail.com', phoneNumber: '600221133', password: hashedPassword, role: 'petsitter', pets: ['aves'] },
                    { image: 'https://arbolabc.nyc3.cdn.digitaloceanspaces.com/Science/animals/articles/animales-exoticos/duck.jpg', name: 'VetGranada', city: 'Granada', description: 'Somos veterinarios pero cuidamos animales', email: 'vetgranada@gmail.com', linkPage: 'https://www.hospitalveterinariosur.com/', contactEmail: 'info@vetgranada.com', phoneNumber: '958555555', password: hashedPassword, role: 'petsitter', pets: ['conejos', 'reptiles'] },
                    { image: 'https://files.worldwildlife.org/wwfcmsprod/images/Axolotl_WWsummer2021/story_full_width/1vwydt3icc_axolotl_WWsummer2021.jpg', name: 'Carmen Valdivia', city: 'Barcelona', description: 'Solo cuido conejos', email: 'carmen@valdivia.com', linkPage: '', contactEmail: '', phoneNumber: '659367258', password: hashedPassword, role: 'petsitter', pets: ['conejos'] },
                    { image: 'https://www.galides.com/storage/img/F0000000408_iguana.jpg', name: 'Hector Lopez', city: 'Sevilla', description: 'Cuido reptiles', email: 'hector@lopez.com', linkPage: '', contactEmail: '', phoneNumber: '633333333', password: hashedPassword, role: 'petsitter', pets: ['reptiles'] },
                    { image: 'https://t2.ea.ltmcdn.com/es/places/6/1/0/animales-exoticos-24-h_7016_0_orig.jpg', name: 'Exóticos24h', city: 'Madrid', description: 'Somos veterinarios pero cuidamos animales', email: 'exoticos24h@gmail.com', linkPage: 'https://animalesexoticos24h.es/', contactEmail: 'info@exoticos.com', phoneNumber: '914754477', password: hashedPassword, role: 'petsitter', pets: ['conejos', 'ratas', 'cobayas', 'aves'] }
                ]);
            });
    })
    .then(() => mongoose.disconnect())
    .then(() => console.log('populated'))
    .catch(error => console.error(error));