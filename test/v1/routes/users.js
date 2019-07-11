




import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import records from '../../../api/v1/models';
import server from'../../../api';


let should = chai.should();
chai.use(chaiHttp);

let validUser = {
    "firstName": "Mark",
    "secondName": "Lisaswa",
    "userName": "Mariko",
    "email": "marik@gmail.com",
    "phoneNumber": "0937892356",
    "address": "0980989",
    "password": "reqfhgtfhfgjfg"
};
let uValidUser = {
    "firstName": "hezron",
    "secondName": "kimutai",
    "userName": "hezikiah",
    "email": "bosire@gmail.com",
    "phoneNumber": "0837092356",
    "address": "0980989",
    "password": "reqfhgtfhfgjfg"
};
let dValidUser = {
    "firstName": "Denis",
    "secondName": "Oliech",
    "userName": "Deno",
    "email": "Deno@gmail.com",
    "phoneNumber": "0937892356",
    "address": "0980989",
    "password": "reqfhgtfhfgjfg"
};
let sValidUser = {
    "firstName": "hezron",
    "secondName": "kimutai",
    "userName": "hjkezziue",
    "email": "hueuiz@gmail.com",
    "phoneNumber": "7936792356",
    "address": "0980989",
    "password": "reqfhgtfhfgjfg"
};
let nullUser = {};

describe('Signup a user', () => {
    it('Should add user to the db', (done) => {
     chai.request(server)
            .post('/api/v1/users/signup/')
            .send(validUser)
            .end((err, res) => {
                res.should.have.status(201);
              });
            done();
    });


    it('Should not add null user to the db', (done) => {
      chai.request(server)
            .post('/api/v1/users/signup/')
            .send(nullUser)
            .end((err, res) => {
                res.should.have.status(400);
              });
            done();

    });
    it('Should respond with a 400 status code while creating a user whose firstname is a number', (done) => {
        let _user = {
            "firstName": '67',
            "secondName": "kimutai",
            "userName": "hezzie",
            "email": "hez@gmail.com",
            "phoneNumber": "0937892356",
            "address": "0980989",
            "password": "reqfhgtfhfgjfg"
        };
        chai.request(server)
            .post('/api/v1/users/signup/')
            .send(_user)
            .end((err, res) => {
                res.should.have.status(400);
              });
            done();
    });
    it('Should respond with a 400 status code while creating a user whose password is less than 6', (done) => {
        let _user = {
            "firstName": "hezron",
            "secondName": "kimutai",
            "userName": "hezzie",
            "email": "hez@gmail.com",
            "phoneNumber": "0937892356",
            "address": "0980989",
            "password": "req"
        };

             chai.request(server)
            .post('/api/v1/users/signup/')
            .send(_user)
            .end((err, res) => {
                res.should.have.status(400);
              });
            done();
    });
    it('Should respond with a 400 status code while creating a user whose phone number is a string', (done) => {
        let _user = {
            "firstName": "hezron",
            "secondName": "kimutai",
            "userName": "hezzie",
            "email": "hez@gmail.com",
            "phoneNumber": "kimki",
            "address": "0980989",
            "password": "requiui"
        };
        chai.request(server)
            .post('/api/v1/users/signup/')
            .send(_user)
            .end((err, res) => {
                res.should.have.status(400);
              });
            done();
    });
    it('Should respond with a 400 status code while creating a user whose email is invalid', (done) => {
        let _user = {
            "firstName": "hezron",
            "secondName": "kimutai",
            "userName": "hezzie",
            "email": "hezgmail.com",
            "phoneNumber": "0937892356",
            "address": "0980989",
            "password": "req"
        };
        chai.request(server)
            .post('/api/v1/users/signup/')
            .send(_user)
            .end((err, res) => {
                res.should.have.status(400);
              });
            done();
    });
});
describe('Test fetch users users', () => {
    it('Should Fecth all the users', (done) => {
      chai.request(server)
              .get('/api/v1/users/')
              .end((err, result) => {
                  result.should.have.status(200);
                });
              done();
    });
    it('Should Fecth a single user', (done) => {
      chai.request(server)
            .post('/api/v1/users/signup/')
            .send(sValidUser)
            .end((err, res) => {
                if (err) {console.log(err);}
                     chai.request(server)
                        .get(`/api/v1/users/${res.body.data.id}`)
                        .end((err, result) => {
                            result.should.have.status(200);
                          });

            });
            done();
    });


});




describe('Test manipulte a user', () => {
    it('Should update a user', (done) => {
      let __user = {
          "firstName": "ui",
          "secondName": "fy",
          "userName": "hezzie",
          "email": "kim@gmail.com",
          "phoneNumber": "0937890356",
          "address": "0980989",
          "password": "reqfhgtfhfgjfg"
      };
         chai.request(server)
            .post('/api/v1/users/signup/')
            .send(uValidUser)
            .end((err, res) => {
                if (err) {console.log(err);}
                  chai.request(server)
                        .put(`/api/v1/users/${res.body.data.id}`)
                        .send(__user)
                        .end((err, result) => {
                            if (err) {
                                console.log(err);
                            }
                            result.should.have.status(204);
                          });
            });
            done();
    });


    it('Should delete a user', (done) => {
        chai.request(server)
            .post('/api/v1/users/signup/')
            .send(dValidUser)
            .end((err, res) => {
                if (err) {console.log(err);}
                    chai.request(server)
                        .delete(`/api/v1/users/${res.body.data.id}`)
                        .end((err, result) => {
                            result.should.have.status(204);
                          });
            });
        done();
    });



});
