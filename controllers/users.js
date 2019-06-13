const express = require('express');
 const router = express.Router();
const records = require('../models/users');

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
router.get('/users', asyncHandler(async(req, res)=>{

    const users = await records.getUsers();
    if(users){
      res.json(users)
    }
    else{
      res.status(400).json({message:"No users found"})
    }

}));

//send a post request to signup a user
router.post('/users', asyncHandler(async(req, res)=>{
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
router.post('/users/login', asyncHandler(async(req, res)=>{
  if(req.body.username && req.body.password){

    const users = await records.getUsers();

    for (var i = 0; i < users.records.length; i++) {
      console.log(req.body.username +"==="+users.records[i].username)
      if(users.records[i].username === req.body.username && users.records[i].password === req.body.password){
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

module.exports = router;
