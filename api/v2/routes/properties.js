import express from 'express'
import middleware from '../middlewares/middleware'
import controller from '../controllers/properties'
import jwt from 'jsonwebtoken'

const properties = express.Router()

properties.post('/', middleware.checkToken, middleware.asyncHandler(async(req, res) => {
  req.body.owner = jwt.decode(middleware.Token.token).id
  controller.postPropertiesController(res, req.body)
}));

properties.get('/', middleware.asyncHandler(async (req, res) => {
  controller.getPropertiesController(res)
}));

properties.get('/:id', middleware.asyncHandler(async (req, res) => {
  controller.getPropertyController(res, req.params.id)
}));

properties.get('/type/:type', middleware.asyncHandler(async (req, res) => {
  controller.getPropertyTypeController(res, req.params.type)
}));

properties.patch('/:id', middleware.checkToken, middleware.asyncHandler(async (req, res) => {
  controller.updatePropertyController(res, req.body, req.params.id)
}));
properties.put('/:id/sold', middleware.checkToken, middleware.asyncHandler(async (req, res) => {
  controller.updatePropertyController(res, { sold: true }, req.params.id)
}));

properties.delete('/:id', middleware.checkToken, middleware.asyncHandler(async (req, res) => {
  controller.deletePropertyController(res, req.params.id)
}));

export default properties;