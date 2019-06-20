const fs = require('fs');

function generateRandomId() {
  return Math.floor(Math.random() * 10000);
}

function saveProperties(data) {
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

function saveUsers(data) {
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
function getUsers() {
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
function getProperties() {
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
async function getProperty(id) {

  const properties = await getProperties();
  return properties.find(record => record.id == id);
}

/**
 * Gets a specific property type
 * @param {string} type - Accepts the type of the specified property.
 */
async function getPropertyType(type) {
  const properties = await getProperties();
  const onePropertyType = [];

  properties.forEach(await function (item) {
    console.log(item);
    if (item.propertyType === type) {
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
  const properties = await getProperties();

  newRecord.id = generateRandomId();
  properties.push(newRecord);
  await saveProperties(properties);
  return newRecord;
}

/**
 * Updates a property
 * @param {Object} newProperty - Object containing info for updated property: the username, password
 */
async function updateProperty(newProperty) {
  const properties = await getProperties();
  const property = properties.find(record => record.id === newProperty.id);

  property.propertyName = newProperty.propertyName;
  property.propertyType = newProperty.propertyType;

  await saveProperties(properties);
}

/**
 * Updates a user
 * @param {Object} newUser - Object containing info for updated user: the username, password
 */
async function updateUser(newUser) {
  const users = await getUsers();
  const user = users.find(record => record.id === newUser.id);

  user.username = newUser.username;
  user.password = newUser.password;

  await saveUsers(users);
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


module.exports = {
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