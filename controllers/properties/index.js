const express = require('express');
 const properties = express.Router();
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
properties.get('/', asyncHandler(async(req, res)=>{
      const properties =  await records.getProperties();
    if(properties){
      res.json(properties)
    }
    else{
      res.status(400).json({message:"No properties found"})
    }

}));

properties.get('/:id', asyncHandler(async(req, res)=>{

    const property = await  records.getProperty(req.params.id)

    if(property){
    res.json(property);}
    else {
      res.status(400).json({message:"Property not found"})
    }
  }));

  //send a post request to signup a user
  properties.post('/post-property', asyncHandler(async(req, res)=>{
    if(req.body.username && req.body.password){
      const property = await records.createProperty({
        username: req.body.username,
        password: req.body.password
      });
      console.log("======"+property);
      res.status(201).json(property);
    }else{
      res.status(400).json({message: "password and Username required."});
    }
  }));



module.exports = properties;
