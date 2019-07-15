import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const env = process.env.NODE_ENV

const databaseUrl = env === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL

// Creating a new pool instance
export const pool = new Pool({
  connectionString: databaseUrl
})

// Connecting to the database
pool.on('connect', () => {
  console.log('Connected to the db successfully')
})


// Creating tables function
export const createTables = async () => {
  const createTableUsers = `CREATE TABLE IF NOT EXISTS users(
                                                  id serial PRIMARY KEY,
                                                  firstname VARCHAR NOT NULL,
                                                  lastname VARCHAR NOT NULL,
                                                  username VARCHAR NOT NULL,
                                                  email VARCHAR NOT NULL,
                                                  phonenumber VARCHAR NOT NULL,
                                                  address VARCHAR NOT NULL,
                                                  isadmin VARCHAR NOT NULL,
                                                  password VARCHAR NOT NULL,
                                                  profilePic VARCHAR NULL
                                                  )`

  await pool.query(createTableUsers)

  const createTableProperties = `CREATE TABLE IF NOT EXISTS properties(
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
                                                    )`

  await pool.query(createTableProperties)
}

// Dropping tables already creating
export const dropTables = async () => {
  const deleteTableUsers = `DROP TABLE IF EXISTS users`
  const deleteTableProperties = `DROP TABLE IF EXISTS properties`

  // Drop the table sms
  await pool.query(deleteTableUsers)

  // Drop the table contacts
  await pool.query(deleteTableProperties)
}

pool.on('remove', () => {
  process.exit(0)
})

// To create and drop tables
require('make-runnable')
