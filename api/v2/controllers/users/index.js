
const express = require('express');
const pg = require('pg')
const users = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('./config');
const middleware = require('./middleware');
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

const configdb = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: true
};

const pool = new pg.Pool(configdb)


pool.connect(function (err, client, done) {
  const myClient = client
  if (err) {console.log(err)}
  // /Get request to get all users
  users.get('/', asyncHandler(async (req, res) => {
    const usersQuery = format('SELECT * from users')
    myClient.query(usersQuery, function (err, result) {
      if (err) {
        console.log(err)
      }
      res.status(200).json({
        status:"200",
        message:"User retrieved succesfully",
        data:result.rows
      })
    })
  }));

  // /Post request to create users
  users.post('/signup', asyncHandler(async (req, res) => {

    if (req.body.firstName &&
        req.body.secondName &&
        req.body.userName &&
        req.body.email &&
        req.body.phoneNumber &&
        req.body.password &&
        req.body.confirmPassword) {
      if (req.body.password.length < 6 || req.body.password != req.body.confirmPassword){
        res.status(400).json({msg:'Password should be longer than 6'})
      }else if (isNaN(req.body.phoneNumber) || req.body.phoneNumber.length !=10) {
        res.status(400).json({msg:'Phone number should be a digit with a length of 10'})
      }else if (req.body.email.indexOf('@') == -1 || req.body.email.indexOf('.') == -1) {
        res.status(400).json({msg:'invalid email'})
      }else if (!isNaN(req.body.firstName) || !isNaN(req.body.secondName) || !isNaN(req.body.userName)) {
        res.status(400).json({msg:"username, firstName and secondName should be a string"})
      }
      // const emailQuery = format(`SELECT * from users where email='%s'`,req.body.email)
      // const usernameQuery = format(`SELECT * from users where username='%s'`,req.body.userName)
      // const phonenumberQuery = format(`SELECT * from users where phonenumber='%s'`,req.body.phoneNumber)
      //
      //
      //   myClient.query(phonenumberQuery, function (err, result) {
      //    if (err) {
      //      console.log(err)
      //    }
      //    if ( result.rows.length != 0){
      //     return res.json({
      //        status:"400",
      //        message:"A user with same phone number exist"
      //      })
      //    }
      //
      //  })
      const userQuery = format(`INSERT INTO  users(firstname,
                              secondname,username, email, phonenumber, password)
                              VALUES('%s', '%s', '%s','%s', '%s', '%s')`,
                              req.body.firstName,
                              req.body.secondName,
                              req.body.userName,
                              req.body.email,
                              req.body.phoneNumber,
                              req.body.password)
      const createTable =`CREATE TABLE IF NOT EXISTS users(
                                                      id serial PRIMARY KEY,
                                                      firstName VARCHAR NOT NULL,
                                                      secondName VARCHAR NOT NULL,
                                                      username VARCHAR NOT NULL,
                                                      email VARCHAR NOT NULL,
                                                      phoneNumber VARCHAR NOT NULL,
                                                      password VARCHAR NOT NULL  )`;

    myClient.query(createTable)

    myClient.query(userQuery, function (err, result) {
      if (err) {
        console.log(err)
      }
      res.status(201).json({
        status:"201",
        message:"successfully created the user"
      })
    })

  } else {
    res.status(400).json({
      status:"400",
       message: 'Please fill all the required fields'
  });
  }

  }));




  users.put('/:id', asyncHandler(async (req, res) => {
    if (req.body.firstName &&
        req.body.secondName &&
        req.body.userName &&
        req.body.email &&
        req.body.phoneNumber &&
        req.body.password &&
        req.body.confirmPassword) {
      if (req.body.password.length < 6 || req.body.password != req.body.confirmPassword){
        res.status(400).json({msg:'Password should be longer than 6'})
      }else if (isNaN(req.body.phoneNumber) || req.body.phoneNumber.length !=10) {
        res.status(400).json({msg:'Phone number should be a digit with a length of 10'})
      }else if (req.body.email.indexOf('@') == -1 || req.body.email.indexOf('.') == -1) {
        res.status(400).json({msg:'invalid email'})
      }else if (!isNaN(req.body.firstName) || !isNaN(req.body.secondName) || !isNaN(req.body.userName)) {
        res.status(400).json({msg:"username, firstName and secondName should be a string"})
      }
      // const emailQuery = format(`SELECT * from users where email='%s'`,req.body.email)
      // const usernameQuery = format(`SELECT * from users where username='%s'`,req.body.userName)
      // const phonenumberQuery = format(`SELECT * from users where phonenumber='%s'`,req.body.phoneNumber)
      // myClient.query(emailQuery, function (err, result) {
      //   if (err) {
      //     console.log(err)
      //   }
      //   if (result.rows.length != 0){
      //     res.status(400).json({
      //       status:"400",
      //       message:"A user with same email exist"
      //     })
      //   }
      //
      // })


      const updateUserQuery = format(`UPDATE users SET firstname = '%s',
                              secondname = '%s',username = '%s', email = '%s',
                               phonenumber = '%s', password = '%s' WHERE id ='%s'`,
                              req.body.firstName,
                              req.body.secondName,
                              req.body.userName,
                              req.body.email,
                              req.body.phoneNumber,
                              req.body.password,
                              req.params.id)
    myClient.query(updateUserQuery, function (err, result) {
      if (err) {
        console.log(err)
      }
      res.status(201).json({
        status:"201",
        message:"successfully updated the user"
      })
    })
  } else {
    res.status(400).json({
      status:"400",
       message: 'Please fill all the required fields'
  });
  }
  }));



  // /Post request to create users
  users.post('/login', asyncHandler(async (req, res) => {
    if (req.body.email && req.body.password ) {
      const userQuery = format(`SELECT * from users where email='%s' and password='%s'`,req.body.email, req.body.password)
      myClient.query(userQuery, function (err, result) {
        if (err) {
          console.log(err)
        }
        if (result.rows.length == 0){
          res.status(400).json({
            status:"400",
            message:"Invalid credentials"
          })
        }else{
          let token = jwt.sign({email: req.body.email},
            config.secret,
            { expiresIn: '24h' // expires in 24 hours
            }
          );

          res.status(201).json({
            status:"201",
            message:"Succesfully logged in",
            token:token
          })
        }

      })
  } else {
    res.status(400).json({
      status:"400",
       message: 'Please fill all the required fields'
  });
  }
  }));



  // /Get request to get a single user
  users.get('/:id', asyncHandler(async (req, res) => {
    const userQuery = format(`SELECT * from users where id='%s'`,req.params.id)
    myClient.query(userQuery, function (err, result) {
      if (err) {
        console.log(err)
      }
      res.status(200).json({
        status:"200",
        message:"User retrieved succesfully",
        data:result.rows
      })
    })
  }));

  users.delete('/:id', asyncHandler(async (req, res) => {
    const deleteUserQuery = format(`DELETE FROM users WHERE id='%s'`,req.params.id)
    myClient.query(deleteUserQuery, function (err, result) {
      if (err) {
        console.log(err)
      }
      res.status(201).json({
        status:"201",
        message:"User deleted succesfully",
      })
    })
  }));
})

module.exports = users;
