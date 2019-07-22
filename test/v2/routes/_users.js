import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import server from '../../../api';
import users from '../data/users';

dotenv.config();

const config = process.env.secret;

const token = jwt.sign(
  {
    id:1,
  firstname: 'hezron',
  lastname: 'kimutai',
  username: 'hjiye',
  email: 'hj@gmail.com',
  phonenumber: '8888888888',
  address: '979790790',
  isadmin: true,
  password: 'rtTT45$ty@',
},
  config,
  { expiresIn: '24h',},);


const should = chai.should();
chai.use(chaiHttp);

const tk = {tk:""}
const Token = `Bearer ${  token}`;
describe('Signup a user', () => {
  it('Should add user to the db', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signup/')
      .send(users.validUser)
      .end((_err, res) => {
        tk.tk =res.body.data.token
        res.should.have.status(201);
        done();
      });
  });
  it('Should not add null user to the db', (done) => {
    
    chai.request(server)
      .post('/api/v2/auth/signup/')
      .send({})
      .end((_err, res) => {
        res.should.have.status(400);
        done();
      });
     
  });
 
  it('Should not add a user with an invalid username to the database', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signup/')
      .send(users.inValidNameUser)
      .end((_err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('Should not add a user with an invalid password to the db', (done) => {


    chai.request(server)
      .post('/api/v2/auth/signup/')
      .send(users.inValidPasswordUser)
      .end((_err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('Should not add a user with an invalid phone number to the db', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signup/')
      .send(users.inValidPhoneUser)
      .end((_err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('Should not add a user with an invalid email to the db', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signup/')
      .send(users.inValidEmailUser)
      .end((_err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
describe('User login', () => {
  it('Should login a user with valid credentials', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signin')
      .send(users.validLoginUser)
      .end((_err, result) => {
       
        result.should.have.status(201);
        done();
      });
  });
  it('Should not login a user with invalid credentials', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signin')
      .send(users.inValidLoginUser)
      .end((_err, result) => {
        result.should.have.status(400);
        done();
      });
  });
});

describe('Test fetch users', () => {
  it('Should Fecth all the users', (done) => {
    chai.request(server)
      .get('/api/v2/users/')
      .set('Authorization', Token)
      .end((_err, result) => {
        result.should.have.status(200);
        done();
      });
  });
  it('Should Fecth a single user', (done) => {
    chai.request(server)
      .get('/api/v2/users/1')
      .set('Authorization', Token)
      .end((_err, result) => {
        result.should.have.status(200);
        done();
      });
  });
  it('Should Fecth a single user', (done) => {
    chai.request(server)
      .get('/api/v2/users/10')
      .set('Authorization', Token)
      .end((_err, result) => {
        result.should.have.status(404);
        done();
      });
  });
});

describe('Test manipulte a user', () => {
  it('Should update a user', (done) => {
    chai.request(server)
      .patch('/api/v2/users/1')
      .set('Authorization', Token)
      .send({ firstname: 'ui' })
      .end((err, result) => {  
        result.should.have.status(201);
        done();
      });
  });



});

describe('Test all 403', () => {
  it('Should catch all 403', (done) => {
    chai.request(server)
      .get('/')
      .end((_err, result) => {
        result.should.have.status(403);
        done();
      });
  });

});
