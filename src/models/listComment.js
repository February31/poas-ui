import {list,emotionalRatio,deleteComment,update} from "@/services/listComment"
export default {
  namespace:"list_comment",
  state:{
    commentList:[],
    emotional:[],
  },
  effects:{
    *list({payload},{call,put}){
      console.log("123")
      const res = yield call(list)
      console.log(res)
      const res2 = yield call(emotionalRatio)
      yield put({
        type:"show",
        payload:{
          commentList:res,
          emotional:res2
        }
      })
      console.log("123")
    },
    // *emotionalRatio({payload},{call,put}){
    //   console.log("123")
    //
    //   console.log(res)
    //   yield put({
    //     type:"show",
    //     payload:{
    //       emotional:emotionalRatio
    //     }
    //   })
    //   console.log("123")
    // }
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
