import request from 'umi-request';
export function list() {
  // return request.get("http://localhost:8080/event/getEvent")
  return request("/api/listEvent")
}

export function start(parmas) {
  // return request.get("http://localhost:8080/spider/crawlText",parmas)
  return request("/api/start")
}

export function update() {
  // return request.get("http://localhost:8080/spider/crawlText",parmas)
  return request("/api/update2")
}
