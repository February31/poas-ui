import { Table, Tag, Button, Form, Input, DatePicker, Card, Modal, Divider, Radio } from 'antd';
import { history, connect } from 'umi';
import React from 'react';
import styles from './style.less';
const layout = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 16,
  },
};

@connect(({ user }) => ({
  user:user.currentUser,
}))
export default class UserInfo extends React.Component {

  handleConfirm = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/updatePassword',
      payload: {
        ...values,
        "id":this.props.user.id
      }
    });
  };

  render() {
    return (
      <div>
        <Divider/>
        <Form {...layout} onFinish={this.handleConfirm}>
          <Form.Item
            name="password"
            label="当前密码"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password placeholder="输入当前密码" className={styles.main}/>
          </Form.Item>
          <Form.Item
            name="newPwd"
            label="新密码"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password placeholder="输入新密码" className={styles.main}/>
          </Form.Item>
          <Form.Item
            name="repPwd"
            label="重复密码"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password placeholder="请确认" className={styles.main}/>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 9 }}>
            <Button type="primary" htmlType="submit">
              修改
            </Button>
          </Form.Item>
        </Form>
      </div>

    );
  }

}



