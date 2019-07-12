import records from '../models';
import validator from '../helpers/valid';

async function postPropertiesController(res,inputs) {
    if(validator.propertyValidator(res, inputs)){
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
      data:properties.filter((item) =>{return item.sold == false})
    });
  } else {
    res.status(400).json({
      status:"400",
       Error: 'No properties found'
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
      Error: 'Property not found'
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
      Error: 'Property type not found'
  });
  }
}

async function  updatePropertyController(res, inputs, id){
if(true){
  let property = await records.getProperty(id);
  if (property) {
    Object.assign(property, inputs);
    if(validator.propertyValidator(res, property)){
      await records.updateProperty(property);
    }
    res.status(204).json({message:"Property updated successfully"});
  } else {
    res.status(404).json({
      status:"404",
      Error: 'Property not found'
  });
  }
}
};

// send a delete request to delete a property
 async function deletePropertyController (res, id){
  const property = await records.getProperty(id);
  if (property) {
    await records.deleteProperty(property);
    res.status(204).json({message:"Property deleted succesfully"});
  } else {
    res.status(404).json({
      status:"404",
      Error: 'Property not found'
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
