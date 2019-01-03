import { Buffer } from 'safe-buffer'

import { db } from '../services/database'

export default ({ headers }, res, next) => {
    // Key is sent in Base64 btoa() format
    // as an extra layer of protection
    const encodedApiKey = headers['x-api-key']

    if (!encodedApiKey) {
        const status = 401
        const message = 'Invalid auth header'
        res.status(status).json({ status, message })
        return
    }

    // Decode API key before use
    const decodedKey = Buffer.from(encodedApiKey, 'base64').toString()

    // Find key in DB
    const keyObj = db
        .get('keys')
        .find({ key: decodedKey })
        .value()

    // Validate key
    if (keyObj && keyObj.key === decodedKey) {
        next()
        return
    }

    const status = 401
    const message = 'Invalid API key.'
    res.status(status).json({ status, message })
}
