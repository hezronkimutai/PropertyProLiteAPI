const express = require('express');
const users = express.Router();
import {
  signupUserController,
  signinUserController,
  getUserController,
  getUsersController,
  updateUserController,
  deleteUserController
} from '../../controllers/users'



function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

// /Get request to get all users
users.get('/',asyncHandler(async (req, res) => {
getUsersController(res);
}));

// Send a get request to retrieve a single property
users.get('/:id', asyncHandler(async (req, res) => {
getUserController(res, req.params.id)
}));



// send a post request to signup a user
users.post('/signup', asyncHandler(async (req, res) => {
signupUserController( res, [
   req.body.firstName,
  req.body.secondName,
 req.body.userName,
req.body.email,
 req.body.phoneNumber,
 req.body.password,
req.body.confirmPassword
]);
}));

// send a post request to signin a user
users.post('/login', asyncHandler(async (req, res) => {
signinUserController( res,[
req.body.email,
 req.body.password
]);
}));

// send a put request to update a user
users.put('/:id', asyncHandler(async (req, res) => {
updateUserController(res,[
   req.body.firstName,
  req.body.secondName,
 req.body.userName,
req.body.email,
 req.body.phoneNumber,
 req.body.password,
req.body.confirmPassword
],
req.params.id);
}));

// send a delete request to delete a user
users.delete('/:id', asyncHandler(async (req, res) => {
deleteUserController(res, req.params.id)
}));

module.exports = users;
