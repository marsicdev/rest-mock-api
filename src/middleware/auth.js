import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import shortid from 'shortid'
import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

const adapter = new FileSync('db/admin.json')
const db = low(adapter)

const SECRET_KEY = 'FaKeTok3nKeyHeRe'
const expiresIn = '1h'

// Create a token from a payload
const createToken = payload => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

// Verify the token
const verifyToken = token => {
    return jwt.verify(token, SECRET_KEY, (err, decode) => (decode !== undefined ? decode : err))
}

export const checkAuth = token => {
    return verifyToken(token)
}

// Check if the user exists in database
export const login = async ({ email, password }) => {
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
        return createToken({ email, passwordHash })
    }

    const err = new Error(`Passwords do not match.`)
    return Promise.reject(err)
}

export const register = async ({ name, email, password }) => {
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
    return createToken({ email, hash })
}
