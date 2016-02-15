'use strict';

/**
 * Customer service which uses an simple object to store and retrieve data.
 * Provides a promise based method access.
 *
 * @public
 * @constructor
 */
function Customer() {
    // Internal counter for ids. "AutoInc" :-)
    let internalCounter = 0;

    // Internal storage object
    const internalStorage = {};

    /**
     * Returns a list of customers
     * @returns {Promise<Array>}
     */
    this.list = () => {
        return new Promise(resolve => {
            let result = [];

            // Run through the object's keys and put all values into an array
            Object.keys(internalStorage).forEach(key => {
                result.push(internalStorage[key]);
            });

            resolve(result);
        });
    };

    /**
     * Creates a new customer
     * @param {string} firstName
     * @param {string} lastName
     * @returns {Promise}
     */
    this.create = (firstName, lastName) => {
        return new Promise(resolve => {
            internalCounter++;

            internalStorage[internalCounter] = {
                firstName: firstName,
                lastName: lastName,
                id: internalCounter
            };

            resolve();
        });
    };

    /**
     * Removes a customer
     * @param {number} id
     * @returns {Promise}
     */
    this.remove = id => {
        return new Promise((resolve, reject) => {
            if (internalStorage[id]) {
                delete internalStorage[id];
                return resolve();
            }

            reject('Id not found');
        });
    };
}

module.exports = new Customer();
