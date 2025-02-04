import logic from '../../logic';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '../library/Container';
import Button from '../library/Button';
import Form from '../library/Form';
import Label from '../library/Label';
import Input from '../library/Input';
import Link from '../library/Link';
import Footer from '../home/Footer';
import Heading from '../library/Heading';
import Header from '../home/Header';
import Confirm from '../common/Confirm';

import useContext from '../context';
import extractPayLoadFromToken from '../../util/extractPayLoadFromToken';

export default function SettingsPetsitter({ onLogoutClick }) {
    const { alert } = useContext();

    const { sub: userId } = extractPayLoadFromToken(sessionStorage.token);
    const [selectedPets, setSelectedPets] = useState([]);
    const [petsitter, setPetsitter] = useState(null);
    const [confirmMessage, setConfirmMessage] = useState(null);
    const [confirmSaveMessage, setConfirmSaveMessage] = useState(null);
    const [confirmLogoutMessage, setConfirmLogoutMessage] = useState(null);
    const [formData, setFormData] = useState(null);

    const handleCancelEditUserClick = () => setConfirmMessage('¿Salir sin guardar cambios?');

    const navigate = useNavigate();

    const onCancelClick = () => { navigate('/'); };

    const handleCancelEditUser = () => setConfirmMessage(null);

    const handleSaveConfirmCancel = () => {
        setConfirmSaveMessage(null);

        setFormData(null);
    };

    const handleSaveConfirmAccept = () => {
        setConfirmSaveMessage(null);

        const { image, name, city, description, linkPage, contactEmail, phoneNumber, pets } = formData;

        try {
            logic.updatePetsitterUser(image, name, city, description, linkPage, contactEmail, phoneNumber, pets)
                .then(() => {
                    loadPetsitterUser();
                    alert('Cambios guardados');
                    navigate('/');
                })
                .catch(error => {
                    console.error(error);
                    alert(error.message);
                });
        } catch (error) {
            console.error(error);
            alert(error.message);
        }

        setFormData(null);
    };

    useEffect(() => {
        loadPetsitterUser();
    }, []);

    const loadPetsitterUser = () => {
        try {
            logic.getUser(userId)
                .then(petsitter => {
                    setPetsitter(petsitter);
                    setSelectedPets(petsitter.pets || []);
                })
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

    const handleUpdatePetsitterUserSubmit = event => {
        event.preventDefault();

        const form = event.target;

        const imageInput = form['image-input'];
        const nameInput = form['name-input'];
        const cityInput = form['city-input'];
        const descriptionInput = form['description-input'];
        const linkPageInput = form['link-page-input'];
        const contactEmailInput = form['contact-email-input'];
        const phoneNumberInput = form['phone-number-input'];

        const image = imageInput.value;
        const name = nameInput.value;
        const city = cityInput.value;
        const description = descriptionInput.value;
        const linkPage = linkPageInput.value;
        const contactEmail = contactEmailInput.value;
        const phoneNumber = phoneNumberInput.value;
        const pets = selectedPets;

        setFormData({ image, name, city, description, linkPage, contactEmail, phoneNumber, pets });

        setConfirmSaveMessage('¿Deseas guardar los cambios?');
    };

    const handleLogoutClick = event => {
        event.preventDefault();

        setConfirmLogoutMessage('¿Cerrar sesión?');
    };

    const handleLogoutConfirmAccept = () => {
        setConfirmLogoutMessage(null);

        onLogoutClick();
    };

    const handleLogoutConfirmCancel = () => {
        setConfirmLogoutMessage(null);
    };

    return <>
        <Header />
        <main className='h-screen flex flex-col mb-32'>
            <Container className=' bg-teal-100 pt-8 pb-8 '>
                <Heading className='text-2xl pt-12 font-bold text-center font-salsa'>Editar guardería</Heading>

                {petsitter && <Form onSubmit={handleUpdatePetsitterUserSubmit} className='bg-white text-pretty rounded-[50px] p-6 m-3 space-y-4'>
                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='image-input'>Imagen</Label>
                        <Input className='w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' id='image-input' type='text' defaultValue={petsitter.image} placeholder='https://' />
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='name-input'>Nombre</Label>
                        <Input className='w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='text' defaultValue={petsitter.name} id='name-input' name='name' placeholder='nombre' />
                    </Container>

                    <Container >
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='city-input'>Ciudad</Label>
                        <select className='w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' defaultValue={petsitter.city} name='city' id='city-input'>
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
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='description-input'>Descripción</Label>
                        <Input className='w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='text' defaultValue={petsitter.description} id='description-input' name='description' placeholder='descripción' />
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='link-page-input'>Página web</Label>
                        <Input className='w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' id='link-page-input' type='text' defaultValue={petsitter.linkPage} placeholder='https://' />
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='contact-email-input'>Email de contacto</Label>
                        <Input className='w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='email' defaultValue={petsitter.contactEmail} id='contact-email-input' name='contactEmail' placeholder='email' />
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='phoneNumber-input'>Teléfono</Label>
                        <Input className='w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='tel' defaultValue={petsitter.phoneNumber} id='phone-number-input' name='phoneNumber' placeholder='inserta tu teléfono' />
                    </Container>

                    <Container>
                        <Label htmlFor='pets-input'>¿Qué animales cuidas?</Label><br /><br />

                        <Input
                            type='checkbox'
                            id='rabbits-input'
                            value='conejos'
                            name='pets-input'
                            onChange={handlePetChange}
                            checked={selectedPets.includes('conejos')}
                        />
                        <Label htmlFor='rabbits-input' className='p-2'>Conejos</Label><br />

                        <Input
                            type='checkbox'
                            id='guinea-pig-input'
                            value='cobayas'
                            name='pets-input'
                            onChange={handlePetChange}
                            checked={selectedPets.includes('cobayas')}
                        />
                        <Label htmlFor='guinea-pig-input' className='p-2'>Cobayas</Label><br />

                        <Input
                            type='checkbox'
                            id='hamsters-input'
                            value='hamsters'
                            name='pets-input'
                            onChange={handlePetChange}
                            checked={selectedPets.includes('hamsters')}
                        />
                        <Label htmlFor='hamsters-input' className='p-2'>Hamsters</Label><br />

                        <Input
                            type='checkbox'
                            id='rats-input'
                            value='ratas'
                            name='pets-input'
                            onChange={handlePetChange}
                            checked={selectedPets.includes('ratas')}
                        />
                        <Label htmlFor='rats-input' className='p-2'>Ratas</Label><br />

                        <Input
                            type='checkbox'
                            id='birds-input'
                            value='aves'
                            name='pets-input'
                            onChange={handlePetChange}
                            checked={selectedPets.includes('aves')}
                        />
                        <Label htmlFor='birds-input' className='p-2'>Aves</Label><br />

                        <Input
                            type='checkbox'
                            id='reptiles-input'
                            value='reptiles'
                            name='pets-input'
                            onChange={handlePetChange}
                            checked={selectedPets.includes('reptiles')}
                        />
                        <Label htmlFor='reptiles-input' className='p-2'>Reptiles</Label><br /><br />
                    </Container>

                    <Container className='text-center justify-center text-sm flex space-x-2'>
                        <Button className='w-28 font-bold bg-green-100 text-black p-2 rounded-full hover:bg-green-200 transition duration-200' type='submit'>{'Guardar'}</Button>
                        <Button className='w-28 font-bold bg-red-100 text-black p-2 rounded-full hover:bg-red-400 transition duration-200' type='button' onClick={handleCancelEditUserClick}>{'Cancelar'}</Button>
                    </Container>
                </Form>}

                {confirmMessage && (<Confirm message={confirmMessage} onAccept={onCancelClick} onCancel={handleCancelEditUser} />)}

                {confirmSaveMessage && (<Confirm message={confirmSaveMessage} onAccept={handleSaveConfirmAccept} onCancel={handleSaveConfirmCancel} />)}

                <Container className='text-center text-sm pb-8 pt-2'>
                    <Link className='font-bold p-2 text-teal-700 hover:text-teal-900 cursor-pointer' onClick={handleLogoutClick}>Cerrar sesión</Link>
                </Container>
                <Footer defaultTab={'login'} />
            </Container>

            {confirmLogoutMessage && (<Confirm message={confirmLogoutMessage} onAccept={handleLogoutConfirmAccept} onCancel={handleLogoutConfirmCancel} />)}
        </main>
    </>;
}