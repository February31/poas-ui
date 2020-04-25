export default {
  // 支持值为 Object 和 Array
  'GET /api/listEvent':
    [{
      id: '1',
      name: '美国疫情',
      keywords: '疫情 美国',
      start_time: '2020-04-15',
      end_time: '2020-04-16',
      status: '未开始',
    },
      {
        id: '1',
        name: '美国疫情',
        keywords: '疫情 美国',
        start_time: '2020-04-15',
        end_time: '2020-04-16',
        status: '未开始',
      },
      {
        id: '1',
        name: '美国疫情',
        keywords: '疫情 美国',
        start_time: '2020-04-15',
        end_time: '2020-04-16',
        status: '进行中',
      },
      {
        id: '1',
        name: '美国疫情',
        keywords: '疫情 美国',
        start_time: '2020-04-15',
        end_time: '2020-04-16',
        status: '未开始',
      },
    ],
  'GET /api/sart': [
  ],
  'GET /api/update2': [],
  "GET /api/listSentiment":[
    {
      eventId: '1',
      weiboId:"1234",
      commentsCount:"1",
      attitudesCount:"1",
      repostsCount:"1",
      text: '美国疫情美国疫情美国疫情美国疫情美国疫情',
      attitude: '正向',
      createdAt: '2020-04-15',
      similarity: '4',
    },
    {
      eventId: '1',
      weiboId:"121",
      commentsCount:"5",
      attitudesCount:"5",
      repostsCount:"5",
      text: '感受到过地方够大会功夫芙',
      attitude: '正向',
      createdAt: '2020-04-15',
      similarity: '4',
    },
    {
      eventId: '1',
      weiboId:"125",
      commentsCount:"2",
      attitudesCount:"2",
      repostsCount:"2",
      text: '提防更甚VG时代光华非结构化你',
      attitude: '正向',
      createdAt: '2020-04-15',
      similarity: '4',
    },
  ],
  "GET /api/deleteSentiment":[true],
  "GET /api/updateAttitude":[true],
  "GET /api/listComment":[
    {
      weiboId: '1',
      commentId:"2",
      userId:"2",
      repostsCount:"2",
      text: '提防更甚VG时代光华非结构化你',
      attitude: '正向',
    },
    {
      weiboId: '1',
      commentId:"2",
      userId:"2",
      repostsCount:"2",
      text: '提防更甚VG时代光华非结构化你',
      attitude: '正向',
    },
    {
      weiboId: '1',
      commentId:"2",
      userId:"2",
      repostsCount:"2",
      text: '提防更甚VG时代光华非结构化你',
      attitude: '正向',
    },
    {
      weiboId: '1',
      commentId:"2",
      userId:"2",
      repostsCount:"2",
      text: '提防更甚VG时代光华非结构化你',
      attitude: '正向',
    },
  ],
  "GET /api/deleteComment":[true],
  "GET /api/updateComment":[true],
  "GET /api/commentEmotionalRatio":{
    forward:"0.33",
    negation:"0.67"
  }
,
  // 'POST /api/login/account': (req, res) => {
  //   const { password, userName, type } = req.body;
  //
  //   if (password === 'a' && userName === 'admin') {
  //     res.send({
  //       status: 'ok',
  //       type,
  //       currentAuthority: 'admin',
  //     });
  //     return;
  //   }
  //
  //   if (password === 'a' && userName === 'user') {
  //     res.send({
  //       status: 'ok',
  //       type,
  //       currentAuthority: 'user',
  //     });
  //     return;
  //   }
  //
  //   if (type === 'mobile') {
  //     res.send({
  //       status: 'ok',
  //       type,
  //       currentAuthority: 'admin',
  //     });
  //     return;
  //   }
  //
  //   res.send({
  //     status: 'error',
  //     type,
  //     currentAuthority: 'guest',
  //   });
  // },
  // 'POST /api/register': (req, res) => {
  //   res.send({
  //     status: 'ok',
  //     currentAuthority: 'user',
  //   });
  // },
  // 'GET /api/500': (req, res) => {
  //   res.status(500).send({
  //     timestamp: 1513932555104,
  //     status: 500,
  //     error: 'error',
  //     message: 'error',
  //     path: '/base/category/list',
  //   });
  // },
  // 'GET /api/404': (req, res) => {
  //   res.status(404).send({
  //     timestamp: 1513932643431,
  //     status: 404,
  //     error: 'Not Found',
  //     message: 'No message available',
  //     path: '/base/category/list/2121212',
  //   });
  // },
  // 'GET /api/403': (req, res) => {
  //   res.status(403).send({
  //     timestamp: 1513932555104,
  //     status: 403,
  //     error: 'Unauthorized',
  //     message: 'Unauthorized',
  //     path: '/base/category/list',
  //   });
  // },
  // 'GET /api/401': (req, res) => {
  //   res.status(401).send({
  //     timestamp: 1513932555104,
  //     status: 401,
  //     error: 'Unauthorized',
  //     message: 'Unauthorized',
  //     path: '/base/category/list',
  //   });
  // },
};
