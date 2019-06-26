
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
chai.use(chaiHttp);

const users = require('./users')
const properties = require('./properties')
