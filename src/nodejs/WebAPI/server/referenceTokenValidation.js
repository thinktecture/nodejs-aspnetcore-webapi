'use strict';

const request = require('request'),
    restify = require('restify');

/**
 * @public
 * @constructor
 */
function ReferenceTokenValidation() {
    const authorityUrl = 'http://localhost:5001/';

    function notAuthorized(res) {
        res.send(400, new Error('Not authorized'));
    }

    this.validate = () => {
        return (req, res, next) => {
            const authorizationHeader = req.header('authorization');

            if (!authorizationHeader) {
                notAuthorized(res);
                return next();
            }

            // Cut the 'Bearer' part
            const token = authorizationHeader.substr(7);

            request(`${authorityUrl}connect/accesstokenvalidation?token=${token}`, (err, response) => {
                if (err || response.statusCode !== 200) {
                    notAuthorized(res);
                    return next();
                }

                return next();
            });
        };
    };
}

module.exports = new ReferenceTokenValidation();
