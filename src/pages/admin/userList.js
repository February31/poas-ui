import { Table, Button, Card, message ,Popconfirm } from 'antd';
import { connect } from 'umi';
import React from 'react';

const { Column, ColumnGroup } = Table;


const config = {
  rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};

//点击开始，发送请求给后端，开始，这是很简单的。
//问题在于如何去改变状态，打开后变成监控中。
@connect(({ admin }) => ({
  userList: admin.userList,
}))
export class UserList extends React.Component {


  handleDelete = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/deleteUser',
      payload:record
    });
  };

  handleCancel = () => {
    console.log("111111111111111")
    message.error('Click on No');
  };
  handleConfirm = (record) => {
    message.error('Click on YES');
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/updateRole',
      payload: record
    });

  };

  componentDidMount() {
    this.getUserList();
  }

  getUserList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/listUser',
    });
  };


  render() {
    const { userList } = this.props;
    return (
      <Card>
        <Table dataSource={userList}>
          <Column title="编号" dataIndex="id" key="id"/>
          <Column title="名字" dataIndex="name" key="name"/>
          <Column title="角色" key="role"
             render={(record) => (
               <span>
                     <Popconfirm
                       title="你真的要改变角色吗?"
                       onConfirm={()=>this.handleConfirm(record)}
                       onCancel={this.handleCancel}
                       okText="是"
                       cancelText="否"
                     >
                     <a>{record.role}</a>
                     </Popconfirm>
               </span>)}
          />
          <Column title="状态" dataIndex="status" key="status"/>
          <Column
            align="center"
            title="操作"
            key="action"
            render={(text, record) => (
              <span>
            <Button type="link" size={'small'}
                    onClick={() => this.handleDelete(record)}>{record.status === '在职' ? '删除' : '复用'}</Button>
          </span>

            )}
          />
        </Table>
      </Card>
    );
  }

}




