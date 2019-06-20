
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
    console.log(file)
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
    const cloudinary = require('cloudinary').v2
    cloudinary.config({
      cloud_name: 'hezzie',
      api_key: '769876422482872',
      api_secret: '6ZiDc1RURL4Pua1R4wSqDDOKL9I'
    })

    const path = req.file.path
    const uniqueFilename = new Date().toISOString()

    cloudinary.uploader.upload(
      path,
      { public_id: `PropertyProLiteAPI/${uniqueFilename}`, tags: `PropertyProLiteAPI` },
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
                                                          category VARCHAR NOT NULL,
                                                          name VARCHAR NOT NULL,
                                                          reason VARCHAR NOT NULL,
                                                          price VARCHAR NOT NULL,
                                                          state VARCHAR NOT NULL,
                                                          city VARCHAR NOT NULL,
                                                          address VARCHAR NOT NULL,
                                                          map VARCHAR NOT NULL,
                                                          description VARCHAR NOT NULL,
                                                          url VARCHAR NOT NULL
                                                          )`;
          myClient.query(createTable)
          myClient.query(propertyQuery, function (err, result) {
            if (err) {
              console.log(err)
            }
            res.status(201).json({
              message:"user created Succesfully",
              data:myClient.query(`SELECT * from properties`)
            })
          })

        } else {
          res.status(400).json({ message: 'All the fields must be filled.' });
        }
      }
    )
  })
}));

// /Get request to get all users
properties.get('/', asyncHandler(async (req, res) => {
  const myClient = client
  const propertiesQuery = format('SELECT * from properties')
  myClient.query(propertiesQuery, function (err, result) {
    if (err) {
      console.log(err)
    }
    res.json(result.rows)
  })
}));
});







// // /users
// properties.get('/', asyncHandler(async (req, res) => {
//   const properties = await records.getProperties();
//   if (properties) {
//     res.json(properties);
//   } else {
//     res.status(400).json({ message: 'No properties found' });
//   }
// }));
//
// // Send a get request to retrieve a single property
// properties.get('/:id', asyncHandler(async (req, res) => {
//   const property = await records.getProperty(req.params.id);
//
//   if (property) {
//     res.json(property);
//   } else {
//     res.status(400).json({ message: 'Property not found' });
//   }
// }));
//
// // Send a get request to retrieve a single property
// properties.get('/type/:type', asyncHandler(async (req, res) => {
//   const property = await records.getPropertyType(req.params.type);
//
//   if (property) {
//     res.json(property);
//   } else {
//     res.status(400).json({ message: 'Property not found' });
//   }
// }));
//
//
// // send a post request to pst a property
// // properties.post('/post-property', asyncHandler(async (req, res) => {
// //   if (req.body.propertyName && req.body.propertyType) {
// //     const property = await records.createProperty({
// //       propertyName: req.body.propertyName,
// //       propertyType: req.body.propertyType,
// //     });
// //     res.status(201).json(property);
// //   } else {
// //     res.status(400).json({ message: 'password and Username required.' });
// //   }
// // }));
//
// // send a put request to update a property
// properties.put('/:id', asyncHandler(async (req, res) => {
//   const property = await records.getProperty(req.params.id);
//   if (property) {
//     property.category = req.body.category,
//     property.name = req.body.name,
//     property.reason = req.body.reason,
//     property.price = req.body.price,
//     property.state = req.body.state,
//     property.city = req.body.city,
//     property.address = req.body.address,
//     property.map = req.body.map,
//     property.description = req.body.description
//
//     await records.updateProperty(property);
//
//     res.status(204).end();
//   } else {
//     res.status(404).json({ message: "Property wasn't found" });
//   }
// }));
//
// // send a delete request to delete a property
// properties.delete('/:id', asyncHandler(async (req, res) => {
//   const property = await records.getProperty(req.params.id);
//   if (property) {
//     await records.deleteProperty(property);
//     res.status(204).end();
//   } else {
//     res.status(404).json({ message: "Property wasn't found" });
//   }
// }));
//

module.exports = properties;
