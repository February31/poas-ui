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
import {WordCloud} from './wordCloud'

@connect(({ sentiment_overview }) => ({
  wordCloudData: sentiment_overview.wordCloudData,
}))
export class SentimentChart extends React.Component {
  pieData = [
    { name: '正向', value: 60 },
    { name: '负向', value: 40 },
  ];
  columnData = [
    {
      year: '1951 年',
      sales: 38,
    },
    {
      year: '1952 年',
      sales: 52,
    },
    {
      year: '1956 年',
      sales: 61,
    },
    {
      year: '1957 年',
      sales: 145,
    },
    {
      year: '1958 年',
      sales: 48,
    },
    {
      year: '1959 年',
      sales: 38,
    },
    {
      year: '1960 年',
      sales: 38,
    },
    {
      year: '1962 年',
      sales: 38,
    },
  ];

  brokenData = [
    {
      year: '1991',
      value: 3,
    },
    {
      year: '1992',
      value: 4,
    },
    {
      year: '1993',
      value: 3.5,
    },
    {
      year: '1994',
      value: 5,
    },
    {
      year: '1995',
      value: 4.9,
    },
    {
      year: '1996',
      value: 6,
    },
    {
      year: '1997',
      value: 7,
    },
    {
      year: '1998',
      value: 9,
    },
    {
      year: '1999',
      value: 13,
    },
  ];


  getData() {
    const { dispatch } = this.props;
    dispatch({
      type: 'sentiment_overview/wordCloudData',
    });
    console.log('111111111111111');
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <Card>
        <Chart
          data={this.pieData}
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

        <Chart height={400} data={this.columnData} forceFit>
          <Axis name="year"/>
          <Axis name="sales"/>
          <Tooltip
            // crosshairs用于设置 tooltip 的辅助线或者辅助框
            // crosshairs={{
            //  type: "y"
            // }}
          />
          <Geom type="interval" position="year*sales"/>
        </Chart>

        <Chart height={400} data={this.brokenData} forceFit>
          <Axis name="year" title={{
            position: 'end',
            offset: 15,
            textStyle: {
              fontSize: '12',
              textAlign: 'center',
              fill: '#999',
              fontWeight: 'bold',
              rotate: 0,
              autoRotate: true,
            },
          }}/>
          <Axis name="value" title={{
            position: 'end',
            offset: 5.5,
            textStyle: {
              fontSize: '12',
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
          <Geom type="line" position="year*value" size={2}
                tooltip={['year*value', (year, value) => {
                  return {
                    name: '数值', // 要显示的名字
                    value: value,
                    title: year,
                  };
                }]}/>
          <Geom
            type="point"
            position="year*value"
            size={4}
            shape={'circle'}
            style={{
              stroke: '#fff',
              lineWidth: 1,
            }}
            tooltip={['year*value', (year, value) => {
              return {
                name: '数值', // 要显示的名字
                value: value,
                title: year,
              };
            }]}
          />
        </Chart>
        <WordCloud/>
      </Card>

    );
  }
}






