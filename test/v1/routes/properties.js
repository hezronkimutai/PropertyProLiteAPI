import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import records from '../../../api/v1/models';
import server from'../../../api';


let should = chai.should();
chai.use(chaiHttp);

let validProperty = {
    "category": "Electronics",
    "name": "laptop",
    "reason": "sell",
    "price": "7000.00",
    "state": "Tanzania",
    "city": "arusha",
    "address": "76768",
    "map": "90800,89900",
    "description": "A very cool refurbished laptop",
    "url": "https://res.cloudinary.com/hezzie/image/upload/v1561036548/PropertyProLiteAPI/2019-06-20T13:15:46.472Z.png"
}
let invalidCategoryProperty = {
    "category": "56",
    "name": "HP ",
    "reason": "sell",
    "price": "7000.00",
    "state": "Tanzania",
    "city": "arusha",
    "address": "76768",
    "map": "90800,89900",
    "description": "A very cool refurbished laptop",
    "url": "https://res.cloudinary.com/hezzie/image/upload/v1561036548/PropertyProLiteAPI/2019-06-20T13:15:46.472Z.png"
}

let invalidReasonProperty = {
    "category": "Sifn fgle room",
    "name": "Houscbhfxce",
    "reason": "77",
    "price": "7000",
    "state": "tancbvbczania",
    "city": "arusha",
    "address": "76768",
    "map": "90800,89900",
    "description": "Very coovbvbvl house",
    "url": "https://res.cloudinary.com/hezzie/image/upload/v1561036548/PropertyProLiteAPI/2019-06-20T13:15:46.472Z.png"
}
let invalidStateProperty = {
    "category": "Sifn fgle room",
    "name": "Houscbhfxce",
    "reason": "Good reseon",
    "price": "7000",
    "state": "900",
    "city": "arusha",
    "address": "76768",
    "map": "90800,89900",
    "description": "Very coovbvbvl house",
    "url": "https://res.cloudinary.com/hezzie/image/upload/v1561036548/PropertyProLiteAPI/2019-06-20T13:15:46.472Z.png"
}
let invalidCityProperty = {
    "category": "Sifn fgle room",
    "name": "Houscbhfxce",
    "reason": "ghhjj",
    "price": "7000",
    "state": "tancbvbczania",
    "city": "890",
    "address": "76768",
    "map": "90800,89900",
    "description": "Very coovbvbvl house",
    "url": "https://res.cloudinary.com/hezzie/image/upload/v1561036548/PropertyProLiteAPI/2019-06-20T13:15:46.472Z.png"
}

let invalidMapProperty = {
    "category": "Sifn fgle room",
    "name": "Houscbhfxce",
    "reason": "renfhfcbct",
    "price": "7000",
    "state": "tancbvbczania",
    "city": "arusha",
    "address": "76768",
    "map": "9080089900",
    "description": "Very coovbvbvl house",
    "url": "https://res.cloudinary.com/hezzie/image/upload/v1561036548/PropertyProLiteAPI/2019-06-20T13:15:46.472Z.png"
}

let nullProperty = {}

describe('Post a Property', () => {

    it('Should add a valid property to the db', (done) => {
            chai.request(server)
            .post('/api/v1/properties/post-property/')
            .send(validProperty)
            .end((err, res) => {
                res.should.have.status(201);
                done()
            });


    });

    it('Should not add property with invalid category to the db', (done) => {
     chai.request(server)
            .post('/api/v1/properties/post-property/')
            .send(invalidCategoryProperty)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });

    });
    it('Should not add a property with invalid reason to the db', (done) => {
       chai.request(server)
            .post('/api/v1/properties/post-property/')
            .send(invalidReasonProperty)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('Should not add a property with invalid state to the db', (done) => {
      chai.request(server)
            .post('/api/v1/properties/post-property/')
            .send(invalidStateProperty)
            .end((err, res) => {
                res.should.have.status(400);
                  done();
            });


    });
    it('Should not add property with invalid city to the db', (done) => {
      chai.request(server)
            .post('/api/v1/properties/post-property/')
            .send(invalidCityProperty)
            .end((err, res) => {
                res.should.have.status(400);
                  done();
            });



    });
    it('Should not add property with invalid map points to the db', (done) => {
      chai.request(server)
            .post('/api/v1/properties/post-property/')
            .send(invalidMapProperty)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Should not add null property to the db', (done) => {

        chai.request(server)

                    .post('/api/v1/properties/post-property/')
                    .send(nullProperty)
                    .end((err, res) => {
                        res.should.have.status(400);
                        done();
                    });



    });
});

describe('Fetch all properties', () => {

    it('Should Fecth all the properties', (done) => {
  chai.request(server)
            .get('/api/v1/properties/')
            .end((err, result) => {
                result.should.have.status(200);
                done();
              });


    });



    it('Should Fecth a single property', (done) => {
    chai.request(server)
            .post('/api/v1/properties/post-property/')
            .send(validProperty)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } chai.request(server)
                        .get(`/api/v1/properties/${res.body.data.id}`)
                        .end((err, result) => {
                            result.should.have.status(200);
                          });
                      done();

                      });

    });

});


describe('Test manipulate  property', () => {


    let __property = {
        "category": "Sroom",
        "name": "Houscbe",
        "reason": "rencbct",
        "price": "7000",
        "state": "tancbania",
        "city": "arha",
        "address": "76768",
        "map": "90800,800",
        "description": "Veryl house",
        "url": "https://res.cloudinary.com/hezzie/image/upload/v1561036548/PropertyProLiteAPI/2019-06-20T13:15:46.472Z.png"
    };


    it('Should update a property', (done) => {
       chai.request(server)
            .post('/api/v1/properties/post-property/')
            .send(__property)
            .end((err, res) => {
                if (err) {console.log(err);}
                        chai.request(server)
                        .put(`/api/v1/properties/${res.body.data.id}`)
                        .send(__property)
                        .end((err, result) => {
                            if (err) {
                                console.log(err);
                            }
                            result.should.have.status(204);
                          });
                      done();
              });

    });

    it('Should delete a property', (done) => {
      chai.request(server)
            .post('/api/v1/properties/post-property/')
            .send(validProperty)
            .end((err, res) => {
                if (err) {console.log(err);}
                          chai.request(server)
                        .delete(`/api/v1/properties/${res.body.data.id}`)
                        .end((err, result) => {

                            result.should.have.status(204);
                          });
                      done();

              });

    });



});
