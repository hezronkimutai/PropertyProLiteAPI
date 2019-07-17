const createTableUsers = `CREATE TABLE IF NOT EXISTS users(
    id serial PRIMARY KEY,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    phonenumber VARCHAR NOT NULL,
    address VARCHAR NOT NULL,
    isadmin BOOLEAN NOT NULL,
    password VARCHAR NOT NULL,
    profilePic VARCHAR NULL,
    createdon timestamp default now()
    )`;
const createTableProperties = `CREATE TABLE IF NOT EXISTS properties(
      id serial PRIMARY KEY,
      owner integer references users(id) on delete cascade,
      category varchar,
      name varchar,
      reason varchar,
      price varchar,
      state varchar,
      city varchar,
      address varchar,
      sold BOOLEAN NOT NULL,
      map varchar,
      description varchar,
      url varchar,
      createdon timestamp default now() 
      )`;
const deleteTableUsers = 'DROP TABLE IF EXISTS users';
const deleteTableProperties = 'DROP TABLE IF EXISTS properties';

export default {
  createTableProperties,
  createTableUsers,
  deleteTableUsers,
  deleteTableProperties,
};
