'use strict';

const database = require('../database');

/**
 * @public
 * @constructor
 */
function CustomerService() {
    /**
     * Returns a list of customers
     * @returns {Promise<Array>}
     */
    this.list = () => {
        return database.get()
            .then(db => db.models.customer.findAll());
    };

    /**
     * Creates a new customer
     * @param {string} firstName
     * @param {string} lastName
     * @returns {Promise}
     */
    this.create = (firstName, lastName) => {
        return database.get()
            .then(db => db.models.customer.create({
                firstName: firstName,
                lastName: lastName
            }));
    };

    /**
     * Removes a customer
     * @param {number} id
     * @returns {Promise}
     */
    this.remove = id => {
        return database.get()
            .then(db => db.models.customer.findById(id))
            .then(model => model.destroy());
    };
}

module.exports = new CustomerService();
