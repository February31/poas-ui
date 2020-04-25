import { Button, Table, Comment, Popover, Card } from 'antd';
import React from 'react';
import { connect } from 'umi';
import { Chart, Coord, Geom, Label, Tooltip } from 'bizcharts';


@connect(({ list_comment }) => ({
  commentList: list_comment.commentList,
  emotionalRatio: list_comment.emotional,
}))
class CommentList extends React.Component {

  componentDidMount() {
    this.getCommentList();
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

  getCommentList = () => {
    console.log(this.props);
    const { dispatch } = this.props;
    dispatch({
      type: 'list_comment/list',
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

  renderPie() {
    const emo = this.props.emotionalRatio;
    console.log(emo.forward);
    const data = [
      { name: '正向', value: emo.forward*100 },
      { name: '负向', value: emo.negation*100 },
    ];
    return (
      <Chart
        data={data}
        forceFit
      >
        <Coord type="theta"/>
        <Tooltip showTitle={false}/>
        <Geom
          type="intervalStack"
          position="value"
          color="name"
        >
          <Label content="name"/>
        </Geom>
      </Chart>
    );
  }

  render() {
    console.log(this.props);
    const data = this.props.commentList;
    return (
      <Card>
        <Table columns={this.columns} dataSource={data}/>
        {this.renderPie()}
      </Card>

    );
  }
}

export default CommentList;
