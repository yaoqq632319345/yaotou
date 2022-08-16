'use strict';
const pkg = require('../package.json');
const log = require('@yaotou/log');
module.exports = core;
function core(args) {
  checkVersion();
}

function checkVersion() {
  log();
}
