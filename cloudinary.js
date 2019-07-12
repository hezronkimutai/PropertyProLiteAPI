
app.post('/post-property', (req, res, next) => {
  const upload = multer({ storage }).single('url')
  upload(req, res, function(err) {
    if (err) {
      return res.send(err)
    }

    const cloudinary = require('cloudinary').v2
    cloudinary.config({
      cloud_name: 'hezzie',
      api_key: '769876422482872',
      api_secret: '769876422482872'
    })

    const path = req.file.path
    const propertyliteurl = new Date().toISOString()

    cloudinary.uploader.upload(
      path,
      { public_id: `Property/${propertyliteurl}`, tags: `property` }, // directory and tags are optional
      function(err, image) {
        if (err) return res.send(err)
        const fs = require('fs')
        fs.unlinkSync(path)
        res.json(image)
      }
    )
  })
})
