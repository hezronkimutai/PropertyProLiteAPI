const bcrypt = require('bcrypt');
const saltRounds = 10;

import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();
const en = process.env.NODE_ENV


// const env = process.env.NODE_ENV
const db = en === 'test' ? 'dbtest' : 'db';
function generateRandomId() {
  return Math.floor(Math.random() * 10000);
}

function saveProperties(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${db}/properties.json`, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function saveUsers(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${db}/users.json`, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Gets all users
 * @param None
 */
function getUsers() {

  return new Promise((resolve, reject) => {
    fs.readFile(`${db}/users.json`, 'utf8', (err, data) => {

      if (err) {

        reject(err);
      } else {

        const json = JSON.parse(data);
        resolve(json);
      }
    });
  });
}

/**
 * Gets all Users
 * @param None
 */
function getProperties() {
  return new Promise((resolve, reject) => {
    fs.readFile(`${db}/properties.json`, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const json = JSON.parse(data);
        resolve(json);
      }
    });
  });
}


/**
 * Gets a specific property by ID
 * @param {number} id - Accepts the ID of the specified property.
 */
async function getProperty(id) {

  const properties = await getProperties();
  return properties.find(record => record.id == id);
}

/**
 * Gets a specific property type
 * @param {string} type - Accepts the type of the specified property.
 */
async function getPropertyType(category) {
  const properties = await getProperties();
  const onePropertyType = [];

  properties.forEach(await function (item) {
    if (item.category === category) {
      onePropertyType.push(item);
    }
  });
  return onePropertyType;
}


/**
 * Gets a specific user by ID
 * @param {number} id - Accepts the ID of the specified user.
 */
async function getUser(id) {
  const users = await getUsers();
  return users.find(record => record.id == id);
}

/**
 * Creates a new user record
 * @param {Object} newRecord - Object containing info for new user: the username, password
 */

async function createUser(newRecord) {
  let salt =  bcrypt.genSaltSync(saltRounds)
  let hashedPassword = bcrypt.hashSync(newRecord.password,salt);
  const users = await getUsers();
  newRecord.password = hashedPassword;
  newRecord.id = generateRandomId();
  newRecord.date = new Date().toJSON().slice(0,19).replace('T',':');
  newRecord.profile_picture = "";
  users.push(newRecord);
  await saveUsers(users);
  return newRecord;
}

/**
 * Creates a new user record
 * @param {Object} newRecord - Object containing info for new user: the username, password
 */
async function createProperty(newRecord) {

  const properties = await getProperties();

  newRecord.id = generateRandomId();
  newRecord.sold = false;
  newRecord.date = new Date().toJSON().slice(0,19).replace('T',':');
  properties.push(newRecord);
  await saveProperties(properties);
  return newRecord;
}

/**
 * Updates a property
 * @param {Object} newProperty - Object containing info for updated property: the username, password
 */
async function updateProperty(res, newProperty) {

  let properties = await getProperties();
  let property = await getProperty(newProperty.id)
    if (property){
      properties.pop(property);
      properties.push(newProperty);
      await saveProperties(properties);

    }

}

/**
 * Updates a user
 * @param {Object} newUser - Object containing info for updated user: the username, password
 */
async function updateUser(newUser) {
  const users = await getUsers();
  let user = await getUser(newUser.id)
    if(user){
      users.pop(user);
      users.push(newUser);
      await saveUsers(users);
    }
}

/**
 * Deletes a single Property
 * @param {Object} property - Accepts record to be deleted.
 */
async function deleteProperty(property) {
  const allProperties = await getProperties();
  const properties = allProperties.filter(record => record.id !== property.id);
  await saveProperties(properties);
}

/**
 * Deletes a single Property
 * @param {Object} user - Accepts record to be deleted.
 */
async function deleteUser(user) {
  const allUsers = await getUsers();
  const users = allUsers.filter(record => record.id !== user.id);
  await saveUsers(users);
}


async function clearDb() {
  const allProperties = await getProperties();
  const allUsers = await getUsers();
  const properties = [];
  const users = [];
  await saveUsers(users);
  await saveProperties(properties);
}


module.exports = {
  clearDb,
  getProperties,
  getUsers,
  createUser,
  createProperty,
  getProperty,
  getUser,
  updateProperty,
  updateUser,
  deleteProperty,
  deleteUser,
  getPropertyType,
};
require('make-runnable');
