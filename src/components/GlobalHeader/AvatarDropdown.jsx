import { LogoutOutlined, SettingOutlined, UserOutlined,NotificationOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin,Badge,Divider } from 'antd';
import React from 'react';
import { history, connect } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

class AvatarDropdown extends React.Component {
  onMenuClick = event => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }
      return;
    }

    history.push(`/account/${key}`);
  };

  render() {
    const {
      currentUser = {
        avatar: '',
        name: '',
      },
      menu,
    } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {/*{menu && (*/}
        {/*  <Menu.Item key="center">*/}
        {/*    <UserOutlined />*/}
        {/*    个人中心*/}
        {/*  </Menu.Item>*/}
        {/*)}*/}
        {/*{menu && (*/}
        {/*  <Menu.Item key="settings">*/}
        {/*    <SettingOutlined />*/}
        {/*    个人设置*/}
        {/*  </Menu.Item>*/}
        {/*)}*/}
        {/*{menu && <Menu.Divider />}*/}
        <Menu.Item key="security">
          <SettingOutlined />
          修改密码
        </Menu.Item>
        <Menu.Item key="setting">
          <UserOutlined />
          个人信息
        </Menu.Item>
        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>

      </Menu>
    );
    return currentUser && currentUser.name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" alt="avatar" />
          <span className={styles.name}>{currentUser.name}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );
  }
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
  userInfoVisible: user.userInfoVisible
}))(AvatarDropdown);
