import express from 'express';
import middleware from '../middlewares/middleware';
import PropertyController from '../controllers/properties';
import jwt from 'jsonwebtoken';

const properties = express.Router();
properties.post('/', middleware.checkToken, middleware.asyncHandler(
  async(req, res) => {
    req.body.owner = jwt.decode(middleware.Token.token).id;
    let controller = new PropertyController(req, res);
    controller.postPropertiesController()
  }));

properties.post('/:id', middleware.checkToken, middleware.asyncHandler(
  async(req, res)=>{
    req.body.owner = jwt.decode(middleware.Token.token).id;
    let controller = new PropertyController(req, res);
    controller.postFlagController()}));

properties.get('/', middleware.asyncHandler(
  async(req, res)=>{let controller = new PropertyController(req, res, undefined);
    controller.getPropertiesController()}));

properties.get('/:id', middleware.asyncHandler(
  async(req, res)=>{let controller = new PropertyController(req, res, undefined);
    controller.getPropertyController()}));

properties.get('/type/:type', middleware.asyncHandler(
  async(req, res)=>{let controller = new PropertyController(req, res, undefined);
    controller.getPropertyTypeController()}));

properties.patch('/:id', middleware.checkToken, middleware.asyncHandler(
  async(req, res)=>{
    req.body.owner = jwt.decode(middleware.Token.token).id;
    let controller = new PropertyController(req, res);
    controller.updatePropertyController()}));
properties.put('/:id/sold', middleware.checkToken, middleware.asyncHandler(
  async(req, res)=>{
    req.body.owner = jwt.decode(middleware.Token.token).id;
    let controller = new PropertyController(req, res);
    controller.updatePropertyController()}));

properties.delete('/:id', middleware.checkToken, middleware.asyncHandler(
  async(req, res)=>{
    req.body.owner = jwt.decode(middleware.Token.token).id;
    let controller = new PropertyController(req, res);
    controller.deletePropertyController()}));

export default properties;
