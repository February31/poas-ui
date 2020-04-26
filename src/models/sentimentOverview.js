import {getWordCloudData} from '@/services/sentimentOverview'
export default {
  namespace:"sentiment_overview",
  state:{
    wordCloudData:[
      {
        'x': 'United States',
        'value': 324982000,
        'category': 'america',
      },
    ],
  },
  effects:{
    *wordCloudData({payload},{call,put}){
      const res = yield call(getWordCloudData)
      yield put({
        type:"show",
        payload: {
          wordCloudData:res
        }
      })
    },
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



