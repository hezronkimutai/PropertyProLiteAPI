import db from '../models/query'
import Validator from '../helpers/Validator';
import Schema from '../models/schemas';



const postPropertiesController = async(req, res) => {
 let validator = new Validator(req, res)
 if (!req.body.type
  || !req.body.price
  || !req.body.state
  || !req.body.city
  || !req.body.address
  || !req.body.imageurl) {
return res.status(400).json({ status: '400', Error: 'Please fill all the required req.body.' });
}
 if (!validator.Property()) {
    const propertyQuery = `INSERT INTO  properties(owner,
      price, state, city, address, type, imageurl)
      VALUES('${req.body.owner}', '${req.body.price}', '${req.body.state}',
       '${req.body.city}', '${req.body.address}', '${req.body.type}', '${req.body.imageurl}')`;
  
      db.query(propertyQuery, (err, result) => {
        if(err){
          console.log(err)
        }
        res.status(201).json({
          status: '201',
          message: 'Property created Succesfully',
          data:req.body
        })
      })
     


}
}
const postFlagController = async(res, req, owner) => {
  let validator = new Validator(req, res)
  try{
    if (!req.body.reason || !req.body.description || !req.body.mappoints) {
      return res.status(400).json({
        status: '400',
        Error: 'Please fill all the required req.body.'
      })
    }
     if (!validator.Flag()) {
      const thisFlag = `select * from properties where id = '${req.params.id}'`
      const flagQuery = `INSERT INTO  flags(reason, description, mappoints, propertyid)
      VALUES('${req.body.reason}','${req.body.description}', '${req.body.mappoints}', '${req.params.id}')`;
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
        return res.status(404).json({
          status:404,
          Error: "Property not found"
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

const updatePropertyController = async(req, res, owner) => {
  let schema = new Schema(req, res ,owner, "properties")
    try{
      if(isNaN(req.params.id)){
        return res.status(405).json({
          status: 405,
          Error: "Method not allowed"
        })
      }
      schema.update()    
    }catch(err){
      return res.status(500).json({
        status:500,
        Error: err
      })
    }
  }

const  deletePropertyController = async(req, res, owner) => {
  let schema = new Schema(req, res ,owner, "properties")
  try{
    schema.delete()    
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