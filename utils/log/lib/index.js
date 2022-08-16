'use strict';

module.exports = log;

const npmlog = require('npmlog');
function log() {
  npmlog.info('cli', 'test');
}
