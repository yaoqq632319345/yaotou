'use strict';

const npmlog = require('npmlog');
npmlog.heading = 'yaotou';
npmlog.headingStyle = { fg: 'red', bg: 'blue' };
module.exports = npmlog;
