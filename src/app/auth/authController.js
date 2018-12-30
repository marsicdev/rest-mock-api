import { authService } from './authService'

class AuthController {
    async login(req, res) {
        try {
            const { email, password } = req.body
            const token = await authService.login({ email, password })
            if (token) {
                // eslint-disable-next-line camelcase
                res.status(200).json({ access_token: token })
            }
        } catch (error) {
            const status = 401
            const message = error.message
            res.status(status).json({ status, message })
        }
    }

    async register({ body }, res) {
        try {
            const { name, email, password } = body
            const token = await authService.register({ name, email, password })

            if (token) {
                // eslint-disable-next-line camelcase
                res.status(200).json({ access_token: token })
            }
        } catch (error) {
            const status = 401
            const message = error.message
            res.status(status).json({ status, message })
        }
    }
}

export const authController = new AuthController()
