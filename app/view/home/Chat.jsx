import { useEffect, useState, useRef } from 'react';
import logic from '../../logic';
import formatTime from '../../util/formatTime.js';
import Time from '../library/Time.jsx';
import Container from '../library/Container.jsx';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';

export default function Chat([chatId, userId, onMessageSent]) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        const loadMessages = () => {
            try {
                logic.getMessages(chatId)
                    .then(messages => {
                        setMessages(messages);

                        setTimeout(() => {
                            loadMessages();
                        }, 1000);
                    })
                    .catch(error => {
                        console.error(error);

                        alert(error.message);
                    });
            } catch (error) {
                console.error(error);

                alert(error.message);
            }
        };

        loadMessages();
    }, [chatId]);

    const handleSendMessage = () => {
        try {
            if (newMessage.trim() === '') return;

            logic.sendMessage(chatId, newMessage)
                .then(() => {
                    setNewMessage('');

                    onMessageSent();

                    return logic.getMessages(chatId);
                })
                .then(updatedMessages => {
                    setMessages(updatedMessages);
                })
                .catch(error => {
                    console.error(error);

                    alert(error.message);
                });
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    };

    return <Container className='bg-slate-300 flex flex-col text-slate-700 rounded-lg mb-2 h-[100%] overflow-y-auto'>
        <Container className='flex-1 overflow-y-auto'>
            {messages.map(message => (
                <Container
                    key={message.id}
                    className={`p-2 flex ${message.author.id === userId ? 'justify-end' : 'justify-start'}`}
                >
                    <Container
                        className={`max-w-[70%] flex flex-col bg-slate-200 rounded-xl m-2 ${message.author.id === userId ? 'items-end' : 'items-start'}`}
                    >
                        <Container className={`flex items-center m-2 ${message.author.id === userId ? 'flex-row-reverse' : ''}`}>
                            <Avatar url={message.author.avatar} />
                            <Heading className={`font-semibold text-slate-600 ml-2 ${message.author.id === userId ? 'mr-2 ml-0' : ''}`}>
                                {message.author.username}
                            </Heading>
                        </Container>
                        <Container className={`ml-3 mr-3 ${message.author.id === userId ? 'text-left' : 'text-right'} break-words`}>
                            <Paragraph className='break-words word-break max-w-40'>{message.text}</Paragraph>
                        </Container>
                        <Time className='text-xs text-gray-500'>{formatTime(new Date(message.date))}</Time>
                    </Container>
                </Container>
            ))}
            <div ref={messagesEndRef} />
        </Container>
        <Container className='p-2 flex items-center mb-4'>
            <textarea
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                className='flex-1 mr-2 border-b border-gray-400 shadow-none focus:border-gray-600 focus:outline-none bg-transparent rounded-none'
            />
            <Button onClick={handleSendMessage}><IoChatboxEllipsesOutline size={22} /></Button>
        </Container>
    </Container>;
}