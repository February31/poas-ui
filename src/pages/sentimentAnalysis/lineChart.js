import React from 'react';
import { Card,DatePicker } from 'antd';
import {
  Chart,
  Geom,
  Tooltip,
  Axis,
} from 'bizcharts';
import { connect } from 'umi';
import moment from 'moment';

@connect(({ sentiment_overview,list_sentiment }) => ({
  data: sentiment_overview.lineData,
  eventId: list_sentiment.event.id,
  event: list_sentiment.event
}))
export class LineChart extends React.Component {
  componentDidMount(){
    this.getData(this.props.eventId)
  }

  getData(eventId) {
    const { dispatch } = this.props;
    dispatch({
      type: 'sentiment_overview/getLineData',
      payload: {
        time:moment().format("YYYY-MM-DD"),
        // time:"2020-05-09",
        eventId:eventId
      }
    });
  }
  onChange=(date)=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'sentiment_overview/getLineData',
      payload: {
        time:date.format("YYYY-MM-DD"),
        eventId:this.props.eventId
      }
    });
  }
  disabledDate=(current)=> {
    // Can not select days before today and today

    let start = moment(this.props.event.startTime)
    return current<start.subtract(1, "day")||current > moment();
  }

  render() {
    return (
      <Card title="舆情趋势">
        <DatePicker onChange={this.onChange} disabledDate={this.disabledDate}/>
        <Chart height={500} data={this.props.data} forceFit>
          <Axis name="time" title={{
            position: 'end',
            offset: 40,
            textStyle: {
              fontSize: '18',
              textAlign: 'center',
              fill: '#999',
              fontWeight: 'bold',
              rotate: 0,
              autoRotate: true,
            },
          }}/>
          <Axis name="value" title={{
            position: 'end',
            offset: 30,
            textStyle: {
              fontSize: '18',
              textAlign: 'right',
              fill: '#999',
              fontWeight: 'bold',
              rotate: 0,
            },
          }}/>
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom type="line" position="time*value" size={2}
                tooltip={['time*value', (time, value) => {
                  return {
                    name: '数值', // 要显示的名字
                    value: value,
                    title: time,
                  };
                }]}/>
          <Geom
            type="point"
            position="time*value"
            size={4}
            shape={'circle'}
            style={{
              stroke: '#fff',
              lineWidth: 1,
            }}
            tooltip={['time*value', (time, value) => {
              return {
                name: '数值', // 要显示的名字
                value: value,
                title: time,
              };
            }]}
          />
        </Chart>
      </Card>

    );
  }
}






