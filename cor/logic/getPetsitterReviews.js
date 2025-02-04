import { User, Review } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { SystemError, NotFoundError } = errors

export default (petsitterId) => {
    validate.id(petsitterId, 'petsitterId')

    return User.findById(petsitterId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(petsitter => {
            if (!petsitter) throw new NotFoundError('petsitter no encontrado')

            return Review.find({ petsitter: petsitterId }, { __v: 0 }).sort({ date: -1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(reviews => {
                    const promises = reviews.map(review => {
                        return User.findById(review.author)
                            .catch(error => { throw new SystemError(error.message) })
                            .then(author => {
                                if (!author) throw new NotFoundError('author no encontrado')

                                review.author = {
                                    image: author.image,
                                    id: review.author.toString(),
                                    name: author.name
                                }

                                review.id = review._id
                                delete review._id

                                return review
                            })

                    })

                    return Promise.all(promises)
                })
        })
}