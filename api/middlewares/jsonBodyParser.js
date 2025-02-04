export default (req, res, next) => {
    req.setEncoding('utf-8')

    req.on('data', json => {
        const body = JSON.parse(json)

        req.body = body

        next()
    })
}