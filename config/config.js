// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      redirect: '/user/login',
    },
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          // Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            // {
            //   path: '/',
            //   redirect: '/user/login',
            // },
            {
              path: '/welcome',
              name: '首页',
              icon: 'smile',
              component: './Welcome',
            },

            {
              path: '/event',
              name: '事件管理',
              icon: 'form',
              routes: [
                {
                  name: '添加事件',
                  icon: 'form',
                  path: '/event/addEvent',
                  component: './addEvent',
                },
                {
                  name: '事件列表',
                  icon: 'UnorderedListOutlined',
                  path: '/event/listEvent',
                  component: './listEvent',
                },
              ],
            },
            {
              path: '/sentiment',
              name: '舆情分析',
              icon: 'FileSearchOutlined',
              routes: [
                {
                  name: '舆情列表',
                  icon: 'UnorderedListOutlined',
                  path: '/sentiment/sentimentList',
                  component: './sentimentList',
                },
                {
                  name: '评论列表',
                  icon: 'UnorderedListOutlined',
                  path: '/sentiment/commentList',
                  component: './commentList',
                },
              ],
            },
            {
              path: '/account',
              name: '个人页',
              icon: 'UserOutlined',
              routes: [

                {
                  name: '个人设置',
                  icon: 'SettingOutlined',
                  path: '/account/setting',
                  component: './setting',
                },
                {
                  name: '修改密码',
                  icon: 'SettingOutlined',
                  path: '/account/security',
                  component: './security',
                },
              ],
            },
            {
              path: '/admin',
              name: '管理员',
              icon: 'crown',
              authority: ['admin'],
              routes: [
                {
                  path: '/admin/user',
                  name: '用户管理',
                  icon: 'UserDeleteOutlined',
                  component: './admin',
                  authority: ['admin'],
                },
                {
                  path: '/admin/log',
                  name: '日志管理',
                  icon: 'BookOutlined',
                  component: './logList',
                  authority: ['admin'],
                },
              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  ignoreMomentLocale: true,
  // proxy: proxy[REACT_APP_ENV || 'dev'],
  proxy: {
    '/v1': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      pathRewrite: {
        '^/v1': '',
      },
    },
  },
  manifest: {
    basePath: '/',
  },
});
