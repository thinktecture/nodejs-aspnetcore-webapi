'use strict';

const restify = require('restify'),
    corsMiddleware = require('restify-cors-middleware'),
    swagger = require('swagger-restify'),
    path = require('path');

const services = require('../service'),
    controllers = require('../controllers'),
    referenceTokenValidation = require('./referenceTokenValidation'),
    database = require('../database');

/**
 * @public
 * @constructor
 */
function Server() {
    this.start = port => {
        const server = restify.createServer();

        const cors = corsMiddleware({
            allowHeaders: ['Authorization']
        });

        initializeSwagger(server, port);

        server.pre(cors.preflight);
        server.pre(referenceTokenValidation.validate());
        server.use(cors.actual);
        server.use(restify.queryParser());
        server.use(restify.bodyParser());

        controllers.initialize(server);
        database.configure('postgres://CustomerSample:CustomerSample@localhost:5432/CustomerSampleNodejs');
        services.configure(false);

        server.listen(port, () => {
            console.log(`Server is up and running on port ${port}`);
        });
    };

    function initializeSwagger(server, port) {
        swagger.init(server, {
            swagger: '2.0',
            baseUrl: '/',
            info: {
                version: 'v1',
                title: 'Sample Node.js Web API',
                description: 'Sample Web API to showcase Node.js compared to ASP.NET Core 1.0',
                contact: {
                    name: 'Thinktecture AG',
                    email: 'office@thinktecture.com',
                    url: 'http://thinktecture.com'
                }
            },
            host: `localhost:${port}`,
            apis: [
                path.join(__dirname, '..', 'database', 'customerModel.js'),
                path.join(__dirname, '..', 'controllers', 'customer.js')
            ],
            produces: ['application/json'],
            consumes: ['application/json'],
            swaggerURL: '/docs',
            swaggerJSON: '/swagger.json',
            swaggerUI: path.join(__dirname, '..', 'public')
        });
    }
}

module.exports = Server;
