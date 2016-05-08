import fetch from '../../../lib-core/js/services/core/fetch';

import { loginUrl, serverUrl } from '../config';

const encode = encodeURIComponent;

const headers = {
};

function getHeaders(_headers = {}) {
  return Object.assign(_headers, headers);
}

function getParam(obj) {
  if (!obj) {
    return '';
  }

  const params = [];
  let key;
  let value;

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      value = obj[key];

      if (value === null || value === undefined) {
        value = '';
      }

      params.push(`${encode(key)}=${encode(value)}`);
    }
  }

  return params.join('&').replace(/%20/g, '+');
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

export function redirectToLoginPage(returnUrl = location.href) {
  location.href = `${loginUrl}?returnUrl=${encode(returnUrl)}`;
}

function successCallback(result) {
  if (result.status === 0) {
    return result.content;
  }

  if (result.status === 20) {
    redirectToLoginPage();
  }

  return Promise.reject(result.errmsg);
}

function errorCallback(ex) {
  /* eslint no-console: 0 */
  console.error(`请求失败："${ex}"`);
  return Promise.reject(ex);
}

export function get(url) {
  const options = {
    headers: getHeaders(),
  };

  return fetch(`${serverUrl}${url}`, options)
    .then(checkStatus)
    .then(parseJSON)
    .catch(errorCallback);
}

export function getJSON(url, params) {
  const options = {
    headers: getHeaders(),
    // mode: 'no-cors',
  };

  let param = getParam(params);

  if (param) {
    if (url.indexOf('?') === -1) {
      param = `?${param}`;
    } else {
      param = `&${param}`;
    }
  }

  return fetch(`${serverUrl}${url}${param}`, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(successCallback)
    .catch(errorCallback);
}

export function post(url, data) {
  const options = {
    method: 'post',
    headers: getHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    body: getParam(data),
  };

  return fetch(`${serverUrl}${url}`, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(successCallback)
    .catch(errorCallback);
}

export function postForm(url, formdata) {
  const options = {
    method: 'post',
    headers: getHeaders(),
    body: formdata,
  };

  return fetch(`${serverUrl}${url}`, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(successCallback)
    .catch(errorCallback);
}

export function postJSON(url, json) {
  const options = {
    method: 'POST',
    headers: getHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(json),
  };

  return fetch(`${serverUrl}${url}`, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(successCallback)
    .catch(errorCallback);
}
