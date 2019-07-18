import express from 'express';
import properties from './properties';
import users from './users';

const routes = express.Router();

routes.use('/property', properties);
routes.use('/', users);
export default routes;
