const express = require('express');
const records = require('./models/users')
const app = express();
app.use(express.json());
const controllers = require('./controllers');

app.use('/api', controllers);



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
