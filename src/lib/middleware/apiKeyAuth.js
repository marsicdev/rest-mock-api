export default ({ headers }, res, next) => {
    const apiKey = headers['x-api-key']
    if (apiKey === 'BlaBla') {
        next()
        return
    }

    const status = 401
    const message = 'Invalid API key.'
    res.status(status).json({ status, message })
}
