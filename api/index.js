import  express from 'express';
// import records from './v1/models';
import cors from 'cors';

const app = express();
app.use(cors())
app.use(express.json());
const controllersv2 = require('./v2');
app.use('/api/v2', controllersv2);


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


module.exports = {app};
