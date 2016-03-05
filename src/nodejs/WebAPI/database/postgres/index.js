'use strict';

const Sequelize = require('sequelize');

let config;

/**
 * @public
 * @constructor
 */
function Database() {
    const models = {};
    let sequelize;

    this.initialize = () => {
        sequelize = new Sequelize(config.connectionString);

        initializeModels();

        return syncDatabase()
            .then(() => {
                return {
                    models: models,
                    sequelize: sequelize
                }
            });
    };

    function initializeModels() {
        const customerModel = sequelize.import('./customerModel.js');
        models[customerModel.name] = customerModel;
    }

    function syncDatabase() {
        return sequelize.sync();
    }
}

let database;

// Using a provider pattern for db configuration and initialization
module.exports = {
    configure: (connectionString) => {
        config = {
            connectionString: connectionString
        };
    },
    get: () => {
        if (!config) {
            throw new Error('Please call .configure first before trying to resolve a database instance.');
        }

        if (database) {
            return Promise.resolve(database);
        }

        return new Promise(resolve => {
            var dbInit = new Database();
            dbInit.initialize()
                .then(db => {
                    database = {
                        models: db.models,
                        sequelize: db.sequelize
                    };
                    resolve(database);
                });
        });
    }
};
