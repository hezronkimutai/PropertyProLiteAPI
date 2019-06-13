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

module.exports = router;
