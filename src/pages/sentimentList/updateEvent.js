import { Table, Tag, Button, Form, Input, DatePicker, Card, Modal, Divider, Radio } from 'antd';
import { history, connect } from 'umi';
import React from 'react';
import styles from './style.less';
import moment from 'moment';


const config = {
  rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};

//点击开始，发送请求给后端，开始，这是很简单的。
//问题在于如何去改变状态，打开后变成监控中。
@connect(({ list_sentiment }) => ({
  event: list_sentiment.event,
}))
export class UpdateEvent extends React.Component {
  layout = {
    labelCol: {
      span: 9,
    },
    wrapperCol: {
      span: 16,
    },
  };

  formRef = React.createRef();

  state = {
    selectedRecord: {},
  };

  onReset = () => {
    this.formRef.current.resetFields();
  };

  handleConfirm = (values) => {
    const { dispatch } = this.props;
    if (values.time === undefined) {
      values.time =this.props.event.endTime
    }
    dispatch({
      type: 'list_event/update',
      payload: {
        ...values,
        'id': this.props.event.id,
        endTime: moment(values.time).format('YYYY-MM-DD HH:mm:ss'),
      },
    });

  };


  render() {
    const { event } = this.props;
    return (
      <Form {...this.layout} ref={this.formRef} initialValues={event} onFinish={this.handleConfirm}
            className={styles.aaa}>
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
        <Form.Item
          name="filterWords"
          label="过滤词组"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input.TextArea className={styles.main}/>
        </Form.Item>
        <Form.Item
          name="filter"
          label="过滤生效"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Radio.Group name="filter">
            <Radio value="all">全部过滤</Radio>
            <Radio value="after">过滤规则制定之后</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="time" label="结束时间">
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" className={styles.main}/>
        </Form.Item>

        <Form.Item wrapperCol={{ ...this.layout.wrapperCol, offset: 9 }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
          <Divider type='vertical'/>
          <Divider type='vertical'/>
          <Divider type='vertical'/>
          <Divider type='vertical'/>
          <Divider type='vertical'/>
          <Button type="primary" onClick={this.onReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    );
  }

}



