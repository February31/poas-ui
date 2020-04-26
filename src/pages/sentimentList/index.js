import { Button, Table, Comment,Popover } from 'antd';
import React from 'react';
import { connect } from 'umi';


@connect(({ list_sentiment }) => ({
  sentimentList: list_sentiment.sentimentList,
}))
class SentimentList extends React.Component {

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
              <span>评论 {record.commentsCount}</span>,
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

  render() {
    const data = this.props.sentimentList;
    return (
      <Table columns={this.columns} dataSource={data} onChange={this.onChange}/>
    );
  }
}

export default SentimentList;
