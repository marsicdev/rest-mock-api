var schema = {
    type: 'object',
    properties: {
        posts: {
            type: 'array',
            minItems: 50,
            maxItems: 100,
            items: {
                type: 'object',
                properties: {
                    id: {
                        type: 'number',
                        minimum: 1,
                        maximum: 100
                    },
                    userId: {
                        type: 'number',
                        minimum: 1,
                        maximum: 10
                    },
                    title: {
                        type: 'string',
                        faker: 'lorem.sentence'
                    },
                    intro: {
                        type: 'string',
                        faker: 'lorem.sentence'
                    },
                    body: {
                        type: 'string',
                        faker: 'lorem.paragraphs'
                    },
                    featured: {
                        type: 'boolean',
                        faker: 'random.boolean'
                    },
                    photo: {
                        type: 'string',
                        faker: 'image.imageUrl'
                    }
                },
                required: ['id', 'title', 'body', 'featured', 'photo', 'userId']
            }
        }
    },
    required: ['posts']
}

module.exports = schema
