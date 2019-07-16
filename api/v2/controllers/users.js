/* eslint-disable no-undef */
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
async function signupUserController (res, inputs) {
  if (
    !inputs.firstname ||
    !inputs.lastname ||
    !inputs.username ||
    !inputs.email ||
    !inputs.phonenumber ||
    !inputs.password ||
    !inputs.isadmin ||
  !inputs.address) {
    return res.status(400).json({
      status: '400',
      Error: 'Please fill all the required inputs.'
    })
  } else if (!validator.userValidator(res, inputs)) {
    const userQuery = `INSERT INTO  users(firstname,
    lastname,username, email, phonenumber, address, isadmin, password)
    VALUES('${inputs.firstname}', '${inputs.lastname}', '${inputs.username}'
    ,'${inputs.email}','${inputs.phonenumber}','${inputs.address}', ${inputs.isadmin},
     '${inputs.password}')`
    const emailQuery = `SELECT * from users where email= '${inputs.email}'`
    const usernameQuery = `SELECT * from users where username= '${inputs.username}'`
    const phonenumberQuery = `SELECT * from users where phonenumber= '${inputs.phonenumber}'`
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
                  if (err) {
                    console.log(err)
                  }
                  res.status(201).json({
                    status: '201',
                    message: 'successfully created the user',
                    data: result.rows
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
  // inputs.id = id
  // const user = await records.getUser(id)
  // Object.assign(user, inputs)
  // if (user && !validator.userValidator(res, user)) {
  //   await records.updateUser(user)
  //   res.status(201).json({ message: 'User updated succesfully' })
  // } else {
  //   res.status(404).json({
  //     status: '404',
  //     Error: "user wasn't found"
  //   })
  // }
  Object.keys(inputs).forEach(function (key) {
    const updateUser = `UPDATE users SET ${key} = '${inputs[key]}' where id = '${id}'`
    db.query(updateUser, function (err, result) {
      if (err) {
        console.log(err)
      }
    })
  })
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
