'use strict';

const database = require('../database');

/**
 * @public
 * @constructor
 */
function CustomerService() {
    this.list = () => {
        return database.get()
            .then(db => db.models.customer.findAll());
    };

    this.create = (firstName, lastName) => {
        return database.get()
            .then(db => db.models.customer.create({
                firstName: firstName,
                lastName: lastName
            }));
    };

    this.remove = id => {
        return database.get()
            .then(db => db.models.customer.findById(id))
            .then(model => model.destroy());
    };
}

module.exports = new CustomerService();
