const faker = require('faker')

module.exports = () => ({
    messages: [...Array(5)].map((value, index) => ({
        id: index + 1,
        name: faker.hacker.noun(),
        status: faker.hacker.adjective(),
        description: faker.hacker.phrase()
    }))
})
