import Header from './Header';
import Heading from '../library/Heading';
import Container from '../library/Container';
import Footer from './Footer';
import Paragraph from '../library/Paragraph';
import Image from '../library/Image';

export default function Home() {
    return <>
        <Header />
        <main className='flex flex-col w-full h-full min-h-screen items-center mt-16 mb-12 bg-teal-100 flex-grow'>
            <Image src='../../../animalesExoticos.jpeg' alt='animales exoticos' className='w-full max-w-lg pt-4 mb-4' />

            <Container className='text-lg bg-white p-3 rounded-[50px] m-3 shadow-lg text-center'>
                <Heading className='font-extrabold font-salsa mb-1'>¿Cómo funciona?</Heading>
                <Paragraph className='text-sm text-gray-700 mb-4'>
                    Exotics es una aplicación donde podrás contactar con las guarderías de exóticos más cercanas para que cuiden de tus mascotas cuando lo necesites.
                </Paragraph>

                <Heading className='text-base font-bold mb-2'>🔍Busca</Heading>
                <Paragraph className='text-sm text-gray-700 mb-4'>
                    Entra en la aplicación y busca al cuidador o la guardería más cercana a ti.
                </Paragraph>

                <Heading className='text-base font-bold mb-2'>📧Contacta y reserva</Heading>
                <Paragraph className='text-sm text-gray-700 mb-4'>
                    Contacta con el cuidador o la guardería que más se adecue a tus necesidades y reserva.
                </Paragraph>

                <Heading className='text-base font-bold mb-2'>🐾Disfruta</Heading>
                <Paragraph className='text-sm text-gray-700 mb-4'>
                    Tu mascota estará cuidada mientras tú disfrutas de tus vacaciones.
                </Paragraph>
            </Container>

        </main>

        <Footer defaultTab={'home'} />
    </>;
}