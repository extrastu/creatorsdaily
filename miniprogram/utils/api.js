var gql = require('wxapp-graphql');
var GraphQL = gql.GraphQL;

var api = GraphQL({
    //设置全局 url
    url: 'https://api.creatorsdaily.com/graphql', // url 必填

    //设置全居动态 header
    header: function () {
        return {
            'authorization': "Bearer " +  wx.getStorageSync('token')
        }
    },

    //设置全居错误拦截
    errorHandler: function (res) {
        console.log(res);
        wx.showToast({
          title: '请求失败，请稍后再试',
          icon: "none"
        })
    }
  }, true
);

module.exports = api;