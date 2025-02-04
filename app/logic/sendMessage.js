import { validate, errors } from '../../com';

const { SystemError } = errors;

export default (chatId, text) => {
    validate.id(chatId, 'chatId');
    validate.string(text, 'text');

    return fetch(`${import.meta.env.VITE_API_URL}/chats/${chatId}/messages`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text, chatId })
    })
        .catch(error => { throw new SystemError(error.message); })
        .then(response => {
            const { status } = response;

            if (status === 201) return;

            return response.json()
                .then(body => {
                    const { error, message } = body;

                    const constructor = errors[error];

                    throw new constructor(message);
                });
        });
};