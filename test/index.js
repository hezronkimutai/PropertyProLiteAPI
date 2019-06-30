import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';

const should = chai.should();
chai.use(chaiHttp);

import usersv1 from'./v1/users';
import propertiesv1 from './v1/properties';

import usersv2 from './v2/users';
import propertiesv2 from './v2/properties';
