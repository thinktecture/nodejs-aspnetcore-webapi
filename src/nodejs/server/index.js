'use strict';

// Require the restify npm module
const restify = require('restify');

// Require the service which uses an in memory storage
const customerService = require('../service/customer.inmemory');

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
        var server = restify.createServer();

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

        // Start the server on the given port and output a console message, if it started successfully
        server.listen(port, () => {
            console.log(`Server is up and running on port ${port}`);
        });
    };

    // Handler for api/customer/list exposing restify's req and res parameters
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

    function handleCustomerCreation(req, res) {
        // req.body contains the json object which was transmitted
        customerService.create(req.body.firstName, req.body.lastName)
            .then(
                () => res.send(200),
                err => res.json(500, err)
            );
    }

    function handleCustomerDeletion(req, res) {
        // req.params contains the url parameters defined in the route (:id)
        customerService.remove(req.params.id)
            .then(
                () => res.send(200),
                err => res.send(500, err)
            );
    }
}

// Expose the Server, so it can be used outside of this JavaScript file. Like a "public class Server..."
module.exports = Server;
