import { User, Review } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { SystemError, NotFoundError, DuplicityError } = errors

export default (petsitterId, userId, comment, rate = 0) => {
    validate.id(userId, 'userId')
    validate.id(petsitterId, 'petsitterId')
    validate.string(comment, 'comment')
    validate.number(rate, 'rate')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('usuario no encontrado')

            return User.findById(petsitterId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(petsitter => {
                    if (!petsitter) throw new NotFoundError('petsitter no encontrado')

                    return Review.findOne({ author: user._id, petsitter: petsitter._id })
                        .then(existingReview => {
                            if (existingReview) { throw new DuplicityError('ya has hecho una review a este petsitter') }

                            return Review.create({
                                author: user._id,
                                petsitter: petsitterId,
                                comment,
                                rate
                            })
                                .catch(error => { throw new SystemError(error.message) })
                        })
                        .then(() => { })
                })
        })

}