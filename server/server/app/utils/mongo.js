'use strict';

const Mongodb = require('@pick-star/cli-mongodb');

const { MongodbUrl, MongodbName } = require('../../config/db');

module.exports = () => new Mongodb(MongodbUrl, MongodbName);
