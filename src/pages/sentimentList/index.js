import {
  Button,
  Table,
  Comment,
  Popover,
  Menu,
  PageHeader,
  Popconfirm,
  message,
  Modal,
  Form,
  Input,
  DatePicker,
} from 'antd';
import React from 'react';
import { connect } from 'umi';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';
import {SentimentChart} from '../sentimentAnalysis/index'
import {UpdateEvent} from './updateEvent'
import {AddWarning} from './addWarning'

@connect(({ list_sentiment,list_event }) => ({
  sentimentList: list_sentiment.sentimentList,
  commentTips:list_sentiment.commentTips,
  event:list_event.event
}))
class SentimentList extends React.Component {

  state = {
    current: 'list',
  };



  componentDidMount() {
    this.getSentimentList();
  }


  handleDelete = (record) => {
    console.log(this.props);
    const { dispatch } = this.props;
    dispatch({
      type: 'list_sentiment/delete',
      payload:record
    });
  };


  getSentimentList = () => {
    console.log(this.props);
    const { dispatch } = this.props;
    dispatch({
      type: 'list_sentiment/list',
    });
  };

  handleEditAttitude = (record) => {
    console.log(this.props);
    const { dispatch } = this.props;
    dispatch({
      type: 'list_sentiment/update',
      payload:record
    });
  };

  commentTips = ()=>{
   const { commentTips } = this.props
    console.log(commentTips)
    console.log(commentTips.length)
  }

  handleCommentConfirm = record =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'list_sentiment/seeComment',
      payload:record,
      callback: () => {
        this.commentTips()
        console.log("11111111111")
      }
    });
    // message.success("评论实时爬取中，请稍等片刻再看",5)
  }

  columns = [
    {
      title: '舆情',
      key: 'text',
      // dataIndex: "text",
      render: (record) => (
        <Comment
          actions={this.actions}

          content={

            <div>
              <Popover content={<div>{record.text}</div>} title="详情">
                <a>{record.text.substring(0, 10) + '...'}</a>
              </Popover>
              <br/>
              <span>点赞 {record.attitudesCount}</span>,
              {/*<span>评论 {record.commentsCount}</span>*/}
              <Popconfirm
                title="确定要查看评论吗?"
                onConfirm={()=>this.handleCommentConfirm(record)}
                // onCancel={cancel}
                okText="是"
                cancelText="否"
              >
                <a>评论 {record.commentsCount}</a>
              </Popconfirm>
              <span>转发{record.repostsCount}</span>,
            </div>
          }
        />
      ),
    },
    {
      title: '相似舆情',
      dataIndex: 'similarity',
      key: 'similarity',
      sorter: (a, b) => a.similarCount - b.similarCount,
    },
    {
      title: '情感',
      // dataIndex: 'attitude',
      render:(record)=>(<a onClick={()=>this.handleEditAttitude(record)}>{record.attitude}</a>),
      filters: [
        {
          text: '正向',
          value: '正向',
        },
        {
          text: '负向',
          value: '负向',
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.attitude.indexOf(value) === 0,
    },
    {
      title: '发布时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      align: 'center',
      title: '操作',
      key: 'action',
      render: (record) => (
        <span>
            <Button type="link" size={'small'} onClick={()=>this.handleDelete(record)}>删除</Button>
          </span>
      ),
    },
  ]
  ;


  onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  renderContent(){
    const data = this.props.sentimentList;

    if(this.state.current==="list"){
      return (<Table columns={this.columns} dataSource={data} onChange={this.onChange}/>)
    }else if(this.state.current==="table"){
      return (<SentimentChart/>)
    }else if(this.state.current==="update"){
      return (<UpdateEvent/>)
    }else {
      return (<AddWarning/>)
    }
  }
  render() {
    const data = this.props.sentimentList;
    return (
      <div>
        <PageHeader
          // className="site-page-header"
          onBack={() => null}
          title="美国疫情"
        />
        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
          <Menu.Item key="list" icon={<MailOutlined />}>
            舆情列表
          </Menu.Item>
          <Menu.Item key="table"  icon={<AppstoreOutlined />}>
            图表分析
          </Menu.Item>
          <Menu.Item key="update">
            {/*<a href="https://ant.design" target="_blank" rel="noopener noreferrer">*/}
            {/*  Navigation Four - Link*/}
            {/*</a>*/}
            方案配置
          </Menu.Item>
          <Menu.Item key="warning">
            报警配置
          </Menu.Item>
        </Menu>
        {this.renderContent()}
      </div>

    );
  }
}

export default SentimentList;

