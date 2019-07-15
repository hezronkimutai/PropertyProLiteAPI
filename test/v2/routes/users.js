import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../../../api'
import config from '../../../api/v2/config/config'

import jwt from 'jsonwebtoken'
const token = jwt.sign({ email: 'hez@gmail.com', password: 'HHeezziiee1357' },
  config.secret,
  { expiresIn: '24h'
  }
)
const Token = 'Bearer' + token

chai.use(chaiHttp)

const validUser = {
  first_name: 'Mark',
  last_name: 'Lisaswa',
  user_name: 'Mariko',
  email: 'marik@gmail.com',
  phone_number: '0987665566',
  address: '0980989',
  is_admin: true,
  password: 're%@u&@#23ERfg'
}
const lValidUser = {
  first_name: 'Mark',
  last_name: 'Lisaswa',
  user_name: 'Marikotaman',
  email: 'mariktaman@gmail.com',
  phone_number: '0989965566',
  is_admin: true,
  address: '0980989',
  password: 're%@u&@#23ERfg'
}
const lInValidUser = {
  first_name: 'Mark',
  last_name: 'Lisaswa',
  user_name: 'Mariman',
  email: 'marman@gmail.com',
  phone_number: '0989900566',
  is_admin: true,
  address: '0980989',
  password: 're%@u&@#23ERfg'
}
const dValidUser = {
  first_name: 'Mark',
  last_name: 'Lisaswa',
  user_name: 'Mako',
  email: 'mik@gmail.com',
  phone_number: '0987765566',
  is_admin: true,
  address: '0980989',
  password: 're%@u&@#23ERfg'
}
const gValidUser = {
  first_name: 'Mark',
  last_name: 'Lisaswa',
  user_name: 'Marlliko',
  email: 'mkkarik@gmail.com',
  phone_number: '0987664466',
  is_admin: true,
  address: '0980989',
  password: 're%@u&@#23ERfg'
}
const uValidUser = {
  first_name: 'Mark',
  last_name: 'Lisaswa',
  user_name: 'Mppariko',
  email: 'mauuyrik@gmail.com',
  phone_number: '9870005566',
  is_admin: true,
  address: '0980989',
  password: 're%@u&@#23ERfg'
}

const nullUser = {}
const inValidEmailUser = {
  first_name: 'hezron',
  last_name: 'kimutai',
  user_name: 'hezzieinvalidemail',
  email: 'invalidemail',
  phone_number: '8888888888',
  is_admin: true,
  address: '0980989',
  password: 're%@u&@#23ERfg'
}
const inValidPhoneUser = {
  first_name: 'hezron',
  last_name: 'kimutai',
  user_name: 'he',
  email: 'he@gmail.com',
  phone_number: 'kimki',
  address: '0980989',
  is_admin: true,
  password: 're%#23ERfg'
}
// describe('Signup a user', () => {
//   it('Should add user to the db', (done) => {
//     chai.request(server)
//       .post('/api/v2/users/signup/')
//       .send(validUser)
//       .end((_err, res) => {
//         res.should.have.status(201)
//         done()
//       })
//   })

//   it('Should not add null user to the db', (done) => {
//     chai.request(server)
//       .post('/api/v2/users/signup/')
//       .send(nullUser)
//       .end((_err, res) => {
//         res.should.have.status(400)
//         done()
//       })
//   })
//   it('Should respond with a 400 status code while creating a user whose first_name is a number', (done) => {
//     const _user = {
//       first_name: '67',
//       last_name: 'kimutai',
//       user_name: 'hezzie',
//       email: 'hez@gmail.com',
//       phone_number: '0937892356',
//       address: '0980989',
//       is_admin: true,
//       password: 're%#23ERfg'
//     }
//     chai.request(server)
//       .post('/api/v2/users/signup/')
//       .send(_user)
//       .end((_err, res) => {
//         res.should.have.status(400)
//         done()
//       })
//   })
//   it('Should respond with a 400 status code while creating a user whose password is less than 6', (done) => {
//     const _user = {
//       first_name: 'hezron',
//       last_name: 'kimutai',
//       user_name: 'hezzie',
//       email: 'hez@gmail.com',
//       phone_number: '0937892356',
//       address: '0980989',
//       is_admin: true,
//       password: 'req'
//     }

//     chai.request(server)
//       .post('/api/v2/users/signup/')
//       .send(_user)
//       .end((_err, res) => {
//         res.should.have.status(400)
//         done()
//       })
//   })
//   it('Should respond with a 400 status code while creating a user with invalid phone_number', (done) => {
//     chai.request(server)
//       .post('/api/v2/users/signup/')
//       .send(inValidPhoneUser)
//       .end((_err, res) => {
//         res.should.have.status(400)
//         done()
//       })
//   })
//   it('Should respond with a 400 status code while creating a user whose email is invalid', (done) => {
//     chai.request(server)
//       .post('/api/v2/users/signup/')
//       .send(inValidEmailUser)
//       .end((_err, res) => {
//         res.should.have.status(400)
//         done()
//       })
//   })
// })

describe('Test fetch users users', () => {
  it('Should Fecth all the users', (done) => {
    chai.request(server)
      .get('/api/v2/users/')
      .end((_err, result) => {
        result.should.have.status(200)
        done()
      })
  })
  // it('Should Fecth a single user', (done) => {
  //   chai.request(server)
  //     .post('/api/v2/users/signup/')
  //     .send(gValidUser)
  //     .end((err, res) => {
  //       if (err) { console.log(err) }
  //       chai.request(server)
  //         .get(`/api/v2/users/${res.body.data.id}`)
  //         .end((_err, result) => {
  //           result.should.have.status(200)
  //           done()
  //         })
  //     })
  // })
  // it('Should not Fecth a non existing single user', (done) => {
  //   chai.request(server)
  //     .get(`/api/v2/users/89`)
  //     .set('Authorization', Token)
  //     .end((_err, result) => {
  //       result.should.have.status(200)
  //       done()
  //     })
  // })
})

// describe('Test manipulte a user', () => {
//   it('Should update a user', (done) => {
//     chai.request(server)
//       .post('/api/v2/users/signup/')
//       .send(uValidUser)
//       .end((err, res) => {
//         if (err) { console.log(err) }
//         chai.request(server)
//           .patch(`/api/v2/users/${res.body.data.id}`)
//           .set('Authorization', Token)
//           .send({ first_name: 'ui' })
//           .end((err, result) => {
//             if (err) {
//               console.log(err)
//             }
//             result.should.have.status(200)
//             done()
//           })
//       })
//   })

//   it('Should delete a user', (done) => {
//     chai.request(server)
//       .post('/api/v2/users/signup/')
//       .send(dValidUser)
//       .end((err, res) => {
//         if (err) { console.log(err) }
//         chai.request(server)
//           .delete(`/api/v2/users/${res.body.data.id}`)
//           .set('Authorization', Token)
//           .end((_err, result) => {
//             result.should.have.status(200)
//             done()
//           })
//       })
//   })
// })
// describe('Test User login', () => {
//   it('Should login a user with valid inputs', (done) => {
//     chai.request(server)
//       .post('/api/v2/users/signup/')
//       .send(lValidUser)
//       .end((err) => {
//         if (err) { console.log(err) }
//         chai.request(server)
//           .post(`/api/v2/users/login`)
//           .send({ email: 'mariktaman@gmail.com', password: 're%@u&@#23ERfg' })
//           .end((err, result) => {
//             if (err) {
//               console.log(err)
//             }
//             result.should.have.status(201)
//             done()
//           })
//       })
//   })

//   it('Should not login a user with invalid inputs', (done) => {
//     chai.request(server)
//       .post('/api/v2/users/signup/')
//       .send(lInValidUser)
//       .end((err) => {
//         if (err) { console.log(err) }
//         chai.request(server)
//           .post(`/api/v2/users/login`)
//           .send({ email: 'man@gmail.com', password: 're%@u&@#23ERfg' })
//           .end((err, result) => {
//             if (err) {
//               console.log(err)
//             }
//             result.should.have.status(400)
//             done()
//           })
//       })
//   })
// })

// describe('Test all 404 and 500', () => {
//   it('Should catch all 404', (done) => {
//     chai.request(server)
//       .get('/')
//       .end((_err, result) => {
//         result.should.have.status(500)
//         done()
//       })
//   })
//   it('Should catch all 500', (done) => {
//     chai.request(server)
//       .get('/api/v2/users-fivehundred')
//       .end((_err, result) => {
//         result.should.have.status(500)
//         done()
//       })
//   })
// })
