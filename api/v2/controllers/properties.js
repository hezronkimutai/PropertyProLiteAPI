import db from '../models/query'
import format from 'pg-format';
import validator from '../helpers/propertyValidator';
import vaalidator from '../helpers/flagValidator';

const postPropertiesController = async(res, inputs) => {
  if (!inputs.price || !inputs.price ||
      !inputs.state || !inputs.city || !inputs.address ||!inputs.imageurl) {
    return res.status(400).json({
      status: '400',
      Error: 'Please fill all the required inputs.'
    })
  }

  else if (!validator.propertyValidator(res, inputs)) {
    try{
      const propertyQuery = `INSERT INTO  properties(owner,
        price, state, city, address, type, imageurl)
        VALUES('${inputs.owner}', '${inputs.price}', '${inputs.state}',
         '${inputs.city}', '${inputs.address}', '${inputs.type}', '${inputs.imageurl}')`;
  
        db.query(propertyQuery, (err, result) => {
          if(err){
            console.log(err)
          }
          res.status(201).json({
            status: '201',
            message: 'Property created Succesfully',
            data:inputs
          })
        })
    }catch(err){
      console.log(err)
    }
    
  }
}

const postFlagController = async(res, inputs,id) => {
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
          status: '201',
          message: 'flag created Succesfully',
          data:inputs
        })
      })
  }
}
const getPropertiesController = async(res, req) => {
  const propertiesQuery = format(`SELECT * from properties`)
  db.query(propertiesQuery, (err, result) => {
    res.status(200).json({
      status: '200',
      message: 'properties retrieved succesfully',
      data: result.rows
    })
  });
}
const getPropertyController = async(res, id) => {
  const propertyQuery = `SELECT * from properties WHERE id='${id}'`
  db.query(propertyQuery, (err, result) => {
    if (err) {
      res.status(500).json({
        status:"500",
        Error: "Internal server error"
      })
    }
      res.status(200).json({
        status: '200',
        message: 'properties retrieved succesfully',
        data:result.rows
      })
  });
}

const getPropertyTypeController = async(res, type) => {
  const propertyQuery = `SELECT * from properties WHERE type ='${type}'`
  db.query(propertyQuery, (err, result) => {
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
}

const updatePropertyController = async(res, inputs, id) => {
  const property = `select * from properties where id = '${id}'`
  Object.keys(inputs).forEach((key) => {
    const updateProperty = `UPDATE properties SET ${key} = '${inputs[key]}' where id = '${id}'`
    db.query(updateProperty, (err, result) => {
      if (err) {
        res.status(500).json({
          status:"500",
          Error: "Internal server error"
        })
      }
      
    })
  });
  db.query(property, (err, result) => {
    if (err) {
      res.status(500).json({
        status:"500",
        Error: "Internal server error"
      })
    }
    res.status(201).json({
      status: '201',
      message: 'Property success fully updated',
      data:result.rows
    })
  })
};

const  deletePropertyController = async(res, id) => {
  const deletePropertyQuery = `DELETE FROM properties WHERE id='${id}'`
  db.query(deletePropertyQuery, (err, result) => {
    if (err) {
      res.status(500).json({
        status:"500",
        Error: "Internal server error"
      })
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
  deletePropertyController,
  postFlagController
}
