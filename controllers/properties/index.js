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

//Send a get request to retrieve a single property
properties.get('/:id', asyncHandler(async(req, res)=>{

    const property = await  records.getProperty(req.params.id)

    if(property){

    res.json(property);}
    else {
      res.status(400).json({message:"Property not found"})
    }
  }));

  //send a post request to pst a property
  properties.post('/post-property', asyncHandler(async(req, res)=>{
    if(req.body.username && req.body.password){
      const property = await records.createProperty({
        username: req.body.username,
        password: req.body.password
      });
      res.status(201).json(property);
    }else{
      res.status(400).json({message: "password and Username required."});
    }
  }));

  //send a put request to update a property
properties.put('/:id', asyncHandler(async(req, res)=>{
    const property = await  records.getProperty(req.params.id);
      if (property){
        property.username = req.body.username;
        property.password = req.body.password;

        await records.updateProperty(property);

        res.status(204).end();
      }
      else{
        res.status(404).json({message:"Property wasn't found"});
      }


}));



module.exports = properties;
