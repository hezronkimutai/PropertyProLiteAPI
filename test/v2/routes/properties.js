import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import server from '../../../api';
import properties from '../data/properties';
import dotenv from 'dotenv';

dotenv.config();

const config = process.env.secret;

const token = jwt.sign(
  { email: 'hez@gmail.com', password: 'HHeezziiee1357' },
  config,
  { expiresIn: '24h',},);
const Token = `Bearer ${  token}`;

const should = chai.should();
chai.use(chaiHttp);



describe('Post a Property', () => {
  it('Should add a valid property to the db', (done) => {
    chai.request(server)
      .post('/api/v2/properties/post-property/')
      .set('Authorization', Token)
      .send(properties.validProperty)
      .end((_err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('Should not add property with invalid category to the db', (done) => {
    chai.request(server)
      .post('/api/v2/properties/post-property/')
      .set('Authorization', Token)
      .send(properties.invalidCategoryProperty)
      .end((_err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('Should not add a property with invalid reason to the db', (done) => {
    chai.request(server)
      .post('/api/v2/properties/post-property/')
      .set('Authorization', Token)
      .send(properties.invalidReasonProperty)
      .end((_err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('Should not add a property with invalid state to the db', (done) => {
    chai.request(server)
      .post('/api/v2/properties/post-property/')
      .set('Authorization', Token)
      .send(properties.invalidStateProperty)
      .end((_err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('Should not add property with invalid city to the db', (done) => {
    chai.request(server)
      .post('/api/v2/properties/post-property/')
      .set('Authorization', Token)
      .send(properties.invalidCityProperty)
      .end((_err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('Should not add property with invalid map points to the db', (done) => {
    chai.request(server)
      .post('/api/v2/properties/post-property/')
      .set('Authorization', Token)
      .send(properties.invalidMapProperty)
      .end((_err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('Should not add null property to the db', (done) => {
    chai.request(server)

      .post('/api/v2/properties/post-property/')
      .set('Authorization', Token)
      .send(properties.nullProperty)
      .end((_err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('Fetch  properties', () => {
  it('Should Fecth all the properties', (done) => {
    chai.request(server)
      .get('/api/v2/properties/')
      .end((_err, result) => {
        result.should.have.status(200);
        done();
      });
  });


  it('Should Fecth a single property', (done) => {
    chai.request(server)
      .get('/api/v2/properties/1')
      .end((_err, result) => {
        result.should.have.status(200);
        done();
      });
  });
});

describe('Test manipulate  property', () => {
  it('Should delete a property', (done) => {
    chai.request(server)
      .delete('/api/v2/properties/1')
      .set('Authorization', Token).end((_err, result) => {
        result.should.have.status(201);
        done();
      });
  });
});
