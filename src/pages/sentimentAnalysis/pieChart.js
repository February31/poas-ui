import React from 'react';
import { Card } from 'antd';
import {
  Chart,
  Geom,
  Tooltip,
  Coord,
  Label,
  Axis,
} from 'bizcharts';
import { connect } from 'umi';

@connect(({ sentiment_overview,list_sentiment }) => ({
  data: sentiment_overview.pieData,
  eventId: list_sentiment.event.id
}))
export class PieChart extends React.Component {

  componentDidMount(){
    this.getData(this.props.eventId)
  }

  getData(eventId) {
    const { dispatch } = this.props;
    dispatch({
      type: 'sentiment_overview/getPieData',
      payload:eventId
    });
  }

  render() {
    return (
      <Card title="情感比例">
        <Chart
          data={this.props.data}
          forceFit
          width={400} height={400}
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
      </Card>
    );
  }
}







