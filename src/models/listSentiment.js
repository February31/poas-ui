import {
  list,
  deleteSentiment,
  update,
  commentStatus,
  crawlComment,
  listByTime
} from '@/services/sentimentList';
import {list as getComment,getPieData} from '@/services/listComment'
import { message } from 'antd';
import { history } from 'umi';
export default {
  namespace:"list_sentiment",
  state:{
    sentimentList:[],
    commentTips:"",
    event:{}
  },
  effects:{
    *list({payload},{call,put}){
      console.log(payload)
      const res = yield call(list,payload)
      yield put({
        type:"show",
        payload:{
          sentimentList:res.data,
        }
      })
    },
    *listByTime({payload},{call,put}){
      const res = yield call(listByTime,payload)
      yield put({
        type:"show",
        payload:{
          sentimentList:res.data,
        }
      })
    },
    *update({payload},{call,put}){
      const res = yield call(update,payload)
      //调用list，把修改后的结果拿回来
      yield put({
        type:"list",
        payload:{
          id:payload.eventId
        }
      })
    },
    *delete({payload},{call,put}){
      console.log(payload)
      const res = yield call(deleteSentiment,payload)
      //调用list，把修改后的结果拿回来
      yield put({
        type:"list",
        payload:{
          id:payload.eventId
        }
      })
      message.success("删除成功！")
    }
    ,
    *seeComment({payload,callback},{call,put}){
      //到后台去查一下，有的话就拿回来。没有爬完的话就提醒。没有的话，就提示开始爬取
      const res = yield call(getComment,payload)
      if (typeof res.data==="string"){
        message.success(res.data)
      }else {
        const res2 = yield call(getPieData,payload.weiboId)
        yield put({
          type:"list_comment/show",
          payload:{
            commentList:res.data,
            weibo:payload,
            pieData:res2.data
          }
        })
        history.push("/sentiment/commentList");
      }
    },
    *crawlComment({payload},{call,put}){
      //爬取评论
      const res = yield call(crawlComment,payload)
      if (res.code==200){
        message.success("采集开始")
      }
      const res2 = yield call(list,payload)
      if (typeof res2.data==="string"){
        message.success(res.data)
      }else {
        yield put({
          type: "show",
          payload: {
            sentimentList: res2.data,
          }
        })
      }
    },
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
