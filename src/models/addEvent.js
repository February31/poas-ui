import { addEvent } from '@/services/addEvent'
import { history } from 'umi';
export default {
  namespace: "add_event",
  state:{
    dataList:[]
  },
  effects: {
    * add({ payload }, { call, put }) {
      console.log(payload);
      // const result =yield call(addEvent,payload);
      // console.log(result);
      history.push("/eventAnalyse");
    }
  }
}
