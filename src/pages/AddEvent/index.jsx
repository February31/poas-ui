import { Form, Input, Button, DatePicker, Divider, message } from 'antd';
import { connect } from 'umi';
import React from 'react';
import moment from 'moment';

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
        startTime:moment(values.start_time).format("YYYY-MM-DD HH:mm:ss"),
        endTime:moment(values.end_time).format("YYYY-MM-DD HH:mm:ss")
      },
    });
    message.success("添加成功", 3)
  };

  return (
    <Form {...layout} name="nest-messages" form={form} onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        name="name"
        label="事件名称"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input/>
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
        <Input.TextArea/>
      </Form.Item>
      <Form.Item name="start-time" label="开始时间" {...config}>
        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
      </Form.Item>
      <Form.Item name="end-time" label="结束时间" {...config}>
        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
        <Divider type='vertical'/>
        <Button type="primary" onClick={onReset}>
          重置
        </Button>
      </Form.Item>
    </Form>
  );

};
export default connect(mapStateToProps)(Demo);
