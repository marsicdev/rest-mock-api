import { db } from '../services/database'

export default ({ headers }, res, next) => {
    const apiKey = headers['x-api-key']

    if (!apiKey) {
        const status = 401
        const message = 'Invalid auth header'
        res.status(status).json({ status, message })
        return
    }

    // Find key in DB
    const keyObj = db
        .get('keys')
        .find({ key: apiKey })
        .value()

    // Validate key
    if (keyObj && keyObj.key === apiKey) {
        next()
        return
    }

    const status = 401
    const message = 'Invalid API key.'
    res.status(status).json({ status, message })
}
