import request from 'umi-request';
// import request from '@/utils/request';
export function getWordCloudData(params) {
  return request("/v1/sentiment/getWordCloudData",{
    params:{
      eventId:params.eventId
    }
  })
}

export function getPieData(params) {
  return request.get("/v1/sentiment/getPieData",{params: {
      eventId:params
    }})
}

export function getLineChartByDay(params) {
  return request.get("/v1/sentiment/getLineChartByDay",{params: {
      time:params.time,
      eventId:params.eventId
    }})
}
