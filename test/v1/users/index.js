




import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import records from '../../../api/v1/models';
import {app} from'../../../api';


const should = chai.should();
chai.use(chaiHttp);

const user = {
    "firstName": "hezron",
    "secondName": "kimutai",
    "userName": "hezzie",
    "email": "hez@gmail.com",
    "phoneNumber": "0937892356",
    "password": "reqfhgtfhfgjfg",
    "confirmPassword": "reqfhgtfhfgjfg"
};
const user_ = {
    "firstName": "hezron",
    "secondName": "kimutai",
    "userName": "hezziue",
    "email": "huez@gmail.com",
    "phoneNumber": "0936792356",
    "password": "reqfhgtfhfgjfg",
    "confirmPassword": "reqfhgtfhfgjfg"
};
const user__ = {
    "firstName": "hezron",
    "secondName": "kimutai",
    "userName": "hezdie",
    "email": "hedz@gmail.com",
    "phoneNumber": "0978892356",
    "password": "reqfhgtfhfgjfg",
    "confirmPassword": "reqfhgtfhfgjfg"
};
const user___ = {
    "firstName": "hezron",
    "secondName": "kimutai",
    "userName": "hezzieg",
    "email": "hgez@gmail.com",
    "phoneNumber": "0937452356",
    "password": "reqfhgtfhfgjfg",
    "confirmPassword": "reqfhgtfhfgjfg"
};


describe('Signup a user', () => {

    /**
     * TEST USER SIGNUP
     */
    it('Should add user to the db', (done) => {
        chai.request(app)
            .post('/api/v1/users/signup/')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });

    });
});
describe('Fetch all users', () => {
    /**
     * TEST GET ALL USERS
     */


    it('Should Fecth all the users', (done) => {
        chai.request(app)
            .get('/api/v1/users/')
            .end((err, result) => {
                result.should.have.status(200);
                done();
            });
    });



});

describe('Test fetch a single user', () => {





    it('Should Fecth a single user', (done) => {
        /**
         * TEST GET A SINGLE  USER
         */
        chai.request(app)
            .post('/api/v1/users/signup/')
            .send(user_)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    chai.request(app)
                        .get(`/api/v1/users/${res.body.data.id}`)
                        .end((err, result) => {

                            result.should.have.status(200);
                            done();
                        });
                }
            });
    });

});


describe('Test update user', () => {


    const __user = {
        "firstName": "ui",
        "secondName": "fy",
        "userName": "hezzie",
        "email": "kim@gmail.com",
        "phoneNumber": "0937890356",
        "password": "reqfhgtfhfgjfg",
        "confirmPassword": "reqfhgtfhfgjfg"
    };


    it('Should update a user', (done) => {
        /**
         * TEST GET A SINGLE  USER
         */
        chai.request(app)
            .post('/api/v1/users/signup/')
            .send(user__)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    chai.request(app)
                        .put(`/api/v1/users/${res.body.data.id}`)
                        .send(__user)
                        .end((err, result) => {
                            if (err) {
                                console.log(err);
                            }
                            result.should.have.status(204);
                            done();
                        });

                }
            });
    });



});




describe('Test delete user', () => {


    it('Should delete a user', (done) => {
        /**
         * TEST GET A SINGLE  USER
         */
        chai.request(app)
            .post('/api/v1/users/signup/')
            .send(user___)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    chai.request(app)
                        .delete(`/api/v1/users/${res.body.data.id}`)
                        .end((err, result) => {

                            result.should.have.status(204);
                            done();
                        });
                }
            });
    });



});



describe('Test signup with a string first name', () => {

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
        chai.request(app)
            .post('/api/v1/users/signup/')
            .send(_user)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });

    });
});
describe('Creating a user with a short password', () => {

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
        chai.request(app)
            .post('/api/v1/users/signup/')
            .send(_user)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });

    });
});

describe('Test user signup with a string phone number', () => {


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
        chai.request(app)
            .post('/api/v1/users/signup/')
            .send(_user)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });

    });
});

describe('Test signup with non matching passwords', () => {

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
        chai.request(app)
            .post('/api/v1/users/signup/')
            .send(_user)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });

    });
});




describe('Test user signup with an invalid email', () => {


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
        chai.request(app)
            .post('/api/v1/users/signup/')
            .send(_user)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });

    });




});
