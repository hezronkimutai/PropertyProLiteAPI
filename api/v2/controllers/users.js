/* eslint-disable handle-callback-err */
/* eslint-disable camelcase */
import bcrypt from 'bcrypt'
import validator from '../helpers/valid'
import jwt from 'jsonwebtoken'
import db from '../models/query'
import format from 'pg-format'
import config from '../config/config'
// /Get request to get all users
async function getUsersController (res) {
  const usersQuery = format('SELECT * from users')
  db.query(usersQuery, function (err, result) {
    if (err) {
      console.log(err)
    }
    res.status(200).json({
      status: '200',
      message: 'User retrieved succesfully',
      data: result.rows
    })
  })
}

// Send a get request to retrieve a single property
async function getUserController (res, id) {
  const userQuery = format(`SELECT * from users where id='%s'`, id)
  db.query(userQuery, function (err, result) {
    if (err) {
      console.log(err)
    }
    res.status(200).json({
      status: '200',
      message: 'User retrieved succesfully',
      data: result.rows
    })
  })
}

// send a post request to signup a user
async function signupUserController (req, res, inputs) {
  if (
    !req.body.firstname ||
    !req.body.lastname ||
    !req.body.username ||
    !req.body.email ||
    !req.body.phonenumber ||
    !req.body.password ||
    !req.body.isadmin ||
  !req.body.address) {
    return res.status(400).json({
      status: '400',
      Error: 'Please fill all the required inputs.'
    })
  } else if (!validator.userValidator(res, inputs)) {
    const userQuery = format(`INSERT INTO  users(firstname,
    lastname,username, email, phonenumber, address, isadmin, password)
    VALUES('%s', '%s', '%s','%s', '%s', '%s', '%s', '%s')`,
    req.body.firstname,
    req.body.lastname,
    req.body.username,
    req.body.email,
    req.body.phonenumber,
    req.body.password,
    req.body.address,
    req.body.isadmin)
    const emailQuery = format(`SELECT * from users where email='%s'`, req.body.email)
    const usernameQuery = format(`SELECT * from users where username='%s'`, req.body.username)
    const phonenumberQuery = format(`SELECT * from users where phonenumber='%s'`, req.body.phonenumber)
    db.query(emailQuery, function (err, ress) {
      if (err) { console.log(err) }
      if (ress.rows.length != 0) {
        res.status(400).json({
          status: '400',
          message: 'A user with same email exist'
        })
      } else {
        db.query(usernameQuery, function (err, resu) {
          if (resu.rows.length != 0) {
            res.status(400).json({
              status: '400',
              message: 'A user with same username exist'
            })
          } else {
            db.query(phonenumberQuery, function (err, resul) {
              if (resul.rows.length != 0) {
                res.status(400).json({
                  status: '400',
                  message: 'A user with same phonenumber exist'
                })
              } else {
                db.query(userQuery, function (err, result) {
                  res.status(201).json({
                    status: '201',
                    message: 'successfully created the user'
                  })
                })
              }
            })
          }
        })
      }
    })
  }
}

// send a post request to signin a user
async function signinUserController (res, inputs) {
  if (inputs.email && inputs.password) {
    const users = await records.getUsers()
    const user = users.find(user => user.email === inputs.email)
    if (user && bcrypt.compareSync(inputs.password, user.password)) {
      delete inputs.password
      const token = jwt.sign(user, config.secret, { expiresIn: '24h' })
      return res.status(201).json({
        status: '201',
        message: 'user Succesfully logged in',
        token: token
      })
    } else {
      return res.status(400).json({
        status: '400',
        message: 'Incorrect details'
      })
    }
  } else {
    res.status(400).json({
      status: '400',
      message: 'password and email required.'
    })
  }
}

async function updateUserController (res, inputs, id) {
  inputs.id = id
  const user = await records.getUser(id)
  Object.assign(user, inputs)
  if (user && !validator.userValidator(res, user)) {
    await records.updateUser(user)
    res.status(201).json({ message: 'User updated succesfully' })
  } else {
    res.status(404).json({
      status: '404',
      Error: "user wasn't found"
    })
  }
}

// send a delete request to delete a user
async function deleteUserController (res, id) {
  const deleteUserQuery = format(`DELETE FROM users WHERE id='%s'`, id)
  db.query(deleteUserQuery, function (err, result) {
    if (err) {
      console.log(err)
    }
    res.status(201).json({
      status: '201',
      message: 'User deleted succesfully'
    })
  })
}

module.exports = {
  getUserController,
  getUsersController,
  signupUserController,
  signinUserController,
  deleteUserController,
  updateUserController
}
