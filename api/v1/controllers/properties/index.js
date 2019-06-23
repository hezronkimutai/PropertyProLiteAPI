const express = require('express');
const properties = express.Router();
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

properties.post('/post-property', asyncHandler(async (req, res) => {
        if (req.body.category && req.body.name &&
           req.body.reason && req.body.price &&
           req.body.state && req.body.city &&
           req.body.address && req.body.map &&
          req.body.description && req.body.url) {
          if (!isNaN(req.body.category) || !isNaN(req.body.name) || !isNaN(req.body.state) || !isNaN(req.body.city) || !isNaN(req.body.reason) || !isNaN(req.body.description)) {
            res.status(400).json({msg:"Make sure name reason, category city, state and description are strings"})
          }
          if(req.body.map.indexOf(',') == -1){
            res.status(400).json({
              status:400,
              message:"Make sure that the you provide a valid map cordinates"
            })
          }
          console.log("+++++++++++++++++++++++++++++++++++++++++++++++++",req.body.map.split(",")[0])
          if (isNaN(req.body.map.split(",")[0]) || isNaN(req.body.map.split(",")[1])){
            res.status(400).json({
              status:400,
              message:"Make sure that the you provide a valid map cordinates"
            })
          }
          const property = await records.createProperty({
            category: req.body.category,
            name: req.body.name,
            reason: req.body.reason,
            price: req.body.price,
            state: req.body.state,
            city: req.body.city,
            address: req.body.address,
            map: req.body.map,
            description: req.body.description,
            url:req.body.url
          });
          res.status(201).json({
            status:"201",
            message:"Property created succesfully",
            data:property
          });
        } else {
          res.status(400).json({
            status:"400",
            message: 'password, username and image required.'
          });
        }
}));


// /users
properties.get('/', asyncHandler(async (req, res) => {
  const properties = await records.getProperties();
  if (properties) {
    res.status(200).json({
      status:"200",
      message:"properties succesfully retrieved",
      data:properties
    });
  } else {
    res.status(400).json({
      status:"400",
       message: 'No properties found'
     });
  }
}));


// Send a get request to retrieve a single property
properties.get('/:id', asyncHandler(async (req, res) => {
  const property = await records.getProperty(req.params.id);

  if (property) {
    res.status(200).json({
      status:"200",
      message:"succesfully fetched the property",
      data:property
    });
  } else {
    res.status(400).json({
      status:"400",
      message: 'Property not found'
  });
  }
}));

// Send a get request to retrieve a single property
properties.get('/type/:type', asyncHandler(async (req, res) => {
  const property = await records.getPropertyType(req.params.type);

  if (property) {
    res.status(200).json({
      status:"200",
      message:"succesfully retrieved property type",
      data:property
    });
  } else {
    res.status(404).json({
      status:"404",
      message: 'Property type not found'
  });
  }
}));

// send a put request to update a property
properties.put('/:id', asyncHandler(async (req, res) => {
  const property = await records.getProperty(req.params.id);
  if (property) {
    property.category = req.body.category,
    property.name = req.body.name,
    property.reason = req.body.reason,
    property.price = req.body.price,
    property.state = req.body.state,
    property.city = req.body.city,
    property.address = req.body.address,
    property.map = req.body.map,
    property.description = req.body.description

    await records.updateProperty(property);

    res.status(204).end();
  } else {
    res.status(404).json({
      status:"404",
      message: 'Property not found'
  });
  }
}));

// send a delete request to delete a property
properties.delete('/:id', asyncHandler(async (req, res) => {
  const property = await records.getProperty(req.params.id);
  if (property) {
    await records.deleteProperty(property);
    res.status(204).end();
  } else {
    res.status(404).json({
      status:"404",
      message: 'Property not found'
  });
  }
}));


module.exports = properties;
