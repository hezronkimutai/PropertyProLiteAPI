import express from 'express'
import middleware from '../middlewares/middleware'
import controller from '../controllers/properties'
import jwt from 'jsonwebtoken'

const properties = express.Router()

properties.post('/', middleware.checkToken, middleware.asyncHandler(async(req, res) => {
  req.body.owner = jwt.decode(middleware.Token.token).id
  controller.postPropertiesController(req, res)
}));

properties.post('/:id', middleware.checkToken, middleware.asyncHandler(async(req, res) => {
  controller.postFlagController(res, req, jwt.decode(middleware.Token.token).id)
}));

properties.get('/', middleware.asyncHandler(async (req, res) => {
  controller.getPropertiesController(res)
}))

properties.get('/:id', middleware.asyncHandler(async (req, res) => {
  controller.getPropertyController(res, req.params.id)
}));

properties.get('/type/:type', middleware.asyncHandler(async (req, res) => {
  controller.getPropertyTypeController(res, req.params.type)
}));

properties.patch('/:id', middleware.checkToken, middleware.asyncHandler(async (req, res) => {
  controller.updatePropertyController(req, res, jwt.decode(middleware.Token.token).id)
}));
properties.put('/:id/sold', middleware.checkToken, middleware.asyncHandler(async (req, res) => {
  req.body.status = 'sold'
  controller.updatePropertyController(req, res, jwt.decode(middleware.Token.token).id)
}));

properties.delete('/:id', middleware.checkToken, middleware.asyncHandler(async (req, res) => {
  controller.deletePropertyController(req, res, jwt.decode(middleware.Token.token).id)
}));

export default properties;