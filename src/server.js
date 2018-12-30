import jsonServer from 'json-server'
import { setupRoutes } from './routes'

const server = jsonServer.create()
const router = jsonServer.router('db/db.json')
const middlewares = jsonServer.defaults()

// start setting up json-server middlewares
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

// Add custom routes before JSON Server router
setupRoutes(server)

// server.use(simpleAuth)
server.use('/api', router)

// start listening to port 3001
server.listen(3001, () => {
    console.log(`
        JSON Server is running on port 3001
    `)
})
