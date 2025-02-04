import extractPayLoadFromToken from '../util/extractPayLoadFromToken.js'

export default () => {
    const { sub: userId } = extractPayLoadFromToken(sessionStorage.token)

    return userId
}