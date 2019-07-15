/* eslint-disable no-undef */
/* eslint-disable semi */
/* eslint-disable camelcase */
import db from '../models/query'
import format from 'pg-format';
import validator from '../helpers/valid'

async function postPropertiesController (res, inputs) {
  // const properties = await records.getProperties()
  // const property_name = properties.find(property => property.name === inputs.name)
  // const property_reason = properties.find(property => property.reason === inputs.reason)
  // const property_price = properties.find(property => property.price === inputs.price)
  // const property_state = properties.find(property => property.state === inputs.state)
  // const property_city = properties.find(property => property.city === inputs.city)
  // const property_address = properties.find(property => property.address === inputs.address)
  // const property_map = properties.find(property => property.map === inputs.map)
  // const property_description = properties.find(property => property.description === inputs.description)
  // const property_url = properties.find(property => property.url === inputs.url)
  // const property_owner = properties.find(property => property.owner === inputs.owner)
  if (!inputs.name ||
      !inputs.reason ||
      !inputs.price ||
      !inputs.state ||
      !inputs.city ||
      !inputs.address ||
      !inputs.map ||
      !inputs.description ||
      !inputs.url
  ) {
    return res.status(400).json({
      status: '400',
      Error: 'Please fill all the required inputs.'
    })
  } 
  // else if (property_name && property_reason && property_price && property_state &&
  //    property_city && property_address && property_map &&
  //    property_description && property_url && property_owner) {
  //   return res.status(400).json({
  //     status: '400',
  //     Error: 'It seems a similar property exist'
  //   })
  // }
   else if (!validator.propertyValidator(res, inputs)) {
    const propertyQuery = format(`INSERT INTO  properties(category,
      name,reason, price, state, city, address, map, description,url)
      VALUES('%s', '%s', '%s','%s', '%s', '%s','%s','%s','%s','%s')`,
    inputs.category,
    inputs.name,
    inputs.reason,
    inputs.price,
    inputs.state,
    inputs.city,
    inputs.address,
    inputs.map,
    inputs.description,
    inputs.url);
    db.query(propertyQuery, function (err, result) {
      if (err) {
        console.log(err)
      }
      res.status(201).json({
        status: '201',
        message: 'Property created Succesfully'
      })
    })
  }
}
async function getPropertiesController (res, req) {
  const propertiesQuery = format(`SELECT * from properties`)
  db.query(propertiesQuery, function (err, result) {
    if (err) {
      console.log(err)
    }
    res.status(200).json({
      status: '200',
      message: 'properties retrieved succesfully',
      data: result.rows
    })
  });
}
async function getPropertyController (res, id) {
  const propertyQuery = format(`SELECT * from properties WHERE id='%s'`, id)
  db.query(propertyQuery, function (err, result) {
    if (err) {
      console.log(err)
    }
    res.status(200).json({
      status: '200',
      message: 'properties retrieved succesfully',
      data: result.rows
    })
  })
}

async function getPropertyTypeController (res, category) {
  const properties = await records.getProperties()
  const property = properties.find(property => property.category == category)

  if (property) {
    const property = await records.getPropertyType(category)
    res.status(200).json({
      status: '200',
      message: 'succesfully retrieved property type',
      data: property
    })
  } else {
    res.status(404).json({
      status: '404',
      Error: 'Property type not found'
    })
  }
}

async function updatePropertyController (res, inputs, id) {
  inputs.id = id
  const property = await records.getProperty(id)
  Object.assign(property, inputs)
  if (property && !validator.propertyValidator(res, property)) {
    await records.updateProperty(res, property)
    return res.status(201).json({ message: 'Property updated successfully' })
  } else {
    return res.status(404).json({
      status: '404',
      Error: 'Property not found'
    })
  }
};

// send a delete request to delete a property
async function deletePropertyController (res, id) {
  const property = await records.getProperty(id)
  if (property) {
    await records.deleteProperty(property)
    return res.status(201).json({ message: 'Property deleted succesfully' })
  } else {
    res.status(404).json({
      status: '404',
      Error: 'Property not found'
    })
  }
}

module.exports = {
  getPropertiesController,
  postPropertiesController,
  getPropertyController,
  getPropertyTypeController,
  updatePropertyController,
  deletePropertyController
}
