'use strict';

const npmlog = require('npmlog');
npmlog.heading = 'yaotou';
npmlog.headingStyle = { fg: 'red', bg: 'blue' };
npmlog.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info';
module.exports = npmlog;
