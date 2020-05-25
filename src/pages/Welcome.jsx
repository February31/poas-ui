import { Form, Input, Button, Select, Divider, message, Modal,Result } from 'antd';
import { connect,history } from 'umi';
import React from 'react';




//这里的warning是随便绑定的，没有作用
@connect((user) => ({
  currentUser:user.currentUser
}))
export default class Welcome extends React.Component {
  componentDidMount(){
    //进来的时候就查一下有没有预警
    this.props.dispatch({
      type:"user/fetchWarning",
      payload:localStorage.getItem("user")
    })
  }
  jumpToAddEvent(){
    history.push("/event/addEvent")
  }

  jumpToSentiment(){
    history.push("/event/listEvent")
  }

  render() {
    return (
      <div>

        <Result
          status="success"
          title="微博舆情分析系统"
          // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
          extra={[
            <Button type="primary" key="console" onClick={this.jumpToAddEvent}>
              添加事件
            </Button>,
            <Button key="buy" onClick={this.jumpToSentiment}>事件列表</Button>,
          ]}
        />
      </div>
    );
  }
}

