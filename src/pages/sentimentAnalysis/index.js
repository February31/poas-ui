import React from 'react';
import { Card, Row,Col } from 'antd';
import { connect } from 'umi';
import { WordCloud } from './wordCloud';
import { PieChart } from './pieChart';
import { LineChart } from './lineChart';

@connect(({ sentiment_overview }) => ({
  wordCloudData: sentiment_overview.wordCloudData,
}))
export class SentimentChart extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={12}>
            <WordCloud/>
          </Col>
          <Col span={12}>
            <PieChart/>
          </Col>
        </Row>
        <LineChart/>
      </div>
    );
  }
}






