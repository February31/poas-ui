// import request from '@/utils/request';
import request from 'umi-request';

export async function login(params) {
  return request('/v1/poas/login', {
    method: 'POST',
    requestType: 'form',
    data: params,
  });
}
