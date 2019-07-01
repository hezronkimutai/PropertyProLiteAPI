

const records = require('../models');


 async function postPropertiesController(inputs,res,req) {
  if (inputs.length !=10) {
    res.status(400).json({
      status:"400",
      message: 'password, username and image required.'
    });
  }
    if (!isNaN(inputs[0]) || !isNaN(inputs[1]) || !isNaN(inputs[4]) || !isNaN(inputs[5]) || !isNaN(inputs[2]) || !isNaN(inputs[8])) {
      res.status(400).json({msg:"Make sure name reason, category city, state and description are strings"})
    }
    if(inputs[7].indexOf(',') == -1){
      res.status(400).json({
        status:400,
        message:"Make sure that the you provide a valid map cordinates"
      })
    }

    if (isNaN(inputs[7].split(",")[0]) || isNaN(inputs[7].split(",")[1])){
      res.status(400).json({
        status:400,
        message:"Make sure that the you provide a valid map cordinates"
      })
    }
    const property = await records.createProperty({
      category: inputs[0],
      name: inputs[1],
      reason: inputs[2],
      price: inputs[3],
      state: inputs[4],
      city: inputs[5],
      address: inputs[6],
      map: inputs[7],
      description: inputs[8],
      url:inputs[9]
    });
    res.status(201).json({
      status:"201",
      message:"Property created succesfully",
      data:property
    });

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


async function getPropertyController (req, res, id) {
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

async function getPropertyTypeController(req, res,type) {
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

async function  updatePropertyController(req, res, inputs, id){
  const property = await records.getProperty(id);
  if (property) {
    property.category = inputs[0],
    property.name = inputs[1],
    property.reason = inputs[2],
    property.price = inputs[3],
    property.state = inputs[4],
    property.city = inputs[5],
    property.address = inputs[6],
    property.map = inputs[7],
    property.description = inputs[8]

    await records.updateProperty(property);

    res.status(204).end();
  } else {
    res.status(404).json({
      status:"404",
      message: 'Property not found'
  });
  }
};

// send a delete request to delete a property
 async function deletePropertyController (req, res, id){
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
