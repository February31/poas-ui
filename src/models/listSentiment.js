import {list,deleteSentiment,update,commentStatus} from "@/services/sentimentList"
export default {
  namespace:"list_sentiment",
  state:{
    sentimentList:[],
    commentTips:"",
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
    ,
    *seeComment({payload,callback},{call,put}){
      //到后台去查一下，有的话就拿回来。没有爬完的话就提醒。没有的话，就提示开始爬取
      const res = yield call(commentStatus,payload)
      yield put({
        type:"show",
        payload:{
          commentTips:res.msg,
        }
      })
      //调用回调函数
      callback&&callback()
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
