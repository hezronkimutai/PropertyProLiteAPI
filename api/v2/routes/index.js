import express from 'express';
import properties from './properties';
import users from './users';

const routes = express.Router();

routes.use('/properties', properties);
routes.use('/users', users);
export default routes;
