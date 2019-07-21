import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Validator from '../helpers/Validator';
import db from '../models/query';
import dotenv from 'dotenv';
import { validatePassword } from './resetPassword';
import Schema from '../models/schemas';



dotenv.config();
const config = process.env.secret;
const getUsersController = async(req,res) => {
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
const getUserController = async (req,res) => {
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
let schema = new Schema(req, res, "users")
let validator = new Validator(req, res)
if (!req.body.firstname
  || !req.body.lastname
  || !req.body.username
  || !req.body.email
  || !req.body.phonenumber
  || !req.body.password
  || !req.body.address) {
  return res.status(400).json({ status: 400, Error: 'Please fill all the required inputs.' });
}
  if (!validator.User()) {
    req.body.isadmin = req.body.email.endsWith("@ppl.com") ? true : false
    let hashedPassword = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10));
    req.body.password = hashedPassword;
    const userQuery = `INSERT INTO  users(firstname,
      lastname,username, email, phonenumber, address, isadmin, password)
      VALUES('${req.body.firstname}', '${req.body.lastname}', '${req.body.username}'
      ,'${req.body.email}','${req.body.phonenumber}','${req.body.address}', ${req.body.isadmin},
       '${req.body.password}')`;
    const emailQuery = `SELECT * from users where email= '${req.body.email}'`;
    const usernameQuery = `SELECT * from users where username= '${req.body.username}'`;
    const phonenumberQuery = `SELECT * from users where phonenumber= '${req.body.phonenumber}'`;
    await db.query(emailQuery, async(err, ress) => {
      if(err){console.log(err)}
      await db.query(usernameQuery, async(err, resu) => {
        if(err){console.log(err)}
        await db.query(phonenumberQuery, async(err, resul) => {
          if(err){console.log(err)}
          if (ress.rows.length !== 0
            || resu.rows.length !== 0
            || resul.rows.length !== 0) {
            return res.status(409).json({
              status: 409,
              Error: 'A user with the same credentials exists',
            });
          }
          delete req.body.password;
          req.body.token = jwt.sign(req.body, config, { expiresIn: '24h' });
          await db.query(userQuery, async(_err, result) => {
            res.status(201).json({
              status: 201,
              message: 'User successfully created',
              data: req.body,
            });
          });
        });
      });
    });
    }

}
const signinUserController = async(req, res)=>{
  let schema = new Schema(req, res, "users")
  try{
    if(!req.body.email && !req.body.password){
    return this.res.status(400).json({
      message: 'password and email required.',
    });
    
  }
  schema.signin()   
  }catch(err){
    return res.status(500).json({
      status:500,
      Error:err
    })
  }
 
}
const updateUserController = async(req, res) => {
  let schema = new Schema(req, res , "users")
  try{
    if(isNaN(req.params.id)){
      return res.status(405).json({
        status: 405,
        Error: "Method not allowed"
      })
    }
    schema.updateu()    
  }catch(err){
    return res.status(500).json({
      status:500,
      Error: err
    })
  }
}
const deleteUserController = (req, res) => {
  let schema = new Schema(req, res , "users")
  try{
    schema.deleteu()    
  }catch(err){
    return res.status(500).json({
      status:500,
      Error: err
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