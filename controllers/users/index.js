const express = require('express');
 const users = express.Router();
const records = require('../../models');

function asyncHandler(cb){
  return async (req, res, next)=>{
    try {
      await cb(req,res, next);
    } catch(err){
      next(err);
    }
  };
}

// /users
users.get('/', asyncHandler(async(req, res)=>{
  const users = await records.getUsers()
    if(users){
      res.json(users)
    }
    else{
      res.status(400).json({message:"No users found"})
    }

}));

//send a post request to signup a user
users.post('/signup', asyncHandler(async(req, res)=>{
  if(req.body.username && req.body.password){
    const user = await records.createUser({
      username: req.body.username,
      password: req.body.password
    });
    res.status(201).json(user);
  }else{
    res.status(400).json({message: "password and Username required."});
  }
}));

//send a post request to signin a user
users.post('/login', asyncHandler(async(req, res)=>{
  if(req.body.username && req.body.password){

    const users = await records.getUsers()
    console.log(users)

    for (var i = 0; i < users.length; i++) {
      console.log(req.body.username +"==="+users[i].username)
      if(users[i].username === req.body.username && users[i].password === req.body.password){
        res.status(201).json({
          msg:"User logged in"
        });
      }
    }
  res.status(201).json({
    msg:"Incorrect details"
  });



  }else{
    res.status(400).json({message: "password and Username required."});
  }
}));

module.exports = users;
