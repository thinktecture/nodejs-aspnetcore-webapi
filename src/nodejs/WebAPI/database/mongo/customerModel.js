const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var customerSchema = new Schema({
    firstName: String,
    lastName: String
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

customerSchema.virtual('id').get(function () {
    return this._id;
});

var Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;

/**
 * @swagger
 * definitions:
 *  CustomerModel:
 *      required:
 *          - id
 *          - firstName
 *          - lastName
 *      properties:
 *          id:
 *              type: string
 *              description: A unique identifier
 *          firstName:
 *              type: string
 *              description: The first name of the given customer
 *          lastName:
 *              type: string
 *              description: The last name of the given customer
 */
