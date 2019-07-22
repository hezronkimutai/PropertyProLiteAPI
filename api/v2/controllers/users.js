import bcrypt from 'bcrypt';
import validator from '../helpers/userValidator';
import Validator from '../helpers/Validator';
import jwt from 'jsonwebtoken';
import db from '../models/query';
import dotenv from 'dotenv';
import { validatePassword } from './resetPassword'

dotenv.config();
const config = process.env.secret;
const getUsersController = async(res) => {
  try{
    const usersQuery = 'SELECT * from users'
    db.query(usersQuery, (err, result) => {
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
  }catch(err){
    return res.status(500).json({
      status:500,
      Error:err
    })
  }
}
const getUserController = async (req) => {
  try{
    const userQuery = `SELECT * from users where id='${req.params.id}'`
    db.query(userQuery, (err, result) => {
      if(result.rows.length === 0|| result === undefined){
        return res.status(404).json({
          status:404,
          Error: "User not found"
        })
      }
      delete result.rows[0].password
      if (err) {
        return res.status(500).json({
          status:"500",
          Error: "Internal server error"
        })
      }
      return res.status(200).json({
        status: '200',
        message: 'User retrieved succesfully',
        data: result.rows
      });
    });
  }catch(err){
    return res.status(500).json({
      status:500,
      Error:err
    })
  }
}
const signupUserController = async(req, res) => {
let validator = new Validator(req, res)
if (!req.body.firstname
    || !req.body.lastname
    || !req.body.username
    || !req.body.email
    || !req.body.phonenumber
    || !req.body.password
    || !req.body.isadmin
    || !req.body.address) {
return res.status(400).json({ status: 400, Error: 'Please fill all the required req.body.' });
}
  if (!validator.User()) {
    let hashedPassword = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10));
    req.body.password = hashedPassword;
  
    const userQuery = `INSERT INTO  users(firstname,
    lastname,username, email, phonenumber, address, isadmin, password)
    VALUES('${req.body.firstname}', '${req.body.lastname}', '${req.body.username}'
    ,'${req.body.email}','${req.body.phonenumber}','${req.body.address}', ${req.body.isadmin},
     '${req.body.password}')`
    const emailQuery = `SELECT * from users where email= '${req.body.email}'`
    const usernameQuery = `SELECT * from users where username= '${req.body.username}'`
    const phonenumberQuery = `SELECT * from users where phonenumber= '${req.body.phonenumber}'`
    db.query(emailQuery, (err, ress) => {
      if (ress.rows.length != 0) {
        res.status(409).json({
          status: 409,
          message: 'A user with same email exist'
        });
      } else {
        db.query(usernameQuery, (err, resu) => {
          if (resu.rows.length != 0) {
            res.status(409).json({
              status: 409,
              message: 'A user with same username exist'
            });
          } else {
            db.query(phonenumberQuery, (err, resul) => {
              if (resul.rows.length != 0) {
                res.status(409).json({
                  status: 409,
                  message: 'A user with same phonenumber exist'
                });
              } else {
                delete req.body.password;
                req.body.token = jwt.sign(req.body, config, { expiresIn: '24h' });
                db.query(userQuery, (err, result) => {
                  if (err) {
                    res.status(500).json({
                      status:500,
                      Error: "Internal server error"
                    })
                  }
                  });
              }
              });
            }
          });
        }
      });
    }

}
const signinUserController = async(req, res)=>{
  try{
    if (req.body.email && req.body.password) {
      const loginQuery = `select * from users where email= '${req.body.email}'`
      db.query(loginQuery, (err, result) => {
        if (result.rows.length === 0 || result === undefined) {
          return res.status(400).json({
            status: 400,
            message: 'Invalreq.params.id credentials'
          });
        }
        if(bcrypt.compareSync(req.body.password, result.rows[0].password)){
          const token = jwt.sign(result.rows[0], config, { expiresIn: '24h' });
          return res.status(201).json({
            status: 201,
            message: 'user Succesfully logged in',
            token: token
          });
    
          
        }else{
          return res.status(400).json({
            status:400,
            Error: 'Invalreq.params.id credentials'
          })
        }
      });
    } else {
      return res.status(400).json({
        message: 'password and email required.'
      });
    }
  }catch(err){
    return res.status(500).json({
      status:500,
      Error:err
    })
  }
 
}
const updateUserController = async(req, res) => {
  try{
    const user = `select * from users where req.params.id = ${req.params.id}`;
    db.query(user, (err, result) => {
      delete result.rows[0].password;
      if (err) { res.status(500).json({Error:err}) }
      if (result.rows.length === 0 || result === undefined){
        res.status(400).json({
          status:400,
          Error:`User ${req.params.id} does not exist`
        })
      }
      Object.keys(req.body).forEach((key) => {
        
        const updateUser = `UPDATE users SET ${key} = '${req.body[key]}' where id = '${req.params.id}'`
        db.query(updateUser, (err, result) => {
        if (err) { res.status(500).json({Error:err}) }
        });
      });
      const thisUser = `select * from users where id= '${req.params.id}'`
      db.query(thisUser, (err, result) => {
       return res.status(201).json({
          status: 201,
          message: 'User success fully updated',
          data:result.rows
        });
      })
    });
  }catch(err){
    return res.status(500).json({
      status:500,
      Error:err
    })
  }
}
const deleteUserController = (req, res) => {
  try{
    const user = `select * from users where id = ${req.params.id}`;
    const deleteUserQuery = `DELETE FROM users WHERE id='${req.params.id}'`;
    db.query(user, (err, result) => {
      if(result === undefined || result.rows.length === 0){
        return res.status(404).json({
          status:404,
          Error: 'User not found'
        })
      }
    db.query(deleteUserQuery, (err, result) => {
      if (err) { res.status(500).json({Error:err}) }
      res.status(201).json({
        status: 201,
        message: 'User deleted succesfully'
      });
    });
  });
  }catch(err){
    return res.status(500).json({
      status:400,
      Error:err
    })
  }
}
const resetPassword = async(res, to) => {
  return res.status(201).json(await validatePassword(to))
}
export default {
  resetPassword,
  getUserController,
  getUsersController,
  signupUserController,
  signinUserController,
  deleteUserController,
  updateUserController
}