// const records = require('../../../api/v2/models');
const chai = require('chai');
const server = require('../../../app');

const user ={
"firstName": "hezron",
"secondName": "kimutai",
"userName": "hezzie",
"email": "hez@gmail.com",
"phoneNumber": "0937892356",
"password": "reqfhgtfhfgjfg",
"confirmPassword": "reqfhgtfhfgjfg"
};


describe('Create  user', () => {


  before(async function() {
    await records.dropTables();
    await records.createTables();
  });

  after(async function() {
    await records.dropTables();
  });
  it('Should add user to the db', (done) => {
    chai.request(server)
      .post('/api/v2/users/signup/')
      .send(user)
      .end((err, res) => {

        res.should.have.status(201);
        done();
      });
});
  });

describe('Get users', () => {
  before(async function() {
      await records.dropTables();
    await records.createTables();
  });

  after(async function() {
    await records.dropTables();
  });

  it('Should Fecth all the users', (done) => {

    chai.request(server)
      .get('/api/v2/users/')
      .end((err, result) => {
        result.should.have.status(200);
        done();
      });
  });



  });
