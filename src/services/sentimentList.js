// import request from 'umi-request';
import request from '@/utils/request';
export function list(parmas) {
  return request.get("/v1/sentiment/listText",{params:{ eventId:parmas.id}})
}

export function listByTime(parmas) {
  return request.get("/v1/sentiment/listTextByTime",{params:{
      time:parmas.time,
      eventId:parmas.eventId}})
}

export function deleteSentiment(params) {
  // return request.get("http://localhost:8080/spider/crawlText",parmas)
  return request.post("/v1/sentiment/delete",{data: params })
}

export function update(params) {
  // return request.get("http://localhost:8080/spider/crawlText",parmas)
  return request.post("/v1/sentiment/updateAttitude",{data:params })
}

export function commentStatus(parmas) {
  // return request.get("http://localhost:8080/spider/crawlText",parmas)
  return request("/v1/sentiment/listComment")
}

export function crawlComment(params) {
  return request.post("/v1/spider/crawlComment", { params:{
    textId:params.textId
    } })
}
