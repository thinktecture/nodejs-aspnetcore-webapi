/**
 * Created by ppa on 3/3/16.
 */
module.exports = {
    db: {
        // setup database type
        /*type: 'mongo',
        connectionString: 'mongodb://localhost/customer-sample-node'*/
        type: 'postgres',
        connectionString: 'postgres://CustomerSample:CustomerSample@localhost:5432/CustomerSampleNodejs'
    }
};
