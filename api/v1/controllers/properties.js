import records from '../models';
import validator from '../helpers/valid';

async function postPropertiesController(res,inputs) {
  const properties = await records.getProperties();
  let property = properties.find(property => property.name === inputs.name)
  let property_ = properties.find(property => property.reason === inputs.reason)
  let property__ = properties.find(property => property.price === inputs.price)
  let property___ = properties.find(property => property.state === inputs.state)
  let property____ = properties.find(property => property.city === inputs.city)
  let property_____ = properties.find(property => property.address === inputs.address)
  let property______ = properties.find(property => property.map === inputs.map)
  let property_______ = properties.find(property => property.description === inputs.description)
  let property________ = properties.find(property => property.url === inputs.url)
  let property_________ = properties.find(property => property.owner === inputs.owner)
  if (Object.keys(inputs).length != 11){
return res.status(400).json({
 status:"400",
 Error: "Please fill all the required inputs."
})
}else if(  property &&  property_  && property__ && property___ &&
     property____ && property_____ && property______  &&
     property_______ &&  property________ && property_________ ){
       return res.status(400).json({
         status:"400",
         Error: "It seems a similar property exist"
       })
     }else if(!validator.propertyValidator(res, inputs)){
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

async function getPropertyTypeController(res,category) {
  const property = await records.getPropertyType(category);

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
  inputs.id = id;
  let property = await records.getProperty(id);
  if (property && !validator.propertyValidator(res, property)) {
      await records.updateProperty(res, property);
      return res.status(204).json({message:"Property updated successfully"});
  } else {
    return res.status(404).json({
      status:"404",
      Error: 'Property not found'
  });
  }
};

// send a delete request to delete a property
 async function deletePropertyController (res, id){
  const property = await records.getProperty(id);
  if (property) {
    await records.deleteProperty(property);
    return res.status(204).json({message:"Property deleted succesfully"});
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
