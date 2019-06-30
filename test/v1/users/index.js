const records = require('../../../api/v1/models');
const chai = require('chai');
const server = require('../../../api');
const user = {
    "firstName": "hezron",
    "secondName": "kimutai",
    "userName": "hezzie",
    "email": "hez@gmail.com",
    "phoneNumber": "0937892356",
    "password": "reqfhgtfhfgjfg",
    "confirmPassword": "reqfhgtfhfgjfg"
};


describe('Signup a user', () => {



    before(async function() {
        // runs before each test in this block
        await records.deleteAllUsers();
    });

    after(async function() {
        // runs before each test in this block
        await records.deleteAllUsers();
    });

    /**
     * TEST USER SIGNUP
     */
    it('Should add user to the db', (done) => {
        chai.request(server)
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

    before(async function() {
        // runs before each test in this block
        await records.deleteAllUsers();
    });

    after(async function() {
        // runs before each test in this block
        await records.deleteAllUsers();
    });


    it('Should Fecth all the users', (done) => {
        chai.request(server)
            .get('/api/v1/users/')
            .end((err, result) => {
                result.should.have.status(200);
                done();
            });
    });



});

describe('Test fetch a single user', () => {




    before(async function() {
        // runs before each test in this block
        await records.deleteAllUsers();
    });

    after(async function() {
        // runs before each test in this block
        await records.deleteAllUsers();
    });



    it('Should Fecth a single user', (done) => {
        /**
         * TEST GET A SINGLE  USER
         */
        chai.request(server)
            .post('/api/v1/users/signup/')
            .send(user)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    chai.request(server)
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


    before(async function() {
        // runs before each test in this block
        await records.deleteAllUsers();
    });

    after(async function() {
        // runs before each test in this block
        await records.deleteAllUsers();
    });

    it('Should update a user', (done) => {
        /**
         * TEST GET A SINGLE  USER
         */
        chai.request(server)
            .post('/api/v1/users/signup/')
            .send(user)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
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

                }
            });
    });



});




describe('Test delete user', () => {


    before(async function() {
        // runs before each test in this block
        await records.deleteAllUsers();
    });

    after(async function() {
        // runs before each test in this block
        await records.deleteAllUsers();
    });

    it('Should delete a user', (done) => {
        /**
         * TEST GET A SINGLE  USER
         */
        chai.request(server)
            .post('/api/v1/users/signup/')
            .send(user)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    chai.request(server)
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
    before(async function() {
        // runs before each test in this block
        await records.deleteAllUsers();
    });

    after(async function() {
        // runs before each test in this block
        await records.deleteAllUsers();
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
            .post('/api/v1/users/signup/')
            .send(_user)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });

    });
});
describe('Creating a user with a short password', () => {
    before(async function() {
        // runs before each test in this block
        await records.deleteAllUsers();
    });

    after(async function() {
        // runs before each test in this block
        await records.deleteAllUsers();
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
            .post('/api/v1/users/signup/')
            .send(_user)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });

    });
});

describe('Test user signup with a string phone number', () => {
    before(async function() {
        // runs before each test in this block
        await records.deleteAllUsers();
    });

    after(async function() {
        // runs before each test in this block
        await records.deleteAllUsers();
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
            .post('/api/v1/users/signup/')
            .send(_user)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });

    });
});

describe('Test signup with non matching passwords', () => {
    before(async function() {
        // runs before each test in this block
        await records.deleteAllUsers();
    });

    after(async function() {
        // runs before each test in this block
        await records.deleteAllUsers();
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
            .post('/api/v1/users/signup/')
            .send(_user)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });

    });
});




describe('Test user signup with an invalid email', () => {
    before(async function() {
        // runs before each test in this block
        await records.deleteAllUsers();
    });

    after(async function() {
        // runs before each test in this block
        await records.deleteAllUsers();
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
            .post('/api/v1/users/signup/')
            .send(_user)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });

    });




});
