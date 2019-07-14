import express from 'express'
import middleware from '../middlewares/middleware'
import controller from '../controllers/properties'
import jwt from 'jsonwebtoken'
import db from '../models/query'
const properties = express.Router()

properties.post('/post-property', middleware.checkToken, middleware.asyncHandler(async (req, res) => {
  req.body.owner = jwt.decode(middleware.Token.token).id
  controller.postPropertiesController(res, req.body)
}))

// Get properties
properties.get('/', middleware.asyncHandler(async (req, res) => {
  controller.getPropertiesController(res)
}))

// Send a get request to retrieve a single property
properties.get('/:id', middleware.asyncHandler(async (req, res) => {
  controller.getPropertyController(res, req.params.id)
}))

// Send a get request to retrieve a single property
properties.get('/type/:type', middleware.asyncHandler(async (req, res) => {
  controller.getPropertyTypeController(res, req.params.type)
}))

// send a patch request to update a property
properties.patch('/:id', middleware.checkToken, middleware.asyncHandler(async (req, res) => {
  controller.updatePropertyController(res, req.body, req.params.id)
}))
properties.put('/sold/:id', middleware.checkToken, middleware.asyncHandler(async (req, res) => {
  controller.updatePropertyController(res, { sold: true }, req.params.id)
}))

// send a delete request to delete a property
properties.delete('/:id', middleware.checkToken, middleware.asyncHandler(async (req, res) => {
  controller.deletePropertyController(res, req.params.id)
}))

module.exports = properties
