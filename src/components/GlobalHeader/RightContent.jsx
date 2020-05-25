import { Tooltip, Tag,Badge,notification,Button  } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';
import React from 'react';
import { connect } from 'umi';
import Avatar from './AvatarDropdown';
// import HeaderSearch from '../HeaderSearch';
// import SelectLang from '../SelectLang';
import styles from './index.less';

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight = props => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  const close = () => {
    const {dispatch} = props
    dispatch({
      type:"user/handleWarning",
      payload:props.warning[0].eventId
    })
    notification.close("key")
  };
  const openNotification = () => {
    // const key = `open${Date.now()}`;
    const key = "key"
    const btn = (
      <Button type="primary" size="small" onClick={close}>
        已处理
      </Button>
    );
    notification.open({
      message: '舆情预警！！！',
      description: "在"+props.warning[0].time+"采集到相关舆情"+props.warning[0].size+"条，达到舆情报警条件！",
      btn,
      key,
    });
  };

  return (
    <div className={className}>
      {/*<HeaderSearch*/}
      {/*  className={`${styles.action} ${styles.search}`}*/}
      {/*  placeholder="站内搜索"*/}
      {/*  defaultValue="umi ui"*/}
      {/*  options={[*/}
      {/*    {*/}
      {/*      label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>,*/}
      {/*      value: 'umi ui',*/}
      {/*    },*/}
      {/*    {*/}
      {/*      label: <a href="next.ant.design">Ant Design</a>,*/}
      {/*      value: 'Ant Design',*/}
      {/*    },*/}
      {/*    {*/}
      {/*      label: <a href="https://protable.ant.design/">Pro Table</a>,*/}
      {/*      value: 'Pro Table',*/}
      {/*    },*/}
      {/*    {*/}
      {/*      label: <a href="https://prolayout.ant.design/">Pro Layout</a>,*/}
      {/*      value: 'Pro Layout',*/}
      {/*    },*/}
      {/*  ]} // onSearch={value => {*/}
      {/*  //   //console.log('input', value);*/}
      {/*  // }}*/}
      {/*/>*/}
      {/*<Tooltip title="使用文档">*/}
      {/*  <a*/}
      {/*    target="_blank"*/}
      {/*    href="https://pro.ant.design/docs/getting-started"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*    className={styles.action}*/}
      {/*  >*/}
      {/*    <QuestionCircleOutlined />*/}
      {/*  </a>*/}
      {/*</Tooltip>*/}
      <div onClick={openNotification}>
        <Badge count={props.warning.length} className={styles.action}/>
      </div>


      <Avatar />
      {REACT_APP_ENV && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )}
      {/*<SelectLang className={styles.action} />*/}
    </div>
  );
};

export default connect(({ settings,user }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
  warning:user.warning
}))(GlobalHeaderRight);
