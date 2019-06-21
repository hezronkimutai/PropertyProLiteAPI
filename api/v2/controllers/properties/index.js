
const express = require('express');
const pg = require('pg')
const properties = express.Router();
const records = require('../../models');
const format = require('pg-format')
const PGUSER = 'postgres'
const PGDATABASE = 'ppl'
const url = require('url')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}



const params = url.parse(process.env.DATABASE_URL);

const auth = params.auth.split(':');

const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: true
};

// MULTER
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

const pool = new pg.Pool(config )


pool.connect(function (err, client, done) {
  if (err) {console.log(err)}

properties.post('/post-property', asyncHandler(async (req, res) => {
  const upload = multer({ storage }).single('url')
  upload(req, res, async function(err) {
    if (err) {
      return res.send(err)
    }

    // SEND FILE TO CLOUDINARY
    // const cloudinary = require('cloudinary').v2
    // cloudinary.config({
    //   cloud_name: 'hezzie',
    //   api_key: '769876422482872',
    //   api_secret: '6ZiDc1RURL4Pua1R4wSqDDOKL9I'
    // })

    const path = req.file.path
    const uniqueFilename = new Date().toISOString()

    // cloudinary.uploader.
    cloudinary.image(path,{ public_id: `PropertyProLiteAPI/${uniqueFilename}`, tags: `PropertyProLiteAPI` },
  // )
  //   upload(
  //     path,
  //     { public_id: `PropertyProLiteAPI/${uniqueFilename}`, tags: `PropertyProLiteAPI` },
      async function(err, image) {
        if (err) return res.send(err)
        const fs = require('fs')
        fs.unlinkSync(path)
        if (req.body.category && req.body.name &&
           req.body.reason && req.body.price &&
           req.body.state && req.body.city &&
           req.body.address && req.body.map &&
          req.body.description) {
          const myClient = client
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
                                  image.secure_url);
          const createTable =`CREATE TABLE IF NOT EXISTS properties(
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
          myClient.query(createTable)
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
      }
    )
  })
}));

// /Get request to get all users
properties.get('/', asyncHandler(async (req, res) => {
  const myClient = client
  const propertiesQuery = format(`SELECT * from properties`)
  myClient.query(propertiesQuery, function (err, result) {
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

// /Get request to get a single user
properties.get('/:id', asyncHandler(async (req, res) => {
  const myClient = client
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
