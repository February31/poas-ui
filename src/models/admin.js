import {listUser,updateRole,deleteUser,addUser} from "@/services/admin"
export default {
  namespace:"admin",
  state:{
    userList:[],
    isAddUser:false,
  },
  effects:{
    *listUser(_,{call,put}){
      const res = yield call(listUser)
      console.log(res)
      yield put({
        type:"show",
        payload:{
          userList:res.data,
        }
      })
    },
    *addUser({payload},{call,put}){
      console.log(payload)
      const res = yield call(addUser,payload)
      yield put({
        type:"show",
        payload:{
          isAddUser:false,
        }
      })
      yield put({
        type:"listUser",
      })
    }
    ,
    *updateRole({payload},{call,put}){
      const res = yield call(updateRole,payload)
      yield put({
        type:"listUser",
      })
    },
    *deleteUser({payload},{call,put}){
      const res = yield call(deleteUser,payload)
      yield put({
        type:"listUser",
      })
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
