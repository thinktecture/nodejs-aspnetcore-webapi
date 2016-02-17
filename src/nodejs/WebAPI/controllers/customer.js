'use strict';

const services = require('../service');

/**
 * @public
 * @constructor
 */
function CustomerController() {
    this.initialize = function (server) {
        server.get('api/customer/list', handleCustomerList);
        server.post('api/customer', handleCustomerCreation);
        server.del('api/customer/:id', handleCustomerDeletion);
    };

    function handleCustomerList(req, res) {
        services.get()
            .then(srv => srv.customer.list())
            .then(
                customers => res.json(200, customers),
                err => res.json(500, err)
            );
    }

    function handleCustomerCreation(req, res) {
        services.get()
            .then(srv => srv.customer.create(req.body.firstName, req.body.lastName))
            .then(
                () => res.send(200),
                err => res.json(500, err)
            );
    }

    function handleCustomerDeletion(req, res) {
        services.get()
            .then(srv => srv.customer.remove(req.params.id))
            .then(
                () => res.send(200),
                err => res.send(500, err)
            );
    }
}

module.exports = new CustomerController();
