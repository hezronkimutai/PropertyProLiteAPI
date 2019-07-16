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
  await pool.query(queries.createTableUsers)
  await pool.query(queries.createTableProperties)
}

export const dropTables = async () => {

  await pool.query(queries.deleteTableUsers)

  await pool.query(queries.deleteTableProperties)
}

pool.on('remove', () => {
  process.exit(0)
})

require('make-runnable')
