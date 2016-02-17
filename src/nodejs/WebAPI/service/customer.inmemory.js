'use strict';

/**
 * @public
 * @constructor
 */
function Customer() {
    let internalCounter = 0;
    const internalStorage = {};

    this.list = () => {
        return new Promise(resolve => {
            let result = [];

            Object.keys(internalStorage).forEach(key => {
                result.push(internalStorage[key]);
            });

            resolve(result);
        });
    };

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
