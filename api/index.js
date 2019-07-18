import express from 'express';
import cors from 'cors';
import controllersv2 from './v2/routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v2', controllersv2);

app.use((req, res, next) => {
  const err = new Error('The url you requested is currently unavaillable');
  next(err);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status:500,
    Error: err.message,
  });
});

app.listen(process.env.PORT || 3000, () => console.log('PropertyProLiteAPI listening on port 3000!'));

export default  app;