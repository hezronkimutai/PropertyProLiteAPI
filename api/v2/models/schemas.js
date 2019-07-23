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

  }

  update() {

  }

  updateu() {

  }

  deleteu() {

  }

  delete() {

  }

  get() {

  }

  post() {

  }
}

export default Schema;
