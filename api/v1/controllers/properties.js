import records from '../models';
import validator from '../helpers/valid';

async function postPropertiesController(res,inputs) {
  const properties = await records.getProperties();
  let property_name = properties.find(property => property.name === inputs.name)
  let property_reason = properties.find(property => property.reason === inputs.reason)
  let property_price = properties.find(property => property.price === inputs.price)
  let property_state = properties.find(property => property.state === inputs.state)
  let property_city = properties.find(property => property.city === inputs.city)
  let property_address = properties.find(property => property.address === inputs.address)
  let property_map = properties.find(property => property.map === inputs.map)
  let property_description = properties.find(property => property.description === inputs.description)
  let property_url = properties.find(property => property.url === inputs.url)
  let property_owner = properties.find(property => property.owner === inputs.owner)
  if (!inputs.name ||
      !inputs.reason ||
      !inputs.price ||
      !inputs.state ||
       !inputs.city ||
       !inputs.address ||
       !inputs.map ||
       !inputs.description ||
       !inputs.url ){
return res.status(400).json({
 status:"400",
 Error: "Please fill all the required inputs."
})
}else if(  property_name &&  property_reason  && property_price && property_state &&
     property_city && property_address && property_map  &&
     property_description &&  property_url && property_owner ){
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
    res.status(404).json({
      status:"404",
      Error: 'Property not found'
  });
  }
}

async function getPropertyTypeController(res,category) {
  let properties = await records.getProperties();
  let property = properties.find(property => property.category == category)

  if (property) {
      let property = await records.getPropertyType(category);
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
  Object.assign(property, inputs);
  if (property && !validator.propertyValidator(res, property)) {
      await records.updateProperty(res, property);
      return res.status(201).json({message:"Property updated successfully"});
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
    return res.status(201).json({message:"Property deleted succesfully"});
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
