//index.js
const app = getApp()
var gql = require('wxapp-graphql');
var GraphQL = gql.GraphQL;
import api from '../../utils/api';

Page({
  data: {
    list: [],
    loading: true,
    page: 1,
    user: {}
  },
  onShow: function () {
    wx.vibrateShort({
      complete: (res) => {},
    })
  },
  onLoad: function () {
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
      console.log('新版本下载失败')
    })
    this.getList();
  },
  onReachBottom: function () {
    this.getList();
    wx.vibrateShort({
      complete: (res) => {},
    })
  },
  getList: function () {
    let {
      page,
      loading,
      list,
      user
    } = this.data;
    let that = this;


    // query 查询，mutation 请使用 gql.mutate
    api.query({
      query: `query ($page: Int, $size: Int, $topic: [String!], $keyword: [String!], $order: String) {\n  getProducts(page: $page, size: $size, topic: $topic, keyword: $keyword, order: $order) {\n    total\n    data {\n      codeCount\n      id\n      name\n      description\n      isLike\n      likeCount\n      commentCount\n      createdAt\n      isMiniProgram\n      topics {\n        id\n        name\n        __typename\n      }\n      icon {\n        id\n        hash\n        __typename\n      }\n      discoverer {\n        id\n        nickname\n        username\n        email\n        number\n        createdAt\n        signinedAt\n        avatar {\n          id\n          hash\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n`,
      variables: {
        page,
        size: 20
      },
      operationName: null
    }).then(function (res) {
      //成功
      console.log(res.getProducts.data);
      list = list.concat(res.getProducts.data);
      loading = false;
      ++page;
      wx.stopPullDownRefresh({
        complete: (res) => {},
      })
      that.setData({
        list,
        loading,
        page
      })

    }).catch(function (error) {
      //失败
      console.log(error);
    });
  },
  toProductDetail: function (e) {
    let {
      id
    } = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../product/product?id=' + id
    })
  },
  onPullDownRefresh: function () {
    console.info('下拉刷新');
    wx.vibrateShort({
      complete: (res) => {},
    })
    this.setData({
      page: 1,
      list: []
    }, () => {
      setTimeout(() => {
        this.getList()
      }, 1000)
    })
  }
})