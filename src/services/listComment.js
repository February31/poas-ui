import request from 'umi-request';

export function list(params) {
  // return request.get("http://localhost:8080/event/getEvent")
  return request.get("/api/listComment")
}

export function deleteComment(parmas) {
  // return request.get("http://localhost:8080/spider/crawlText",parmas)
  return request("/api/deleteComment")
}

export function update(parmas) {
  // return request.get("http://localhost:8080/spider/crawlText",parmas)
  return request("/api/updateComment")
}

export function emotionalRatio(parmas) {
  // return request.get("http://localhost:8080/spider/crawlText",parmas)
  return request("/api/commentEmotionalRatio")
}

