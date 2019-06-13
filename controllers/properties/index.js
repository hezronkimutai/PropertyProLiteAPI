const express = require('express');
 const properties = express.Router();
const records = require('../../models/users');

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
properties.get('/', asyncHandler(async(req, res)=>{

    const data = await records.getUsers();
    const properties = data.properties
    console.log(properties)
    if(properties){
      res.json(properties)
    }
    else{
      res.status(400).json({message:"No users found"})
    }

}));

module.exports = properties;
