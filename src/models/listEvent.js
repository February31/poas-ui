import {list,update} from '@/services/listEvent'

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
    // *start({payload},{call}){
    //
    // },
    *list({payload},{call,put}) {
      const res = yield call(list)
      console.log(res)
      yield put({
        type:"show",
        payload:{
          dataList:res
        }
      })
    },
    *update({payload},{call,put}){
      console.log(payload)

      const res = yield call(update)
      console.log(res)
      //这里其实还没有修改数据
      yield put({
        type:"changeModalVisible",
        payload:false
      })
      console.log('123456');
    },
    *addWarning({payload},{call,put}){
      console.log("11111111111111")
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



