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

@connect(({ list_comment }) => ({
  pieData: list_comment.pieData,
}))
export class PieChart extends React.Component {
  render() {
    return (
      <Card title="情感比例">
        <Chart
          data={this.props.pieData}
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
      </Card>
    );
  }
}





