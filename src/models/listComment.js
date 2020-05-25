import {list,deleteComment,update,getPieData} from "@/services/listComment"
import { message } from 'antd';
export default {
  namespace:"list_comment",
  state:{
    commentList:[],
    pieData:[],
    weibo:{}
  },
  effects:{
    *list({payload},{call,put}){
      console.log(payload)
      const res = yield call(list,payload)
      yield put({
        type:"show",
        payload:{
          commentList:res.data,
        }
      })
    },
    *getPieData({payload},{call,put}){
      //  get pie chart data
      const pie = yield call(getPieData,payload)
      yield put({
        type:"show",
        payload: {
          pieData:pie.data
        }
      })
    },
    *update({payload},{call,put}){
      const res = yield call(update,payload)
      //调用list，把修改后的结果拿回来
      yield put({
        type:"list",
        payload:payload
      })
      //调用getPieData，把修改后的结果拿回来
      yield put({
        type:"getPieData",
        payload:payload.weiboId
      })
    },
    *delete({payload},{call,put}){
      console.log(payload)
      const res = yield call(deleteComment,payload)
      //调用list，把修改后的结果拿回来
      yield put({
        type:"list",
        payload:payload

      })
      //调用getPieData，把修改后的结果拿回来
      yield put({
        type:"getPieData",
        payload:payload.weiboId
      })
      message.success("删除成功！")
    }
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
