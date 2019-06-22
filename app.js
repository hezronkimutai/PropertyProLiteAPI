const express = require('express');
const records = require('./api/v1/models');
var cors = require('cors')



const app = express();
app.use(cors())
app.use(express.json());
const controllersv1 = require('./api/v1/controllers');

app.use('/api/v1', controllersv1);
const controllersv2 = require('./api/v2/controllers');
app.use('/api/v2', controllersv2);

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'file:///home/hezron/ANDELA-KIGALI/propertyliteui/UI/post-property.html');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
app.use((req, res, next) => {
  const err = new Error('Not Found');
  next(err);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message,
    },
  });
});
app.listen(process.env.PORT || 3000, () => console.log('PropertyProLiteAPI listening on port 3000!'));


module.exports = app;


// const express = require('express');
// const records = require('./api/v2/models');
// const app = express();
// app.use(express.json());



// app.listen(3000, function () {
//   console.log('listening on 3000')
// })
