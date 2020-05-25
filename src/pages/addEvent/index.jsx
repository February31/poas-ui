import { Form, Input, Button, DatePicker, Divider, message } from 'antd';
import { connect } from 'umi';
import React from 'react';
import moment from 'moment';
import styles from './style.less';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const config = {
  rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};

function mapStateToProps(state) {
  console.log('state', state);
  const name = 'hahah';
  return { name };
}


const Demo = (props) => {

  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };

  const onFinish = values => {
    const { dispatch } = props;
    dispatch({
      type: 'add_event/add',
      payload: {
        ...values,
        startTime:moment(values.time1).format("YYYY-MM-DD HH:mm:ss"),
        endTime:moment(values.time2).format("YYYY-MM-DD HH:mm:ss")
      },
    });
    message.success("添加成功", 3)
  };
  function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  function disabledDate(current) {
    // Can not select days before today and today
    return current < moment().startOf('day');
  }

  function disabledDateTime() {
    return {
      disabledHours: () => range(0,moment().hour()),
      disabledMinutes: () =>range(0,moment().minute())
    };
  }

  return (
      <Form {...layout} name="nest-messages" form={form} onFinish={onFinish} validateMessages={validateMessages} className={styles.aaa}>
        <Form.Item
          name="name"
          label="事件名称"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input className={styles.main}/>
        </Form.Item>
        <Form.Item
          name="keywords"
          label="关键词组"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea className={styles.main}/>
        </Form.Item>
        <Form.Item name="time1" label="开始时间" {...config}>
          {/*<DatePicker disabledDate={disabledDate} disabledTime={disabledDateTime} showTime format="YYYY-MM-DD HH:mm:ss"/>*/}
          <DatePicker disabledDate={disabledDate} disabledTime={disabledDateTime} showTime className={styles.main}/>
        </Form.Item>
        <Form.Item name="time2" label="结束时间" {...config} >
          <DatePicker disabledDate={disabledDate} disabledTime={disabledDateTime} showTime format="YYYY-MM-DD HH:mm:ss" className={styles.main}/>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
          <Divider type='vertical'/>
          <Divider type='vertical'/>
          <Divider type='vertical'/>
          <Divider type='vertical'/>
          <Button type="primary" onClick={onReset}>
            重置
          </Button>
        </Form.Item>
      </Form>


  );

};
export default connect(mapStateToProps)(Demo);
