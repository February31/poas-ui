import {list,update,start,finish,getByName,addWarning} from '@/services/listEvent'
import {list as getSentiment} from '@/services/sentimentList'
import {message} from 'antd';
import { history } from 'umi';
import moment from 'moment';

export default {
  //命名空间，用来区分的
  namespace: "list_event",
  //
  state:{
    dataList:[],
    loading:false,
    modalVisible:false,
    formData:{},
    event:{},
    warning:[]
  },

  effects:{
    *start({payload},{call,put}){
      console.log(payload)
      const res = yield call(start,payload)
      console.log(res)
      const res2 = yield call(list)
      yield put({
        type:"show",
        payload:{
          dataList:res2.data
        }
      })
    },
    *finish({payload},{call,put}){
      const res = yield call(finish,payload)
      const res2 = yield call(list)
      yield put({
        type:"show",
        payload:{
          dataList:res2.data
        }
      })
    },
    *getSentiment({payload},{call,put}){
      const res = yield call(getSentiment,payload)
      if (typeof res.data==="string"){
        message.success(res.data)
      }else {
        yield put({
          type:"list_sentiment/show",
          payload:{
            sentimentList:res.data,
            event:payload
          }
        })
        history.push("/sentiment/sentimentList");
      }
    },
    *list({payload},{call,put}) {
      const res = yield call(list)
      console.log(res)
      yield put({
        type:"show",
        payload:{
          dataList:res.data
        }
      })
    },
    *update({payload},{call,put}){
      //修改信息
      if (payload.filter===undefined||payload.filter==="all"){
        payload.addFilterTime="0000-00-00 00:00"
      }else {
        payload.addFilterTime=moment().format("YYYY-MM-DD HH:00")
      }
      console.log(payload)
      const res = yield call(update,payload)
      console.log(res)
      //拿到更新后的事件
      const res2 = yield call(getByName,payload.name)
      console.log(res2)
      yield put({
        type:"list_sentiment/show",
        payload:{
          event:res2.data
        }
      })
      message.success("修改成功！")
    },
    *addWarning({payload},{call,put}){
      console.log(payload)
      const res = yield call(addWarning,payload)
      console.log(res.msg)
      if (res.msg==="成功"){
        yield put({
          type:"show",
          payload:{
            warning:[payload]
          }
        })
      }
    }
  },

  reducers:{
    show(state,{payload}){
      console.log(payload)
      return{
        ...state,
        ...payload
      }
    },
    changeModalVisible(state,{payload}){
      return{
        ...state,
        modalVisible:payload
      }
    },
    initModal(state,{payload}){
      console.log(payload)
      return{
        ...state,
        ...payload
      }
    }
  }
};



