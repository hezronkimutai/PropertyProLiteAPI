const express = require('express');

const properties = express.Router();
const records = require('../../models');

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
          const property = await records.createProperty({
            category: req.body.category,
            name: req.body.name,
            reason: req.body.reason,
            price: req.body.price,
            state: req.body.state,
            city: req.body.city,
            address: req.body.address,
            map: req.body.map,
            description: req.body.description,
            url:image.secure_url
          });
          res.status(201).json(property);
        } else {
          res.status(400).json({ message: 'password, username and image required.' });
        }
      }
    )
  })
}));


function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}



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
