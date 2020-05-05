import request from 'umi-request';
export function list() {
  // return request.get("http://localhost:8080/event/getEvent")
  return request("/api/listSentiment")
}

export function deleteSentiment(parmas) {
  // return request.get("http://localhost:8080/spider/crawlText",parmas)
  return request("/api/deleteSentiment")
}

export function update(parmas) {
  // return request.get("http://localhost:8080/spider/crawlText",parmas)
  return request("/api/updateAttitude")
}

export function commentStatus(parmas) {
  // return request.get("http://localhost:8080/spider/crawlText",parmas)
  return request("/api/commentStatus")
}
