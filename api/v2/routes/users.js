import middleware from '../middlewares/middleware'
import controller from '../controllers/users'
import express from 'express'
const users = express.Router()

users.get('/',  middleware.asyncHandler(async (req, res) => {
  if (true) {
    return controller.getUsersController(res)
  } else {
  }
}))

users.get('/:id', middleware.asyncHandler(async (req, res) => {
  if (true) {
    return controller.getUserController(res, req.params.id)
  }
}))

users.post('/signup', middleware.asyncHandler(async (req, res) => {
  controller.signupUserController(res, req.body)
}))

users.post('/login', middleware.asyncHandler(async (req, res) => {
  controller.signinUserController(res, req.body)
}))

users.patch('/:id', middleware.asyncHandler(async (req, res) => {
  controller.updateUserController(res, req.body, req.params.id)
}))

users.delete('/:id',  middleware.asyncHandler(async (req, res) => {
  controller.deleteUserController(res, req.params.id)
}))

export default users;
