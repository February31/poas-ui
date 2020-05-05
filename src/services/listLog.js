import request from 'umi-request';
export function list() {
  return request("/api/logList")
}
