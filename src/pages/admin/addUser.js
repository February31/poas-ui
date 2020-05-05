import { Form, Input, Button, Select, Divider, message, Modal } from 'antd';
import { connect } from 'umi';
import React from 'react';
import { FormInstance } from 'antd/lib/form';

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


@connect(() => ({}))
export class AddUser extends React.Component {
  formRef = React.createRef();
  onReset = () => {
    this.formRef.current.resetFields();
  };
  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/addUserForm',
      payload:false,
    });
  };

  onFinish = values => {
    const { dispatch } = props;
    dispatch({
      type: 'admin/addUser',
      payload: {
        ...values,
      },
    });
    message.success('添加成功', 3);
  };

  render() {
    return (
      <Modal
        title={'添加用户'}
        maskClosable={true}
        closable={false}
        visible={true}
        footer={null}
      >
        <Form {...layout} name="nest-messages" ref={this.formRef} onFinish={this.onFinish}
              validateMessages={validateMessages}>
          <Form.Item
            name="name"
            label="用户名字"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="password"
            label="初始密码"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input value="a"/>
          </Form.Item>
          <Form.Item
            name="role"
            label="角色"
            rules={[
              {
                required: true,
              },
            ]}>
            <Select defaultValue="user" style={{ width: 120 }}>
              <Option value="user">普通用户</Option>
              <Option value="admin">管理员</Option>
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              添加
            </Button>
            <Divider type='vertical'/>
            <Button type="primary" onClick={this.onReset}>
              重置
            </Button>
            <Divider type='vertical'/>
            <Button type="primary" onClick={this.handleCancel}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>

    );
  }
}
