import { Table, Tag, Button, Form, Input, DatePicker, Card, Modal, Divider, Radio } from 'antd';
import { history, connect } from 'umi';
import React from 'react';

const {Column} = Table


//点击开始，发送请求给后端，开始，这是很简单的。
//问题在于如何去改变状态，打开后变成监控中。
@connect(({ list_event }) => ({
  dataList:list_event.warning
}))
export class AddWarning extends React.Component {

  formRef = React.createRef();

  state = {
    modalVisible: false,
  };

  onReset = () => {
    this.formRef.current.resetFields()
  };

  handleConfirm = (values) => {
    console.log(values)
    const { dispatch } = this.props;
    dispatch({
      type: 'list_event/addWarning',
      payload: values
    });
    this.handleCancel()
  };

  handleCancel = ()=>{
    this.setState({
      modalVisible:false
    })
  }

  handleEdit = (record) => {
    this.setState({
      modalVisible:true,
    })
  }
  handleDelete = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list_event/deleteWarning',
      payload: record
    });
  }
  renderModal(){
    const {dataList} = this.props
    return(
      <Modal
        title={'添加预警'}
        maskClosable={true}
        closable={false}
        visible={this.state.modalVisible}
      footer={null}>
        <Form ref={this.formRef} initialValues={dataList} onFinish={this.handleConfirm}>
          <Form.Item
            name="max"
            label="舆情阈值"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="unit"
            label="时间单位"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="type"
            label="报警方式"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Radio.Group name="type">
              <Radio value="Station">站内</Radio>
              <Radio value="email">邮件</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button key="back" onClick={this.handleCancel}>
              取消
            </Button>,
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    )
  }


  render() {
    const { dataList } = this.props;
    return (
      <div>
        <Button type="primary" onClick={this.handleEdit}>添加报警</Button>
        <span>在这里可以添加报警</span>
        <Table dataSource={dataList}>
          <Column title="周期" dataIndex="cycle" key="cycle"/>
          <Column title="阈值" dataIndex="max" key="max"/>
          <Column title="预警方式" dataIndex="type" key="type"/>
          <Column
            align="center"
            title="操作"
            key="action"
            render={(text, record) => (
              <span>
            <Button type="link" size={'small'} onClick={() => this.handleEdit(record)}>编辑</Button>
            <Button type="link" size={'small'} onClick={() => this.handleDelete(record)}>删除</Button>
          </span>

            )}
          />
        </Table>
        {this.renderModal()}
      </div>

    );
  }

}



