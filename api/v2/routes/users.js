const express = require('express');
import middleware from '../middlewares/middleware';
import controller from '../controllers/users';
const users = express.Router();
import jwt from 'jsonwebtoken';




// /Get request to get all users
users.get('/',middleware.checkToken,middleware.asyncHandler(async (req, res) => {
  if(jwt.decode(middleware.Token.token).is_admin){
    return controller.getUsersController(res);
  }else{
    return res.status(401).json({
      Error:"You must be an admin"
    })
  }


}));
// Send a get request to retrieve a single property
users.get('/:id',middleware.checkToken, middleware.asyncHandler(async (req, res) => {
  if(jwt.decode(middleware.Token.token).is_admin){
    return controller.getUserController(res, req.params.id)
  }
  return res.status(401).json({
    Error:"You must be an admin"
  })


}));



// send a post request to signup a user
users.post('/signup', middleware.asyncHandler(async (req, res) => {

  controller.signupUserController(req, res, req.body)

}));

// send a post request to signin a user
users.post('/login', middleware.asyncHandler(async (req, res) => {
controller.signinUserController( res,req.body);
}));

// send a patch request to update a user
users.patch('/:id',  middleware.checkToken, middleware.asyncHandler(async (req, res) => {
  controller.updateUserController(res,req.body,req.params.id);
}));

// send a delete request to delete a user
users.delete('/:id', middleware.checkToken, middleware.asyncHandler(async (req, res) => {
controller.deleteUserController(res, req.params.id)
}));

module.exports = users;
