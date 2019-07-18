import middleware from '../middlewares/middleware';
import controller from '../controllers/users';
import express from 'express';
import jwt from 'jsonwebtoken';

const users = express.Router()

users.get('/users',  middleware.checkToken, middleware.asyncHandler(async (req, res) => {
  if (jwt.decode(middleware.Token.token).isadmin) {
    return controller.getUsersController(res)
  }else{
    return res.status(401).json({
      status:401,
      Error:"You must be an admin"
    })
  }
}))

users.get('/users/:id', middleware.checkToken, middleware.asyncHandler(async (req, res) => {
  if (jwt.decode(middleware.Token.token).isadmin) {
    return controller.getUserController(res, req.params.id)
  }else{
    return res.status(401).json({
      status:401,
      Error:"You must be an admin"
    })
  }
}))

users.post('/auth/signup', middleware.asyncHandler(async (req, res) => {
  controller.signupUserController(res, req.body)
}))

users.put('/auth/signout', middleware.asyncHandler(async (req, res) => {
  middleware.Token.token = '';
  return res.status(201).json({
    status:201,
    message: "logged out succesfully"
  })
}))

users.post('/auth/signin', middleware.asyncHandler(async (req, res) => {
  controller.signinUserController(res, req.body)
}))

users.patch('/users/:id', middleware.checkToken, middleware.asyncHandler(async (req, res) => {
  controller.updateUserController(res, req.body, req.params.id)
}))

users.delete('/users/:id',  middleware.checkToken, middleware.asyncHandler(async (req, res) => {
  controller.deleteUserController(res, req.params.id)
}))

export default users;
