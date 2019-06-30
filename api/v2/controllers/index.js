

import express from 'express';
import properties from './properties';
import users from './users';


const routes = require('express').Router();


routes.use('/properties', properties);
routes.use('/users', users);

module.exports = routes;
