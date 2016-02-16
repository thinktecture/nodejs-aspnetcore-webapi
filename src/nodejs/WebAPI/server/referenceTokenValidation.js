'use strict';

const request = require('request'),
    restify = require('restify');

/**
 * This class is used to validate the tokens which are sent to the Web API
 *
 * @public
 * @constructor
 */
function ReferenceTokenValidation() {
    // The Url where the Node STS is hosted.
    const authorityUrl = 'http://localhost:5001/';

    // Internal method for creating a 401 Not authorized http error
    function notAuthorized(res) {
        res.send(401, new Error('Not authorized'));
    }

    /**
     * Returns a restify middleware to validate tokens
     * @returns {Function}
     */
    this.validate = () => {
        return (req, res, next) => {
            // Don't authorise docs and swagger json
            if (req.url.indexOf('/docs') === 0 || req.url.indexOf('/swagger.json') === 0) {
                return next();
            }

            // Get the authorization header
            const authorizationHeader = req.header('authorization');

            // If not present, return 401 Not authorized
            if (!authorizationHeader) {
                notAuthorized(res);
                return next();
            }

            // Cut the 'Bearer' part, so we only have the token
            const token = authorizationHeader.substr(7);

            // Call our STS to validate the token
            request(`${authorityUrl}connect/accesstokenvalidation?token=${token}`, (err, response) => {
                // If it returns an error or the statusCode is not 200 OK, return a 401 Not authorized
                if (err || response.statusCode !== 200) {
                    notAuthorized(res);
                    return next();
                }

                // If everything is ok, go to the next middleware
                return next();
            });
        };
    };
}

module.exports = new ReferenceTokenValidation();
