const routes = require('express').Router();

const properties = require('./properties');
const users = require('./users')

routes.use('/v1/properties', properties);
routes.use('/v1/users', users);

module.exports = routes;
