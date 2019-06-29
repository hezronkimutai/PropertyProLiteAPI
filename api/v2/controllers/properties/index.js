const express = require('express');
const pg = require('pg')
const properties = express.Router();
const PGUSER = 'postgres'
const PGDATABASE = 'ppl'
const url = require('url')
const format = require('pg-format')
const env = process.env.NODE_ENV
if (env !== 'production') {
  require('dotenv').config();
}

const databaseUrl = env === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;
const params = url.parse(databaseUrl);
const pool = new pg.Pool({connectionString:databaseUrl})

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

const ctp =`CREATE TABLE IF NOT EXISTS properties(
                                                id serial PRIMARY KEY,
                                                category varchar,
                                                name varchar,
                                                reason varchar,
                                                price varchar,
                                                state varchar,
                                                city varchar,
                                                address varchar,
                                                map varchar,
                                                description varchar,
                                                url varchar
                                                )`;
const dtp = `DROP TABLE IF EXISTS properties`;
pool.connect(function (err, client, done) {
    const myClient = client
  if (err) {console.log(err)}
  if (env === 'test') {
    myClient.query(dtp);
    myClient.query(ctp);
  }else{
    myClient.query(ctp);
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
          myClient.query(propertyQuery, function (err, result) {
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
          myClient.query(updatePropertyQuery, function (err, result) {
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
  myClient.query(propertiesQuery, function (err, result) {
    if (err) {
      console.log(err)
    }
    console.log("========++++++++++++++++++++=========",result.rows)
    res.status(200).json({
      status:"200",
      message:"properties retrieved succesfully",
      data:result.rows
    })
  })
}));

properties.delete('/:id', asyncHandler(async (req, res) => {
  const deletePropertyQuery = format(`DELETE FROM properties WHERE id='%s'`,req.params.id)
  myClient.query(deletePropertyQuery, function (err, result) {
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
  myClient.query(propertyQuery, function (err, result) {
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

});


module.exports = properties;
