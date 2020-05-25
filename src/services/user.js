import request from '@/utils/request';
// import request from 'umi-request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent(param) {
  return request('/v1/user/getCurrent',{params:{username:param}});
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function queryWarning(param) {
  return request('/v1/warning/get',{params:{userId:param}});
}

export async function handledWarning(param) {
  return request.post('/v1/warning/handled',{params:{eventId:param}});
}

export async function updateUser(param) {
  return request.post('/v1/user/update',{data:param});
}

export async function updatePassword(param) {
  return request.post('/v1/user/changePwd',{data:param});
}
