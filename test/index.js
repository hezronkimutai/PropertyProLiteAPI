
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
chai.use(chaiHttp);

const usersv1 = require('./v1/users')
const propertiesv1 = require('./v1/properties')

// const usersv2 = require('./v2/users')
// const propertiesv2 = require('./v2/properties')
