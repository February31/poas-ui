// import request from 'umi-request';
import request from '@/utils/request';
export function list() {
  return request.get("/v1/event/get")
  // return request("/api/listEvent")
}

export function getByName(param) {
  return request.get("/v1/event/getEvent",{params:{name:param}})
  // return request("/api/listEvent")
}

export function start(params) {
  return request.post("/v1/spider/crawlText", { data:params })
  // return request("/api/start")
}

export function finish(params) {
  return request.post("/v1/event/suspend", { data:params })
  // return request("/api/start")
}


export function update(params) {
  return request.post("/v1/event/updateEvent", { data:params })
  // return request("/api/update2")
}

export  function addWarning(params) {
  return request.post("/v1/warning/add", { data:params })
}
