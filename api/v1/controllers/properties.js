import records from '../models';
import {validator} from '../helpers/valid';

async function postPropertiesController(res,inputs) {
    if(validator(res, inputs) == true){
      const property = await records.createProperty(inputs);
      res.status(201).json({
        status:"201",
        message:"Property created succesfully",
        data:property
      });
    }
}
async function getPropertiesController(res,req){
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
}


async function getPropertyController (res, id) {
  const property = await records.getProperty(id);

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
}

async function getPropertyTypeController(res,type) {
  const property = await records.getPropertyType(type);

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
}

async function  updatePropertyController(res, inputs, id){
if(validator(res, inputs)){
  let property = await records.getProperty(id);
  if (property) {
    property = inputs

    await records.updateProperty(property);

    res.status(204).end();
  } else {
    res.status(404).json({
      status:"404",
      message: 'Property not found'
  });
  }
}
};

// send a delete request to delete a property
 async function deletePropertyController (res, id){
  const property = await records.getProperty(id);
  if (property) {
    await records.deleteProperty(property);
    res.status(204).end();
  } else {
    res.status(404).json({
      status:"404",
      message: 'Property not found'
  });
  }
}


module.exports={
  getPropertiesController,
  postPropertiesController,
  getPropertyController,
  getPropertyTypeController,
  updatePropertyController,
  deletePropertyController
};
