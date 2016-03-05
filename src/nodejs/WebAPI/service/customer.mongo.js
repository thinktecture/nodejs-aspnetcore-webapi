'use strict';

const database = require('../database/mongo'),
    Customer = require('../database/mongo/customerModel');

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
        return Customer.find();
    };

    /**
     * Creates a new customer
     * @param {string} firstName
     * @param {string} lastName
     * @returns {Promise}
     */
    this.create = (firstName, lastName) => {
        var customer = new Customer({
            firstName: firstName,
            lastName: lastName
        });

        return customer.save();
    };

    /**
     * Removes a customer
     * @param {number} id
     * @returns {Promise}
     */
    this.remove = id => {
        return Customer.find({ _id: id }).remove().exec();
    };
}

module.exports = new CustomerService();
