const chai = require('chai');
const server = require('../../../app');

const user = {
    "firstName": "hezron",
    "secondName": "kimutai",
    "userName": "hezie",
    "email": "hz@gmail.com",
    "phoneNumber": "0937092356",
    "password": "reqfhgtfhfgjfg",
    "confirmPassword": "reqfhgtfhfgjfg"
};


describe('Create  user', () => {


    it('Should add user to the db', (done) => {
        chai.request(server)
            .post('/api/v2/users/signup/')
            .send(user)
            .end((err, res) => {

                res.should.have.status(201);
              });
              done();
    });

    it('Should Fecth all the users', (done) => {
      chai.request(server)
          .get('/api/v2/users/')
          .end((err, result) => {
              result.should.have.status(200);
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
            "password": "reqfdhdf",
            "confirmPassword": "reqiuuu"
        };
        chai.request(server)
            .post('/api/v2/users/signup/')
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
            "password": "requiui",
            "confirmPassword": "requiui"
        };
        chai.request(server)
            .post('/api/v2/users/signup/')
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
            "password": "req",
            "confirmPassword": "req"
        };
        chai.request(server)
            .post('/api/v2/users/signup/')
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
            "password": "req",
            "confirmPassword": "req"
        };
        chai.request(server)
            .post('/api/v2/users/signup/')
            .send(_user)
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
            "password": "reqfhgtfhfgjfg",
            "confirmPassword": "reqfhgtfhfgjfg"
        };
        chai.request(server)
            .post('/api/v2/users/signup/')
            .send(_user)
            .end((err, res) => {
                res.should.have.status(400);
            });
            done();
    });

    it('Should delete a user', (done) => {
        /**
         * TEST GET A SINGLE  USER
         */
        chai.request(server)
            .post('/api/v2/users/signup/')
            .send(user)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    chai.request(server)
                        .delete(`/api/v2/users/${res.body.data.id}`)
                        .end((err, result) => {

                            result.should.have.status(204);
                          });
                          done();
                }
            });
              done();
    });



        it('Should update a user', (done) => {

              const __user = {
                  "firstName": "ui",
                  "secondName": "fy",
                  "userName": "hezzie",
                  "email": "kim@gmail.com",
                  "phoneNumber": "0937890356",
                  "password": "reqfhgtfhfgjfg",
                  "confirmPassword": "reqfhgtfhfgjfg"
              };


            chai.request(server)
                .post('/api/v2/users/signup/')
                .send(user)
                .end((err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        chai.request(server)
                            .put(`/api/v2/users/${res.body.data.id}`)
                            .send(__user)
                            .end((err, result) => {
                                if (err) {
                                    console.log(err);
                                }
                                result.should.have.status(204);

                            });
                              done();
                    }
                });
                  done();
        });


        it('Should Fecth a single user', (done) => {
            /**
             * TEST GET A SINGLE  USER
             */
            chai.request(server)
                .post('/api/v2/users/signup/')
                .send(user)
                .end((err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        chai.request(server)
                            .get(`/api/v2/users/${res.body.data.id}`)
                            .end((err, result) => {

                                result.should.have.status(200);
                                done();
                            });
                    }
                });
        });

});
