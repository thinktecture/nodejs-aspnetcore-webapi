'use strict';

const customerInMemoryService = require('./customer.inmemory'),
    globalConfig = require('../config'),
    customerDatabaseService = require(`./customer.${globalConfig.db.type}`);

let config = {};

/**
 * @public
 * @constructor
 */
function Services() {
    this.customer = config.useInMemoryService ? customerInMemoryService : customerDatabaseService;
}

let servicesInstance;

module.exports = {
    configure: (useInMemoryService) => {
        config.useInMemoryService = useInMemoryService;
    },
    get: () => {
        if (servicesInstance) {
            return Promise.resolve(servicesInstance);
        }

        return new Promise(resolve => {
            var instance = new Services();
            resolve(instance);
        });
    }
};
