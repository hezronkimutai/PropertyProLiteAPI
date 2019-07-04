import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import records from '../../../api/v1/models';
import server from'../../../api';


const should = chai.should();
chai.use(chaiHttp);

const property = {
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
const _property = {
    "category": "56",
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

const __property = {
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
const ___property = {
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
const ____property = {
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

const property_map = {
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



describe('Post a Property', () => {

    it('Should add property to the db', (done) => {
            chai.request(server)
            .post('/api/v1/properties/post-property/')
            .send(property)
            .end((err, res) => {
                res.should.have.status(201);
                done()
            });


    });

    it('Should add property to the db', (done) => {
     chai.request(server)
            .post('/api/v1/properties/post-property/')
            .send(_property)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });

    });
    it('Should add property to the db', (done) => {
       chai.request(server)
            .post('/api/v1/properties/post-property/')
            .send(__property)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('Should add property to the db', (done) => {
      chai.request(server)
            .post('/api/v1/properties/post-property/')
            .send(___property)
            .end((err, res) => {
                res.should.have.status(400);
                  done();
            });


    });
    it('Should add property to the db', (done) => {
      chai.request(server)
            .post('/api/v1/properties/post-property/')
            .send(____property)
            .end((err, res) => {
                res.should.have.status(400);
                  done();
            });



    });
    it('Should add property with invalid map points to the db', (done) => {
      chai.request(server)
            .post('/api/v1/properties/post-property/')
            .send(property_map)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Should not add null property to the db', (done) => {
const _property_ = {}
        chai.request(server)

                    .post('/api/v1/properties/post-property/')
                    .send(_property_)
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
            .send(property)
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


    const __property = {
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
            .send(property)
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