'use strict';

// Require the server, create a new instance and start it on port 8080
const Server = require('./server');
const server = new Server();
server.start(5000);
