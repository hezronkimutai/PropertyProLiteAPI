import express from 'express';
import cors from 'cors';
import controllersv2 from './v2/routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v2', controllersv2);

// const allowCrossDomain = function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'file:///home/hezron/ANDELA-KIGALI/propertyliteui/UI/post-property.html');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// };
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
// eslint-disable-next-line no-console
app.listen(process.env.PORT || 3000, () => console.log('PropertyProLiteAPI listening on port 3000!'));

module.exports = app;
