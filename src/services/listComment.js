// import request from 'umi-request';
import request from '@/utils/request';

export function list(params) {
  return request.get("/v1/sentiment/listComment",{params:{
    weiboId:params.weiboId
    }})
}

export function deleteComment(params) {
  // return request.get("http://localhost:8080/spider/crawlText",parmas)
  return request.post("/v1/sentiment/deleteComment",{data: params })
}

export function update(params) {
  // return request.get("http://localhost:8080/spider/crawlText",parmas)
  return request.post("/v1/sentiment/updateCommentAttitude",{data:params })
}

export function getPieData(params) {
  return request.get("/v1/sentiment/getCommentPieData",{params:{
      weiboId:params
    }})
}

