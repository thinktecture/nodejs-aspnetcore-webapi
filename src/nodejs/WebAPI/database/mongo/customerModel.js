/**
 * Created by ppa on 3/3/16.
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var customerSchema = new Schema({
    firstName: String,
    lastName: String
}, {
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

customerSchema.virtual('id').get(function () {
    return this._id;
});

var Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;