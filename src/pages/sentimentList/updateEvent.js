import { Table, Tag, Button, Form, Input, DatePicker, Card, Modal, Divider } from 'antd';
import { history, connect } from 'umi';
import React from 'react';
import moment from 'moment';


const config = {
  rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};

//点击开始，发送请求给后端，开始，这是很简单的。
//问题在于如何去改变状态，打开后变成监控中。
@connect(({ list_event }) => ({
  event: list_event.event,
}))
export class UpdateEvent extends React.Component {

  formRef = React.createRef();

  state = {
    selectedRecord: {},
  };

  onReset = () => {
    this.formRef.current.resetFields()
  };

  handleConfirm = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list_event/update',
      payload: values
    });

  };


  render() {
    const { event } = this.props;
    return (
        <Form ref={this.formRef} initialValues={event} onFinish={this.handleConfirm}>
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
          <Form.Item
            name="filterWords"
            label="过滤词组"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input.TextArea/>
          </Form.Item>
          <Form.Item name="endTime" label="结束时间" {...config}>
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
          </Form.Item>

          <Form.Item >
            <Button type="primary" htmlType="submit">
              保存
            </Button>
            <Divider type='vertical'/>
            <Button type="primary" onClick={this.onReset}>
              重置
            </Button>
          </Form.Item>
        </Form>
    );
  }

}



