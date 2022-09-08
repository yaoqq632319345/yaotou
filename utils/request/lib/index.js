'use strict';
const axios = require('axios');

const BASE_URL = process.env.CLI_BASE_URL
  ? process.env.CLI_BASE_URL
  : 'http://cli.yaotou.xyz:7001';
const request = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});
request.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err)
);

module.exports = request;
