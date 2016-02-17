'use strict';

const express = require('express'),
    bodyParser = require('body-parser'),
    oAuthServer = require('oauth2-server'),
    cors = require('cors');

const oAuthModel = require('./oAuthModel');

/**
 * @public
 * @constructor
 */
function Server() {
    let app;

    this.start = port => {
        app = express();

        app.use(cors());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.oAuth = oAuthServer({
            model: oAuthModel,
            grants: ['password']
        });

        app.post('/connect/token', app.oAuth.grant());
        app.get('/connect/accesstokenvalidation', validateAccessToken);
        app.use(app.oAuth.errorHandler());

        app.listen(port, () => console.log(`STS is up and running on port ${port}.`));
    };

    function validateAccessToken(req, res) {
        if (!req.query.token) {
            return res.status(400).send('token is missing');
        }

        app.oAuth.model.getAccessToken(req.query.token, function (err) {
            if (err) {
                return res.status(400).send(err);
            }

            res.sendStatus(200);
        });
    }
}

module.exports = Server;
