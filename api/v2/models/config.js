import { Pool } from 'pg'
import dotenv from 'dotenv'
import queries from './queries'

dotenv.config()

const env = process.env.NODE_ENV

const databaseUrl = env === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL

export const pool = new Pool({
  connectionString: databaseUrl
})

pool.on('connect', () => {
  console.log('Connected to the db successfully')
})

export const createTables = async () => {
  await pool.query(queries.createTableUsers);
  await pool.query(queries.createTableProperties);
  await pool.query(queries.createTableFlags);
}
export const dropTables = async () => {
  await pool.query(queries.deleteTableFlags)
  await pool.query(queries.deleteTableProperties);
  await pool.query(queries.deleteTableUsers);
}

pool.on('remove', () => {
  process.exit(0)
})

require('make-runnable')
