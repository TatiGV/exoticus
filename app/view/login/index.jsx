import useContext from '../context.js';

import logic from '../../logic/index.js';

import Header from '../home/Header.jsx';
import Heading from '../library/Heading.jsx';
import Container from '../library/Container.jsx';
import Form from '../library/Form.jsx';
import Label from '../library/Label.jsx';
import Input from '../library/Input.jsx';
import Button from '../library/Button.jsx';
import Link from '../library/Link.jsx';
import Footer from '../home/Footer.jsx';

import { errors } from '../../com/index.js';

const { NotFoundError, CredentialsError } = errors;

export default function Login({ onLogin, onRegisterClick }) {
    const { alert } = useContext();

    const handleLoginSubmit = event => {
        event.preventDefault();

        const form = event.target;

        const emailInput = form['email-input'];
        const passwordInput = form['password-input'];

        const email = emailInput.value;
        const password = passwordInput.value;

        try {
            logic.loginUser(email, password)
                .then(() => onLogin())
                .catch(error => {
                    console.error(error);

                    let message = error.message;

                    if (error instanceof NotFoundError || error instanceof CredentialsError)
                        message = 'nombre de usuario y/o contraseña incorrectos';

                    alert(error.message);
                });
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    };

    const handleRegisterClick = event => {
        event.preventDefault();

        onRegisterClick();
    };

    return <>
        <Header />
        <main className='bg-teal-100 h-screen flex flex-col items-center justify-center gap-4 text-[1.1rem]'>
            <Heading className='text-center m-2 text-2xl font-bold font-salsa'>Login</Heading>
            <Container className='p-8 m-0 bg-white rounded-[50px] shadow-md'>
                <Form onSubmit={handleLoginSubmit} className='text-lg bg-white p-3 rounded-[50px] text-center flex-col'>
                    <Container className='mb-4'>
                        <Label className='block text-sm font-medium text-gray-700' htmlFor='email-input'>email</Label>
                        <Input className='mt-1 p-2 w-full border border-gray-400 rounded-md' type='email' id='email-input' name='email' placeholder='introduce tu email' autoComplete='email' />
                    </Container>

                    <Container className='mb-6'>
                        <Label className='block text-sm font-medium text-gray-700' htmlFor='password-input'>Contraseña</Label>
                        <Input className='mt-1 p-2 w-full border border-gray-400 rounded-md' type='password' id='password-input' name='password' placeholder='contraseña' autoComplete='current-password' />
                    </Container>

                    <Container className='text-center'>
                        <Button className='w-36 font-bold bg-green-100 text-black p-2 rounded-full hover:bg-green-200 transition duration-200' type='submit'>Login</Button>
                    </Container>

                </Form>

                <Container className='text-center  pb-4 pt-4'>
                    <Link className='text-bold text-teal-600 hover:text-teal-900' onClick={handleRegisterClick}>¿Eres nuevo/a? Regístrate</Link>
                </Container>


                <Footer defaultTab={'login'} />

            </Container>

        </main>

    </>;
}