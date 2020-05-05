import request from 'umi-request';

export function listUser(params) {
  // return request.get("http://localhost:8080/event/getEvent")
  return request.get("/api/listUser")
}

export function deleteUser(parmas) {
  // return request.get("http://localhost:8080/spider/crawlText",parmas)
  return request.post("/api/deleteUser")
}

export function updateRole(parmas) {
  // return request.get("http://localhost:8080/spider/crawlText",parmas)
  return request.post("/api/updateRole")
}

export function addUser(params) {
  // return request.get("http://localhost:8080/event/getEvent")
  return request.post("/api/addUser")
}
