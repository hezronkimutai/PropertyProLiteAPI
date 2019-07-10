import express from 'express';
import{asyncHandler} from '../middlewares/middleware';
import {validator} from '../helpers/valid';
import{
  postPropertiesController,
  getPropertiesController,
  updatePropertyController,
  getPropertyController,
  deletePropertyController,
  getPropertyTypeController
} from '../controllers/properties'


const properties = express.Router();


properties.post('/post-property', asyncHandler(async (req, res) => {
  validator(res, req.body);
  postPropertiesController(res, req.body)
}));


// /users
properties.get('/', asyncHandler(async (req, res) => {
getPropertiesController(res)
}));


// Send a get request to retrieve a single property
properties.get('/:id', asyncHandler(async (req, res) => {
getPropertyController(res,req.params.id)
}));

// Send a get request to retrieve a single property
properties.get('/type/:type', asyncHandler(async (req, res) => {
getPropertyTypeController(res, req.params.type)
}));

// send a put request to update a property
properties.put('/:id', asyncHandler(async (req, res) => {
  validator(res, req.body);
  updatePropertyController(res, req.body, req.params.id)
}));

// send a delete request to delete a property
properties.delete('/:id', asyncHandler(async (req, res) => {
deletePropertyController(res, req.params.id);
}));


module.exports = properties;
