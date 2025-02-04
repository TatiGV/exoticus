import Button from '../library/Button';
import Container from '../library/Container';
import Paragraph from '../library/Paragraph';

export default function Confirm({ message, onAccept, onCancel }) {
    return <>
        <Container className='fixed w-screen top-0 h-screen bg-black opacity-50'></Container>

        <Container className='fixed w-screen top-0 h-screen flex items-center text-center justify-center'>
            <Container className='p-4 border-2 border-black rounded-[20px] bg-teal-200 text-black font-bold text-base flex-col space-y-4 space-x-2'>
                <Paragraph>{message}</Paragraph>
                <Button className='border border-black bg-slate-200 w-20 rounded-md' onClick={onCancel}>Cancel</Button>
                <Button className='border border-black bg-slate-200 w-20 rounded-md' onClick={onAccept}>Ok</Button>
            </Container>
        </Container>
    </>;
}