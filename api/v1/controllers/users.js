const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const middleware = require('../middlewares/middleware');
const records = require('../models');
import {inputValidator} from '../helpers/validator'


// /Get request to get all users
async function getUsersController(res)  {
  const users = await records.getUsers();

  if (users) {

    res.json(users);

  } else {
    res.status(400).json({
      status: "400",
      message: 'No users found'
    });
  }
}

// Send a get request to retrieve a single property
async function getUserController(res, id) {
  const user = await records.getUser(id);

  if (user) {
    res.status(200).json({
      status:"200",
      message:"User succesfully retrieved",
      data:user
    });
  } else {
    res.status(400).json({
      status:"400",
       message: 'Property not found'
  });
  }
}



// send a post request to signup a user
async function signupUserController(res, inputs) {
inputValidator(res, inputs)
    const users = await records.getUsers();
    users.forEach(function(user) {
      if (user.email in inputs || user.phoneNumber in inputs || user.userName in inputs){
        res.status(400).json({
          status:400,
          message:"A user with the same credentials exist"
        })
      }
});

      const user = await records.createUser({
        firstName: inputs[0],
        secondName: inputs[1],
        userName: inputs[2],
        email: inputs[3],
        phoneNumber: inputs[4],
        password: inputs[5],
        profilePic:""

      });

      res.status(201).json({
        status:"201",
        message:"User created succesfully",
        data:user
      });



}

// send a post request to signin a user
async function signinUserController(res, inputs) {
  if (inputs[0] && inputs[1]) {
    const users = await records.getUsers();

    for (let i = 0; i < users.length; i++) {
      if (users[i].email === inputs[0] && users[i].password === inputs[1]) {
        let token = jwt.sign({email: inputs[0]},
          config.secret,
          { expiresIn: '24h' // expires in 24 hours
          }
        );

        res.status(201).json({
          status:"201",
          message: 'user Succesfully logged in',
          token:token,
            data:users[i]
        });
      }else{
        res.status(400).json({
          status:"400",
          message: 'Incorrect details'
        });
      }
    }

  } else {
    res.status(400).json({
      status: "400",
       message: 'password and email required.'
  });
  }
}

async function updateUserController(res, inputs, id) {
  inputValidator(res, inputs)
  const user = await records.getUser(id);
  if (user) {
    user.id = id,
    user.firstName = inputs[0],
    user.secondName = inputs[1],
    user.userName = inputs[2],
    user.email = inputs[3],
    user.phoneNumber = inputs[4],
    user.password = inputs[5],
    user.confirmPassword = inputs[6],



    await records.updateUser(user);

    res.status(204).end();
  } else {
    res.status(404).json({
      status:"404",
       message: "user wasn't found"
     });
  }
}

// send a delete request to delete a user
async function deleteUserController(res, id) {
  const user = await records.getUser(id);

  if (user) {
    await records.deleteUser(user);
    res.status(204).end();
  } else {
    res.status(404).json({
      status:"404",
       message: "User wasn't found"
     });
  }
}




module.exports = {
  getUserController,
  getUsersController,
  signupUserController,
  signinUserController,
  deleteUserController,
  updateUserController
}
