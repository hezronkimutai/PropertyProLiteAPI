const fs = require('fs');

function generateRandomId(){
  return Math.floor(Math.random() * 10000);
}

function saveProperties(data){
  return new Promise((resolve, reject) => {
    fs.writeFile('db/properties.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function saveUsers(data){
  return new Promise((resolve, reject) => {
    fs.writeFile('db/users.json', JSON.stringify(data, null, 2), (err) => {
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
function getUsers(){
  return new Promise((resolve, reject) => {
    fs.readFile('db/users.json', 'utf8', (err, data) => {
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
function getProperties(){
  return new Promise((resolve, reject) => {
    fs.readFile('db/properties.json', 'utf8', (err, data) => {
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
async function getProperty(id){
  const properties = await getProperties()
  return properties.find(record => record.id == id);
}


/**
 * Gets a specific user by ID
 * @param {number} id - Accepts the ID of the specified user.
 */
async function getUser(id){
  const users = await getUsers();
  return users.find(record => record.id == id);
}

/**
 * Creates a new user record
 * @param {Object} newRecord - Object containing info for new user: the username, password
 */
  async function createUser(newRecord) {
      const users = await getUsers();

  newRecord.id = generateRandomId();
  users.push(newRecord);
  await saveUsers(users);
  return newRecord;
}

/**
 * Creates a new user record
 * @param {Object} newRecord - Object containing info for new user: the username, password
 */
  async function createProperty(newRecord) {
    const properties = await getProperties()

  newRecord.id = generateRandomId();
  properties.push(newRecord);
  await saveProperties(properties);
  return newRecord;
}




module.exports = {
  getProperties,
  getUsers,
  createUser,
  createProperty,
   getProperty,
   getUser
}
