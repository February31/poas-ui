import {getWordCloudData,getPieData,getLineChartByDay} from '@/services/sentimentOverview'
export default {
  namespace:"sentiment_overview",
  state:{
    wordCloudData:[
    ],
    pieData:[],
    lineData:[],
  },
  effects:{
    *getWordCloudData({payload,callback},{call,put}){
      const res = yield call(getWordCloudData,payload)
      console.log(res)
      yield put({
        type:"show",
        payload: {
          wordCloudData:res.data
        }
      })
      //调用回调函数
      callback&&callback()
    },
    *getPieData({payload},{call,put}){
    //  get pie chart data
      const pie = yield call(getPieData,payload)
      console.log(pie)
      yield put({
        type:"show",
        payload: {
          pieData:pie.data
        }
      })
    },
    *getLineData({payload},{call,put}){
      //get line chart data
      const res = yield call(getLineChartByDay,payload)
      console.log(res)
      yield put({
        type:"show",
        payload: {
          lineData:res.data
        }
      })
    }


  }
  ,
  reducers:{
    show(state, { payload }){
      return{
        ...state,
        ...payload
      }
    }
  }
}



