import db from '../models/query'
import format from 'pg-format';
import validator from '../helpers/propertyValidator';
import vaalidator from '../helpers/flagValidator';



const postPropertiesController = async(res, inputs) => {
  if (!inputs.type || !inputs.price ||
      !inputs.state || !inputs.city || !inputs.address ||!inputs.imageurl) {
    return res.status(400).json({
      status: '400',
      Error: 'Please fill all the required inputs.'
    })
  }
 if (!validator.propertyValidator(res, inputs)) {
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
     


}
}
const postFlagController = async(res, inputs,id, owner) => {
  try{
    if (!inputs.reason || !inputs.description || !inputs.mappoints) {
      return res.status(400).json({
        status: '400',
        Error: 'Please fill all the required inputs.'
      })
    }
     if (!vaalidator.flagValidator(res, inputs, id)) {

      const thisFlag = `select * from flags where propertyid = '${id}'`
      const flagQuery = `INSERT INTO  flags(reason, description, mappoints, propertyid)
      VALUES('${inputs.reason}','${inputs.description}', '${inputs.mappoints}', '${id}')`;
      db.query(thisFlag, (err, result) => {
        if(result === undefined || result.rows.length === 0){
          return res.status(404).json({
            status: 404,
            message: 'Property not found'
          })
        }if (result.rows[0].owner === owner){
          db.query(flagQuery,()=>{
            return res.status(201).json({
              status: 201,
              message: 'flag created Succesfully',
              data:result.rows[0]
            })
          })
        }else{
          res.status(401).json({
            status:401,
            Error: "Unauthorized"
          })
        }
      })
  }}catch(err){
    return res.status(500).json({
      status:500,
      Error: err
    })
  }
}
const getPropertiesController = async(res, req) => {
  try{
    const propertiesQuery = `SELECT * from properties  where status='available'`
    db.query(propertiesQuery, (err, result) => {
      if(result.rows.length === 0){
        return res.status(404).json({
          status: 404,
          Error:"Property not found"
        })
      }
      res.status(200).json({
        status: 200,
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
        return res.status(404).json({
          status:404,
          Error: "Property not found"
        })
      }
      if (result.rows[0].status === 'sold'){
        return res.status(400).json({
          status:400,
          Error: "Ooops!! the property has been sold."
        })
      }
       return res.status(200).json({
          status: 200,
          message: 'properties retrieved succesfully',
          data:result.rows[0]
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

const updatePropertyController = async(res, inputs, id, owner) => {
    const confirmIfFoundProperty = `select * from properties where id = '${id}'`
    if(isNaN(id)){
      return res.status(405).json({
        status: 405,
        Error: "Method not allowed"
      })
    }
  db.query(confirmIfFoundProperty, (err, result) => {
    console.log(result.rows[0])
          if(result === undefined || result.rows === 0 ){
            return res.status(404).json({
              status: 404,
              Error: 'Property not found'
            })
          }
          if(result.rows[0].owner === owner){
            console.log(result.rows[0])
            Object.keys(inputs).forEach((key) => {
              const updateProperty = `UPDATE properties SET ${key} = '${inputs[key]}' where id = '${id}'`
              db.query(updateProperty)
            });
            const confirmIfFound = `select * from properties where id = '${id}'`
            db.query(confirmIfFound, (err, resut) => {
              return res.status(201).json({
                status: 201,
                message: 'Property successfully updated',
                data: resut.rows[0]
              })
            })
                
          }else{
            res.status(401).json({
              status:401,
              Error: "Unauthorized"
            })
          }
        })
 
};

const  deletePropertyController = async(res, id, owner) => {
  try{
    const deletePropertyQuery = `DELETE FROM properties WHERE id='${id}'`
    const thisUser = `select * from properties where id= '${id}'`
    db.query(thisUser, (err, result) => {
      if(result === undefined || result.rows.length === 0){
        return res.status(401).json({
          status: 400,
          Error: 'Property not found'
        })
      }
      if(result.rows[0].owner === owner){
        db.query(deletePropertyQuery, (err, result) => {
          return res.status(201).json({
            status: '201',
            message: 'properties deleted succesfully'
          })
        })
      }else{
        res.status(401).json({
          status:401,
          Error: "Unauthorized"
        })
      }
    })
    
  }catch(err){
    return res.status(500).json({
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