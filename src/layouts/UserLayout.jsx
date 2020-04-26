import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, useIntl, connect } from 'umi';
import React from 'react';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';
import { GithubOutlined } from '@ant-design/icons';

const defaultFooterDom = (
  <DefaultFooter
    copyright="2020 徐文君"
    links={[
      {
        key: 'POAS-UI',
        title: 'POAS—UI',
        href: 'http://localhost:8000',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/February31/poas-ui',
        blankTarget: true,
      },
      {
        key: 'Ant Design Pro',
        title: 'Ant Design Pro',
        href: 'https://github.com/ant-design/ant-design-pro',
        blankTarget: true,
      },
    ]}
  />
);

const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>POAS</span>
              </Link>
            </div>
            <div className={styles.desc}>POAS 微博舆情分析系统</div>
          </div>
          {children}
        </div>
        {defaultFooterDom}
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
