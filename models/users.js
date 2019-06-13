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
function getUsers(){
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
 * Creates a new user record
 * @param {Object} newRecord - Object containing info for new user: the username, password
 */
async function createUser(newRecord) {
  const users = await getUsers();

  newRecord.id = generateRandomId();
  users.records.push(newRecord);
  await save(users);
  return newRecord;
}

module.exports = {
  getUsers,
  createUser,
}
