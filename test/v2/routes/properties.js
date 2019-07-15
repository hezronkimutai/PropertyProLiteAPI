/* eslint-disable no-undef */
import assert from 'assert'
import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../../../api'
import config from '../../../api/v2/config/config'
// import Token from './users'
import jwt from 'jsonwebtoken'
const token = jwt.sign({ email: 'hez@gmail.com', password: 'HHeezziiee1357' },
  config.secret,
  { expiresIn: '24h'
  }
)
const Token = 'Bearer ' + token

const should = chai.should()
chai.use(chaiHttp)

const validProperty = {
  category: 'Electronics',
  name: 'laptop',
  reason: 'sell',
  price: '7000.00',
  state: 'Tanzania',
  city: 'arusha',
  address: '76768',
  map: '90800,89900',
  description: 'A very cool refurbished laptop',
  url: 'https://res.cloudinary.com/hezzie/image/upload/v2561036548/PropertyProLiteAPI/2019-06-20T13:15:46.472Z.png'
}
const gValidProperty = {
  category: 'Vehicle',
  name: 'mercedees',
  reason: 'sell',
  price: '7000.00',
  state: 'Ethiopia',
  city: 'Addisababa',
  address: '76768',
  map: '90800,89900',
  description: 'A very cool refurbished laptop',
  url: 'https://res.cloudinary.com/hezzie/image/upload/v2561036548/PropertyProLiteAPI/2019-06-20T13:15:46.472Z.png'
}
const tValidProperty = {
  category: 'towns',
  name: 'kibera',
  reason: 'sell',
  price: '7000.00',
  state: 'mtaani',
  city: 'Addisababa',
  address: '76768',
  map: '90800,89900',
  description: 'A very cool refurbished laptop',
  url: 'https://res.cloudinary.com/hezzie/image/upload/v2561036548/PropertyProLiteAPI/2019-06-20T13:15:46.472Z.png'
}
const uValidProperty = {
  category: 'train',
  name: 'Prado',
  reason: 'srent',
  price: '7000.00',
  state: 'Ethiopia',
  city: 'Addisababa',
  address: '76768',
  map: '90800,89900',
  description: 'A very cool refurbished laptop',
  url: 'https://res.cloudinary.com/hezzie/image/upload/v2561036548/PropertyProLiteAPI/2019-06-20T13:15:46.472Z.png'
}
const sValidProperty = {
  category: 'bedrooms',
  name: 'guest',
  reason: 'rent',
  price: '7000.00',
  state: 'chad',
  city: 'itscapital',
  address: '76768',
  map: '90800,89900',
  description: 'cool',
  url: 'https://res.cloudinary.com/hezzie/image/upload/v2561036548/PropertyProLiteAPI/2019-06-20T13:15:46.472Z.png'
}
const dValidProperty = {
  category: 'Aeroplane',
  name: 'mercedees',
  reason: 'sell',
  price: '7000.00',
  state: 'kenya',
  city: 'narobi',
  address: '76768',
  map: '90800,89900',
  description: 'A very cool refurbished laptop',
  url: 'https://res.cloudinary.com/hezzie/image/upload/v2561036548/PropertyProLiteAPI/2019-06-20T13:15:46.472Z.png'
}
const invalidCategoryProperty = {
  category: '56',
  name: 'HP ',
  reason: 'sell',
  price: '7000.00',
  state: 'Tanzania',
  city: 'arusha',
  address: '76768',
  map: '90800,89900',
  description: 'A very cool refurbished laptop',
  url: 'https://res.cloudinary.com/hezzie/image/upload/v2561036548/PropertyProLiteAPI/2019-06-20T13:15:46.472Z.png'
}

const invalidReasonProperty = {
  category: 'Sifn fgle room',
  name: 'Houscbhfxce',
  reason: '77',
  price: '7000',
  state: 'tancbvbczania',
  city: 'arusha',
  address: '76768',
  map: '90800,89900',
  description: 'Very coovbvbvl house',
  url: 'https://res.cloudinary.com/hezzie/image/upload/v2561036548/PropertyProLiteAPI/2019-06-20T13:15:46.472Z.png'
}
const invalidStateProperty = {
  category: 'Sifn fgle room',
  name: 'Houscbhfxce',
  reason: 'Good reseon',
  price: '7000',
  state: '900',
  city: 'arusha',
  address: '76768',
  map: '90800,89900',
  description: 'Very coovbvbvl house',
  url: 'https://res.cloudinary.com/hezzie/image/upload/v2561036548/PropertyProLiteAPI/2019-06-20T13:15:46.472Z.png'
}
const invalidCityProperty = {
  category: 'Sifn fgle room',
  name: 'Houscbhfxce',
  reason: 'ghhjj',
  price: '7000',
  state: 'tancbvbczania',
  city: '890',
  address: '76768',
  map: '90800,89900',
  description: 'Very coovbvbvl house',
  url: 'https://res.cloudinary.com/hezzie/image/upload/v2561036548/PropertyProLiteAPI/2019-06-20T13:15:46.472Z.png'
}

const invalidMapProperty = {
  category: 'Sifn fgle room',
  name: 'Houscbhfxce',
  reason: 'renfhfcbct',
  price: '7000',
  state: 'tancbvbczania',
  city: 'arusha',
  address: '76768',
  map: '9080089900',
  description: 'Very coovbvbvl house',
  url: 'https://res.cloudinary.com/hezzie/image/upload/v2561036548/PropertyProLiteAPI/2019-06-20T13:15:46.472Z.png'
}

const nullProperty = {}

describe('Post a Property', () => {
  it('Should add a valid property to the db', (done) => {
    chai.request(server)
      .post('/api/v2/properties/post-property/')
      .set('Authorization', Token)
      .send(validProperty)
      .end((_err, res) => {
        res.should.have.status(201)
        done()
      })
  })

  it('Should not add property with invalid category to the db', (done) => {
    chai.request(server)
      .post('/api/v2/properties/post-property/')
      .set('Authorization', Token)
      .send(invalidCategoryProperty)
      .end((_err, res) => {
        res.should.have.status(400)
        done()
      })
  })
  it('Should not add a property with invalid reason to the db', (done) => {
    chai.request(server)
      .post('/api/v2/properties/post-property/')
      .set('Authorization', Token)
      .send(invalidReasonProperty)
      .end((_err, res) => {
        res.should.have.status(400)
        done()
      })
  })
  it('Should not add a property with invalid state to the db', (done) => {
    chai.request(server)
      .post('/api/v2/properties/post-property/')
      .set('Authorization', Token)
      .send(invalidStateProperty)
      .end((_err, res) => {
        res.should.have.status(400)
        done()
      })
  })
  it('Should not add property with invalid city to the db', (done) => {
    chai.request(server)
      .post('/api/v2/properties/post-property/')
      .set('Authorization', Token)
      .send(invalidCityProperty)
      .end((_err, res) => {
        res.should.have.status(400)
        done()
      })
  })
  it('Should not add property with invalid map points to the db', (done) => {
    chai.request(server)
      .post('/api/v2/properties/post-property/')
      .set('Authorization', Token)
      .send(invalidMapProperty)
      .end((_err, res) => {
        res.should.have.status(400)
        done()
      })
  })

  it('Should not add null property to the db', (done) => {
    chai.request(server)

      .post('/api/v2/properties/post-property/')
      .set('Authorization', Token)
      .send(nullProperty)
      .end((_err, res) => {
        res.should.have.status(400)
        done()
      })
  })
})

describe('Fetch  properties', () => {
  it('Should Fecth all the properties', (done) => {
    chai.request(server)
      .get('/api/v2/properties/')
      .end((_err, result) => {
        result.should.have.status(200)
        done()
      })
  })

  // it('Should not Fecth a null property', (done) => {
  //   chai.request(server)
  //     .get('/api/v2/properties/5')
  //     .end((_err, result) => {
  //       result.should.have.status(404)
  //       done()
  //     })
  // })

  // it('Should not Fecth a null property type', (done) => {
  //   chai.request(server)
  //     .get('/api/v2/properties/type/fuy')
  //     .end((_err, result) => {
  //       result.should.have.status(404)
  //       done()
  //     })
  // })

  it('Should Fecth a single property', (done) => {
    chai.request(server)
      .get(`/api/v2/properties/1`)
      .end((_err, result) => {
        result.should.have.status(200)
        done()
      })
  })

  // it('Should Fecth a single property type', (done) => {
  //   chai.request(server)
  //     .post('/api/v2/properties/post-property/')
  //     .set('Authorization', Token)
  //     .send(tValidProperty)
  //     .end((err, res) => {
  //       if (err) {
  //         console.log(err)
  //       } chai.request(server)
  //         .get(`/api/v2/properties/type/${res.body.data.category}`)
  //         .end((_err, result) => {
  //           result.should.have.status(200)
  //           done()
  //         })
  //     })
  // })
})

describe('Test manipulate  property', () => {
//   it('Should update a property', (done) => {
//     chai.request(server)
//       .post('/api/v2/properties/post-property/')
//       .set('Authorization', Token)
//       .send(uValidProperty)
//       .end((err, res) => {
//         if (err) { console.log(err)}

  //         chai.request(server)
  //           .patch(`/api/v2/properties/${res.body.data.id}`)
  //           .set('Authorization', Token)
  //           .send({ category: 'Sroom' })
  //           .end((err, result) => {
  //             if (err) {
  //               console.log(err)
  //             }
  //             result.should.have.status(201)
  //             done()
  //           })
  //       })
  //   })

  //   it('Should mark a property a sold', (done) => {
  //     chai.request(server)
  //       .post('/api/v2/properties/post-property/')
  //       .set('Authorization', Token)
  //       .send(sValidProperty)
  //       .end((err, res) => {
  //         if (err) { console.log(err)}

  //         chai.request(server)
  //           .put(`/api/v2/properties/sold/${res.body.data.id}`)
  //           .set('Authorization', Token)
  //           .end((err, result) => {
  //             if (err) {
  //               console.log(err)
  //             }
  //             result.should.have.status(201)
  //             done()
  //           })
  //       })
  //   })

  it('Should delete a property', (done) => {
    chai.request(server)
      .delete(`/api/v2/properties/1`)
      .set('Authorization', Token).end((_err, result) => {
        result.should.have.status(201)
        done()
      })
  })
})
