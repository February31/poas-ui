import { Table, Button, PageHeader,DatePicker,Form,Input,Select,Radio,List} from 'antd';
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
      type: 'list_log/list',
      payload: {
        time:values.time,
        username:values.username,
        type:values.type
      },
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
            <Form.Item label="用户" name="username">
              <Input placeholder="输入用户名" />
            </Form.Item>
            <Form.Item label="时间区间" name="time">
              <DatePicker/>
            </Form.Item>
            <br/>
            <br/>
            <br/>
            <Form.Item label="日志类型" name="type" required="true" rules={[{ required: true, },]}>
              <Radio.Group name="type">
                <Radio value="login">登录日志</Radio>
                <Radio value="service">业务日志</Radio>
                <Radio value="error">错误日志</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">查找</Button>
            </Form.Item>
          </Form>

        </PageHeader>
        {/*<Table dataSource={logList}>*/}
        {/*  <Column title="日志" dataIndex="log" key="log"/>*/}
        {/*</Table>*/}
        <List
          size="small"
          // header={<div>Header</div>}
          // footer={<div>Footer</div>}
          bordered
          dataSource={logList}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </div>
    );
  }

}

export default ListLog;



