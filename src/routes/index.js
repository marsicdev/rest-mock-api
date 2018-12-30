import { authController } from '../app/auth/authController'

export const setupRoutes = server => {
    server
        .route('/api/login')
        .get((_, res) => {
            res.status(400).send({ error: 'Only available for POST' })
        })
        .post(authController.login)

    server
        .route('/api/register')
        .get((_, res) => {
            const status = 400
            const message = 'Only available for POST'
            res.status(status).send({ status, message })
        })
        .post(authController.register)
}
