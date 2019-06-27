const routes = require('express').Router();
const records = require('../models');
const properties = require('./properties');
const users = require('./users')


records.createTables();
routes.use('/properties', properties);
routes.use('/users', users);
module.exports = routes;
