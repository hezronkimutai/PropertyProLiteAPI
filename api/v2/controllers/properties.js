import db from '../models/query'
import format from 'pg-format';
import validator from '../helpers/propertyValidator'

const postPropertiesController = async(res, inputs) => {
  if (!inputs.name || !inputs.reason || !inputs.price ||
      !inputs.state || !inputs.city || !inputs.address ||
      !inputs.map || !inputs.description ||!inputs.url) {
    return res.status(400).json({
      status: '400',
      Error: 'Please fill all the required inputs.'
    })
  }

  else if (!validator.propertyValidator(res, inputs)) {
    const propertyQuery = `INSERT INTO  properties(category,
      name,reason, price, state, city, address, map, description,url,sold)
      VALUES('${inputs.category}', '${inputs.name}', '${inputs.reason}','${inputs.price}',
         '${inputs.state}', '${inputs.city}','${inputs.address}','${inputs.map}',
         '${inputs.description}','${inputs.url}',false)`;
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
const getPropertiesController = async(res, req) => {
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
const getPropertyController = async(res, id) => {
  const propertyQuery = `SELECT * from properties WHERE id='${id}'`
  db.query(propertyQuery, function (err, result) {
    if (err) { console.log(err) }
    res.status(200).json({
      status: '200',
      message: 'properties retrieved succesfully',
      data: result.rows
    })
  })
}

const getPropertyTypeController = async(res, category) => {
  const properties = await records.getProperties()
  const property = properties.find(property => property.category == category)

  if (property) {
    const property = await records.getPropertyType(category)
    res.status(200).json({
      status: '200',
      message: 'property Type retrieved succesfully',
      data: result.rows
    })
  }
}

const updatePropertyController = async(res, inputs, id) => {
  Object.keys(inputs).forEach(function (key) {
    const updateProperty = `UPDATE properties SET ${key} = '${inputs[key]}' where id = '${id}'`
    db.query(updateProperty, function (err, result) {
      if (err) { console.log(err) }
      
    })
  });
  res.status(201).json({
    status: '201',
    message: 'Profile updated the user'
  })
};

const  deletePropertyController = async(res, id) => {
  const deletePropertyQuery = `DELETE FROM properties WHERE id='${id}'`
  db.query(deletePropertyQuery, function (err, result) {
    if (err) {
      console.log(err)
    }
    res.status(201).json({
      status: '201',
      message: 'properties deleted succesfully'
    })
  })
}

export default {
  getPropertiesController,
  postPropertiesController,
  getPropertyController,
  getPropertyTypeController,
  updatePropertyController,
  deletePropertyController
}
