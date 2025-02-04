import { useState, useEffect } from 'react';

import logic from '../../logic';

import Container from '../library/Container.jsx';
import Heading from '../library/Heading.jsx';
import Paragraph from '../library/Paragraph.jsx';
import Link from '../library/Link.jsx';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';
import Button from '../library/Button.jsx';

export default function Header() {
    const [name, setName] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        if (logic.isUserLoggedIn()) {
            logic.getUserName()
                .then(name => {
                    setName(name);
                    return logic.getUserRole();
                })
                .then(role => {
                    setRole(role);
                })
                .catch(error => {
                    console.error(error);
                    alert(error.message);
                });
        }
    }, []);

    return (
        <header className='bg-stone-100 fixed left-0 top-0 w-full flex items-center gap-2 p-2 z-40'>
            <Link className='flex-shrink' href={'/'}>
                <img src='../../../logoExoticus.png' alt='logo exoticus' className='h-[3rem] w-auto' />
            </Link>
            <Container>
                <Heading className='text-2xl font-bold font-salsa text-black italic m-1'>Exoticus</Heading>
            </Container>
            <Container className='font-bold font-salsa text-right flex space-x-2 text-sm ml-auto'>
                {name ? (
                    <>
                        <Link
                            href={role === 'petsitter' ? '/settings' : '/settings'}
                        >
                            <Paragraph>{name}</Paragraph>
                        </Link>
                        {/* <Button><IoChatboxEllipsesOutline size={22} /></Button> */}
                    </>
                ) : (
                    <Paragraph>Bienvenida/o!</Paragraph>
                )}
            </Container>
        </header>
    );
}