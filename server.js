const express = require('express');

const db = require('./data/dbConfig.js');

const carsRouter = require('./routers/carsRouter.js');

const server = express();

server.use(express.json());

server.use('/api/cars', carsRouter);

module.exports = server;