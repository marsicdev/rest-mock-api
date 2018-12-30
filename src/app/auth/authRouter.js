import { Router } from 'express'

import { authController } from './authController'

const { login, register } = authController
const authRouter = Router()

/** Login route */
authRouter.route('/auth/login').post(login)

/** Register route */
authRouter.route('/auth/register').post(register)

export { authRouter }
