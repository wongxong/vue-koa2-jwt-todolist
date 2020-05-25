import { request } from './service';

export function queryTodoLists(params) {
  return request({
    method: 'get',
    url: '/todo_lists',
    params
  });
}

export function createTodoList(data) {
  return request({
    method: 'post',
    url: '/todo_lists/create',
    data
  });
}

export function updateTodoList(id, data) {
  return request({
    method: 'put',
    url: `/todo_lists/${ id }`,
    data
  });
}

export function removeTodoList(id, data) {
  return request({
    method: 'delete',
    url: `/todo_lists/${ id }`,
    data
  });
}