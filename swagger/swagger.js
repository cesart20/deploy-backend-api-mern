import swaggerJsdoc from 'swagger-jsdoc';


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Post API',
            version: '1.0.0',
            description: 'API for managing Posts',
            contact: {
                name: 'Cesar Torres'
            },
            servers: [
                {
                    url: 'http://localhost:4000',
                    description: 'Local server'
                }
            ]
        }
    },
    apis: ['./swagger/*.yml']
};

const specs = swaggerJsdoc(options);
export default specs;