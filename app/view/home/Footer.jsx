import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { RiHomeHeartFill } from 'react-icons/ri';
import { PiPawPrintFill } from 'react-icons/pi';
import { MdEmail } from 'react-icons/md';

import Button from '../library/Button';
import Container from '../library/Container';

export default function Footer({ defaultTab }) {

    const navigate = useNavigate();

    const onHomeClick = () => { navigate('/'); };

    const onLoginClick = () => { navigate('/login'); };

    const onContactClick = () => { navigate('/contact'); };

    const onPetsittersClick = () => { navigate('/petsitters'); };

    return <footer className='fixed bottom-0 left-0 w-full mb-0 shadow-[0_-1px_1px] bg-stone-100'>
        <Container className='flex justify-between items-center mx-auto max-w-md p-2 '>
            <Button onClick={() => onHomeClick()} className={`flex justify-center items-center bg-transparent border-transparent rounded-lg p-1 ${defaultTab === 'home' ? 'text-purple-500' : 'text-dimgray'}`}>
                <RiHomeHeartFill size={24} />
            </Button>

            <Button onClick={() => onPetsittersClick()} className={`flex justify-center items-center bg-transparent border-transparent rounded-lg p-1 ${defaultTab === 'petsitters' ? 'text-purple-500' : 'text-dimgray'}`}>
                <PiPawPrintFill size={24} />
            </Button>

            <Button onClick={() => onContactClick()} className={`flex justify-center items-center bg-transparent border-transparent rounded-lg p-1 ${defaultTab === 'contact' ? 'text-purple-500' : 'text-dimgray'}`}>
                <MdEmail size={24} />
            </Button>

            <Button onClick={() => onLoginClick()} className={`flex justify-center items-center bg-transparent border-transparent rounded-lg p-1 ${defaultTab === 'login' ? 'text-purple-500' : 'text-dimgray'}`}>
                <FaUser size={24} />
            </Button>
        </Container>
    </footer>;
}