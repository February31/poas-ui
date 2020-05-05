import {list} from '@/services/listLog'
export default {
  namespace:"list_log",
  state:{
    logList:[],
  },
  effects:{
    *list({payload},{call,put}){
      const res = yield call(list)
      yield put({
        type:"show",
        payload:{
          logList:res,
        }
      })
    },
  },
  reducers:{
    show(state,{payload}){
      return{
        ...state,
        ...payload
      }
    }
  }
}
