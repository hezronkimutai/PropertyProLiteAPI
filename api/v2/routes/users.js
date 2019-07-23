import middleware from '../middlewares/middleware';
import UserController from '../controllers/users';
import express from 'express';
import jwt from 'jsonwebtoken';


const users = express.Router()

users.get('/users',  middleware.checkToken, middleware.asyncHandler(async (req, res) => {
  let controller = new UserController(req,res);
  if (jwt.decode(middleware.Token.token).isadmin) {
    return controller.getUsersController(req, res)
  }else{
    return res.status(401).json({
      status:401,
      Error:"You must be an admin"
    })
  }
}))

users.get('/users/:id', middleware.checkToken, middleware.asyncHandler(async (req, res) => {
  let controller = new UserController(req,res);
  if (jwt.decode(middleware.Token.token).isadmin) {
    return controller.  getUserController(req, res)
  }else{
    return res.status(401).json({
      status:401,
      Error:"You must be an admin"
    })
  }
}))

users.post('/auth/signup', middleware.asyncHandler(async (req, res) => {
  let controller = new UserController(req,res);
  controller.signupUserController(req, res)
}))
users.post('/auth/resetpassword', middleware.asyncHandler(async (req, res) => {
  let controller = new UserController(req,res);
  controller.resetPassword(req, res)
}))

users.post('/auth/signin', middleware.asyncHandler(async (req, res) => {
  let controller = new UserController(req,res);
  controller.signinUserController(req, res)
}))

users.patch('/users/:id', middleware.checkToken, middleware.asyncHandler(async (req, res) => {
  let controller = new UserController(req,res);
  controller.updateUserController(req, res)
}))

users.delete('/users/:id',  middleware.checkToken, middleware.asyncHandler(async (req, res) => {
  let controller = new UserController(req,res);
  controller.deleteUserController(req, res)
}))

export default users;
