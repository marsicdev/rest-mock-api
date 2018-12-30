import { authService } from '../../app/auth/authService'

export default ({ headers }, res, next) => {
    try {
        const { authorization } = headers
        const [bearer, token] = authorization.split(' ')

        if (authorization === undefined || bearer !== 'Bearer') {
            const status = 401
            const message = 'Error in authorization format'
            res.status(status).json({ status, message })
            return
        }

        authService
            .checkAuth(token)
            .then(decode => {
                next()
            })
            .catch(err => {
                const status = 401
                const message = err.message
                res.status(status).json({ status, message })
            })
    } catch (err) {
        const status = 401
        const message = 'Invalid auth strategy.'
        res.status(status).json({ status, message })
    }
}
