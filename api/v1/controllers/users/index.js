const express = require('express');

const users = express.Router();
const records = require('../../models');

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
users.get('/', asyncHandler(async (req, res) => {
  const users = await records.getUsers();
  if (users) {
    res.json(users);
  } else {
    res.status(400).json({
      status: "400",
      message: 'No users found'
    });
  }
}));

// Send a get request to retrieve a single property
users.get('/:id', asyncHandler(async (req, res) => {
  const user = await records.getUser(req.params.id);

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
}));



// send a post request to signup a user
users.post('/signup', asyncHandler(async (req, res) => {
  if (req.body.firstName && req.body.secondName && req.body.userName && req.body.email && req.body.phoneNumber && req.body.password && req.body.confirmPassword) {
    if (req.body.password.length < 6 || req.body.password != req.body.confirmPassword){
      res.status(400).json({msg:'Password should be longer than 6'})
    }else if (isNaN(req.body.phoneNumber) || req.body.phoneNumber.length !=10) {
      res.status(400).json({msg:'Phone number should be a digit'})
    }else if (req.body.email.indexOf('@') == -1 || req.body.email.indexOf('.') == -1) {
      res.status(400).json({msg:'invalid email'})
    }else if (!isNaN(req.body.firstName) || !isNaN(req.body.secondName) || !isNaN(req.body.userName)) {
      res.status(400).json({msg:"username, firstName and secondName should be a string"})
    }
      const user = await records.createUser({
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        userName: req.body.userName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
      });
      res.status(201).json({
        status:"201",
        message:"User created succesfully",
        data:user
      });


  } else {
    res.status(400).json({
      status:"400",
       message: 'Please fill all the required fields.'
     });
  }
}));

// send a post request to signin a user
users.post('/login', asyncHandler(async (req, res) => {
  if (req.body.email && req.body.password) {
    const users = await records.getUsers();

    for (let i = 0; i < users.length; i++) {
      if (users[i].email === req.body.email && users[i].password === req.body.password) {
        res.status(201).json({
          status:"201",
          message: 'user Succesfully logged in',
        });
      }
    }
    res.status(400).json({
      status:"400",
      message: 'Incorrect details',
    });
  } else {
    res.status(400).json({
      status: "400",
       message: 'password and email required.'
  });
  }
}));

// send a put request to update a user
users.put('/:id', asyncHandler(async (req, res) => {
  const user = await records.getUser(req.params.id);
  if (user) {
    user.firstName = req.body.firstName,
    user.secondName = req.body.secondName,
    user.userName = req.body.userName,
    user.email = req.body.email,
    user.phoneNumber = req.body.phoneNumber,
    user.password = req.body.password,
    user.confirmPassword = req.body.confirmPassword

    await records.updateUser(user);

    res.status(204).end();
  } else {
    res.status(404).json({
      status:"404",
       message: "user wasn't found"
     });
  }
}));

// send a delete request to delete a user
users.delete('/:id', asyncHandler(async (req, res) => {
  const user = await records.getUser(req.params.id);

  if (user) {
    await records.deleteUser(user);
    res.status(204).end();
  } else {
    res.status(404).json({
      status:"404",
       message: "User wasn't found"
     });
  }
}));


module.exports = users;
