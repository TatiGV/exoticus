import { validate, errors } from '../../com';

const { SystemError } = errors;

export default userId => {
    validate.id(userId, 'userId');

    return fetch(`${import.meta.env.VITE_API_URL}/chats`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
    })
        .catch(error => {
            throw new SystemError(error.message);
        })
        .then(response => {
            const { status } = response;

            if (status === 201) {
                return response.json();
            }

            return response.json().then(body => {
                const { error, message } = body;

                const constructor = errors[error];

                throw new constructor(message);
            });
        });
};