import logic from '../../logic';

import { useNavigate } from 'react-router-dom';

import Footer from '../home/Footer';
import Header from '../home/Header';
import Container from '../library/Container';
import Heading from '../library/Heading';
import Input from '../library/Input';
import Label from '../library/Label';
import Link from '../library/Link';

import useContext from '../context';
import extractPayLoadFromToken from '../../util/extractPayLoadFromToken';
import { useEffect, useState } from 'react';
import Form from '../library/Form';
import Button from '../library/Button';
import Confirm from '../common/Confirm';

export default function Settings({ onLogoutClick }) {
    const { alert } = useContext();

    const { sub: userId } = extractPayLoadFromToken(sessionStorage.token);
    const [user, setUser] = useState(null);
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

        const { image, name, surname } = formData;

        try {
            logic.updateUser(image, name, surname)
                .then(() => {
                    loadUser();

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
        loadUser();
    }, []);

    const loadUser = () => {
        try {
            logic.getUser(userId)
                .then(user => setUser(user))
                .catch(error => {
                    console.error(error);

                    alert(error.message);
                });
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    };
    const handleUpdateSubmit = event => {
        event.preventDefault();

        const form = event.target;

        const imageInput = form['image-input'];
        const nameInput = form['name-input'];
        const surnameInput = form['surname-input'];

        const image = imageInput.value;
        const name = nameInput.value;
        const surname = surnameInput.value;

        setFormData({ image, name, surname });

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
        <main className='h-full flex flex-col mt-10'>
            <Container className='bg-teal-100 pt-8 pb-40'>

                <Heading className='text-center m-4 text-2xl font-bold font-salsa'>Editar usuario</Heading>

                {user && <Form onSubmit={handleUpdateSubmit} className='bg-white rounded-[50px] p-6 m-2 space-y-4 text-pretty'>
                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='image-input'>Imagen</Label>
                        <Input className='w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' id='image-input' type='text' name='image' defaultValue={user.image} placeholder='https://' />
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='name-input'>Nombre</Label>
                        <Input className='w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='text' id='name-input' name='name' defaultValue={user.name} placeholder='nombre' />
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='surname-input'>Apellidos</Label>
                        <Input className='w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='text' id='surname-input' name='surname' defaultValue={user.surname} placeholder='apellidos' />
                    </Container>

                    <Container className='flex text-center justify-center text-sm space-x-2'>
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