import { stringify } from 'querystring';
import { history } from 'umi';
import { fakeAccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      console.log(payload)
      const response = yield call(fakeAccountLogin, payload);
      console.log(response)
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully

      // if (response.status === 'ok') {
      //   const urlParams = new URL(window.location.href);
      //   console.log(urlParams)
      //   const params = getPageQuery();
      //   console.log(params)
      //   let { redirect } = params;

      //   if (redirect) {
      //     const redirectUrlParams = new URL(redirect);

      //     if (redirectUrlParams.origin === urlParams.origin) {
      //       redirect = redirect.substr(urlParams.origin.length);

      //       if (redirect.match(/^\/.*#/)) {
      //         redirect = redirect.substr(redirect.indexOf('#') + 1);
      //       }
      //     } else {
      //       window.location.href = '/';
      //       return;
      //     }
      //   }
      //   console.log(redirect)
      //   history.replace(redirect || '/');
      // }
      localStorage.setItem("login",true)
      history.replace("/welcome" || '/');
    },

    logout() {
      // const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      // if (window.location.pathname !== '/user/login' && !redirect) {
      //   history.replace({
      //     pathname: '/user/login',
      //     search: stringify({
      //       redirect: window.location.href,
      //     }),
      //   });
      // }
      localStorage.removeItem("login")
      history.replace("/user/login" || '/');
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
