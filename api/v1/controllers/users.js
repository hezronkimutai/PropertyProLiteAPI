const bodyParser = require('body-parser');
const config = require('../config/config');
const middleware = require('../middlewares/middleware');
const records = require('../models');
import bcrypt from 'bcrypt';
import validator from '../helpers/valid';
import jwt from 'jsonwebtoken';



// /Get request to get all users
async function getUsersController(res)  {

  const users = await records.getUsers();

  if (users) {
    users.forEach( async function(user){
      delete user.password;
    });

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
    delete user.password;
    res.status(200).json({
      status:"200",
      message:"User succesfully retrieved",
      data:user
    });
  } else {
    res.status(404).json({
      status:"404",
       message: 'Property not found'
  });
  }
}



// send a post request to signup a user
async function signupUserController(res, inputs) {
  if (Object.keys(inputs).length != 7){
return res.status(400).json({
 status:"400",
 Error: "Please fill all the required inputs."
})
}else if(!validator.userValidator(res, inputs)){

      const users = await records.getUsers();

let user = users.find(user => user.email === inputs.email)
let user_ = users.find(user => user.email === inputs.email)
let user__ = users.find(user => user.email === inputs.email)
        if (user || user_ || user__){
        return  res.status(400).json({
            status:400,
            message:"A user with the same credentials exist"
          })
        }else{
          const user = await records.createUser(inputs);
          delete user.password;
            return  res.status(201).json({
                status:"201",
                message:"User created succesfully",
                data: user
              });
          }
        }
      }

// send a post request to signin a user
async function signinUserController(res, inputs) {
  if (inputs.email && inputs.password) {
    const users = await records.getUsers();
    let user = users.find(user => user.email === inputs.email)
      if (user && bcrypt.compareSync(inputs.password, user.password)) {
        delete inputs.password;
        let token = jwt.sign(user,config.secret,{expiresIn:'24h'});
        return res.status(201).json({
          status:"201",
          message: 'user Succesfully logged in',
          token:token
        });
      }else{
        return res.status(400).json({
          status:"400",
          message: 'Incorrect details'
        });
      }


  } else {
    res.status(400).json({
      status: "400",
       message: 'password and email required.'
  });
  }
}

async function updateUserController(res, inputs, id) {
  inputs.id = id;
    let user = await records.getUser(id);
    if (user && !validator.userValidator(res, user)) {
        await records.updateUser(user);
        res.status(204).json({message:"User updated succesfully"});
    }else{
      res.status(404).json({
        status:"404",
        Error: "user wasn't found"
       });
    }
}

// send a delete request to delete a user
async function deleteUserController(res, id) {
  const user = await records.getUser(id);

  if (user) {
    await records.deleteUser(user);
    res.status(204).json({message:"User deleted succesfully"});
  } else {
    res.status(404).json({
      status:"404",
       Error: "User wasn't found"
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
