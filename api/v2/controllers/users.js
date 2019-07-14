/* eslint-disable camelcase */
import bcrypt from 'bcrypt'
import validator from '../helpers/valid'
import jwt from 'jsonwebtoken'
import db from '../models/query'
import format from 'pg-format';
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
  const user = await records.getUser(id)

  if (user) {
    delete user.password
    res.status(200).json({
      status: '200',
      message: 'User succesfully retrieved',
      data: user
    })
  } else {
    res.status(404).json({
      status: '404',
      message: 'Property not found'
    })
  }
}

// send a post request to signup a user
async function signupUserController (req, res, inputs) {
  if (
    !req.body.first_name ||
    !req.body.last_name ||
    !req.body.user_name ||
    !req.body.email ||
    !req.body.phone_number ||
    !req.body.password ||
    !req.body.is_admin ||
  !req.body.address) {
    return res.status(400).json({
      status: '400',
      Error: 'Please fill all the required inputs.'
    })
  } else if (!validator.userValidator(res, inputs)) {
    const users = await records.getUsers()

    const user = users.find(user => user.email === inputs.email)
    const user_phone_number = users.find(user => user.phone_number === inputs.phone_number)
    const user_user_name = users.find(user => user.user_name === inputs.user_name)
    if (user || user_phone_number || user_user_name) {
      return res.status(400).json({
        status: 400,
        message: 'A user with the same credentials exist'
      })
    } else {
      const user = await records.createUser(inputs)
      delete user.password
      return res.status(201).json({
        status: '201',
        message: 'User created succesfully',
        data: user
      })
    }
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
  const user = await records.getUser(id)

  if (user) {
    await records.deleteUser(user)
    res.status(201).json({ message: 'User deleted succesfully' })
  } else {
    res.status(404).json({
      status: '404',
      Error: "User wasn't found"
    })
  }
}

module.exports = {
  getUserController,
  getUsersController,
  signupUserController,
  signinUserController,
  deleteUserController,
  updateUserController
}
