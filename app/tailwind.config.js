/** @type {import('tailwindcss').Config} */

export default {
    content: [
        './index.html',
        './view/**/*.jsx'
    ],
    theme: {
        extend: {
            fontFamily: {
                lobster: ['Lobster', 'cursive'],
                salsa: ['Salsa']
            }
        },
    },
    plugins: [],
};