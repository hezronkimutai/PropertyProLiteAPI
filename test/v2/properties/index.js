const chai = require('chai');
const server = require('../../../app');


const propertyy = {
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


describe('Create property', () => {

    it('Should add property to the test db', () => {

        return async (done) => {
            try {
                await chai.request(server)

                    .post('/api/v2/properties/post-property/')
                    .send(propertyy)
                    .end((err, res) => {
                        res.should.have.status(201);

                    });
                done();
            } catch (err) {
                done(err);
            }
        }
    });


    it('Should Fecth all the properties', () => {

        return async (done) => {
            try {
                await chai.request(server)

                    .get('/api/v2/properties/')
                    .end((err, result) => {
                        result.should.have.status(200);
                    });
                done();
            } catch (err) {
                done(err);
            }
        }




    });

    it('Should Fecth a single property', () => {


        return async (done) => {
            try {
                await chai.request(server)

                    .post('/api/v2/properties/post-property/')
                    .send(property)
                    .end((err, res) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log(res.body);
                        return async (done) => {
                            try {
                                await chai.request(server)

                                    .get(`/api/v2/properties/${res.body.data.id}`)
                                    .end((err, result) => {

                                        result.should.have.status(200);

                                    });
                                done();
                            } catch (err) {
                                done(err);
                            }
                        }
                    });
                done();
            } catch (err) {
                done(err);
            }
        }

    });



    it('Should update a property', () => {
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




        return async (done) => {
            try {
                await chai.request(server)

                    .post('/api/v2/properties/post-property/')
                    .send(__property)
                    .end((err, res) => {
                        if (err) {
                            console.log(err);
                        } else {
                            return async (done) => {
                                try {
                                    await chai.request(server)
                                        .put(`/api/v2/properties/${res.body.data.id}`)
                                        .send(__property)
                                        .end((err, result) => {
                                            if (err) {
                                                console.log(err);
                                            }
                                            result.should.have.status(204);
                                        });
                                    done();
                                } catch (err) {
                                    done(err);
                                }
                            }

                        }
                    });
                done();
            } catch (err) {
                done(err);
            }
        }




    });

    it('Should delete a property', () => {
        return async (done) => {
            try {
                await chai.request(server)

                    .post('/api/v2/properties/post-property/')
                    .send(property)
                    .end((err, res) => {
                        if (err) {
                            console.log(err);
                        } else {
                            return async (done) => {
                                try {
                                    await chai.request(server)

                                        .delete(`/api/v2/properties/${res.body.data.id}`)
                                        .end((err, result) => {

                                            result.should.have.status(204);
                                            done();
                                        });
                                    done();
                                } catch (err) {
                                    done(err);
                                }
                            }
                        }
                    });
                done();
            } catch (err) {
                done(err);
            }
        }


    });
});
