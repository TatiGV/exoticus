import errors from './errors.js'

const { ValidationError } = errors

const EMAIL_REGEX = /^[a-z0-9._]+@[a-z0-9.-]{3,63}\.[a-z]{2,10}$/
const NAME_REGEX = /^(?!.*\s{2})[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ ]+$/
const PHONE_REGEX = /^\+?\d{9,15}$/

function validateString(value, explain = 'value') {
    if (typeof value !== 'string') throw new ValidationError(`${explain} no es una cadena`)
}

function validateName(name, explain = 'name') {
    validateString(name, explain)
    if (!NAME_REGEX.test(name.trim())) throw new ValidationError(`${explain} invalido`)
}

function validateSurname(surname, explain = 'surname') {
    validateString(surname, 'surname')
    if (!NAME_REGEX.test(surname)) throw new ValidationError(`${explain} invalido`)
}
function validateEmail(email, explain = 'email', isOptinal = false) {
    if (isOptinal && (!email || email.trim() === '')) return

    validateString(email, 'email')

    if (!EMAIL_REGEX.test(email.trim())) throw new ValidationError(`${explain} invalido`)
}

function validatePassword(password, explain = 'password') {
    validateString(password, 'password')
    if (password.trim().length < 8) throw new ValidationError(`el ${explain} tiene una longitud menor de 8 caracteres`)
    if (password.includes(' ')) throw new ValidationError(`el ${explain} no puede tener espacios vacios`)
}

function validateCity(city) {
    validateString(city, 'city')
    if (city === '') throw new ValidationError('el campo no puede estar vacio')
}

function validateDescription(description, explain = 'description') {
    validateString(description, 'description')
    if (description < 1) throw new ValidationError(`la ${explain} debe tener más de un caracter`)
    if (typeof description !== 'string') throw new ValidationError(`${explain} no es una cadena`)
}

function validateImage(image, explain = 'image') {
    validateString(image, 'image')
    if (!image.startsWith('http')) throw new ValidationError(`${explain} invalida`)
}

function validatePets(pets) {
    validateArray(pets, ['pets'])
    if (pets.length < 1) throw new ValidationError('debe seleccionarse al menos una mascota')
}

function validateArray(array, explain = ['']) {
    if (!(array instanceof Array)) throw new ValidationError(`${explain} no es un array`)
}

function validatePhoneNumber(phoneNumber, explain = 'phoneNumber') {
    validateString(phoneNumber, 'phoneNumber')
    if (!PHONE_REGEX.test(phoneNumber)) throw new ValidationError(`${explain} invalido`)
}

function validateNumber(number, explain = 'number') {
    if (typeof number !== 'number') throw new ValidationError(`${explain} no es un numero`)
}

function validateId(id, explain = 'id') {
    validateString(id, explain)
    if (id.trim().length === 0) throw new ValidationError(`${explain} invalido`)
}

function validateObject(object, explain = 'object') {
    if (object === null || typeof object !== 'object' || object.constructor !== object) throw new ValidationError(`${explain} no es un objeto`)

}

function validateLinkPage(linkPage, explain = 'linkPage') {
    validateString(linkPage, explain)
    if (linkPage && !(linkPage.startsWith('http://') || linkPage.startsWith('https://'))) {
        throw new ValidationError(`${explain} no es una URL valida`)
    }
}

const validate = {
    string: validateString,
    name: validateName,
    surname: validateSurname,
    email: validateEmail,
    password: validatePassword,
    city: validateCity,
    description: validateDescription,
    image: validateImage,
    pets: validatePets,
    array: validateArray,
    phoneNumber: validatePhoneNumber,
    number: validateNumber,
    id: validateId,
    object: validateObject,
    linkPage: validateLinkPage
}

export default validate