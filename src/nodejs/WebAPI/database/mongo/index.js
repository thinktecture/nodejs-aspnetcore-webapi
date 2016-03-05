'use strict';

const mongoose = require('mongoose');

// Using a provider pattern for db configuration and initialization
module.exports = {
    configure: (connectionString) => {
        mongoose.connect(connectionString);
    }
};
