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


//点击开始，发送请求给后端，开始，这是很简单的。
//问题在于如何去改变状态，打开后变成监控中。
@connect(({ user }) => ({
  user:user.currentUser,
}))
export default class UserInfo extends React.Component {

  handleConfirm = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/updateUser',
      payload: {
        ...values,
        "id":this.props.user.id
      }
    });
  };

  render() {
    const { user } = this.props;
    return (
      <div>
        <Divider/>
        <Form {...layout} initialValues={user} onFinish={this.handleConfirm}>
          <Form.Item
            name="name"
            label="昵称"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="输入新昵称" className={styles.main}/>
          </Form.Item>
          <Form.Item
            name="role"
            label="角色"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled={true} className={styles.main}/>
          </Form.Item>
          <Form.Item
            name="email"
            label="电子邮箱"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="输入新邮箱" className={styles.main}/>
          </Form.Item>
          <Form.Item  wrapperCol={{ ...layout.wrapperCol, offset: 9}}>
            <Button type="primary" htmlType="submit">
              更新信息
            </Button>
          </Form.Item>
        </Form>
      </div>

    );
  }

}



