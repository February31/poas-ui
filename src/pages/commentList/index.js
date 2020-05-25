import { Button, Table, Comment, Popover, Card } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import {PieChart} from './pieChart'


//weiboId忘了干嘛要定义
@connect(({ list_comment }) => ({
  commentList: list_comment.commentList,
  pieData: list_comment.pieData,
  weiboId: list_comment.weibo.weiboId
}))
class CommentList extends React.Component {

  componentDidMount() {
    if (typeof this.props.commentList[0]==="undefined"){
      history.push("/sentiment/sentimentList")
    }
  }


  handleDelete = (record) => {
    console.log(this.props);
    const { dispatch } = this.props;
    dispatch({
      type: 'list_comment/delete',
      payload: record,
    });
  };

  handleEditAttitude = (record) => {
    console.log(this.props);
    const { dispatch } = this.props;
    dispatch({
      type: 'list_comment/update',
      payload: record,
    });
  };


  columns = [
    {
      title: '评论',
      key: 'comment',
      dataIndex: 'text',
    },

    {
      title: '情感',
      render: (record) => (<a onClick={() => this.handleEditAttitude(record)}>{record.attitude}</a>),
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
      align: 'center',
      title: '操作',
      key: 'action',
      render: (record) => (
        <span>
            <Button type="link" size={'small'} onClick={() => this.handleDelete(record)}>删除</Button>
          </span>
      ),
    },
  ];


  render() {
    const data = this.props.commentList;
    return (
      <Card>
        <Table columns={this.columns} dataSource={data}/>
        <PieChart/>
      </Card>
    );
  }
}

export default CommentList;
