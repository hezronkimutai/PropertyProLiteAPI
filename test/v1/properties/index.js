const records = require('../../../api/v1/models');
const chai = require('chai');
const server = require('../../../app');
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


describe('Post a Property', () => {



    beforeEach(async function() {
        // runs before each test in this block
        await records.deleteAllProperties();
    });

    afterEach(async function() {
        // runs before each test in this block
        await records.deleteAllProperties();
    });


    /**
     * TEST USER SIGNUP
     */
    it('Should add property to the db', (done) => {
        chai.request(server)
            .post('/api/v1/properties/post-property/')
            .send(property)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });

    });
});
describe('Fetch all properties', () => {
    /**
     * TEST GET ALL USERS
     */

    it('Should Fecth all the properties', (done) => {
        chai.request(server)
            .get('/api/v1/properties/')
            .end((err, result) => {
                result.should.have.status(200);
                done();
            });
    });



});

describe('Test fetch a single property', () => {




    beforeEach(async function() {
        // runs before each test in this block
        await records.deleteAllProperties();
    });

    afterEach(async function() {
        // runs before each test in this block
        await records.deleteAllProperties();
    });


    it('Should Fecth a single property', (done) => {
        /**
         * TEST GET A SINGLE  USER
         */
        chai.request(server)
            .post('/api/v1/properties/post-property/')
            .send(property)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    chai.request(server)
                        .get(`/api/v1/properties/${res.body.data.id}`)
                        .end((err, result) => {

                            result.should.have.status(200);
                            done();
                        });
                }
            });
    });

});


describe('Test update property', () => {


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


    beforeEach(async function() {
        // runs before each test in this block
        await records.deleteAllProperties();
    });

    afterEach(async function() {
        // runs before each test in this block
        await records.deleteAllProperties();
    });

    it('Should update a property', (done) => {
        /**
         * TEST GET A SINGLE  USER
         */
        chai.request(server)
            .post('/api/v1/properties/post-property/')
            .send(__property)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    chai.request(server)
                        .put(`/api/v1/properties/${res.body.data.id}`)
                        .send(__property)
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




describe('Property', () => {


    beforeEach(async function() {
        // runs before each test in this block
        await records.deleteAllProperties();
    });

    afterEach(async function() {
        // runs before each test in this block
        await records.deleteAllProperties();
    });

    it('Should delete a property', (done) => {
        /**
         * TEST GET A SINGLE  USER
         */
        chai.request(server)
            .post('/api/v1/properties/post-property/')
            .send(property)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    chai.request(server)
                        .delete(`/api/v1/properties/${res.body.data.id}`)
                        .end((err, result) => {

                            result.should.have.status(204);
                            done();
                        });
                }
            });
    });



});
