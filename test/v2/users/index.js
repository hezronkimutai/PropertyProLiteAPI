const chai = require('chai');
const server = require('../../../api');
const superagent = require('superagent');

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


    it('Should add user to the db', () => {
        return async (done) => {
            try {

                await chai.request(server)

                    .post('/api/v2/users/signup/')
                    .send(user)
                    .end((err, res) => {
                        should.exist(res);
                        res.should.have.status(201);

                    });

                done();
            } catch (err) {
                done(err);
            }
        }

    });

    it('Should Fecth all the users', () => {
        return async (done) => {
            try {
                await chai.request(server)

                    .get('/api/v2/users/')
                    .end((err, result) => {
                        result.should.have.status(200);

                    });
                done();
            } catch (err) {
                done(err);
            }
        }


    });

    it('Should respond with a 400 status code while creating a user whose passwords are not equal', () => {
        const _user = {
            "firstName": "hezron",
            "secondName": "kimutai",
            "userName": "hezzieq",
            "email": "hezq@gmail.com",
            "phoneNumber": "0937891356",
            "password": "reqfdhdf",
            "confirmPassword": "reqiuuu"
        };
        return async (done) => {
            try {

                await chai.request(server)

                    .post('/api/v2/users/signup/')
                    .send(_user)
                    .end((err, res) => {
                        res.should.have.status(400);
                    });

                done();
            } catch (err) {
                done(err);
            }
        }



    });
    it('Should respond with a 400 status code while creating a user whose phone number is a string', () => {
        const _user = {
            "firstName": "hezron",
            "secondName": "kimutai",
            "userName": "hezziew",
            "email": "hezw@gmail.com",
            "phoneNumber": "kimki",
            "password": "requiui",
            "confirmPassword": "requiui"
        };

        return async (done) => {
            try {
                await chai.request(server)

                    .post('/api/v2/users/signup/')
                    .send(_user)
                    .end((err, res) => {
                        res.should.have.status(400);
                    });
                done();
            } catch (err) {
                done(err);
            }
        }



    });

    it('Should respond with a 400 status code while creating a user whose email is invalid', () => {
        const _user = {
            "firstName": "hezron",
            "secondName": "kimutai",
            "userName": "hezziee",
            "email": "heezgmail.com",
            "phoneNumber": "0934492356",
            "password": "req",
            "confirmPassword": "req"
        };
        return async (done) => {
            try {
                await chai.request(server)

                    .post('/api/v2/users/signup/')
                    .send(_user)
                    .end((err, res) => {
                        res.should.have.status(400);
                    });
                done();
            } catch (err) {
                done(err);
            }
        }



    });
    it('Should respond with a 400 status code while creating a user whose password is less than 6', () => {
        const _user = {
            "firstName": "hezron",
            "secondName": "kimutai",
            "userName": "hezzire",
            "email": "herz@gmail.com",
            "phoneNumber": "0933392356",
            "password": "req",
            "confirmPassword": "req"
        };

        return async (done) => {
            try {
                await chai.request(server)

                    .post('/api/v2/users/signup/')
                    .send(_user)
                    .end((err, res) => {
                        res.should.have.status(400);
                    });
                done();
            } catch (err) {
                done(err);
            }
        }


    });

    it('Should respond with a 400 status code while creating a user whose firstname is a number', () => {
        const _user = {
            "firstName": '67',
            "secondName": "kimutai",
            "userName": "hezziet",
            "email": "hezzietz@gmail.com",
            "phoneNumber": "0777892356",
            "password": "reqfhgtfhfgjfg",
            "confirmPassword": "reqfhgtfhfgjfg"
        };

        return async (done) => {
            try {
                await chai.request(server)

                    .post('/api/v2/users/signup/')
                    .send(_user)
                    .end((err, res) => {
                        res.should.have.status(400);
                    });
                done();
            } catch (err) {
                done(err);
            }
        }

    });

    it('Should delete a user', () => {
        /**
         * TEST GET A SINGLE  USER
         */
         return async (done) => {
             try {
                 await chai.request(server)
            .post('/api/v2/users/signup/')
            .send(user)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                }
                return async (done) => {
                    try {
                        await chai.request(server)

                            .delete(`/api/v2/users/${res.body.data.id}`)
                            .end((err, result) => {

                                result.should.have.status(204);
                            });
                        done();
                    } catch (err) {
                        done(err);
                    }
                }


            });
        done();
      } catch (err) {
          done(err);
      }
      }
    });



    it('Should update a user', () => {

        const __user = {
            "firstName": "ui",
            "secondName": "fy",
            "userName": "hezzie",
            "email": "kim@gmail.com",
            "phoneNumber": "0937890356",
            "password": "reqfhgtfhfgjfg",
            "confirmPassword": "reqfhgtfhfgjfg"
        };

        return async (done) => {
            try {
              await chai.request(server)
            .post('/api/v2/users/signup/')
            .send(user)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    return async (done) => {
                        try {
                            await chai.request(server)

                                .put(`/api/v2/users/${res.body.data.id}`)
                                .send(__user)
                                .end((err, result) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    result.should.have.status(204);

                                });
                            done();
                        } catch (err) {
                            done(err);
                        }
                    }
                }
            });
        done();

      } catch (err) {
          done(err);
      }}
    });


    it('Should Fecth a single user', () => {
        /**
         * TEST GET A SINGLE  USER
         */
         return async (done) => {
             try {
               await chai.request(server)
            .post('/api/v2/users/signup/')
            .send(user)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                }
                return async (done) => {
                    try {
                        await chai.request(server)

                            .get(`/api/v2/users/${res.body.data.id}`)
                            .end((err, result) => {

                                result.should.have.status(200);

                            });
                        done();
                    } catch (err) {
                        done(err);
                    }
                }

            });
        done();
      } catch (err) {
          done(err);
      }}
    });

});
