'use strict';

// Require the restify npm module
const restify = require('restify'),

// Require the cors middleware for restify
    corsMiddleware = require('restify-cors-middleware'),

// Require swagger to build an API documentation
    swagger = require('swagger-restify'),

// Require node.js' path module
    path = require('path');

// Require the service which uses an in memory storage
const //customerService = require('../service/customer.inmemory'),

// To use the database approach, uncomment this one and comment out the inMemory service
    customerService = require('../service/customer.database'),

// Require the reference token validation service
    referenceTokenValidation = require('./referenceTokenValidation'),

// Require the database to configure it
    database = require('../database');

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
        //server.pre(referenceTokenValidation.validate());

        // Allow cors on all routes
        server.use(cors.actual);

        // Include a query parser middleware which will expose all parsed query parameters on a special "req.params" object
        server.use(restify.queryParser());

        // Include a body parser middleware which will parse the body to json objects (in case of application/json)
        // Will parse other content types like application/form-data or application/x-www-form-urlencoded
        server.use(restify.bodyParser());

        // Define a HTTP GET route which will execute "handleCustomerList"
        server.get('api/customer/list', handleCustomerList);

        // Define a HTTP POST route
        server.post('api/customer', handleCustomerCreation);

        // Define a HTTP DELETE route
        server.del('api/customer/:id', handleCustomerDeletion);

        // Configure the database to use PostgreSQL
        database.configure('postgres://CustomerSample:CustomerSample@localhost:5432/CustomerSampleNodejs');

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
            // Reference this file since it contains the API
            apis: [path.join(__dirname, 'index.js')],
            produces: ['application/json'],
            consumes: ['application/json'],
            swaggerURL: '/docs',
            swaggerJSON: '/swagger.json',
            swaggerUI: path.join(__dirname, '..', 'public')
        });
    }

    /**
     * @swagger
     * path: /api/customer/list
     * httpMethod: GET
     * spec:
     *  tags:
     *      - Customer
     *  summary: This method returns the customer list
     *  responses:
     *      200:
     *          description: Successful response
     *          schema:
     *              '$ref': '#/definitions/CustomerModel'
     */
    function handleCustomerList(req, res) {
        // Call list method of the customer service
        customerService.list()
            .then(
                // Successful handler: Return a json
                customers => res.json(200, customers),

                // Error handler: Send a HTTP status code 500 together with the error
                err => res.json(500, err)
            );
    }

    /**
     * @swagger
     * path: /api/customer
     * httpMethod: POST
     * spec:
     *  tags:
     *      - Customer
     *  summary: This methods creates a new customer
     *  responses:
     *      200:
     *          description: Customer created
     */
    function handleCustomerCreation(req, res) {
        // req.body contains the json object which was transmitted
        customerService.create(req.body.firstName, req.body.lastName)
            .then(
                () => res.send(200),
                err => res.json(500, err)
            );
    }

    /**
     * @swagger
     * path: /api/customer/{id}
     * httpMethod: DELETE
     * spec:
     *  tags:
     *      - Customer
     *  summary: This methods removes a customer
     *  parameters:
     *      - name: id
     *        in: path
     *        description: The id of the user to remove
     *        required: true
     *        type: integer
     *  responses:
     *      200:
     *          description: Customer removed
     */
    function handleCustomerDeletion(req, res) {
        // req.params contains the url parameters defined in the route (:id)
        customerService.remove(req.params.id)
            .then(
                () => res.send(200),
                err => res.send(500, err)
            );
    }

    /**
     * @swagger
     * definitions:
     *  CustomerModel:
     *      required:
     *          - id
     *          - firstName
     *          - lastName
     *      properties:
     *          id:
     *              type: integer
     *              description: A unique identifier
     *          firstName:
     *              type: string
     *              description: The first name of the given customer
     *          lastName:
     *              type: string
     *              description: The last name of the given customer
     */
}

// Expose the Server, so it can be used outside of this JavaScript file. Like a "public class Server..."
module.exports = Server;
