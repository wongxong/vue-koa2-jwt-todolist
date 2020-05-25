import axios from 'axios';
import { stringify } from 'qs';
import router from '../router';

export const service = axios.create({
  baseURL: '/api',
  timeout: 1000 * 15
});

service.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token');
  if(token) {
    config.headers.Authorization = `Bearer ${ token }`;
  }
  console.log(config)
  if([ 'POST', 'PUT', 'PATCH', 'DELETE' ].includes(config.method.toUpperCase())) {
    config.data = stringify(config.data);
    config.headers = Object.assign(config.headers || {}, {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    });
  }

  return config;
}, err => {
  console.log(`[service request interceptors]: `, err);
  return Promise.reject(err);
});

service.interceptors.response.use(res => {
  console.log(`[service response interceptors]: `, res);
  if(res.data.code === 200) {
    return Promise.resolve(res.data);
  }
  return Promise.reject(res.data);
}, err => {
  console.log(`[service response interceptors]: `, err);

  if(err.response.status === 401) {
    sessionStorage.removeItem('token');
    router.replace('/');
  }

  return Promise.reject(err);
});

export const request = service;