//app.js
var plugin = requirePlugin("chatbot");
var gql = require('wxapp-graphql');
var GraphQL = gql.GraphQL;
function doLogin(openid) {
  let gql = GraphQL({
    url: 'https://api.creatorsdaily.com/graphql' // url 必填 
  }, true);

  // query 查询，mutation 请使用 gql.mutate
  gql.query({
    query: `mutation ($username: String!, $password: String!) {\n  signin(username: $username, password: $password) {\n    id\n    username\n    nickname\n    token\n    oneSignal\n    __typename\n  }\n}\n`,
    variables: {
      username: openid,
      password: '123456'
    },
    operationName: null
  }).then(function (res) {
    //成功
    console.log(res.signin)
  }).catch(function (error) {
    //失败
    console.log(error);
  });
}

function doRegistere(openid) {
  let gql = GraphQL({
    url: 'https://api.creatorsdaily.com/graphql' // url 必填 
  }, true);

  // query 查询，mutation 请使用 gql.mutate
  gql.query({
    query: `mutation ($user: IUser!) {\n  signup(user: $user) {\n    id\n    username\n    token\n    __typename\n  }\n}\n`,
    variables: {
      user: {
        username: openid,
        password: "123456"
      }
    },
    operationName: null
  }).then(function (res) {
    //成功
    console.log(this.globalData.userInfo)

  }).catch(function (error) {
    //失败
    console.log(error);
    doLogin(openid)
  });
}

App({
  onLaunch: function () {
    if (wx.cloud) {
      wx.cloud.init({
        traceUser: true,
        env: "creatorsdaily-666"
      })
    }
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      console.log(res.result.event.userInfo);
      plugin.init({
        appid: "D74iKwWDen4GL3mdsEkl6qW1m0bbFD", //小程序示例账户，仅供学习和参考
        openid: res.result.event.userInfo.openId,//用户的openid，非必填，建议传递该参数
        success: () => {}, //非必填
        fail: error => {} //非必填
    });
      this.globalData.userInfo = res.result.event.userInfo;
      // doRegistere(res.result.event.userInfo.openId)
    })
    wx.getSystemInfo({
      success: e => {
        this.globalData.device = e;
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
        this.globalData.DevHeight = e.safeArea.height
      }
    })

  },
  globalData: {
    userInfo:{},
    token:"",
    ColorList: [{
        title: '嫣红',
        name: 'red',
        color: '#e54d42'
      },
      {
        title: '桔橙',
        name: 'orange',
        color: '#f37b1d'
      },
      {
        title: '明黄',
        name: 'yellow',
        color: '#fbbd08'
      },
      {
        title: '橄榄',
        name: 'olive',
        color: '#8dc63f'
      },
      {
        title: '森绿',
        name: 'green',
        color: '#39b54a'
      },
      {
        title: '天青',
        name: 'cyan',
        color: '#1cbbb4'
      },
      {
        title: '海蓝',
        name: 'blue',
        color: '#0081ff'
      },
      {
        title: '姹紫',
        name: 'purple',
        color: '#6739b6'
      },
      {
        title: '木槿',
        name: 'mauve',
        color: '#9c26b0'
      },
      {
        title: '桃粉',
        name: 'pink',
        color: '#e03997'
      },
      {
        title: '棕褐',
        name: 'brown',
        color: '#a5673f'
      },
      {
        title: '玄灰',
        name: 'grey',
        color: '#8799a3'
      },
      {
        title: '草灰',
        name: 'gray',
        color: '#aaaaaa'
      },
      {
        title: '墨黑',
        name: 'black',
        color: '#333333'
      },
      {
        title: '雅白',
        name: 'white',
        color: '#ffffff'
      },
    ]
  }
})