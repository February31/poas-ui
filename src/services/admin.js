// import request from 'umi-request';
import request from '@/utils/request';
export function listUser() {
  return request.get("/v1/user/list")
}

export function deleteUser(parmas) {
  // return request.get("http://localhost:8080/spider/crawlText",parmas)
  return request.post("/v1/user/delete",{data:parmas})
}

export function updateRole(parmas) {
  // return request.get("http://localhost:8080/spider/crawlText",parmas)
  return request.post("/v1/user/changeRole",{data:parmas})
}

export function addUser(params) {
  // return request.get("http://localhost:8080/event/getEvent")
  return request.post("/v1/user/add",{data:params})
}
