import bcrypt from 'bcrypt';
import validator from '../helpers/userValidator';
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
const getUserController = async (res, id) => {
  try{
    const userQuery = `SELECT * from users where id='${id}'`
    db.query(userQuery, (err, result) => {
      if(result.rows.length === 0|| result === undefined){
        return res.status(400).json({
          status:400,
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
const signupUserController = async(res, inputs) => {
  try{
    if (
      !inputs.firstname || !inputs.lastname || !inputs.username ||
      !inputs.email || !inputs.phonenumber || !inputs.password ||
      !inputs.isadmin || !inputs.address) {
      return res.status(400).json({
        status: 400,
        Error: 'Please fill all the required inputs.'
      });
    } else if (!validator.userValidator(res, inputs)) {
      const saltRounds = 10;
      let salt =  bcrypt.genSaltSync(saltRounds);
      let hashedPassword = bcrypt.hashSync(inputs.password,salt);
      inputs.password = hashedPassword;
      const thisUser = `select * from users where email = '${inputs.email}'`
      const userQuery = `INSERT INTO  users(firstname,
      lastname,username, email, phonenumber, address, isadmin, password)
      VALUES('${inputs.firstname}', '${inputs.lastname}', '${inputs.username}'
      ,'${inputs.email}','${inputs.phonenumber}','${inputs.address}', ${inputs.isadmin},
       '${inputs.password}')`
      const emailQuery = `SELECT * from users where email= '${inputs.email}'`
      const usernameQuery = `SELECT * from users where username= '${inputs.username}'`
      const phonenumberQuery = `SELECT * from users where phonenumber= '${inputs.phonenumber}'`
      db.query(emailQuery, (err, ress) => {
        if (ress.rows.length != 0) {
          res.status(400).json({
            status: 400,
            message: 'A user with same email exist'
          });
        } else {
          db.query(usernameQuery, (err, resu) => {
            if (resu.rows.length != 0) {
              res.status(400).json({
                status: 400,
                message: 'A user with same username exist'
              });
            } else {
              db.query(phonenumberQuery, (err, resul) => {
                if (resul.rows.length != 0) {
                  res.status(400).json({
                    status: 400,
                    message: 'A user with same phonenumber exist'
                  });
                } else {
                  db.query(userQuery, (err, result) => {
                    db.query(thisUser,(err, result)=> {
                      delete result.rows[0].password
                      result.rows[0].token = jwt.sign(result.rows[0], config, { expiresIn: '24h' });
                      res.status(201).json({
                        status: 201,
                        message: 'successfully created the user',
                        data: result.rows[0]
                      });
                    })
                  });
                }
              });
            }
          });
        }
      });
    }
  }catch(err){
    return res.status(500).json({
      status:500,
      Error:err
    })
  }
}
const signinUserController = async(res, inputs)=>{
  try{
    if (inputs.email && inputs.password) {
      const loginQuery = `select * from users where email= '${inputs.email}'`
      db.query(loginQuery, (err, result) => {
        if (result.rows.length === 0 || result === undefined) {
          return res.status(400).json({
            status: 400,
            message: 'Invalid credentials'
          });
        }
        if(bcrypt.compareSync(inputs.password, result.rows[0].password)){
          const token = jwt.sign(result.rows[0], config, { expiresIn: '24h' });
          return res.status(201).json({
            status: 201,
            message: 'user Succesfully logged in',
            token: token
          });
    
          
        }else{
          return res.status(400).json({
            status:400,
            Error: 'Invalid credentials'
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
const updateUserController = async(res, inputs, id) => {
  try{
    const user = `select * from users where id = ${id}`;
    db.query(user, (err, result) => {
      delete result.rows[0].password;
      if (err) { res.status(500).json({Error:err}) }
      if (result.rows.length === 0 || result === undefined){
        res.status(400).json({
          status:400,
          Error:`User ${id} does not exist`
        })
      }
      Object.keys(inputs).forEach((key) => {
        
        const updateUser = `UPDATE users SET ${key} = '${inputs[key]}' where id = '${id}'`
        db.query(updateUser, (err, result) => {
        if (err) { res.status(500).json({Error:err}) }
        });
      });
      const thisUser = `select * from users where id= '${id}'`
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
const deleteUserController = (res, id) => {
  try{
    const user = `select * from users where id = ${id}`;
    const deleteUserQuery = `DELETE FROM users WHERE id='${id}'`;
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