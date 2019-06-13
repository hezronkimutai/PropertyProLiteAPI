const fs = require('fs');

function generateRandomId(){
  return Math.floor(Math.random() * 10000);
}

function save(data){
  return new Promise((resolve, reject) => {
    fs.writeFile('db/data.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Gets all Users
 * @param None
 */
function getData(){
  return new Promise((resolve, reject) => {
    fs.readFile('db/data.json', 'utf8', (err, data) => {
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
  const gdb =  await getData()
  const properties = gdb.properties;
  return properties.find(record => record.id == id);
}
/**
 * Gets a specific user by ID
 * @param {number} id - Accepts the ID of the specified user.
 */
async function getUser(id){
  const gdb =  await getData()
  const users = gdb.users;
  return users.find(record => record.id == id);
}

/**
 * Creates a new user record
 * @param {Object} newRecord - Object containing info for new user: the username, password
 */
  async function createUser(newRecord) {
    const gdb =  await getData()
    const users = gdb.users;

  newRecord.id = generateRandomId();
  users.push(newRecord);
  await save(users);
  return newRecord;
}

/**
 * Creates a new user record
 * @param {Object} newRecord - Object containing info for new user: the username, password
 */
  async function createProperty(newRecord) {
    const gdb =  await getData()
    const properties = gdb.properties;

  newRecord.id = generateRandomId();
  properties.push(newRecord);
  await save(properties);
  return newRecord;
}




module.exports = {
  getData,
  createUser,
  createProperty,
   getProperty,
   getUser
}
