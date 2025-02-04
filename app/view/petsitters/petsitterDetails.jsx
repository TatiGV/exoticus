import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { IoChevronBackCircleSharp } from 'react-icons/io5';

import useContext from '../context';

import logic from '../../logic/index.js';

import Container from '../library/Container';
import Header from '../home/Header';
import Footer from '../home/Footer';
import Link from '../library/Link.jsx';
import Heading from '../library/Heading';
import Paragraph from '../library/Paragraph';
import Button from '../library/Button.jsx';
import Label from '../library/Label';
import Form from '../library/Form.jsx';
import Image from '../library/Image.jsx';

import Review from './Review.jsx';
import extractPayloadFromToken from '../../util/extractPayLoadFromToken.js';

export default function PetsitterDetails({ handleLoginClick }) {
    const navigate = useNavigate();
    const { alert } = useContext();
    const { petsitterId } = useParams();

    const [petsitter, setPetsitter] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const [rating, setRating] = useState(0);
    const [hasRating, setHasRating] = useState(false);
    const [value, setValue] = useState(0);
    const [addReviewVisibility, setAddReviewVisibility] = useState(false);
    const [addAllDetailsVisibility, setAllDetailsVisibility] = useState(false);

    const onIndexClick = () => { navigate('/petsitters'); };

    const onLoginClick = () => handleLoginClick();

    const onAddReviewClick = () => {
        setAddReviewVisibility(true);
    };

    const onCancelReviewClick = () => {
        setAddReviewVisibility(false);
    };

    const onAllDetailsClick = () => {
        setAllDetailsVisibility(true);
    };

    const onCancelAllDetailsClick = () => {
        setAllDetailsVisibility(false);
    };

    const onReviewSubmit = (event) => {
        const { sub: userId } = extractPayloadFromToken(sessionStorage.token);

        event.preventDefault();

        const form = event.target;

        const commentInput = form['comment-input'];
        const ratingInput = form['rating-input'];

        const comment = commentInput.value;
        const rate = parseInt(ratingInput.value);

        try {
            logic.addReview(petsitterId, userId, comment, rate || 0)
                .then(() => {
                    onCancelReviewClick();

                    loadReviews();
                })
                .catch(error => {
                    console.error(error);

                    alert(error.message);
                    setAddReviewVisibility(false);
                });
        } catch (error) {
            console.error(error);

            alert(error.message);
            setAddReviewVisibility(false);
        }
    };

    const handleDeletePetsitterReview = (reviewId) => {
        try {
            logic.deletePetsitterReview(reviewId)
                .then(() => loadReviews())
                .catch(error => {
                    console.error(error);

                    alert(error.message);
                });
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    };

    const loadReviews = () => {
        try {
            logic.getPetsitterReviews(petsitterId)
                .then(reviews => setReviews(reviews))
                .catch(error => {
                    console.error(error);

                    alert(error.message);
                });
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    };

    const calculateRating = () => {
        const reviewsWithRatings = reviews.filter(review => review.rate > 0);

        const ratings = reviewsWithRatings.map(review => review.rate);

        const hasRating = reviewsWithRatings.length > 0;

        const rating = ratings.length > 0
            ? ratings.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / ratings.length
            : 0;

        setRating(rating || 0);
        setHasRating(hasRating);
    };

    useEffect(() => {
        try {
            logic.getPetsitterDetails(petsitterId)
                .then(petsitter => {
                    setPetsitter(petsitter);

                    loadReviews();
                })
                .catch(error => {
                    console.error(error);

                    alert(error.message);
                });

            if (logic.isUserLoggedIn()) {
                const role = logic.getUserRole();
                setUserRole(role);
            }

        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }, [petsitterId, alert]);

    useEffect(() => calculateRating(), [reviews]);

    return (<>
        <Header />
        <main className='bg-teal-100 mt-16 mb-12 flex flex-col items-center justify-start text-[1.5rem] min-h-screen h-full'>
            <Heading className='text-center text-2xl font-bold m-4 font-salsa' >Guardería</Heading>

            {petsitter != null ? (
                <Container className='text-lg w-80 bg-white p-4 rounded-[50px] shadow-lg'>
                    <Container className='flex items-center '>
                        <Image src={petsitter.image} alt='imagen guarderia' className='h-24 w-24 rounded-[15px] m-1' />

                        <Container>
                            <Heading className='text-base font-bold m-2'>{petsitter.name}</Heading>
                            <Paragraph className='text-sm font-semibold text-gray-500'>{petsitter.city}</Paragraph>
                            <Paragraph className='text-sm font-semibold text-gray-500'>{petsitter.pets.join(', ')}</Paragraph>
                            {hasRating ? (
                                <Container className='flex flex-row items-center'>
                                    <Rating
                                        name='read-only'
                                        value={rating}
                                        precision={0.25}
                                        size='small'
                                        emptyIcon={<StarIcon style={{ opacity: 1, color: 'white' }} fontSize='inherit' />}
                                        readOnly
                                    />
                                    <Paragraph className='text-sm font-semibold text-gray-500 mt-0'>
                                        {rating.toFixed(1)}
                                    </Paragraph>
                                </Container>
                            ) : (
                                <Container className='flex flex-row items-center'>
                                    <Paragraph className='text-sm font-semibold text-gray-500 mt-0'>
                                        {reviews.length} {reviews.length === 1 ? 'reseña' : 'reseñas'}
                                    </Paragraph>
                                </Container>
                            )}
                        </Container>
                    </Container>
                    <Paragraph className=' flex flex-col text-lg text-gray-700 m-4'>{petsitter.description}</Paragraph>
                    {
                        userRole === 'regular' ? (
                            <Container className='font-bold text-lg p-1 flex flex-row space-x-2'>
                                <Button className='w-36 bg-green-100 text-black rounded-full hover:bg-green-200 transition duration-200' onClick={onAllDetailsClick}>Contáctame</Button>
                                <Button className='w-36 bg-green-100 text-black rounded-full hover:bg-green-200 transition duration-200' onClick={onAddReviewClick}>Valórame</Button>
                            </Container>

                        ) : userRole !== 'petsitter' ? (
                            <Link
                                className="text-base m-4 font-bold flex flex-col text-center"
                                onClick={onLoginClick}
                            >
                                Loguéate para contactar con {petsitter.name}
                            </Link>
                        ) : null
                    }

                    <Container>
                        <Heading className='items-start justify-start m-3 p-2 flex flex-row text-lg font-bold '>⭐ Reseñas</Heading>
                        <Container className='flex flex-col'>
                            {reviews.map(review => (
                                <Review key={review.id} review={review} onDelete={handleDeletePetsitterReview} />
                            ))}
                        </Container>
                    </Container>
                </Container>

            ) : (

                <Container >
                    <Paragraph>Cargando...</Paragraph>
                </Container>

            )}
            <Container>
                <Footer defaultTab={'petsitters'} />
            </Container>

            {addAllDetailsVisibility && (
                <Container className='absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-20 flex items-center justify-center'>
                    <Container className='bg-green-100 p-6 border border-black rounded-[40px] flex flex-col items-center w-11/12 max-w-md'>
                        <Heading className='text-black text-center text-lg font-bold mb-4'>Datos de contacto de {petsitter?.name}</Heading>
                        <a href={`mailto:${petsitter?.contactEmail}`} className='text-black text-center text-lg font-semibold mb-2 underline break-words max-w-full'>{petsitter?.contactEmail}</a>
                        <a href={petsitter?.linkPage} target="_blank" rel="noopener noreferrer" className='text-black text-center text-sm font-semibold mb-2 underline break-words max-w-full'>{petsitter?.linkPage}</a>
                        <a href={`tel:${petsitter?.phoneNumber}`} className='text-black text-center text-lg font-semibold mb-2 underline'>{petsitter?.phoneNumber}</a>
                        <Button className='w-28 text-base bg-red-400 text-white rounded-full hover:bg-red-500 transition duration-200 mt-4' onClick={onCancelAllDetailsClick}>Cancelar</Button>
                    </Container>
                </Container>
            )}

            {addReviewVisibility && <>
                <Container className='absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-20 flex items-center justify-center'>

                    <Form className='bg-white p-6 border border-black rounded-[60px] flex flex-col items-center w-11/12 max-w-md' onSubmit={onReviewSubmit}>
                        <Label className='text-black text-center font-bold m-6 text-lg'>Da tu opinión sobre {petsitter?.name}</Label>
                        <Container className='mb-4 w-full'>
                            <textarea className='bg-gray-200 w-full h-32 rounded-[25px] px-4 py-2 text-black text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none' id='comment-input' name='comment-input' placeholder='escribe aquí tu reseña' />
                        </Container>
                        <Container className='flex justify-center'>
                            <Rating name='rating-input'
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                size='large'
                                emptyIcon={<StarIcon style={{ opacity: 1, color: 'grey' }} fontSize='inherit' />} />
                        </Container>
                        <Container className='flex m-4 space-x-2'>
                            <Button type='button' className='w-28 text-lg bg-red-400 text-white rounded-full hover:bg-red-500 transition duration-200' onClick={onCancelReviewClick}>Cancelar</Button>
                            <Button type='submit' className='w-28 text-lg bg-green-400 text-white rounded-full hover:bg-green-500 transition duration-200'>Enviar</Button>
                        </Container>
                    </Form>
                </Container>
            </>}
            <Button onClick={onIndexClick} className={`m-4 flex justify-start items-center`}>
                <IoChevronBackCircleSharp size={22} />
            </Button>
        </main >
    </>
    );
}