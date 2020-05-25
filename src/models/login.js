import { stringify } from 'querystring';
import { history } from 'umi';
import { fakeAccountLogin,login } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      //15行和69行搭配着来。
      // const response = yield call(fakeAccountLogin, payload);
      const response = yield call(login, payload);
      console.log(response)
      if (response.message==="登录成功"){
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        }); // Login successfully
        localStorage.setItem("user",payload.username)
        localStorage.setItem("login",true)
        history.replace("/welcome" || '/');
      }else {
        message.error("登录失败，请重试")
        history.push("/user/login")
      }
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
      localStorage.removeItem("user")
      localStorage.removeItem("login")
      history.replace("/user/login" || '/');
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      // setAuthority(payload.currentAuthority);
      setAuthority(payload.data.principal.role);
      // return { ...state, status: payload.status, type: payload.type };
      return { ...state };
    },
  },
};
export default Model;
