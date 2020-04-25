import { Table, Tag, Button, Form, Input, DatePicker, Card, Modal } from 'antd';
import { history, connect } from 'umi';
import React from 'react';
import moment from 'moment';

const { Column, ColumnGroup } = Table;


const config = {
  rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};

//点击开始，发送请求给后端，开始，这是很简单的。
//问题在于如何去改变状态，打开后变成监控中。
@connect(({ list_event }) => ({
  dataList: list_event.dataList,
  modalVisible: list_event.modalVisible,
  formData:list_event.formData
}))
class ListEvent extends React.Component {

  formRef = React.createRef();

  state = {
    selectedRecord: {},
  };

  initForm = (record)=>{
    console.log(record)
    console.log(this.formRef.current)
  }
  handleEdit = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list_event/initModal',
      payload: {
        modalVisible:true,
        formData:record
      }
    });
    // this.initForm(record)
  };
  handleStartOrEnd = (record) => {

    const { dispatch } = this.props;
    console.log(record);
    // dispatch({
    //
    // })
  };

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list_event/changeModalVisible',
      payload: false,
    });
  };
  handleConfirm = () => {
    const fields = ['name', 'keywords', 'endTime'];
    const {id,name,keywords,endTime} =this.formRef.current.getFieldsValue(fields)
    const { dispatch } = this.props;
    dispatch({
      type: 'list_event/update',
      payload:{
        id:id,
        name:name,
        keywords:keywords,
        endTime:moment(endTime).format("YYYY-MM-DD HH:mm:ss")
      }
    });

  };

  componentDidMount() {
    this.getEventList();
  }

  getEventList = () => {
    console.log(this.props);
    const { dispatch } = this.props;
    dispatch({
      type: 'list_event/list',
    });
  };

  renderModal() {
    const {formData} = this.props
    console.log(formData.keywords)
    return (
      <Modal
        title={'修改事件信息'}
        maskClosable={true}
        closable={false}
        visible={this.props.modalVisible}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            取消
          </Button>,
          <Button type="primary" key="submit" onClick={this.handleConfirm}>
            确定
          </Button>,
        ]}
      >
        <Form ref={this.formRef} initialValues={formData}>
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
          <Form.Item name="endTime" label="结束时间" {...config}>
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
          </Form.Item>
        </Form>


      </Modal>
    );
  }


  render() {
    const { dataList } = this.props;
    return (
      <Card>
        <Table dataSource={dataList}>
          <Column title="编号" dataIndex="id" key="id"/>
          <Column title="名字" dataIndex="name" key="name"/>
          <Column title="关键词" dataIndex="keywords" key="keywords"/>
          <Column title="开始时间" dataIndex="start_time" key="start_time"/>
          <Column
            title="结束时间"
            dataIndex="end_time"
            key="end_time"
          />
          <Column title="状态" dataIndex="status" key="status"/>
          <Column
            align="center"
            title="操作"
            key="action"
            render={(text, record) => (
              <span>
            <Button type="link" size={'small'}
                    onClick={() => this.handleStartOrEnd(record)}>{record.status === '未开始' ? '开始' : '结束'}</Button>
            <Button type="link" size={'small'} onClick={() => this.handleEdit(record)}>编辑</Button>
          </span>

            )}
          />
        </Table>
        {this.renderModal()}
      </Card>
    );
  }

}

export default ListEvent;



