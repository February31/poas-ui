import {listUser,updateRole,deleteUser} from "@/services/admin"
export default {
  namespace:"admin",
  state:{
    userList:[],
    isAddUser:false,
  },
  effects:{
    *listUser({payload},{call,put}){
      const res = yield call(listUser)
      console.log(res)
      yield put({
        type:"show",
        payload:{
          userList:res,
        }
      })
    },
    *addUser({payload},{call,put}){
      const res = yield call(listUser)
    }
  },
  reducers:{
    show(state,{payload}){
      return{
        ...state,
        ...payload
      }
    }
    ,
    addUserForm(state,{payload}){
      return{
        ...state,
        isAddUser:payload
      }
    }
  }
}
