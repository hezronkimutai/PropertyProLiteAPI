const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const should = chai.should();
chai.use(chaiHttp);
const records = require('../api/v1/models');


const user ={
"firstName": "hezron",
"secondName": "kimutai",
"userName": "hezzie",
"email": "hez@gmail.com",
"phoneNumber": "0937892356",
"password": "reqfhgtfhfgjfg",
"confirmPassword": "reqfhgtfhfgjfg"
};


describe('Users', () => {



  beforeEach(async function() {
    // runs before each test in this block
    await records.deleteAllUsers();
  });

  afterEach(async function() {
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



  });

  describe('User', () => {




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
          if(err){
            console.log(err);
          }else{
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


  describe('User', () => {


    const updateduser =  {
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
            if(err){
              console.log(err);
            }else{
              chai.request(server)
                .put(`/api/v1/users/${res.body.data.id}`)
                .send(updateduser)
                .end((err, result) => {
                  if(err){
                    console.log(err);
                  }
                  console.log("-------here-----",res.body.data)
                  result.should.have.status(204);
                  done();
                });

            }
          });
      });



});





              describe('User', () => {


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
                          if(err){
                            console.log(err);
                          }else{
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



describe('Users 400', () => {
  before(async function() {
    // runs before each test in this block
    await records.deleteAllUsers();
  });

  after(async function() {
    // runs before each test in this block
    await records.deleteAllUsers();
  });
  it('Should respond with a 400 status code while creating a user whose firstname is a number', (done) => {
    const user ={
    "firstName": "67",
    "secondName": "kimutai",
    "userName": "hezzie",
    "email": "hez@gmail.com",
    "phoneNumber": "0937892356",
    "password": "reqfhgtfhfgjfg",
    "confirmPassword": "reqfhgtfhfgjfg"
};
    chai.request(server)
      .post('/api/v1/users/signup/')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
      });
    done();
  });



        it('Should respond with a 400 status code while creating a user whose password is less than 6', (done) => {
          const user ={
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
            .send(user)
            .end((err, res) => {
              res.should.have.status(400);
            });
          done();
        });


        it('Should respond with a 400 status code while creating a user whose phone number is a string', (done) => {
          const user ={
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
            .send(user)
            .end((err, res) => {
              res.should.have.status(400);
            });
          done();
        });

      //   it('Should respond with a 400 status code while creating a user whose passwords are not equal', (done) => {
      //     const user ={
      //     "firstName": "hezron",
      //     "secondName": "kimutai",
      //     "userName": "hezzie",
      //     "email": "hez@gmail.com",
      //     "phoneNumber": "0937892356",
      //     "password": "reqfdhdf",
      //     "confirmPassword": "reqiuuu"
      // };
      //     chai.request(server)
      //       .post('/api/v1/users/signup/')
      //       .send(user)
      //       .end((err, res) => {
      //         res.should.have.status(400);
      //       });
      //     done();
      //   });



        it('Should respond with a 400 status code while creating a user whose email is invalid', (done) => {
          const user ={
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
            .send(user)
            .end((err, res) => {
              res.should.have.status(400);
            });
          done();
        });






  });







  describe('Properties', () => {
    const property ={
      "category": "electronics",
      "name": "nokia-2",
      "reason": "sell",
      "price": "450000",
      "state": "Kenya",
      "city": "Nairobi",
      "address": "8977",
      "map": "675,786",
      "description": "Very nice android phone",
      "url":"req.body.url"
};

    /**
    * TEST USER SIGNUP
    */
    it('Should add property to the db', (done) => {

      chai.request(server)
        .post('/api/v1/properties/post-property/')
        .send(property)
        .end((err, res) => {
          res.should.have.status(201);
        });
      done();
    });



  });
