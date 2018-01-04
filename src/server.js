const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db/db.json')
const middlewares = jsonServer.defaults()

// This is mock for our fake user
const { adminCredentials, adminUser } = require('./fakeUser')

const simpleAuth = (req, res, next) => {

    const bearerToken = req.headers.authorization;
    if (bearerToken) {
        if (bearerToken === adminCredentials.bearerToken) {
            next();
        } else {
            res.status(401)
                .send({ error: 'Invalid token' })
        }
    } else {
        // it is not recommended in REST APIs to throw errors,
        // instead, we send 401 response with whatever erros
        // we want to expose to the client
        res.status(401)
            .send({ error: 'Unauthorized' })
    }
}

// start setting up json-server middlewares
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

// Add custom routes before JSON Server router
server.route('/api/auth')
    .get((req, res) => {
        res.send("Only available for POST")
    })
    .post((req, res) => {
        console.log(req.body);
        if (req.body) {
            const { username, password } = req.body;
            if (username === adminCredentials.username
                && password === adminCredentials.password) {

                res.status(200)
                    .send(adminUser)

            } else {

                res.status(401)
                    .send({ error: 'Invalid credentials' })
            }
        } else {
            // it is not recommended in REST APIs to throw errors,
            // instead, we send 401 response with whatever erros
            // we want to expose to the client
            res.status(401)
                .send({ error: 'Unauthorized' })
        }
    })

server.use(simpleAuth)
server.use('/api', router)

// start listening to port 3001
server.listen(3001, () => {
    console.log(`
        JSON Server is running on port 3001
    `);
})
