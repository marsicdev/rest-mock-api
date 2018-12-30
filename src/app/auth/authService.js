import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import shortid from 'shortid'
import { db } from '../../lib/services/database'

const SECRET_KEY = 'FaKeTok3nKeyHeRe'
const expiresIn = '24h'

class AuthService {
    // Create a token from a payload
    createToken(payload) {
        return jwt.sign(payload, SECRET_KEY, { expiresIn })
    }

    async checkAuth(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, SECRET_KEY, (err, decode) => {
                if (decode !== undefined) {
                    resolve(decode)
                } else {
                    reject(err)
                }
            })
        })
    }

    async login({ email, password }) {
        const user = db
            .get('users')
            .find({ email })
            .value()

        if (!user) {
            const err = new Error(`User with '${email}' email does not exists.`)
            return Promise.reject(err)
        }

        const { passwordHash } = user
        const isMatch = await bcrypt.compare(password, passwordHash)

        if (isMatch) {
            // Create login token
            // eslint-disable-next-line camelcase
            return this.createToken({ email, passwordHash })
        }

        const err = new Error(`Passwords do not match.`)
        return Promise.reject(err)
    }

    async register({ name, email, password }) {
        const saltRounds = 10

        const user = db
            .get('users')
            .find({ email })
            .value()

        if (user) {
            const err = new Error(`User with '${email}' already exists.`)
            return Promise.reject(err)
        }

        const hash = await bcrypt.hash(password, saltRounds)
        const userData = {
            name,
            email,
            passwordHash: hash,
            enabled: false
        }

        // Store user with hash in your password DB.
        db.get('users')
            .push(userData)
            .last()
            .assign({ id: shortid.generate() })
            .write()

        // Create login token
        return this.createToken({ email, hash })
    }
}

export const authService = new AuthService()
