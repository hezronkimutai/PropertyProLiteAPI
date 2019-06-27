const records = require('../../../api/v2/models');
const chai = require('chai');
const server = require('../../../app');

const userr = {
    "firstName": "hezron",
    "secondName": "kimutai",
    "userName": "hezie",
    "email": "hz@gmail.com",
    "phoneNumber": "0937092356",
    "password": "reqfhgtfhfgjfg",
    "confirmPassword": "reqfhgtfhfgjfg"
};


describe('Create  user', () => {


    after(async function() {
        await records.dropTables();
    });
    it('Should add user to the db', (done) => {
        records.createTables();
        chai.request(server)
            .post('/api/v2/users/signup/')
            .send(userr)
            .end((err, res) => {

                res.should.have.status(201);
                done();
            });
    });

    it('Should Fecth all the users', (done) => {
      records.createTables();
      chai.request(server)
          .get('/api/v2/users/')
          .end((err, result) => {
              result.should.have.status(200);
              done();
          });
    });



});
