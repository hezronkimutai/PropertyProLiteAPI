const express = require('express');
const pg = require('pg')
const users = express.Router();
const records = require('../../models');
const format = require('pg-format')
const PGUSER = 'postgres'
const PGDATABASE = 'ppl'
const age = 732

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

const config = {
  user: PGUSER,
  database: PGDATABASE,
  max: 10,
  idleTimeoutMillis: 30000,
  password: "hheezziiee"
}

const pool = new pg.Pool(config)


pool.connect(function (err, client, done) {
  if (err) {console.log(err)}


  // /Get request to get all users
  users.get('/', asyncHandler(async (req, res) => {
    const myClient = client
    const ageQuery = format('SELECT * from numbers')
    myClient.query(ageQuery, function (err, result) {
      if (err) {
        console.log(err)
      }
      res.json(result.rows)
    })
  }));

  users.post('/signup', asyncHandler(async (req, res) => {
    const myClient = client

    const firstName= req.body.firstName;
    const secondName= req.body.secondName;
    const userName=req.body.userName;
    const email= req.body.email;
    const phoneNumber= req.body.phoneNumber;
    const password= req.body.password;
    const confirmPassword= req.body.confirmPassword;
    const ageQuery = format(`INSERT INTO  users(firstname,
                            secondname,username, email, phonenumber, password)
                            VALUES('%s', '%s', '%s','%s', '%s', '%s')`, firstName, secondName,userName, email, phoneNumber, password)
    myClient.query(ageQuery, function (err, result) {
      if (err) {
        console.log(err)
      }
      res.json({msg:"success"})
    })

  }));

})





// // /Get request to get all users
// users.get('/', asyncHandler(async (req, res) => {
//   const users = await records.getUsers();
//   if (users) {
//     res.json(users);
//   } else {
//     res.status(400).json({ message: 'No users found' });
//   }
// }));

// Send a get request to retrieve a single property
// users.get('/:id', asyncHandler(async (req, res) => {
//   const user = await records.getUser(req.params.id);
//
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(400).json({ message: 'Property not found' });
//   }
// }));
//
//
// // send a post request to signup a user
// users.post('/signup', asyncHandler(async (req, res) => {
//   if (req.body.firstName && req.body.secondName && req.body.userName && req.body.email && req.body.phoneNumber && req.body.password && req.body.confirmPassword) {
//     const user = await records.createUser({
//       firstName: req.body.firstName,
//       secondName: req.body.secondName,
//       userName: req.body.userName,
//       email: req.body.email,
//       phoneNumber: req.body.phoneNumber,
//       password: req.body.password,
//       confirmPassword: req.body.confirmPassword
//     });
//     res.status(201).json(user);
//   } else {
//     res.status(400).json({ message: 'password and Username required.' });
//   }
// }));
//
// // send a post request to signin a user
// users.post('/login', asyncHandler(async (req, res) => {
//   if (req.body.email && req.body.password) {
//     const users = await records.getUsers();
//
//     for (let i = 0; i < users.length; i++) {
//       if (users[i].email === req.body.email && users[i].password === req.body.password) {
//         res.status(201).json({
//           msg: 'Succesfully logged in',
//         });
//       }
//     }
//     res.status(201).json({
//       msg: 'Incorrect details',
//     });
//   } else {
//     res.status(400).json({ message: 'password and email required.' });
//   }
// }));
//
// // send a put request to update a user
// users.put('/:id', asyncHandler(async (req, res) => {
//   const user = await records.getUser(req.params.id);
//   if (user) {
//     user.firstName = req.body.firstName,
//     user.secondName = req.body.secondName,
//     user.userName = req.body.userName,
//     user.email = req.body.email,
//     user.phoneNumber = req.body.phoneNumber,
//     user.password = req.body.password,
//     user.confirmPassword = req.body.confirmPassword
//
//     await records.updateUser(user);
//
//     res.status(204).end();
//   } else {
//     res.status(404).json({ message: "Property wasn't found" });
//   }
// }));
//
// // send a delete request to delete a user
// users.delete('/:id', asyncHandler(async (req, res) => {
//   const user = await records.getUser(req.params.id);
//
//   if (user) {
//     await records.deleteUser(user);
//     res.status(204).end();
//   } else {
//     res.status(404).json({ message: "User wasn't found" });
//   }
// }));
//

module.exports = users;
