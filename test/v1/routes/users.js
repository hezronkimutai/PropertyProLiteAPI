import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import records from '../../../api/v1/models';
import server from'../../../api';
import config from '../../../api/v1/config/config';

import jwt from 'jsonwebtoken';
let token = jwt.sign({"email":"hez@gmail.com","password":"HHeezziiee1357"},
  config.secret,
  { expiresIn: '24h' // expires in 24 hours
  }
);

const Token = "Bearer" + token

let should = chai.should();
chai.use(chaiHttp);

let validUser = {
    "first_name": "Mark",
    "second_name": "Lisaswa",
    "user_name": "Mariko",
    "email": "marik@gmail.com",
    "phone_number": "0937892356",
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
    it('Should respond with a 400 status code while creating a user whose first_name is a number', (done) => {
        let _user = {
            "first_name": '67',
            "second_name": "kimutai",
            "user_name": "hezzie",
            "email": "hez@gmail.com",
            "phone_number": "0937892356",
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
            "first_name": "hezron",
            "second_name": "kimutai",
            "user_name": "hezzie",
            "email": "hez@gmail.com",
            "phone_number": "0937892356",
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
            "first_name": "hezron",
            "second_name": "kimutai",
            "user_name": "hezzie",
            "email": "hez@gmail.com",
            "phone_number": "kimki",
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
            "first_name": "hezron",
            "second_name": "kimutai",
            "user_name": "hezzie",
            "email": "hezgmail.com",
            "phone_number": "0937892356",
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
            .send(validUser)
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

         chai.request(server)
            .post('/api/v1/users/signup/')
            .send(validUser)
            .end((err, res) => {
                if (err) {console.log(err);}
                  chai.request(server)
                        .patch(`/api/v1/users/${res.body.data.id}`)
                        .set("Authorization",Token)
                        .send({"first_name": "ui"})
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
            .send(validUser)
            .end((err, res) => {
                if (err) {console.log(err);}
                    chai.request(server)
                        .delete(`/api/v1/users/${res.body.data.id}`)
                        .set("Authorization",Token)
                        .end((err, result) => {
                            result.should.have.status(204);
                          });
            });
        done();
    });



});
