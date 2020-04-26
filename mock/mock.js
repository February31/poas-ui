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
  'GET /api/sart': [],
  'GET /api/update2': [],
  'GET /api/listSentiment': [
    {
      eventId: '1',
      weiboId: '1234',
      commentsCount: '1',
      attitudesCount: '1',
      repostsCount: '1',
      text: '美国疫情美国疫情美国疫情美国疫情美国疫情',
      attitude: '正向',
      createdAt: '2020-04-15',
      similarity: '4',
    },
    {
      eventId: '1',
      weiboId: '121',
      commentsCount: '5',
      attitudesCount: '5',
      repostsCount: '5',
      text: '感受到过地方够大会功夫芙',
      attitude: '正向',
      createdAt: '2020-04-15',
      similarity: '4',
    },
    {
      eventId: '1',
      weiboId: '125',
      commentsCount: '2',
      attitudesCount: '2',
      repostsCount: '2',
      text: '提防更甚VG时代光华非结构化你',
      attitude: '正向',
      createdAt: '2020-04-15',
      similarity: '4',
    },
  ],
  'GET /api/deleteSentiment': [true],
  'GET /api/updateAttitude': [true],
  'GET /api/listComment': [
    {
      weiboId: '1',
      commentId: '2',
      userId: '2',
      repostsCount: '2',
      text: '提防更甚VG时代光华非结构化你',
      attitude: '正向',
    },
    {
      weiboId: '1',
      commentId: '2',
      userId: '2',
      repostsCount: '2',
      text: '提防更甚VG时代光华非结构化你',
      attitude: '正向',
    },
    {
      weiboId: '1',
      commentId: '2',
      userId: '2',
      repostsCount: '2',
      text: '提防更甚VG时代光华非结构化你',
      attitude: '正向',
    },
    {
      weiboId: '1',
      commentId: '2',
      userId: '2',
      repostsCount: '2',
      text: '提防更甚VG时代光华非结构化你',
      attitude: '正向',
    },
  ],
  'GET /api/deleteComment': [true],
  'GET /api/updateComment': [true],
  'GET /api/commentEmotionalRatio': {
    forward: '0.33',
    negation: '0.67',
  }
  ,
  'GET /api/wordCloud': [
    {
      'x': 'United States',
      'value': 324982000,
      'category': 'america',
    },
    {
      'x': 'Indonesia',
      'value': 263510000,
      'category': 'asia',
    },
    {
      'x': 'Brazil',
      'value': 207505000,
      'category': 'america',
    },
    {
      'x': 'Pakistan',
      'value': 196459000,
      'category': 'asia',
    },
    {
      'x': 'Nigeria',
      'value': 191836000,
      'category': 'africa',
    },
    {
      'x': 'Bangladesh',
      'value': 162459000,
      'category': 'asia',
    },
    {
      'x': 'Russia',
      'value': 146804372,
      'category': 'europe',
    },
    {
      'x': 'Japan',
      'value': 126790000,
      'category': 'asia',
    },
    {
      'x': 'Mexico',
      'value': 123518000,
      'category': 'america',
    },
    {
      'x': 'Ethiopia',
      'value': 104345000,
      'category': 'africa',
    },
    {
      'x': 'Philippines',
      'value': 104037000,
      'category': 'asia',
    },
    {
      'x': 'Egypt',
      'value': 93013300,
      'category': 'africa',
    },
    {
      'x': 'Vietnam',
      'value': 92700000,
      'category': 'asia',
    },
    {
      'x': 'Germany',
      'value': 82800000,
      'category': 'europe',
    },
    {
      'x': 'Democratic Republic of the Congo',
      'value': 82243000,
      'category': 'africa',
    },
    {
      'x': 'Iran',
      'value': 80135400,
      'category': 'asia',
    },
    {
      'x': 'Turkey',
      'value': 79814871,
      'category': 'asia',
    },

  ],
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
