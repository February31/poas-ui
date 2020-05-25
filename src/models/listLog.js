import { listError, listLogin, listService } from '@/services/listLog';
import moment from 'moment';

export default {
  namespace: 'list_log',
  state: {
    logList: [],
  },
  effects: {
    * list({ payload }, { call, put }) {
      if (typeof (payload.time) == 'undefined') {
        payload.time = moment().format('YYYY-MM-DD');
      }else {
        payload.time = payload.time.format('YYYY-MM-DD');
      }
      if (typeof (payload.username) == 'undefined') {
        payload.username = localStorage.getItem('user');
      }
      let res;
      if (payload.type === 'login') {
        res = yield call(listLogin, payload);
      } else if (payload.type === 'service') {
        res = yield call(listService, payload);
      } else {
        res = yield call(listError, payload);
      }
      yield put({
        type:"show",
        payload:{
          logList:res.data
        }
      })
    },
    // * listLogin({ payload }, { call, put }) {
    //   console.log(payload);
    //   const res = yield call(listLogin, payload);
    //   yield put({
    //     type: 'show',
    //     payload: {
    //       logList: res.data,
    //     },
    //   });
    // },
    // * listError({ payload }, { call, put }) {
    //   console.log(payload);
    //   const res = yield call(listError, payload);
    //   yield put({
    //     type: 'show',
    //     payload: {
    //       logList: res.data,
    //     },
    //   });
    // },
  },
  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
