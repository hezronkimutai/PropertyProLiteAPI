import bcrypt from 'bcrypt'
import validator from '../helpers/userValidator'
import jwt from 'jsonwebtoken'
import db from '../models/query'
import format from 'pg-format'
import dotenv from 'dotenv';

dotenv.config();

const config = process.env.secret;

const getUsersController = async(res) => {
  const usersQuery = format('SELECT * from users')
  db.query(usersQuery, function (err, result) {
    if (err) {
      res.status(500).json({
        status:"500",
        Error: "Internal server error"
      })
    }
    result.rows.forEach((user)=>{delete user.password})
    res.status(200).json({
      status: '200',
      message: 'User retrieved succesfully',
      data: result.rows
    });
  });
}

const getUserController = async (res, id) => {
  const userQuery = format(`SELECT * from users where id='%s'`, id)
  db.query(userQuery, function (err, result) {
    delete result.rows[0].password
    if (err) {
      res.status(500).json({
        status:"500",
        Error: "Internal server error"
      })
    }
    res.status(200).json({
      status: '200',
      message: 'User retrieved succesfully',
      data: result.rows
    });
  });
}

const signupUserController = async(res, inputs) => {
  if (
    !inputs.firstname || !inputs.lastname || !inputs.username ||
    !inputs.email || !inputs.phonenumber || !inputs.password ||
    !inputs.isadmin || !inputs.address) {
    return res.status(400).json({
      status: '400',
      Error: 'Please fill all the required inputs.'
    });
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
      if (err) {
        res.status(500).json({
          status:"500",
          Error: "Internal server error"
        })
      }
      if (ress.rows.length != 0) {
        res.status(400).json({
          status: '400',
          message: 'A user with same email exist'
        });
      } else {
        db.query(usernameQuery, function (err, resu) {
          if (resu.rows.length != 0) {
            res.status(400).json({
              status: '400',
              message: 'A user with same username exist'
            });
          } else {
            db.query(phonenumberQuery, function (err, resul) {
              if (resul.rows.length != 0) {
                res.status(400).json({
                  status: '400',
                  message: 'A user with same phonenumber exist'
                });
              } else {
                delete inputs.password;
                db.query(userQuery, function (err, result) {
                  if (err) {
                    res.status(500).json({
                      status:"500",
                      Error: "Internal server error"
                    })
                  }
                  res.status(201).json({
                    status: '201',
                    message: 'successfully created the user',
                    data: inputs
                  });
                });
              }
            });
          }
        });
      }
    });
  }
}

const signinUserController = async(res, inputs)=>{
  if (inputs.email && inputs.password) {
    const loginQuery = `select * from users where email= '${inputs.email}' AND password = '${inputs.password}'`
    db.query(loginQuery, function (err, result) {
      if (err) {
        res.status(500).json({
          status:"500",
          Error: "Internal server error"
        })
      }
      if (result.rows.length != 0) {
        const token = jwt.sign(result.rows[0], config, { expiresIn: '24h' });
        return res.status(201).json({
          status: '201',
          message: 'user Succesfully logged in',
          token: token
        });
      }else{
        res.status(400).json({
          status:'400',
          Error: 'Invalid credentials'
        })
      }
    });
  } else {
    res.status(400).json({
      message: 'password and email required.'
    });
  }
}

const updateUserController = async(res, inputs, id) => {
  const user = `select * from users where id = ${id}`;
  db.query(user, function (err, result) {
    delete result.rows[0].password;
    if (err) { res.status(500).json({Error:err}) }
    if (result.rows.length === 0){
      res.status(400).json({
        status:400,
        Error:`User ${id} does not exist`
      })
    }
    Object.keys(inputs).forEach(function (key) {
      const updateUser = `UPDATE users SET ${key} = '${inputs[key]}' where id = '${id}'`
      db.query(updateUser, function (err, result) {
      if (err) { res.status(500).json({Error:err}) }
      });
    });
    res.status(201).json({
      status: '201',
      message: 'User success fully updated',
      data:result.rows
    });
  });
  

}

const deleteUserController = (res, id) => {
  const user = `select * from users where id = ${id}`;
  const deleteUserQuery = format(`DELETE FROM users WHERE id='%s'`, id);
  db.query(user, function (err, result) {
    delete result.rows[0].password;
    if (err) { res.status(500).json({Error:err}) }
    if (result.rows.length === 0){
      res.status(400).json({
        status:400,
        Error:`User ${id} does not exist`
      })
    }
  db.query(deleteUserQuery, function (err, result) {
    if (err) { res.status(500).json({Error:err}) }
    res.status(201).json({
      status: '201',
      message: 'User deleted succesfully'
    });
  });
});
}

export default {
  getUserController,
  getUsersController,
  signupUserController,
  signinUserController,
  deleteUserController,
  updateUserController
}