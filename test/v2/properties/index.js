// const records = require('../../../api/v2/models');
const chai = require('chai');
const server = require('../../../app');
const property ={
            "category": "Sifn fgle room",
            "name": "Houscbhfxce",
            "reason": "renfhfcbct",
            "price": "7000",
            "state": "tancbvbczania",
            "city": "arusha",
            "address": "76768",
            "map": "90800,89900",
            "description": "Very coovbvbvl house",
            "url": "https://res.cloudinary.com/hezzie/image/upload/v1561036548/PropertyProLiteAPI/2019-06-20T13:15:46.472Z.png"
        }


describe('properties', () => {



  before(async function() {
    // runs before each test in this block

    await records.createTables();
  });

  after(async function() {
    // runs before each test in this block
    await records.dropTables();
  });

  /**
  * TEST USER SIGNUP
  */
  it('Should add property to the db', (done) => {
    chai.request(server)
      .post('/api/v2/properties/post-property/')
      .send(property)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });

  });

    });

    describe('properties', () => {
  /**
  * TEST GET ALL USERS
  */
  before(async function() {
    // runs before each test in this block

    await records.createTables();
  });

  after(async function() {
    // runs before each test in this block
    await records.dropTables();
  });

  it('Should Fecth all the properties', (done) => {

    chai.request(server)
      .get('/api/v2/properties/')
      .end((err, result) => {
        result.should.have.status(200);
        done();
      });
  });



  });
