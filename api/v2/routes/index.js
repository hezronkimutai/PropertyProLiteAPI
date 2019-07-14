import express from 'express';
const routes = express.Router();

import properties from './properties';
import users from './users';
// import cloudinary from './cloudinary';

routes.use('/properties', properties);
routes.use('/users', users);
// routes.use('/', cloudinary);
module.exports = routes;
