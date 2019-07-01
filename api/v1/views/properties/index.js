const express = require('express');
const properties = express.Router();

import{
  postPropertiesController,
  getPropertiesController,
  updatePropertyController,
  getPropertyController,
  deletePropertyController,
  getPropertyTypeController
} from '../../controllers/properties'

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}


properties.post('/post-property', asyncHandler(async (req, res) => {
  postPropertiesController([
    req.body.category, req.body.name,
    req.body.reason, req.body.price,
    req.body.state, req.body.city,
    req.body.address, req.body.map,
    req.body.description, req.body.url,

 ],  res,req)
}));


// /users
properties.get('/', asyncHandler(async (req, res) => {
getPropertiesController(req,res)
}));


// Send a get request to retrieve a single property
properties.get('/:id', asyncHandler(async (req, res) => {
getPropertyController(req,res,req.params.id)
}));

// Send a get request to retrieve a single property
properties.get('/type/:type', asyncHandler(async (req, res) => {
getPropertyTypeController(req, res, req.params.type)
}));

// send a put request to update a property
properties.put('/:id', asyncHandler(async (req, res) => {
updatePropertyController(req, res, [
  req.body.category, req.body.name,
  req.body.reason, req.body.price,
  req.body.state, req.body.city,
  req.body.address, req.body.map,
  req.body.description, req.body.url,

], req.params.id);
}));

// send a delete request to delete a property
properties.delete('/:id', asyncHandler(async (req, res) => {
deletePropertyController(req, res, req.params.id);
}));


module.exports = properties;
