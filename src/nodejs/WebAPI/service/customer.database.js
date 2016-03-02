'use strict';

const database = require('../database');

/**
 * @public
 * @constructor
 */
function CustomerService() {
    this.create = (firstName, lastName) => {
        // TODO: Code me!
    };

    this.list = () => {
        return database.get()
            .then(db => db.models.customer.findAll());
    };

    this.remove = id => {
        return database.get()
            .then(db => db.models.customer.findById(id))
            .then(model => model.destroy());
    };
}

module.exports = new CustomerService();
