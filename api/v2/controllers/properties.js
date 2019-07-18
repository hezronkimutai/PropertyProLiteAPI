import db from '../models/query'
import format from 'pg-format';
import validator from '../helpers/propertyValidator';
import vaalidator from '../helpers/flagValidator';
const postPropertiesController = async(res, inputs) => {
  try{
  if (!inputs.price || !inputs.price ||
      !inputs.state || !inputs.city || !inputs.address ||!inputs.imageurl) {
    return res.status(400).json({
      status: '400',
      Error: 'Please fill all the required inputs.'
    })
  }
  else if(!validator.propertyValidator(res, inputs)) {
      const propertyQuery = `INSERT INTO  properties(owner,
        price, state, city, address, type, imageurl)
        VALUES('${inputs.owner}', '${inputs.price}', '${inputs.state}',
         '${inputs.city}', '${inputs.address}', '${inputs.type}', '${inputs.imageurl}')`;
        db.query(propertyQuery, (err, result) => {
          res.status(201).json({
            status: '201',
            message: 'Property created Succesfully',
            data:result
          })
        })
    } 
  }catch(err){
    return res.status(500).json({
      status: 500,
      Error: err
    })
  }
}
const postFlagController = async(res, inputs,id) => {
  try{
    if (!inputs.reason || !inputs.description || !inputs.mappoints) {
      return res.status(400).json({
        status: '400',
        Error: 'Please fill all the required inputs.'
      })
    }
    else if (!vaalidator.flagValidator(res, inputs, id)) {
      const flagQuery = `INSERT INTO  flags(reason, description, mappoints, propertyid)
      VALUES('${inputs.reason}','${inputs.description}', '${inputs.mappoints}', '${id}')`;
        db.query(flagQuery, (err, result) => {
          if(err) {
            console.log(err)
          }
          res.status(201).json({
            status: 201,
            message: 'flag created Succesfully',
            data:result.rows
          })
        })
    }
  }catch(err){
    return res.status(500).json({
      status:500,
      Error: err
    })
  }
}
const getPropertiesController = async(res, req) => {
  try{
    const propertiesQuery = format(`SELECT * from properties`)
    db.query(propertiesQuery, (err, result) => {
      res.status(200).json({
        status: '200',
        message: 'properties retrieved succesfully',
        data: result.rows
      })
    });
  }catch(err){
    return res.status(500).json({
      status:500,
      Error:err
    })
  }
}
const getPropertyController = async(res, id) => {
  try{
    const propertyQuery = `SELECT * from properties WHERE id='${id}'`
    db.query(propertyQuery, (err, result) => {
      if(isNaN(id)){
        return res.status(405).json({
          status: 405,
          Error: "Invalid property"
        })
      }
      if(result === undefined || result.rows.length === 0 ){
        return res.status(405).json({
          status:405,
          Error: "Property not found"
        })
      }
       return res.status(200).json({
          status: '200',
          message: 'properties retrieved succesfully',
          data:result.rows
        })
    });
  }catch(err){
    return res.status(500).json({
      status:500,
      Error:err
    })
  }
}
const getPropertyTypeController = async(res, type) => {
  try{
    const propertyQuery = `SELECT * from properties WHERE type ='${type}'`
    db.query(propertyQuery, (err, result) => {
      if(result === undefined || result.rows.length === 0 ){
        return res.status(400).json({
          status:400,
          Error: "Property not found"
        })
      }
      if (err) {
        res.status(500).json({
          status:"500",
          Error: "Internal server error"
        })
      }
      res.status(200).json({
        status: '200',
        message: `properties of type ${type} retrieved succesfully`,
        data: result.rows
      })
    })
  }catch(err){
    return res.status(500).json({
      status:500,
      Error:err
    })
  } 
}

const updatePropertyController = async(res, inputs, id) => {
  try{
    if(isNaN(id)){
      return res.status(405).json({
        status: 405,
        Error: "Invalid property"
      })
    }
    const confirmProperty = `select * from properties where id = '${id}'`
    db.query(confirmProperty, (err, result) => {
      if(result === undefined || result.rows === 0 ){
        res.status(404).json({
          status: 404,
          Error: 'Property not found'
        })
      }
    })
    Object.keys(inputs).forEach((key) => {
      const updateProperty = `UPDATE properties SET ${key} = '${inputs[key]}' where id = '${id}'`
      db.query(updateProperty)
    });
    db.query(confirmProperty, (err, result) => {
      if(result !== undefined || result.rows !== 0){
        return res.status(201).json({
          status: '201',
          message: 'Property successfully updated',
          data: result.rows[0]
        })
      }
    }) 
  }catch(err){
    return res.status(500).json({
      status:500,
      Error:err
    })
  }
};

const  deletePropertyController = async(res, id) => {
  try{
    const deletePropertyQuery = `DELETE FROM properties WHERE id='${id}'`
    db.query(deletePropertyQuery, (err, result) => {
      res.status(201).json({
        status: '201',
        message: 'properties deleted succesfully'
      })
    })
  }catch(err){
    res.status(500).json({
      status:500,
      Error: err
    })
  }
}

export default {
  getPropertiesController,
  postPropertiesController,
  getPropertyController,
  getPropertyTypeController,
  updatePropertyController,
  deletePropertyController,
  postFlagController
}