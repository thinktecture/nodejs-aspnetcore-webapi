'use strict';

// Require express, another hosting platform for Node.js
const express = require('express'),
    // Require the body-parser for express

    bodyParser = require('body-parser'),

    // Require a oauth2-server for node.js
    oAuthServer = require('oauth2-server');

// Require a oAuthModel which is used by the oauth2-server
const oAuthModel = require('./oAuthModel');

/**
 * @public
 * @constructor
 */
function Server() {
    let app;

    /**
     * Starts the STS server on the given port
     * @param {number} port - The port where to start the server
     */
    this.start = port => {
        // Create a new express instance
        app = express();

        // Add the urlencoded parser middleware for express: https://github.com/expressjs/body-parser#bodyparserurlencodedoptions
        app.use(bodyParser.urlencoded({ extended: true }));

        // Add the json parser middleware for express: https://github.com/expressjs/body-parser#bodyparserjsonoptions
        app.use(bodyParser.json());

        // Create a new oAuthServer
        app.oAuth = oAuthServer({
            // Using our own oAuthModel
            model: oAuthModel,

            // Allow the password grant only for resource owner flow
            grants: ['password']
        });


        // Add the HTTP POST route /connect/token to get tokens using oAuthServer
        app.post('/connect/token', app.oAuth.grant());

        // Add a custom HTTP POST route /connect/accesstokenvalidation to validate our tokens
        app.get('/connect/accesstokenvalidation', validateAccessToken);

        // Add the errorHandler middleware for express
        app.use(app.oAuth.errorHandler());

        // Start the server on the given port
        app.listen(port, () => console.log(`STS is up and running on port ${port}.`));
    };

    // Method for validation access tokens
    function validateAccessToken(req, res) {
        if (!req.query.token) {
            return res.status(400).send('token is missing');
        }

        // simply validate by checking if a token is saved in our oAuthModel
        // Should get some more validation for expiry etc.
        app.oAuth.model.getAccessToken(req.query.token, function (err) {
            if (err) {
                return res.status(400).send(err);
            }

            res.sendStatus(200);
        });
    }
}

module.exports = Server;
