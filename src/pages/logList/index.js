import { Table, Button, PageHeader,DatePicker,Form,Input,Select,Radio} from 'antd';
import { connect } from 'umi';
import React from 'react';

const { Column } = Table;
const { RangePicker } = DatePicker;
const { Option } = Select;

@connect(({ list_log }) => ({
  logList: list_log.logList,
}))
class ListLog extends React.Component {

  handleFind = (values) => {
    console.log(values)
    const { dispatch } = this.props;
    dispatch({
      type: 'list_log/find',
      payload: {
        ...values
      },
    });
  };


  componentDidMount() {
    this.getLogList();
  }

  getLogList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list_log/list',
    });
  };


  render() {
    const { logList } = this.props;
    return (
      <div>
        <PageHeader
          ghost={false}
          // onBack={() => window.history.back()}
          title="查看日志"
        >
          <Form
            layout="inline"
            onFinish={this.handleFind}
          >
            <Form.Item label="用户" name="user">
              <Input placeholder="输入用户名" />
            </Form.Item>
            <Form.Item label="时间区间" name="time">
              <RangePicker showTime />
            </Form.Item>
            <br/>
            <br/>
            <br/>
            <Form.Item label="日志类型" name="type">
              <Radio.Group name="type">
                <Radio value="login">登录日志</Radio>
                <Radio value="service">业务日志</Radio>
                <Radio value="all">我全都要</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">查找</Button>
            </Form.Item>
          </Form>

        </PageHeader>
        <Table dataSource={logList}>
          <Column title="编号" dataIndex="id" key="id"/>
          <Column title="用户" dataIndex="user" key="user"/>
          <Column title="操作时间" dataIndex="time" key="time"/>
          <Column title="模块" dataIndex="function" key="function"/>
          <Column title="操作" dataIndex="operation" key="operation"/>
          <Column title="参数" dataIndex="parameter" key="parameter"/>
        </Table>
      </div>
    );
  }

}

export default ListLog;



