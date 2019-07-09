




import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import records from '../../../api/v1/models';
import server from'../../../api';


const should = chai.should();
chai.use(chaiHttp);

const user = {
    "firstName": "hezron",
    "secondName": "kimutai",
    "userName": "hezzie",
    "email": "hez@gmail.com",
    "phoneNumber": "0937892356",
    "userAddress" : "8977879798789",
    "password": "reqfhgtfhfgjfg",
    "confirmPassword": "reqfhgtfhfgjfg"
};
const user_ = {
    "firstName": "hezron",
    "secondName": "kimutai",
    "userName": "hezziue",
    "email": "huez@gmail.com",
    "phoneNumber": "0936792356",
    "userAddress" : "8977879798789",
    "password": "reqfhgtfhfgjfg",
    "confirmPassword": "reqfhgtfhfgjfg"
};
const user__ = {
    "firstName": "hezron",
    "secondName": "kimutai",
    "userName": "hezdie",
    "email": "hedz@gmail.com",
    "phoneNumber": "0978892356",
    "userAddress" : "8977879798789",
    "password": "reqfhgtfhfgjfg",
    "confirmPassword": "reqfhgtfhfgjfg"
};
const user___ = {
    "firstName": "hezron",
    "secondName": "kimutai",
    "userName": "hezzieg",
    "email": "hgez@gmail.com",
    "phoneNumber": "0937452356",
    "userAddress" : "8977879798789",
    "password": "reqfhgtfhfgjfg",
    "confirmPassword": "reqfhgtfhfgjfg"
};
const _user_ = {};


describe('Signup a user', () => {

    /**
     * TEST USER SIGNUP
     */
    it('Should add user to the db', (done) => {
     chai.request(server)
            .post('/api/v1/users/signup/')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
              });
                  done();

    });


    it('Should not add null user to the db', (done) => {
      chai.request(server)
            .post('/api/v1/users/signup/')
            .send(_user_)
            .end((err, res) => {
                res.should.have.status(400);
              });
                  done();

    });


        it('Should respond with a 400 status code while creating a user whose firstname is a number', (done) => {
            const _user = {
                "firstName": '67',
                "secondName": "kimutai",
                "userName": "hezzie",
                "email": "hez@gmail.com",
                "phoneNumber": "0937892356",
                "userAddress" : "8977879798789",
                "password": "reqfhgtfhfgjfg",
                "confirmPassword": "reqfhgtfhfgjfg"
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
            const _user = {
                "firstName": "hezron",
                "secondName": "kimutai",
                "userName": "hezzie",
                "email": "hez@gmail.com",
                "phoneNumber": "0937892356",
                "userAddress" : "8977879798789",
                "password": "req",
                "confirmPassword": "req"
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
            const _user = {
                "firstName": "hezron",
                "secondName": "kimutai",
                "userName": "hezzie",
                "email": "hez@gmail.com",
                "phoneNumber": "kimki",
                "userAddress" : "8977879798789",
                "password": "requiui",
                "confirmPassword": "requiui"
            };
            chai.request(server)
                .post('/api/v1/users/signup/')
                .send(_user)
                .end((err, res) => {
                    res.should.have.status(400);
                  });
                      done();
        });

        it('Should respond with a 400 status code while creating a user whose passwords are not equal', (done) => {
            const _user = {
                "firstName": "hezron",
                "secondName": "kimutai",
                "userName": "hezzie",
                "email": "hez@gmail.com",
                "phoneNumber": "0937892356",
                "userAddress" : "8977879798789",
                "password": "reqfdhdf",
                "confirmPassword": "reqiuuu"
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
            const _user = {
                "firstName": "hezron",
                "secondName": "kimutai",
                "userName": "hezzie",
                "email": "hezgmail.com",
                "phoneNumber": "0937892356",
                "userAddress" : "8977879798789",
                "password": "req",
                "confirmPassword": "req"
            };
            chai.request(server)
                .post('/api/v1/users/signup/')
                .send(_user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                  });


        });



});
describe('Test fetch users users', () => {
    /**
     * TEST GET ALL USERS
     */


    it('Should Fecth all the users', (done) => {
    chai.request(server)
            .get('/api/v1/users/')
            .end((err, result) => {
                result.should.have.status(200);
                done();
              });


    });



        it('Should Fecth a single user', (done) => {
          chai.request(server)
                .post('/api/v1/users/signup/')
                .send(user_)
                .end((err, res) => {
                    if (err) {console.log(err);}
                         chai.request(server)
                            .get(`/api/v1/users/${res.body.data.id}`)
                            .end((err, result) => {
                                result.should.have.status(200);
                                  done();
                              });

                });



        });


});




describe('Test manipulte a user', () => {


    const __user = {
        "firstName": "ui",
        "secondName": "fy",
        "userName": "hezzie",
        "email": "kim@gmail.com",
        "phoneNumber": "0937890356",
        "userAddress" : "8977879798789",
        "password": "reqfhgtfhfgjfg",
        "confirmPassword": "reqfhgtfhfgjfg"
    };


    it('Should update a user', (done) => {
         chai.request(server)
            .post('/api/v1/users/signup/')
            .send(user__)
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
                            done();
                          });
            });
    });


    it('Should delete a user', (done) => {
        chai.request(server)
            .post('/api/v1/users/signup/')
            .send(user___)
            .end((err, res) => {
                if (err) {console.log(err);}
                    chai.request(server)
                        .delete(`/api/v1/users/${res.body.data.id}`)
                        .end((err, result) => {
                            result.should.have.status(204);
                            done();
                          });
            });

    });



});
