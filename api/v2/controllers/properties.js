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
      name,reason, price, state, city, address, map, description,url,sold, owner)
      VALUES('${inputs.category}', '${inputs.name}', '${inputs.reason}','${inputs.price}',
         '${inputs.state}', '${inputs.city}','${inputs.address}','${inputs.map}',
         '${inputs.description}','${inputs.url}',false, '${inputs.owner}')`;
    try{
      db.query(propertyQuery, function (err, result) {
        if (err) {
          console.log(err,result)
        }
        res.status(201).json({
          status: '201',
          message: 'Property created Succesfully',
          data:inputs
        })
      })
    }catch(err){
      console.log("---------------------",err)
    }
    
  }
}
const getPropertiesController = async(res, req) => {
  const propertiesQuery = `SELECT * from properties`
  db.query(propertiesQuery, function (err, result) {
    if (err) { console.log(err) }
      if(err){console.log(err)}
      res.status(200).json({
        status: '200',
        message: 'properties retrieved succesfully',
        data:result.rows
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
        data:result.rows
      })
  });
}

const getPropertyTypeController = async(res, category) => {
  const propertyQuery = `SELECT * from properties WHERE category ='${category}'`
  db.query(propertyQuery, function (err, result) {
    if (err) { console.log(err) }
    res.status(200).json({
      status: '200',
      message: `properties of type ${category} retrieved succesfully`,
      data: result.rows
    })
  })
}

const updatePropertyController = async(res, inputs, id) => {
  const property = `select * from properties where id = '${id}'`
  Object.keys(inputs).forEach(function (key) {
    const updateProperty = `UPDATE properties SET ${key} = '${inputs[key]}' where id = '${id}'`
    db.query(updateProperty, function (err, result) {
      if (err) { console.log(err) }
      
    })
  });
  db.query(property, function (err, result) {
    if (err) { console.log(err) }
    res.status(201).json({
      status: '201',
      message: 'Property success fully updated',
      data:result.rows
    })
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
