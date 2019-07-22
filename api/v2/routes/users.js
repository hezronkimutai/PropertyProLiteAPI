import middleware from '../middlewares/middleware';
import controller from '../controllers/users';
import express from 'express';
import jwt from 'jsonwebtoken';

const users = express.Router()

users.get('/users',  middleware.checkToken, middleware.asyncHandler(async (req, res) => {
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
  controller.signupUserController(req, res)
}))
users.post('/auth/resetpassword', middleware.asyncHandler(async (req, res) => {
  controller.resetPassword(req, res)
}))

users.put('/auth/signout', middleware.asyncHandler(async (req, res) => {
  middleware.Token.token = '';
  return res.status(201).json({
    status:201,
    message: "logged out succesfully"
  })
}))

users.put('/auth/signout', middleware.asyncHandler(async (req, res) => {
  middleware.Token.token = '';
  return res.status(201).json({
    status:201,
    message: "logged out succesfully"
  })
}))

users.post('/auth/signin', middleware.asyncHandler(async (req, res) => {
  controller.signinUserController(req, res)
}))

users.patch('/users/:id', middleware.checkToken, middleware.asyncHandler(async (req, res) => {
  controller.updateUserController(req, res)
}))

users.delete('/users/:id',  middleware.checkToken, middleware.asyncHandler(async (req, res) => {
  controller.deleteUserController(req, res)
}))

export default users;
