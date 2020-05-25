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

  // formRef = React.createRef();

  state = {
    selectedRecord: {},
  };

  // initForm = (record)=>{
  //   console.log(record)
  //   console.log(this.formRef.current)
  // }
  // handleEdit = (record) => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'list_event/initModal',
  //     payload: {
  //       modalVisible:true,
  //       formData:record
  //     }
  //   });
  //   // this.initForm(record)
  // };
  handleStart = (record) => {

    const { dispatch } = this.props;
    console.log(record);
    dispatch({
      type:"list_event/start",
      payload:{
        "id":record.id,
        "keywords":record.keywords,
        "status":record.status
      }
    })
  };



  handleFinish = (record) => {

    const { dispatch } = this.props;
    console.log(record);
    dispatch({
      type:"list_event/finish",
      payload:{
        "id":record.id,
        "keywords":record.keywords,
        "status":record.status
      }
    })
  };

  handleSeeSentiment = (record)=>{
    const { dispatch } = this.props;
    console.log(record);
    dispatch({
      type:"list_event/getSentiment",
      payload:{
        ...record
      }
    })
  }
  // handleCancel = () => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'list_event/changeModalVisible',
  //     payload: false,
  //   });
  // };
  // handleConfirm = () => {
  //   const fields = ['name', 'keywords', 'endTime'];
  //   const {id,name,keywords,endTime} =this.formRef.current.getFieldsValue(fields)
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'list_event/update',
  //     payload:{
  //       id:id,
  //       name:name,
  //       keywords:keywords,
  //       endTime:moment(endTime).format("YYYY-MM-DD HH:mm:ss")
  //     }
  //   });
  //
  // };

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


  renderAction(record){
    if(record.status === '未开始'){
      return <Button type="link" size={'small'} onClick={() => this.handleStart(record)}>开始</Button>
    }else if(record.status === '进行中'){
      return <Button type="link" size={'small'} onClick={() => this.handleFinish(record)}>结束</Button>
    }else{
      return null
    }
  }

  render() {
    const { dataList } = this.props;
    return (
      <Card>
        <Table dataSource={dataList}>
          <Column title="编号" dataIndex="id" key="id"/>
          <Column title="名字" dataIndex="name" key="name"/>
          <Column title="关键词" dataIndex="keywords" key="keywords"/>
          <Column title="开始时间" dataIndex="startTime" key="startTime"/>
          <Column
            title="结束时间"
            dataIndex="endTime"
            key="endTime"
          />
          <Column title="状态" dataIndex="status" key="status"/>
          <Column
            align="center"
            title="操作"
            key="action"
            render={(text, record) => (
              <span>
                {
                  this.renderAction(record)
                }
            {/*<Button type="link" size={'small'} onClick={() => this.handleEdit(record)}>编辑</Button>*/}
                {record.status==='未开始'?null:<Button type="link" size={'small'} onClick={() => this.handleSeeSentiment(record)}>查看舆情</Button>}
          </span>

            )}
          />
        </Table>
        {/*{this.renderModal()}*/}
      </Card>
    );
  }

}

export default ListEvent;



