import logic from '../../logic';

import Container from '../library/Container';
import Button from '../library/Button';
import Label from '../library/Label';
import Input from '../library/Input';
import Link from '../library/Link';
import Footer from '../home/Footer';
import Heading from '../library/Heading';
import Header from '../home/Header';

import useContext from '../context';
import Form from '../library/Form';

export default function Register({ onRegister, onLoginClick }) {
    const { alert } = useContext();

    const handleRegisterSubmit = event => {
        event.preventDefault();

        const form = event.target;

        const imageInput = form['image-input'];
        const nameInput = form['name-input'];
        const surnameInput = form['surname-input'];
        const emailInput = form['email-input'];
        const passwordInput = form['password-input'];
        const passwordRepeatInput = form['password-repeat-input'];

        const image = imageInput.value;
        const name = nameInput.value;
        const surname = surnameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        const passwordRepeat = passwordRepeatInput.value;

        try {
            logic.registerUser(image, name, surname, email, password, passwordRepeat)
                .then(() => onRegister())
                .catch(error => {
                    console.error(error);

                    alert(error.message);
                });
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    };

    const handleLoginClick = event => {
        event.preventDefault();

        onLoginClick();
    };

    return <>
        <Header />
        <main className='h-screen flex flex-col bg-teal-100'>
            <Container className='  pt-8 pb-12 text-start'>
                <Heading className='text-center mb-6 pt-8 text-2xl font-bold font-salsa'>Registro</Heading>

                <Form onSubmit={handleRegisterSubmit} className='bg-white rounded-[50px] p-6 m-2 space-y-4 text-pretty'>
                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='image-input'>Imagen</Label>
                        <Input className='w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' id='image-input' type='text' placeholder='https://' />
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='name-input'>Nombre</Label>
                        <Input className='w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='text' id='name-input' name='name' placeholder='nombre' autoComplete='name' />
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='surname-input'>Apellidos</Label>
                        <Input className='w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='text' id='surname-input' name='surname' placeholder='apellidos' autoComplete='surname' />
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='email-input'>Email</Label>
                        <Input className='w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='email' id='email-input' name='email' placeholder='email' autoComplete='new-email' />
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='password-input'>Contraseña</Label>
                        <Input className='w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='password' name='password' id='password-input' placeholder='contraseña' autoComplete='new-password' />
                    </Container>

                    <Container className='pb-2'>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='password-repeat-input'>Repite contraseña</Label>
                        <Input className='w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='password' id='password-repeat-input' name='password-repeat' placeholder='repite contraseña' autoComplete='new-password' />
                    </Container>

                    <Container className='text-center'>
                        <Button className='w-36 font-bold bg-green-100 text-black p-2 rounded-full hover:bg-green-200 transition duration-200' type='submit'>{'Regístrate'}</Button>
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