'use strict';

const customerController = require('./customer');

/**
 * @public
 * @constructor
 */
function Controllers() {
    this.initialize = function (server) {
        customerController.initialize(server);
    };
}

module.exports = new Controllers();
