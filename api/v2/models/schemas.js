import dotenv from 'dotenv';
import db from './query';

dotenv.config();

class Schema {
  constructor(req, condition, conditionValue, table) {
    this.req = req;
    this.condition = condition;
    this.conditionValue = conditionValue;
    this.table = table;
  }

  create() {
    Object.keys(this.req.body).forEach((key) => {
      db.query(`INSERT INTO  ${this.table} (${key}) VALUES('${this.req.body[key]}')`);
    });
  }

  getAll() {
    db.query(`select * from ${this.table}`, (_err, result) => result.rows);
  }

 getConditioned() {
       db.query(`select * from ${this.table} where ${this.condition} = '${this.conditionValue}'`, async (err, res)=>{
        return  res.rows;
  
     });
  }

  update() {
    Object.keys(this.req.body).forEach((key) => {
      db.query(`UPDATE ${this.table} SET ${key} = '${this.req.body[key]}' where id = '${this.req.params.id}'`);
    });
  }

  delete() {
    db.query(`DELETE FROM ${this.table} WHERE ${this.condition} = '${this.conditionValue}'`);
  }
}

export default Schema;
