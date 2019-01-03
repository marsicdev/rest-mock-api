import jsonServer from 'json-server'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

import postAuth from './lib/middleware/postAuth'
import apiKeyAuth from './lib/middleware/apiKeyAuth'

import { setupRoutes } from './routes'

const swaggerDocument = YAML.load('./api-docs.yaml')

const server = jsonServer.create()
const router = jsonServer.router('db/full-db.json')
const middlewares = jsonServer.defaults()

// start setting up json-server middlewares
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

// Add custom routes before JSON Server router
setupRoutes(server)

// API documentation
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// API key auth
server.use(apiKeyAuth)
server.use(postAuth)
server.use('/api', router)

/** Default route handler */
server.use((req, res, next) => {
    const status = 404
    const message = 'Not found'
    res.status(status).json({ status, message })
})

export const errorHandler = (err, req, res, next) => {
    if (err.isBoom) {
        res.status(err.output.statusCode).json(err.output.payload)
    } else {
        res.status(404).json(err)
    }
}

// start listening to port 3001
server.listen(3001, () => {
    console.log(`
        JSON Server is running on port 3001
    `)
})
