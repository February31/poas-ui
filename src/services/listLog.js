import request from '@/utils/request'
export function listService(param) {
  return request("/v1/log/getService",{params:{
      time:param.time,
      username:param.username
    }})
}

export function listLogin(param) {
  return request("/v1/log/getLogin",{params:{
      time:param.time,
    }})
}

export function listError(param) {
  return request("/v1/log/getError",{params:{
      time:param.time,
    }})
}
