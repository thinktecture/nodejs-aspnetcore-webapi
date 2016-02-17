'use strict';

/**
 * @public
 * @constructor
 */
function OAuthModel() {
    const internalTokenStorage = {};

    const sampleClient = {
        clientId: 'sample-client',
        clientSecret: 'sample-secret'
    };

    this.getClient = (clientId, clientSecret, callback) => {
        callback(null, {
            clientId: sampleClient.clientId,
            clientSecret: sampleClient.clientSecret
        });
    };

    this.saveAccessToken = (accessToken, clientId, expires, user, callback) => {
        internalTokenStorage[accessToken] = {
            accessToken: accessToken,
            clientId: clientId,
            expires: expires,
            user: user
        };

        callback();
    };

    this.grantTypeAllowed = (clientId, grantType, callback) => {
        callback(null, grantType === 'password' && clientId === sampleClient.clientId);
    };

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

    this.getUser = (username, password, callback) => {
        if (username === 'bob' && password === 'bob') {
            return callback(null, {
                id: 'bob'
            });
        }

        callback(true);
    };
}

module.exports = new OAuthModel();
