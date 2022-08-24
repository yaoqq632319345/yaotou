'use strict';

const npmlog = require('npmlog');
console.log();
npmlog.heading = 'yaotou';
npmlog.headingStyle = { fg: 'red', bg: 'blue' };
module.exports = npmlog;
