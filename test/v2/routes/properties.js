import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import server from '../../../api';
import properties from '../data/properties';
import dotenv from 'dotenv';

dotenv.config();

const config = process.env.secret;

const token = jwt.sign(
  {id:1, isadmin:true, email: 'hez@gmail.com', password: 'HHeezziiee1357' },
  config,
  { expiresIn: '24h',},);
const Token = `Bearer ${  token}`;

const should = chai.should();
chai.use(chaiHttp);






describe('Post a Property', () => {
  it('Should add a valid property to the db', (done) => {
    chai.request(server)
      .post('/api/v2/property/')
      .set('Authorization', Token)
      .send(properties.validProperty)
      .end((_err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('Should add a valid property to the db', (done) => {
    chai.request(server)
      .post('/api/v2/property/')
      .set('Authorization', Token)
      .send(properties.validProperty)
      .end((_err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('Should not add property with invalid category to the db', (done) => {
    chai.request(server)
      .post('/api/v2/property/')
      .set('Authorization', Token)
      .send(properties.invalidCategoryProperty)
      .end((_err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('Should not add a property with invalid reason to the db', (done) => {
    chai.request(server)
      .post('/api/v2/property/')
      .set('Authorization', Token)
      .send(properties.invalidReasonProperty)
      .end((_err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('Should not add a property with invalid state to the db', (done) => {
    chai.request(server)
      .post('/api/v2/property/')
      .set('Authorization', Token)
      .send(properties.invalidStateProperty)
      .end((_err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('Should not add property with invalid city to the db', (done) => {
    chai.request(server)
      .post('/api/v2/property/')
      .set('Authorization', Token)
      .send(properties.invalidCityProperty)
      .end((_err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('Should not add property with invalid map points to the db', (done) => {
    chai.request(server)
      .post('/api/v2/property/')
      .set('Authorization', Token)
      .send(properties.invalidMapProperty)
      .end((_err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('Should not add null property to the db', (done) => {
    chai.request(server)

      .post('/api/v2/property/')
      .set('Authorization', Token)
      .send(properties.nullProperty)
      .end((_err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
describe('Post a flag', () => {
  it('Should add a valid flag to the db', (done) => {
    chai.request(server)
      .post('/api/v2/property/1/')
      .set('Authorization', Token)
      .send(properties.validFlag)
      .end((_err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('Should not add null property to the db', (done) => {
    chai.request(server)
      .post('/api/v2/property/')
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
      .get('/api/v2/property/')
      .end((_err, result) => {
        result.should.have.status(200);
        done();
      });
  });


  it('Should Fecth a single property', (done) => {
    chai.request(server)
      .get('/api/v2/property/1')
      .end((_err, result) => {
        result.should.have.status(200);
        done();
      });
  });

  it('Should Fecth a single property', (done) => {
    chai.request(server)
      .get('/api/v2/property/10')
      .end((_err, result) => {
        result.should.have.status(404);
        done();
      });
  });

  it('Should Fecth a single property type properties', (done) => {
    chai.request(server)
      .get('/api/v2/property/type/Electronics')
      .end((_err, result) => {
        result.should.have.status(200);
        done();
      });
  });
  it('Should not Fecth a single property type that is not found.', (done) => {
    chai.request(server)
      .get('/api/v2/property/type/Elect')
      .end((_err, result) => {
        result.should.have.status(404);
        done();
      });
  });
});

describe('Test manipulate  property', () => {
  it('Should update a property', (done) => {
    chai.request(server)
      .patch('/api/v2/property/1')
      .set('Authorization', Token)
      .send({type:"Thenewcategory"})
      .end((_err, result) => {
        result.should.have.status(201);
        done();
      });
  });
  it('Should mark the property as sold', (done) => {
    chai.request(server)
      .put('/api/v2/property/1/sold')
      .set('Authorization', Token)
      .end((_err, result) => {
        result.should.have.status(201);
        done();
      });
  });
  it('Should not mark the property as sold with string id', (done) => {
    chai.request(server)
      .put('/api/v2/property/uij/sold')
      .set('Authorization', Token)
      .end((_err, result) => {
        result.should.have.status(405);
        done();
      });
  });



  it('Should delete a property', (done) => {
    chai.request(server)
      .delete('/api/v2/property/1')
      .set('Authorization', Token)
      .end((_err, result) => {
        result.should.have.status(201);
        done();
      });
  });
  it('Should delete a user', (done) => {
    chai.request(server)
      .delete('/api/v2/users/1')
      .set('Authorization', Token)
      .end((_err, result) => {
        result.should.have.status(201);
        done();
      });
  });
  it('Should delete a property', (done) => {
    chai.request(server)
      .delete('/api/v2/property/10')
      .set('Authorization', Token)
      .end((_err, result) => {
        result.should.have.status(404);
        done();
      });
  });
  it('Should delete a user', (done) => {
    chai.request(server)
      .delete('/api/v2/users/10')
      .set('Authorization', Token)
      .end((_err, result) => {
        result.should.have.status(404);
        done();
      });
  });
});
