import {
  Button,
  Table,
  Comment,
  Popover,
  Menu,
  PageHeader, DatePicker,
} from 'antd';
import React from 'react';
import { connect,history } from 'umi';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';
import {SentimentChart} from '../sentimentAnalysis/index'
import {UpdateEvent} from './updateEvent'
import {AddWarning} from './addWarning'
import style  from './style.less'
import moment from 'moment';

@connect(({ list_sentiment }) => ({
  sentimentList: list_sentiment.sentimentList,
  event:list_sentiment.event
}))
class SentimentList extends React.Component {

  state = {
    current: 'list',
  };



  componentDidMount() {
    if (typeof this.props.event.name==="undefined"){
      history.push("/event/listEvent")
    }
  }


  handleDelete = (record) => {
    console.log(this.props);
    const { dispatch } = this.props;
    dispatch({
      type: 'list_sentiment/delete',
      payload:record
    });
  };

  handleEditAttitude = (record) => {
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

  handleSeeComment = record =>{
    const { dispatch } = this.props;
    console.log(record);
    dispatch({
      type:"list_sentiment/seeComment",
      payload:{
        ...record
      }
    })
  }

  handleCrawlComment = (record) => {

    const { dispatch } = this.props;
    console.log(record);
    dispatch({
      type:"list_sentiment/crawlComment",
      payload:{
        "textId":record.weiboId,
        "id":this.props.event.id
      }
    })
  };

  handleDatePicker=(value)=>{
    if (value===null){
      value = moment()
    }
    const { dispatch } = this.props;
    dispatch({
      type:"list_sentiment/listByTime",
      payload:{
        "time":value.format("YYYY-MM-DD HH:00"),
        "eventId":this.props.event.id
      }
    })
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
              <span>评论 {record.commentsCount}</span>
              <span>转发{record.repostsCount}</span>,
            </div>
          }
        />
      ),
    },
    {
      title: '相似舆情',
      align: 'center',
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
      title: "评论采集",
      dataIndex: 'commentStatus',
      key: 'commentStatus',
    },
    {
      align: 'center',
      title: '操作',
      key: 'action',
      render: (record) => (
        <span>
            {record.commentStatus==="未采集"
              ?<Button type="link" size={'small'} onClick={()=>this.handleCrawlComment(record)}>采集评论</Button>
              :<Button type="link" size={'small'} onClick={()=>this.handleSeeComment(record)}>查看评论</Button>
            }
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
      return (
        <div>
          <DatePicker showTime format="YYYY-MM-DD HH:00" className={style.datePicker} placeholder="选择时间查看舆情" onChange={this.handleDatePicker}/>
          <Table columns={this.columns} dataSource={data} onChange={this.onChange}/>
        </div>
        )
    }else if(this.state.current==="table"){
      return (<SentimentChart/>)
    }else if(this.state.current==="update"){
      return (<UpdateEvent/>)
    }else {
      return (<AddWarning/>)
    }
  }
  render() {
    const event = this.props.event
    return (
      <div className={style.content}>
        <PageHeader
          // className="site-page-header"
          onBack={() => null}
          title={event.name}
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

