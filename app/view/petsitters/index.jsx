import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useContext from '../context.js';
import logic from '../../logic/index.js';

import Header from '../home/Header.jsx';
import Heading from '../library/Heading.jsx';
import Paragraph from '../library/Paragraph.jsx';
import Container from '../library/Container.jsx';
import Footer from '../home/Footer.jsx';
import Image from '../library/Image.jsx';

export default function SearchPetsitters() {
    const { alert } = useContext();
    const [city, setCity] = useState('');
    const [pet, setPet] = useState('');
    const [petsitters, setPetsitters] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (city) {
            try {
                logic.searchPetsitters(city, pet)
                    .then(petsitters => setPetsitters(petsitters))
                    .catch(error => {
                        console.error(error);

                        alert(error.message);
                    });
            } catch (error) {
                console.error(error);

                alert(error.message);
            }
        } else if (pet != '') {
            alert('Selecciona una ciudad para poder filtrar por mascota');
        } else {
            loadPetsitters();
        }
    }, [city, pet]);

    const loadPetsitters = () => {
        try {
            logic.getAllPetsitters()
                .then(petsitters => setPetsitters(petsitters))
                .catch(error => {
                    console.error(error);

                    alert(error.message);
                });
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    };

    const onPetsitterDetailsClick = (petsitterId) => { navigate(`/petsitters/${petsitterId}`); };

    return <>
        <Header />
        <main className='bg-teal-100 mt-16 mb-12 flex flex-col items-center justify-start text-[1.5rem] min-h-screen h-full'>
            <Container className='p-2'>
                <Heading className='text-center mb-4 font-bold font-salsa'>Guarderías</Heading>
                <Container className='mb-2 text-lg p-0 rounded-[50px] text-center'>
                    <select className='overflow-y-scroll w-full mt-1 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer' id='city-select' value={city} onChange={(e) => setCity(e.target.value)}>
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

                <Container className='mb-4 text-lg p-0 rounded-[50px] text-center'>
                    <select className='cursor-pointer mt-1 p-1 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' id='pet-select' value={pet} onChange={(e) => setPet(e.target.value)} >
                        <option value=''>Seleccione un animal</option>
                        <option value='conejos'>Conejos</option>
                        <option value='cobayas'>Cobayas</option>
                        <option value='hamsters'>Hamsters</option>
                        <option value='ratas'>Ratas</option>
                        <option value='aves'>Aves</option>
                        <option value='reptiles'>Reptiles</option>
                    </select>
                </Container>
                <Container className='mt-4 mb-16'>
                    {petsitters.length > 0 ? (
                        petsitters.map(petsitter => (
                            <div key={petsitter.id} className='cursor-pointer flex items-start min-h w-full mr-4 mb-4 rounded-[15px] shadow-md bg-white' onClick={() => onPetsitterDetailsClick(petsitter.id)}>
                                <Image src={petsitter.image} alt={petsitter.name} className='h-24 w-24 rounded-[15px] mr-4 p-2' />
                                <div className='flex flex-col'>
                                    <Heading className='text-base font-bold'>{petsitter.name}</Heading>
                                    <Paragraph className='text-sm mt-1 ml-0 font-semibold text-gray-500'>{petsitter.city}</Paragraph>
                                    <Paragraph className='text-sm -mt-1 ml-0 font-semibold text-gray-500'>{petsitter.pets.join(', ')}</Paragraph>
                                    <Paragraph className='text-sm mt-0 ml-0 text-gray-700 overflow-hidden text-ellipsis whitespace-nowrap' style={{ maxWidth: '200px' }} >{petsitter.description.substring(0, 20)}...</Paragraph>
                                </div>
                            </div>
                        ))
                    ) : (

                        <Paragraph className="text-center justify-center items-center flex flex-col text-gray-500 whitespace-normal max-w-xs">No hay guarderías disponibles para la selección actual.</Paragraph>
                    )}
                </Container>

                <Footer defaultTab={'petsitters'} />
            </Container>
        </main>
    </>;
}