'use strict';

module.exports = log;

const npmlog = require('npmlog');
npmlog.level = process.env.DEBUG_ ? process.env.DEBUG_ : 'info';
function log() {
  npmlog.heading = '姚头';
  npmlog.addLevel('success', 3000);
  npmlog.success('123123');
}
