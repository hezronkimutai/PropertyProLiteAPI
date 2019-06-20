const routes = require('express').Router();

const properties = require('./properties');
const users = require('./users')

routes.use('/properties', properties);
routes.use('/users', users);

module.exports = routes;
