/* eslint-disable no-shadow */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from './query';

dotenv.config();
const config = process.env.secret;

class Schema {
  constructor(req, res, owner, table) {
    this.req = req;
    this.res = res;
    this.table = table;
    this.owner = owner;
  }

  signup() {

  }

  signin() {
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
  }

  update() {
    const confirmIfFoundProperty = `select * from properties where id = '${this.req.params.id}'`;
    db.query(confirmIfFoundProperty, (_err, result) => {
      if (result === undefined || result.rows === 0) {
        return this.res.status(404).json({
          status: 404,
          Error: 'Property not found',
        });
      }
      if (result.rows[0].owner === this.owner) {
        Object.keys(this.req.body).forEach((key) => {
          const updateProperty = `UPDATE properties SET ${key} = '${this.req.body[key]}' where id = '${this.req.params.id}'`;
          db.query(updateProperty);
        });
        const confirmIfFound = `select * from properties where id = '${this.req.params.id}'`;
        db.query(confirmIfFound, (_err, resut) => this.res.status(201).json({
          status: 201,
          message: 'Property successfully updated',
          data: resut.rows[0],
        }));
      } else {
        return this.res.status(401).json({
          status: 401,
          Error: 'Unauthorized',
        });
      }
    });
  }

  updateu() {
    const confirmIfFoundProperty = `select * from users where id = '${this.req.params.id}'`;
    db.query(confirmIfFoundProperty, (_err, result) => {
      if (result === undefined || result.rows === 0) {
        return this.res.status(404).json({
          status: 404,
          Error: 'Property not found',
        });
      }
      Object.keys(this.req.body).forEach((key) => {
        const updateProperty = `UPDATE users SET ${key} = '${this.req.body[key]}' where id = '${this.req.params.id}'`;
        db.query(updateProperty);
      });
      const confirmIfFound = `select * from users where id = '${this.req.params.id}'`;
      db.query(confirmIfFound, (_err, resut) => this.res.status(201).json({
        status: 201,
        message: 'Property successfully updated',
        data: resut.rows[0],
      }));
    });
  }

  deleteu() {
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
  }

  delete() {
    const deletePropertyQuery = `DELETE FROM ${this.table} WHERE id='${this.req.params.id}'`;
    const thisUser = `select * from ${this.table} where id= '${this.req.params.id}'`;
    db.query(thisUser, (_err, result) => {
      if (result === undefined || result.rows.length === 0) {
        return this.res.status(404).json({
          status: 404,
          Error: 'Property not found',
        });
      }
      if (result.rows[0].owner === this.owner) {
        db.query(deletePropertyQuery, (_err, _result) => this.res.status(201).json({
          status: '201',
          message: 'properties deleted succesfully',
        }));
      } else {
        this.res.status(401).json({
          status: 401,
          Error: 'Unauthorized',
        });
      }
    });
  }

  get() {

  }

  post() {

  }
}

export default Schema;
