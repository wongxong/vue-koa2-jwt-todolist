import { request } from './service';

export function sign_in(data) {
  return request({
    method: 'post',
    url: '/users/sign_in',
    data
  });
};