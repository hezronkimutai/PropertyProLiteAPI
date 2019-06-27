



const pg = require('pg')
const format = require('pg-format')
const PGUSER = 'postgres'
const PGDATABASE = 'ppl'
const url = require('url')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


const env = process.env.NODE_ENV

const databaseUrl = env === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;



const params = url.parse(databaseUrl);

const auth = params.auth.split(':');

const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: true
};


const pool = new pg.Pool(config )
const ctu =`CREATE TABLE IF NOT EXISTS users(
                                                id serial PRIMARY KEY,
                                                firstName VARCHAR NOT NULL,
                                                secondName VARCHAR NOT NULL,
                                                username VARCHAR NOT NULL,
                                                email VARCHAR NOT NULL,
                                                phoneNumber VARCHAR NOT NULL,
                                                password VARCHAR NOT NULL,
                                                profilePic VARCHAR NULL
                                                )`;

const ctp =`CREATE TABLE IF NOT EXISTS properties(
                                                id serial PRIMARY KEY,
                                                category varchar,
                                                name varchar,
                                                reason varchar,
                                                price varchar,
                                                state varchar,
                                                city varchar,
                                                address varchar,
                                                map varchar,
                                                description varchar,
                                                url varchar
                                                )`;
const dtu = `DROP TABLE IF EXISTS users`;
const dtp = `DROP TABLE IF EXISTS properties`;


function createTables(){
  try{
    pool.connect(function (err, client, done) {
        const myClient = client
      if (err) {console.log("------------------------------>",err)}
      else{
        myClient.query(ctu);
        myClient.query(ctp);
        console.log("Succesfully created tables")
      }
      done();
    });
  }catch(err){
    console.log("------------------------------",err)
  }

}


function dropTables(){
  try{
  pool.connect(function (err, client, done) {
      const myClient = client
    if (err) {
      console.log("++++++++++++++++++++++++++>",err)
    }
    else{
      myClient.query(dtu);
      myClient.query(dtp);
      console.log("Succesfully droped tables")
    }
done();
  });
}catch(err){
    console.log("------------66666666------------------",err)
  }

}


module.exports = {
  dropTables,
  createTables,
  pool
};
