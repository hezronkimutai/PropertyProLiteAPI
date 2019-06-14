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

  //Send a get request to retrieve a single property
  properties.get('/type/:type', asyncHandler(async(req, res)=>{

      const property = await  records.getPropertyType(req.params.type)

      if(property){

      res.json(property);}
      else {
        res.status(400).json({message:"Property not found"})
      }
    }));


  //send a post request to pst a property
  properties.post('/post-property', asyncHandler(async(req, res)=>{
    if(req.body.propertyName && req.body.propertyType){
      const property = await records.createProperty({
        propertyName: req.body.propertyName,
        propertyType: req.body.propertyType
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
        property.username = req.body.propertyName;
        property.password = req.body.propertyType;

        await records.updateProperty(property);

        res.status(204).end();
      }
      else{
        res.status(404).json({message:"Property wasn't found"});
      }
}));

//send a delete request to delete a property
properties.delete("/:id", asyncHandler(async(req,res) =>{

    const property = await records.getProperty(req.params.id)
    if (property){
      await records.deleteProperty(property);
      res.status(204).end();
    }
    else{
      res.status(404).json({message:"Property wasn't found"});
    }
}));


module.exports = properties;
