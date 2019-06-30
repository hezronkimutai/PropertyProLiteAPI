
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import moment from 'moment';
import db from './database/query';
import format from 'pg-format';
const properties = express.Router();

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}




properties.post('/post-property', asyncHandler(async (req, res) => {

        if (req.body.category && req.body.name &&
           req.body.reason && req.body.price &&
           req.body.state && req.body.city &&
           req.body.address && req.body.map &&
          req.body.description && req.body.url) {
            if (!isNaN(req.body.category) || !isNaN(req.body.name) || !isNaN(req.body.state) || !isNaN(req.body.city) || !isNaN(req.body.reason) || !isNaN(req.body.description)) {
              res.status(400).json({msg:"Make sure name reason, category city, state and description are strings"})
            }
            if(req.body.map.indexOf(',') == -1){
              res.status(400).json({
                status:400,
                message:"Make sure that the you provide a valid map cordinates"
              })
            }
            if (isNaN(req.body.map.split(",")[0]) || isNaN(req.body.map.split(",")[1])){
              res.status(400).json({
                status:400,
                message:"Make sure that the you provide a valid map cordinates"
              })
            }
          const propertyQuery = format(`INSERT INTO  properties(category,
                                  name,reason, price, state, city, address, map, description,url)
                                  VALUES('%s', '%s', '%s','%s', '%s', '%s','%s','%s','%s','%s')`,
                                  req.body.category,
                                  req.body.name,
                                  req.body.reason,
                                  req.body.price,
                                  req.body.state,
                                  req.body.city,
                                  req.body.address,
                                  req.body.map,
                                  req.body.description,
                                  req.body.url);
          db.query(propertyQuery, function (err, result) {
            if (err) {
              console.log(err)
            }
            res.status(201).json({
              status:"201",
              message:"Property created Succesfully",
            })
          })

        } else {
          res.status(400).json({
            status:"400",
            message: 'All the fields must be filled.'
         });
        }
}));

properties.put('/:id', asyncHandler(async (req, res) => {

        if (req.body.category && req.body.name &&
           req.body.reason && req.body.price &&
           req.body.state && req.body.city &&
           req.body.address && req.body.map &&
          req.body.description && req.body.url) {
            if (!isNaN(req.body.category) || !isNaN(req.body.name) || !isNaN(req.body.state) || !isNaN(req.body.city) || !isNaN(req.body.reason) || !isNaN(req.body.description)) {
              res.status(400).json({msg:"Make sure name reason, category city, state and description are strings"})
            }
            if(req.body.map.indexOf(',') == -1){
              res.status(400).json({
                status:400,
                message:"Make sure that the you provide a valid map cordinates"
              })
            }
            if (isNaN(req.body.map.split(",")[0]) || isNaN(req.body.map.split(",")[1])){
              res.status(400).json({
                status:400,
                message:"Make sure that the you provide a valid map cordinates"
              })
            }
          const updatePropertyQuery = format(`UPDATE properties SET  category = '%s',
                                  name = '%s',reason = '%s', price = '%s', state = '%s', city = '%s', address = '%s', map = '%s', description = '%s',url = '%s' WHERE id='%s'`,
                                  req.body.category,
                                  req.body.name,
                                  req.body.reason,
                                  req.body.price,
                                  req.body.state,
                                  req.body.city,
                                  req.body.address,
                                  req.body.map,
                                  req.body.description,
                                  req.body.url,
                                  req.params.id);
          db.query(updatePropertyQuery, function (err, result) {
            if (err) {
              console.log(err)
            }
            res.status(201).json({
              status:"201",
              message:"Property updated Succesfully",
            })
          })

        } else {
          res.status(400).json({
            status:"400",
            message: 'All the fields must be filled.'
         });
        }
}));

// /Get request to get all users
properties.get('/', asyncHandler(async (req, res) => {
  const propertiesQuery = format(`SELECT * from properties`)
  db.query(propertiesQuery, function (err, result) {
    if (err) {
      console.log(err)
    }
    res.status(200).json({
      status:"200",
      message:"properties retrieved succesfully",
      data:result.rows
    })
  })
}));

properties.delete('/:id', asyncHandler(async (req, res) => {
  const deletePropertyQuery = format(`DELETE FROM properties WHERE id='%s'`,req.params.id)
  db.query(deletePropertyQuery, function (err, result) {
    if (err) {
      console.log(err)
    }
    res.status(201).json({
      status:"201",
      message:"properties deleted succesfully",
    })
  })
}));

// /Get request to get a single user
properties.get('/:id', asyncHandler(async (req, res) => {
  const propertyQuery = format(`SELECT * from properties WHERE id='%s'`,req.params.id)
  db.query(propertyQuery, function (err, result) {
    if (err) {
      console.log(err)
    }
    res.status(200).json({
      status:"200",
      message:"properties retrieved succesfully",
      data:result.rows
    })
  })
}));




export default properties;
