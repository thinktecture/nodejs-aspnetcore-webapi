'use strict';

// Require the restify npm module
const restify = require('restify'),

// Require the cors middleware for restify
    corsMiddleware = require('restify-cors-middleware'),

// Require swagger to build an API documentation
    swagger = require('swagger-restify'),

// Require node.js' path module
    path = require('path');

// Require the services
const services = require('../service'),

    // Require configuration
    config = require('../config'),

// Require the controllers
    controllers = require('../controllers'),

// Require the reference token validation service
    referenceTokenValidation = require('./referenceTokenValidation'),

// Require the database to configure it
// use /database/{databaseType}, where databaseType [postgres, mongo]
    database = require(`../database/${config.db.type}`);

/**
 * Restify server exposing some APIs to manipulate customer data
 *
 * @public
 * @constructor
 */
function Server() {
    /**
     * Starts the server on the given port
     * @param {number} port - The port where the server should listen on
     */
    this.start = port => {
        // Create a new restify server
        const server = restify.createServer();

        // Enable cors for restify
        const cors = corsMiddleware({
            allowHeaders: ['Authorization']
        });

        initializeSwagger(server, port);

        // server.pre runs before other server.use middlewares. It will run before all http requests, so we can handle CORS preflights
        server.pre(cors.preflight);

        // Validate all request for an valid token
        server.pre(referenceTokenValidation.validate());

        // Allow cors on all routes
        server.use(cors.actual);

        // Include a query parser middleware which will expose all parsed query parameters on a special "req.params" object
        server.use(restify.queryParser());

        // Include a body parser middleware which will parse the body to json objects (in case of application/json)
        // Will parse other content types like application/form-data or application/x-www-form-urlencoded
        server.use(restify.bodyParser());

        // Initialize all controllers
        controllers.initialize(server);

        // Configure the database to use PostgreSQL or Mongodb
        database.configure(config.db.connectionString);

        // Configure services to use database as backend storage
        services.configure(false);

        // Start the server on the given port and output a console message, if it started successfully
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
            // Reference the files containing the swagger definitions
            apis: [
                path.join(__dirname, '..', 'database', 'mongo', 'customerModel.js'),
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

// Expose the Server, so it can be used outside of this JavaScript file. Like a "public class Server..."
module.exports = Server;
