import logic from '../../logic';

import Container from '../library/Container';
import Button from '../library/Button';
import Label from '../library/Label';
import Input from '../library/Input';
import Link from '../library/Link';
import Footer from '../home/Footer';
import Heading from '../library/Heading';
import Header from '../home/Header';
import Form from '../library/Form';

import useContext from '../context';
import { useState } from 'react';

export default function RegisterPetsitterUser({ onRegisterPetsitterUser, onLoginClick }) {
    const { alert } = useContext();
    const [selectedPets, setSelectedPets] = useState([]);

    const handleregisterPetsitterUserSubmit = event => {
        event.preventDefault();

        const form = event.target;

        const imageInput = form['image-input'];
        const nameInput = form['name-input'];
        const cityInput = form['city-input'];
        const descriptionInput = form['description-input'];
        const emailInput = form['email-input'];
        const linkPageInput = form['link-page-input'];
        const contactEmailInput = form['contact-email-input'];
        const phoneNumberInput = form['phoneNumber-input'];
        const passwordInput = form['password-input'];
        const passwordRepeatInput = form['password-repeat-input'];

        const image = imageInput.value;
        const name = nameInput.value;
        const city = cityInput.value;
        const description = descriptionInput.value;
        const email = emailInput.value;
        const linkPage = linkPageInput.value;
        const contactEmail = contactEmailInput.value;
        const phoneNumber = phoneNumberInput.value;
        const password = passwordInput.value;
        const passwordRepeat = passwordRepeatInput.value;
        const pets = selectedPets;

        try {
            logic.registerPetsitterUser(image, name, city, description, email, linkPage, contactEmail, phoneNumber, password, passwordRepeat, pets)
                .then(() => onRegisterPetsitterUser())
                .catch(error => {
                    console.error(error);

                    alert(error.message);
                });
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    };

    const handlePetChange = event => {
        const { value, checked } = event.target;

        if (checked) {
            setSelectedPets([...selectedPets, value]);
        } else {
            setSelectedPets(selectedPets.filter(pet => pet !== value));
        }
    };

    const handleLoginClick = event => {
        event.preventDefault();

        onLoginClick();
    };

    return <>
        <Header />
        <main className='h-screen flex flex-col mb-32'>
            <Container className=' bg-teal-100 pt-8 pb-8 text-start'>
                <Heading className='text-center mb-6 pt-8 text-2xl font-bold font-salsa'>Registro de guardería</Heading>

                <Form onSubmit={handleregisterPetsitterUserSubmit} className='bg-white rounded-[50px] p-6 m-2 space-y-4 text-pretty'>
                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='image-input'>Imagen</Label>
                        <Input className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 w-full' id='image-input' type='text' placeholder='https://' />
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='name-input'>Nombre</Label>
                        <Input className='w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='text' id='name-input' name='name' placeholder='nombre' autoComplete='name' />
                    </Container>

                    <Container >
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='city-input'>Ciudad</Label>
                        <select className='w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' name='city' id='city-input' required >
                            <option value=''>Seleccione una ciudad</option>
                            <option value='Madrid'>Madrid</option>
                            <option value='Barcelona'>Barcelona</option>
                            <option value='Valencia'>Valencia</option>
                            <option value='Sevilla'>Sevilla</option>
                            <option value='Zaragoza'>Zaragoza</option>
                            <option value='Malaga'>Málaga</option>
                            <option value='Murcia'>Murcia</option>
                            <option value='Palma'>Palma</option>
                            <option value='Las Palmas de Gran Canaria'>Las Palmas de Gran Canaria</option>
                            <option value='Bilbao'>Bilbao</option>
                            <option value='Alicante'>Alicante</option>
                            <option value='Córdoba'>Córdoba</option>
                            <option value='Valladolid'>Valladolid</option>
                            <option value='Vigo'>Vigo</option>
                            <option value='Gijón'>Gijón</option>
                            <option value='Hospitalet de Llobregat'>L'Hospitalet de Llobregat</option>
                            <option value='Vitoria-Gasteiz'>Vitoria-Gasteiz</option>
                            <option value='La Coruña'>La Coruña</option>
                            <option value='Granada'>Granada</option>
                            <option value='Elche'>Elche</option>
                            <option value='Oviedo'>Oviedo</option>
                            <option value='Badalona'>Badalona</option>
                            <option value='Sabadell'>Sabadell</option>
                            <option value='Cartagena'>Cartagena</option>
                            <option value='Terrassa'>Terrassa</option>
                            <option value='Jerez'>Jerez de la Frontera</option>
                            <option value='Santander'>Santander</option>
                            <option value='Almeria'>Almería</option>
                            <option value='Burgos'>Burgos</option>
                            <option value='Albacete'>Albacete</option>
                            <option value='San Sebastián'>San Sebastián</option>
                            <option value='Salamanca'>Salamanca</option>
                            <option value='Logrono'>Logroño</option>
                            <option value='Lleida'>Lleida</option>
                            <option value='Marbella'>Marbella</option>
                            <option value='Cadiz'>Cádiz</option>
                            <option value='Huelva'>Huelva</option>
                            <option value='Tarragona'>Tarragona</option>
                            <option value='Leon'>León</option>
                            <option value='Jaen'>Jaén</option>
                            <option value='Ourense'>Ourense</option>
                            <option value='Algeciras'>Algeciras</option>
                            <option value='Gerona'>Gerona</option>
                            <option value='Lugo'>Lugo</option>
                        </select>
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='email-input'>Descripción</Label>
                        <Input className='w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='text' id='description-input' name='description' placeholder='descripción' autoComplete='description' />
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='description-input'>Email</Label>
                        <Input className='w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='email' id='email-input' name='email' placeholder='email' autoComplete='new-email' />
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='link-page-input'>Página web</Label>
                        <Input className='w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' id='link-page-input' type='text' placeholder='https://' />
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='description-input'>Email de contacto</Label>
                        <Input className='w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='email' id='contact-email-input' name='cantactEmail' placeholder='email' autoComplete='new-email' />
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='phoneNumber-input'>Teléfono</Label>
                        <Input className='w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='tel' id='phoneNumber-input' name='phoneNumber' placeholder='inserta tu teléfono' autoComplete='phone' />
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='password-input'>Contraseña</Label>
                        <Input className='w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='password' name='password' id='password-input' placeholder='contraseña' autoComplete='new-password' />
                    </Container>

                    <Container className='pb-2'>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='password-repeat-input'>Repite contraseña</Label>
                        <Input className='w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='password' id='password-repeat-input' name='password-repeat' placeholder='repite contraseña' autoComplete='new-password' />
                    </Container>

                    <Container>
                        <Label htmlFor='pets-input'>¿Qué animales cuidas?</Label><br /><br />

                        <Input
                            type='checkbox'
                            id='rabbits-input'
                            value='conejos'
                            name='pets-input'
                            onChange={handlePetChange}
                        />
                        <Label htmlFor='rabbits-input' className='p-2'>Conejos</Label><br />

                        <Input
                            type='checkbox'
                            id='guinea-pig-input'
                            value='cobayas'
                            name='pets-input'
                            onChange={handlePetChange}
                        />
                        <Label htmlFor='guinea-pig-input' className='p-2'>Cobayas</Label><br />

                        <Input
                            type='checkbox'
                            id='hamsters-input'
                            value='hamsters'
                            name='pets-input'
                            onChange={handlePetChange}
                        />
                        <Label htmlFor='hamsters-input' className='p-2'>Hamsters</Label><br />

                        <Input
                            type='checkbox'
                            id='rats-input'
                            value='ratas'
                            name='pets-input'
                            onChange={handlePetChange}
                        />
                        <Label htmlFor='rats-input' className='p-2'>Ratas</Label><br />

                        <Input
                            type='checkbox'
                            id='birds-input'
                            value='aves'
                            name='pets-input'
                            onChange={handlePetChange}
                        />
                        <Label htmlFor='birds-input' className='p-2'>Aves</Label><br />

                        <Input
                            type='checkbox'
                            id='reptiles-input'
                            value='reptiles'
                            name='pets-input'
                            onChange={handlePetChange}
                        />
                        <Label htmlFor='reptiles-input' className='p-2'>Reptiles</Label><br /><br />
                    </Container>

                    <Container className='text-center'>
                        <Button className='w-32 font-bold bg-green-100 text-black p-2 rounded-full hover:bg-green-200 transition duration-200' type='submit'>{'Regístrate'}</Button>
                    </Container>
                </Form>
                <Container className='text-center  pb-8 pt-2'>
                    <Link className='text-bold text-teal-600 hover:text-teal-900' onClick={handleLoginClick}>¿Ya tienes tu cuenta? Loguéate</Link>
                </Container>
                <Footer defaultTab={'login'} />
            </Container>
        </main>
    </>;
}