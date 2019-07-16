import middleware from '../middlewares/middleware'
import controller from '../controllers/users'
import express from 'express'
const users = express.Router()
import jwt from 'jsonwebtoken'

users.get('/',  middleware.checkToken, middleware.asyncHandler(async (req, res) => {
  if (jwt.decode(middleware.Token.token).isadmin) {
    return controller.getUsersController(res)
  } else {
  }
}))

users.get('/:id', middleware.checkToken, middleware.asyncHandler(async (req, res) => {
  if (jwt.decode(middleware.Token.token).isadmin) {
    return controller.getUserController(res, req.params.id)
  }
}))

users.post('/auth/signup', middleware.asyncHandler(async (req, res) => {
  controller.signupUserController(res, req.body)
}))

users.post('/auth/signin', middleware.asyncHandler(async (req, res) => {
  controller.signinUserController(res, req.body)
}))

users.patch('/:id', middleware.checkToken, middleware.asyncHandler(async (req, res) => {
  controller.updateUserController(res, req.body, req.params.id)
}))

users.delete('/:id',  middleware.checkToken, middleware.asyncHandler(async (req, res) => {
  controller.deleteUserController(res, req.params.id)
}))

export default users;
