import express from 'express';
const cloudinary = express.Router();
import multer from 'multer';
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    console.log(file)
    cb(null, file.originalname)
  }
})

cloudinary.post('/cloudinary', (req, res, next) => {
  const upload = multer({ storage }).single('url')
  upload(req, res, function(err) {
    if (err) {
      return res.send(err)
    }

    const cloudinary = require('cloudinary').v2
    cloudinary.config({
      cloud_name: 'hezzie',
      api_key: '769876422482872',
      api_secret: '6ZiDc1RURL4Pua1R4wSqDDOKL9I'
    })

    const path = req.file.path
    const propertyliteurl = new Date().toISOString()

    cloudinary.uploader.upload(
      path,
      { public_id: `property/${propertyliteurl}`, tags: `property` },
      function(err, image) {
        if (err) return res.send(err)
        const fs = require('fs')
        fs.unlinkSync(path)
        res.json(image)
      }
    )
  })
})

module.exports = cloudinary;
