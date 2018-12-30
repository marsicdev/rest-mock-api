import { login, register, checkAuth } from '../middleware/auth'

export const setupRoutes = server => {
    server
        .route('/api/login')
        .get((_, res) => {
            res.status(400).send({ error: 'Only available for POST' })
        })
        .post((req, res) => {
            const { email, password } = req.body
            login({ email, password })
                .then(token => {
                    if (token) {
                        // eslint-disable-next-line camelcase
                        res.status(200).json({ access_token: token })
                    }
                })
                .catch(err => {
                    const status = 401
                    const message = err.message
                    res.status(status).json({ status, message })
                })
        })

    server
        .route('/api/register')
        .get((_, res) => {
            const status = 400
            const message = 'Only available for POST'
            res.status(status).send({ status, message })
        })
        .post((req, res) => {
            const { name, email, password } = req.body

            register({ name, email, password })
                .then(token => {
                    if (token) {
                        // eslint-disable-next-line camelcase
                        res.status(200).json({ access_token: token })
                    }
                })
                .catch(err => {
                    const status = 401
                    const message = err.message
                    res.status(status).json({ status, message })
                })
        })

    server.use(/^(?!\/auth).*$/, (req, res, next) => {
        try {
            const { authorization } = req.headers
            const [bearer, token] = authorization.split(' ')

            if (authorization === undefined || bearer !== 'Bearer') {
                const status = 401
                const message = 'Error in authorization format'
                res.status(status).json({ status, message })
                return
            }

            checkAuth(token)
            next()
        } catch (err) {
            const status = 401
            const message = 'Error access_token is revoked'
            res.status(status).json({ status, message })
        }
    })
}
