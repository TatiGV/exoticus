import Header from '../home/Header';
import Heading from '../library/Heading';
import Container from '../library/Container';
import Paragraph from '../library/Paragraph';
import Footer from '../home/Footer';
import Link from '../library/Link';

export default function Contact({ onRegisterPetsitterUserClick }) {
    const handleRegisterPetsitterUserClick = event => {
        event.preventDefault();

        onRegisterPetsitterUserClick();
    };


    return <>
        <Header />
        <main className='bg-teal-100 h-screen flex flex-col justify-center items-center'>
            <Heading className='text-center p-2 m-2 text-2xl font-bold font-salsa'>Contáctanos</Heading>
            <Container className='p-4 m-2 bg-white rounded-[50px] shadow-md'>
                <Heading className='text-center font-extrabold mb-1'>¿Necesitas ayuda?</Heading>
                <Paragraph className='text-center text-sm text-gray-700 mb-4'>
                    Puedes enviarnos tus dudas o mejoras sobre la aplicación al siguiente correo y te contactaremos lo antes posible.
                </Paragraph>

                <a href='mailto:info@exoticus.net' className='flex justify-center font-bold p-5 mb-1'>info@exoticus.net</a>

                <Heading className='text-center font-extrabold mb-3'>¿Eres una guardería?</Heading>
                <Paragraph className='text-center text-sm text-gray-700 mb-4'>
                    Si eres una guardería y quieres ofrecer tus servicios, dale click al siguiente botón y regístrate como guardería.
                </Paragraph>

                <Container className='text-center  pb-8 pt-2'>
                    <Link className='w-36 font-bold bg-green-100 text-black p-2 rounded-full hover:bg-green-200 transition duration-200 cursor-pointer' onClick={handleRegisterPetsitterUserClick}>Regístrate como guardería</Link>
                </Container>
            </Container>
        </main>

        <Footer defaultTab={'contact'} />
    </>;

}