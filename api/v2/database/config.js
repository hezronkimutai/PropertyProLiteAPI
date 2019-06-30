import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV

const databaseUrl = env === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;

// Creating a new pool instance
export const pool = new Pool({
    connectionString: databaseUrl
});

// Connecting to the database
pool.on('connect', () => {
    console.log('Connected to the db successfully')
});

// Creating tables function
export const createTables = async () => {
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


    await pool.query(ctu);

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

    await pool.query(ctp);
};

// Dropping tables already creating
export const dropTables = async () => {
    const dtu = `DROP TABLE IF EXISTS users`;
    const dtp = `DROP TABLE IF EXISTS properties`;

    // Drop the table sms
    await pool.query(dtu);

    // Drop the table contacts
    await pool.query(dtp);
};

pool.on('remove', () => {
    process.exit(0);
});

// To create and drop tables
require('make-runnable');