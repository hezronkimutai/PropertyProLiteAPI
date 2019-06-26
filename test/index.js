
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
chai.use(chaiHttp);
<<<<<<< HEAD

const users = require('./users')
const properties = require('./properties')
=======

const usersv1 = require('./v1/users')
const propertiesv1 = require('./v1/properties')

// const usersv2 = require('./v2/users')
// const propertiesv2 = require('./v2/properties')
>>>>>>> starts #166932722 created  property tests
