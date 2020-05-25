import {
  queryCurrent,
  query as queryUsers,
  queryWarning,
  handledWarning,
  updateUser,
  updatePassword,
} from '@/services/user';
import { message } from 'antd';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    warning: [],
  },
  effects: {
    * fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    * fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent, localStorage.getItem('user'));
      yield put({
          type: 'saveCurrentUser',
          payload: response.data,
        },
      );
    },
    * fetchWarning({ payload }, { call, put }) {
      const response = yield call(queryWarning, payload);
      yield put({
        type: 'show',
        payload: { warning: response.data },
      });
    },
    * handleWarning({ payload }, { call, put }) {
      console.log('111111111');
      const response = yield call(handledWarning, payload);
      yield put({
        type: 'fetchWarning',
        payload: localStorage.getItem('user'),
      });
      // yield put({
      //   type: 'show',
      //   payload: { warning:response.data },
      // });
    },
    * updateUser({ payload }, { call, put }) {
      const response = yield call(updateUser, payload);
      yield put({
        type: 'fetchCurrent',
      });
      message.success('修改成功');
    },
    * updatePassword({ payload }, { call, put }) {
      const res = yield call(queryCurrent, localStorage.getItem('user'))
      if (payload.password===res.data.password){
        if (payload.newPwd === payload.repPwd) {
          payload.password = payload.newPwd;
          const response = yield call(updatePassword, payload);
          message.success('修改成功');
        } else {
          message.info('两次输入的新密码不一致');
        }
      }else {
        message.info("当前密码错误")
      }
    },
  },
  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
