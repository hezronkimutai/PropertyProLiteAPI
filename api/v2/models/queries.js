

const createTableUsers = `CREATE TABLE IF NOT EXISTS users(
      id serial PRIMARY KEY,
      firstname VARCHAR NOT NULL,
      lastname VARCHAR NOT NULL,
      username VARCHAR NOT NULL,
      email VARCHAR NOT NULL,
      phonenumber varchar NOT NULL,
      address VARCHAR NOT NULL,
      isadmin BOOLEAN NOT NULL ,
      password VARCHAR NOT NULL,
      profilePic VARCHAR NULL,
      createdon timestamp default now()
      )`;
const createTableProperties = `CREATE TABLE IF NOT EXISTS properties(
      id  serial PRIMARY KEY,
      owner integer references users(id) ON DELETE CASCADE,
      status varchar default 'available',
      price varchar,
      state varchar,
      city varchar,
      address varchar,
      type varchar,
      createdon timestamp default now(),
      imageurl varchar
      )`;
const createTableFlags = `CREATE TABLE IF NOT EXISTS flags(
  id  serial PRIMARY KEY,
  propertyid integer references properties(id) ON DELETE CASCADE,
  reason varchar,
  description varchar,
  mappoints varchar,
  createdon timestamp default now()
  )`;
const deleteTableUsers = 'DROP TABLE IF EXISTS users';
const deleteTableProperties = 'DROP TABLE IF EXISTS properties';
const deleteTableFlags = 'drop table if exists flags';

export default {
  createTableUsers,
  createTableProperties,
  createTableFlags,
  deleteTableUsers,
  deleteTableFlags,
  deleteTableProperties,
};

