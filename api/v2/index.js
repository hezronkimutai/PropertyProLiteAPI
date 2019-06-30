


import express from 'express';

import users from './users';
import properties from './properties';



const routes = require('express').Router();


routes.use('/users', users);
routes.use('/properties', properties);

module.exports = routes;
