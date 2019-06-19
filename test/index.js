const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const should = chai.should();
chai.use(chaiHttp);
const records = require('../api/v1/models');


describe('CRUD OPERATIONS', () => {
  /**
  * TEST USER SIGNUP
  */
  it('Should add user to the db', (done) => {
    const user ={
    "firstName": "hezron",
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
        res.should.have.status(201);
      });
    done();
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

  it('Should respond with a 400 status code while creating a user whose passwords are not equal', (done) => {
    const user ={
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
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
      });
    done();
  });



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
    /**
    * TEST GET A SINGLE  USER
    */
    const user = {
    "firstName": "ui",
    "secondName": "fy",
    "userName": "hezzie",
    "email": "re.qo@dy",
    "phoneNumber": "0937892356",
    "password": "reqfhgtfhfgjfg",
    "confirmPassword": "reqfhgtfhfgjfg"
};
    chai.request(server)
      .post('/api/v1/users/signup/')
      .send(user)
      .end((err, res) => {
        chai.request(server)
          .get(`/api/v1/users/${res.body.id}`)
          .end((err, result) => {
            result.should.have.status(200);
            done();
          });
      });
  });


  it('Should Update Partcular user Only', (done) => {
    const updatedUser =  {
    "firstName": "ui",
    "secondName": "fy",
    "userName": "hezzie",
    "email": "re.qo@dy",
    "phoneNumber": "0937892356",
    "password": "reqfhgtfhfgjfg",
    "confirmPassword": "reqfhgtfhfgjfg"
};
    const user =  {
    "firstName": "ui",
    "secondName": "fy",
    "userName": "hezzie",
    "email": "re.qo@dy",
    "phoneNumber": "0937892356",
    "password": "reqfhgtfhfgjfg",
    "confirmPassword": "reqfhgtfhfgjfg"
};
    chai.request(server)
      .post('/api/v1/users/signup/')
      .send(user)
      .end((err, res) => {
        chai.request(server)
          .put(`/api/v1/users/${res.body.id}`)
          .send(updatedUser)
          .end((err, result) => {
            result.should.have.status(204);
            done();
          });
      });
  });

  it('Should Delete Particular User', (done) => {
    const user = {
    "firstName": "ui",
    "secondName": "fy",
    "userName": "hezzie",
    "email": "re.qo@dy",
    "phoneNumber": "0937892356",
    "password": "reqfhgtfhfgjfg",
    "confirmPassword": "reqfhgtfhfgjfg"
};
    chai.request(server)
      .post('/api/v1/users/signup/')
      .send(user)
      .end((err, res) => {
        chai.request(server)
          .put(`/api/v1/users/${res.body.id}`)
          .end((err, result) => {
            result.should.have.status(204);
            done();
          });
      });
  });


  // it('Should add property to the db', (done) => {
  //   const property = {
  //     url: 'toyota',
  //     name: 'vitz',
  //     state:'',
  //     city:'',
  //     address:'',
  //     description:'',
  //     map:'',
  //     price:'',
  //     reason:'',
  //     category:''
  //   };
  //   chai.request(server)
  //     .post('/api/v1/properties/post-property/')
  //     .send(property)
  //     .end((err, res) => {
  //       res.should.have.status(201);
  //       done();
  //     });
  // });
  //
  // it('Should Fecth all the properties', (done) => {
  //   chai.request(server)
  //     .get('/api/v1/properties/')
  //     .end((err, result) => {
  //       result.should.have.status(200);
  //       done();
  //     });
  // });
  //
  // it('Should Fecth a single property', (done) => {
  //   const property = {
  //     url: 'toyota',
  //     name: 'vitz',
  //     state:'',
  //     city:'',
  //     address:'',
  //     description:'',
  //     map:'',
  //     price:'',
  //     reason:'',
  //     category:''
  //   };
  //   chai.request(server)
  //     .post('/api/v1/properties/post-property/')
  //     .send(property)
  //     .end((err, res) => {
  //       chai.request(server)
  //         .get(`/api/v1/properties/${res.body.id}`)
  //         .end((err, result) => {
  //           result.should.have.status(200);
  //           done();
  //         });
  //     });
  // });
  //
  // it('Should Update Partcular Property Only', (done) => {
  //   const property = {
  //     url: 'toyota',
  //     name: 'vitz',
  //     state:'',
  //     city:'',
  //     address:'',
  //     description:'',
  //     map:'',
  //     price:'',
  //     reason:'',
  //     category:''
  //   };
  //   const updatedProperty = {
  //     url: 'toyota',
  //     name: 'vitz',
  //     state:'',
  //     city:'',
  //     address:'',
  //     description:'',
  //     map:'',
  //     price:'',
  //     reason:'',
  //     category:''
  //   };
  //   chai.request(server)
  //     .post('/api/properties/post-property/')
  //     .send(property)
  //     .end((err, res) => {
  //       chai.request(server)
  //         .put(`/api/properties/${res.body.id}`)
  //         .send(updatedProperty)
  //         .end((err, result) => {
  //           result.should.have.status(204);
  //           done();
  //         });
  //     });
  // });
  //
  // it('Should Delete Particular Property', (done) => {
  //   const property = {
  //     url: 'toyota',
  //     name: 'vitz',
  //     state:'',
  //     city:'',
  //     address:'',
  //     description:'',
  //     map:'',
  //     price:'',
  //     reason:'',
  //     category:''
  //   };
  //   chai.request(server)
  //     .post('/api/properties/post-property/')
  //     .send(property)
  //     .end((err, res) => {
  //       chai.request(server)
  //         .delete(`/api/properties/${res.body.id}`)
  //         .end((err, result) => {
  //           result.should.have.status(204);
  //           done();
  //         });
  //     });
  // });
});
