import axios from 'axios';
import { handleErrorResponse, makeURL } from '../common';
import get from 'lodash/get';

const _get = get;

export const logOut = function() {
  localStorage.clear();
};

export const putAPI = function(URL, data, successFn, errorFn, headerConfig = {}) {
  axios({
    method: 'put',
    url: makeURL(URL),
    data: data,
    headers: {
      ...headerConfig,
    },
  })
    .then(function(response) {
      let data = response.data;
      successFn(data);
    })
    .catch(function(error) {
      if (_get(error, 'request.status') === 500) {}
      handleErrorResponse(error);
      errorFn(error?.response?.data);
    });
};

export const postAPI = async function(
  URL,
  data,
  successFn,
  errorFn,
  headerConfig = {},
) {
  axios({
    method: 'post',
    url: makeURL(URL),
    data: data,
    headers: {
      ...headerConfig,
    },
  })
    .then(function(response) {
      let data = response.data;
      successFn(data);
    })
    .catch(function(error) {
      if (_get(error, 'request.status') === 500) {}
      handleErrorResponse(error);
      errorFn(error?.response?.data);
    });
};

export const getAPI = async function(URL, successFn, errorFn, params = {}) {
  const authHeaders = {};
  axios({
    method: 'get',
    url: makeURL(URL),
    headers: {
      ...authHeaders,
    },
    params: params,
  })
    .then(function(response) {
      let data = response.data;
      successFn(data);
    })
    .catch(function(error) {
      handleErrorResponse(error);
      errorFn(error);
    });
};

export const deleteAPI = function(URL, successFn, errorFn) {
  axios({
    method: 'delete',
    url: makeURL(URL),
    headers: {},
  })
    .then(function(response) {
      let data = response.data;
      successFn(data);
    })
    .catch(function(error) {
      handleErrorResponse(error);
      errorFn();
    });
};

