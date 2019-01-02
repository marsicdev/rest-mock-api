import { authService } from '../../app/auth/authService'

const requestWithoutAuth = method => {
    const protectedMethods = ['POST', 'PUT', 'DELETE']
    return !protectedMethods.includes(method)
}

export default ({ headers, method }, res, next) => {
    if (requestWithoutAuth(method)) {
        next()
        return
    }

    try {
        const { authorization } = headers
        const [bearer, token] = authorization.split(' ')

        if (authorization === undefined || bearer !== 'Bearer') {
            const status = 401
            const message = 'Authorization required'
            res.status(status).json({ status, message })
            return
        }

        authService
            .checkAuth(token)
            .then(_ => {
                next()
            })
            .catch(err => {
                const status = 401
                const message = err.message
                res.status(status).json({ status, message })
            })
    } catch (err) {
        const status = 401
        const message = 'Invalid authorization strategy.'
        res.status(status).json({ status, message })
    }
}
