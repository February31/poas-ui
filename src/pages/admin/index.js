import { Button,PageHeader } from 'antd';
import { connect } from 'umi';
import React from 'react';
import {UserList} from './userList'
import {AddUser} from './addUser'

@connect(({admin})=>({
  isAddUser:admin.isAddUser
}))
class Admin extends React.Component{
  handleAddUser = ()=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/addUserForm',
      payload:true,
    });
  }
  render() {
    const {isAddUser} = this.props
    return (
      <div>
        <PageHeader
          ghost={true}
          // onBack={() => window.history.back()}
          title="用户管理"
          subTitle="欢迎"
          extra={[
            <Button key="1" onClick={this.handleAddUser}>添加用户</Button>,
          ]}
        >
        </PageHeader>
        <UserList/>
        {
          isAddUser?<AddUser/>:null
        }

      </div>
    );
  }
}
export default Admin
