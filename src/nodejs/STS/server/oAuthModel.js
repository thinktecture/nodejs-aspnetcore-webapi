'use strict';

/**
 * @public
 * @constructor
 */
function OAuthModel() {
    const internalTokenStorage = {};

    // Sample client as configured in vNext, too
    const sampleClient = {
        clientId: 'sample-client',
        clientSecret: 'sample-secret'
    };

    // See here for needed method implementations: https://github.com/thomseddon/node-oauth2-server

    /**
     * Returns a client. In this sample there is only one valid client
     * @param {string} clientId
     * @param {string} clientSecret
     * @param {function} callback
     */
    this.getClient = (clientId, clientSecret, callback) => {
        // This is a point, where clients can be loaded from a database
        callback(null, {
            clientId: sampleClient.clientId,
            clientSecret: sampleClient.clientSecret
        });
    };

    /**
     * Saves the access token to an internal storage object
     * @param {string} accessToken
     * @param {string} clientId
     * @param {number} expires
     * @param {string} user
     * @param {function} callback
     */
    this.saveAccessToken = (accessToken, clientId, expires, user, callback) => {
        internalTokenStorage[accessToken] = {
            accessToken: accessToken,
            clientId: clientId,
            expires: expires,
            user: user
        };

        callback();
    };

    /**
     * Checks if the grant type is allowed. For our sample, it must be password and the clientId must be sample-client
     * @param {string} clientId
     * @param {string} grantType
     * @param {function} callback
     */
    this.grantTypeAllowed = (clientId, grantType, callback) => {
        callback(null, grantType === 'password' && clientId === sampleClient.clientId);
    };

    /**
     * Tries to return an access token which has been saved previously by saveAccessToken method
     * @param {string} bearerToken
     * @param {function} callback
     */
    this.getAccessToken = (bearerToken, callback) => {
        const token = internalTokenStorage[bearerToken];

        if (!token) {
            return callback('AccessToken invalid.');
        }

        callback(null, {
            accessToken: token.accessToken,
            clientId: token.clientId,
            expires: token.expires,
            userId: token.user
        });
    };

    /**
     * Authorizes a user. For our sample, only username bob with password bob is valid
     *
     * @param {string} username
     * @param {string} password
     * @param {function} callback
     */
    this.getUser = (username, password, callback) => {
        // This is the point, where a database could be queried for user and check their password
        if (username === 'bob' && password === 'bob') {
            return callback(null, {
                id: 'bob'
            });
        }

        callback(true);
    };
}

module.exports = new OAuthModel();
