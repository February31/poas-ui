import {list,deleteSentiment,update} from "@/services/sentimentList"
export default {
  namespace:"list_sentiment",
  state:{
    sentimentList:[],
  },
  effects:{
    *list({payload},{call,put}){
      console.log(payload)
      const res = yield call(list)
      yield put({
        type:"show",
        payload:{
          sentimentList:res,
        }
      })
    },
    *update({payload},{call,put}){
      const res = yield call(update,payload)
      yield put({
        type:"show",
      })
      console.log("update success!")
    },
    *delete({payload},{call,put}){
      const res = yield call(deleteSentiment,payload)
      yield put({
        type:"show",
      })
      console.log("delete success!")
    }
  }
  ,
  reducers:{
    show(state,{payload}){
      return{
        ...state,
        ...payload
      }
    }
  }
}
