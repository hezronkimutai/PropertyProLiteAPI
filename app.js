const express = require('express');
const records = require('./models/users')
const app = express();
app.use(express.json());
const users = require('./controllers/users');
const properties = require('./controllers/properties');

app.use('/api', users);



app.use((req, res, next) => {
  const err = new Error("Not Found");
  next(err);
});
app.use((err, req, res, next)=> {
  res.status(err.status || 500).json({
   error:{
     message:err.message
   }
  });
})
app.listen(3000, () => console.log('PropertyProLiteAPI listening on port 3000!'));
