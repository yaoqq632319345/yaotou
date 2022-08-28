'use strict';
const axios = require('axios');
const semver = require('semver');
const urlJoin = require('url-join');

module.exports = { getNpmInfo, getNpmVersion };

function getNpmInfo(npmName, registry) {
  if (!npmName) {
    return null;
  }
  const registryUrl = registry || getDefaultRegistry();
  const npmInfoUrl = urlJoin(registryUrl, npmName);

  return axios
    .get(npmInfoUrl)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      Promise.reject(error);
    });
}

function getDefaultRegistry(isOriginal = false) {
  return isOriginal
    ? 'https://registry.npmjs.org'
    : 'https://registry.npm.taobao.org';
}

async function getNpmVersion(npmName, registry) {
  const data = await getNpmInfo(npmName, registry);
  if (data) {
    return Object.keys(data.versions);
  } else {
    return [];
  }
}

function getNpmSemverVersions(baseVersion, versions) {}
