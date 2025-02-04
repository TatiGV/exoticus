import extractPayLoadFromToken from '../util/extractPayLoadFromToken.js'

export default () => {
    const { role } = extractPayLoadFromToken(sessionStorage.token)

    return role
}