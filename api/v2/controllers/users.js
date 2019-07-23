import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Validator from '../helpers/Validator';
import db from '../models/query';
import { validatePassword } from './resetPassword';
import Schema from '../models/schemas';


dotenv.config();
const config = process.env.secret;

class UserController {
  constructor(req, res){
    this.res = res;
    this.req = req;
  }
  getUsersController(){
    try{
      const usersQuery = 'SELECT * from users'
      db.query(usersQuery, (err, result) => {
        if (err) {
          this.res.status(500).json({
            status:"500",
            Error: "Internal server error"
          })
        }
        result.rows.forEach((user)=>{delete user.password})
        this.res.status(200).json({
          status: '200',
          message: 'User retrieved succesfully',
          data: result.rows
        });
      });
    }catch(err){
      return this.res.status(500).json({
        status:500,
        Error:err
      })
    }
  }
  getUserController(){
    try{
      const userQuery = `SELECT * from users where id='${this.req.params.id}'`
      db.query(userQuery, (err, result) => {
        if(result.rows.length === 0|| result === undefined){
          return this.res.status(404).json({
            status:404,
            Error: "User not found"
          })
        }
        delete result.rows[0].password
        if (err) {
          return this.res.status(500).json({
            status:"500",
            Error: "Internal server error"
          })
        }
        return this.res.status(200).json({
          status: '200',
          message: 'User retrieved succesfully',
          data: result.rows
        });
      });
    }catch(err){
      return this.res.status(500).json({
        status:500,
        Error:err
      })
    }
  }
  signupUserController(){
  let schema = new Schema(this.req, this.res, "users")
  let validator = new Validator(this.req, this.res)
  if (!this.req.body.firstname
    || !this.req.body.lastname
    || !this.req.body.username
    || !this.req.body.email
    || !this.req.body.phonenumber
    || !this.req.body.password
    || !this.req.body.address) {
    return this.res.status(400).json({ status: 400, Error: 'Please fill all the required inputs.' });
  }
    if (!validator.User()) {
      this.req.body.isadmin = this.req.body.email.endsWith("@ppl.com") ? true : false
      let hashedPassword = bcrypt.hashSync(this.req.body.password,bcrypt.genSaltSync(10));
      this.req.body.password = hashedPassword;
      const userQuery = `INSERT INTO  users(firstname,
        lastname,username, email, phonenumber, address, isadmin, password)
        VALUES('${this.req.body.firstname}', '${this.req.body.lastname}', '${this.req.body.username}'
        ,'${this.req.body.email}','${this.req.body.phonenumber}','${this.req.body.address}', ${this.req.body.isadmin},
         '${this.req.body.password}')`;
      const emailQuery = `SELECT * from users where email= '${this.req.body.email}'`;
      const usernameQuery = `SELECT * from users where username= '${this.req.body.username}'`;
      const phonenumberQuery = `SELECT * from users where phonenumber= '${this.req.body.phonenumber}'`;
       db.query(emailQuery, async(err, ress) => {
        if(err){console.log(err)}
        await db.query(usernameQuery, async(err, resu) => {
          if(err){console.log(err)}
          await db.query(phonenumberQuery, async(err, resul) => {
            if(err){console.log(err)}
            if (ress.rows.length !== 0
              || resu.rows.length !== 0
              || resul.rows.length !== 0) {
              return this.res.status(409).json({
                status: 409,
                Error: 'A user with the same credentials exists',
              });
            }
            
            await db.query(userQuery, async(_err, result) => {
              await db.query(emailQuery, async(err, resss) => {
                delete resss.rows[0].password;
                resss.rows[0].token = jwt.sign(resss.rows[0], config, { expiresIn: '24h' });
                this.res.status(201).json({
                  status: 201,
                  message: 'User successfully created',
                  data: resss.rows[0],
                });
              })  
            });
          });
        });
      });
      }
  
  }
 signinUserController(){
    try{
      if(!this.req.body.email && !this.req.body.password){
      return this.res.status(400).json({
        message: 'password and email required.',
      });
      
    }
    const loginQuery = `select * from users where email= '${this.req.body.email}'`;
    db.query(loginQuery, (_err, result) => {
      if (result.rows.length === 0 || result === undefined) {
        return this.res.status(400).json({
          status: 400,
          message: 'Invalreq.params.id credentials',
        });
      }
      if (bcrypt.compareSync(this.req.body.password, result.rows[0].password)) {
        const token = jwt.sign(result.rows[0], config, { expiresIn: '24h' });
        return this.res.status(201).json({
          status: 201,
          message: 'user Succesfully logged in',
          token,
        });
      }
      return this.res.status(400).json({
        status: 400,
        Error: 'Invalreq.params.id credentials',
      });
    });   
    }catch(err){
      return this.res.status(500).json({
        status:500,
        Error:err
      })
    }
   
  }
  updateUserController (){
    try{
      if(isNaN(this.req.params.id)){
        return this.res.status(405).json({
          status: 405,
          Error: "Method not allowed"
        })
      }
      const confirmIfFoundProperty = `select * from users where id = '${this.req.params.id}'`;
      db.query(confirmIfFoundProperty, (_err, result) => {
        if (result === undefined || result.rows === 0) {
          return this.res.status(404).json({
            status: 404,
            Error: 'Property not found',
          });
        }
        Object.assign(result.rows[0], this.req.body);
          this.req.body = result.rows[0];
          delete this.req.body.createdon;
          const validator = new Validator(this.req, this.res);
          if (!validator.User()) {
        Object.keys(this.req.body).forEach((key) => {
          const updateProperty = `UPDATE users SET ${key} = '${this.req.body[key]}' where id = '${this.req.params.id}'`;
          db.query(updateProperty);
        });
        delete resut.rows[0].password;
        const confirmIfFound = `select * from users where id = '${this.req.params.id}'`;
        db.query(confirmIfFound, (_err, resut) => this.res.status(201).json({
          status: 201,
          message: 'Property successfully updated',
          data: resut.rows[0],
        }));
      } 
      });  
     
    }catch(err){
      return this.res.status(500).json({
        status:500,
        Error: err
      })
    }
  }
  deleteUserController(){
    try{
      const deletePropertyQuery = `DELETE FROM users WHERE id='${this.req.params.id}'`;
      const thisUser = `select * from users where id= '${this.req.params.id}'`;
      db.query(thisUser, (_err, result) => {
        if (result === undefined || result.rows.length === 0) {
          return this.res.status(404).json({
            status: 404,
            Error: 'Property not found',
          });
        }
        db.query(deletePropertyQuery, (_err, _result) => this.res.status(201).json({
          status: '201',
          message: 'properties deleted succesfully',
        }));
      });    
    }catch(err){
      return this.res.status(500).json({
        status:500,
        Error: err
      })
    }
  }
  resetPassword(){
    return this.res.status(201).json(validatePassword(this.req.body.email))
  }
}

export default UserController;
