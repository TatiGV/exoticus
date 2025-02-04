import Container from '../library/Container';
import Button from '../library/Button';
import Paragraph from '../library/Paragraph';

export default function Alert({ message, onAccept }) {
    return <>
        <Container className='fixed w-screen top-0 h-screen bg-black opacity-50'>
        </Container>

        <Container className='fixed w-screen top-0 h-screen flex items-center text-center justify-center '>
            <Container className='p-4 border-2 border-black rounded-[20px] bg-teal-200 text-black font-bold text-base flex-col space-y-2'>
                <Paragraph>{message}</Paragraph>
                <Button className='border border-black bg-slate-200 w-24 rounded-md' onClick={onAccept}>Aceptar</Button>
            </Container>
        </Container>
    </>;
}