// pages/topic/topic.js
const app = getApp()
var gql = require('wxapp-graphql');
var GraphQL = gql.GraphQL;
import api from '../../utils/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    list: [],
    page: 1,
    isEnd: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    let {
      id,
      title
    } = options;
    wx.setNavigationBarTitle({
      title
    })
    
    this.setData({
      id
    }, () => {
      this.getTopic();
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {



  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getTopic();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getTopic: function () {
    let {
      page,
      loading,
      list,
      id,
      total,
      user
    } = this.data;
    let that = this;
    // 初始化对象
    

    // query 查询，mutation 请使用 gql.mutate
    api.query({
      query: `query ($page: Int, $size: Int, $topic: [String!], $keyword: [String!], $order: String) {\n  getProducts(page: $page, size: $size, topic: $topic, keyword: $keyword, order: $order) {\n    total\n    data {\n      codeCount\n      id\n      name\n      description\n      isLike\n      likeCount\n      commentCount\n      createdAt\n      isMiniProgram\n      topics {\n        id\n        name\n        __typename\n      }\n      icon {\n        id\n        hash\n        __typename\n      }\n      discoverer {\n        id\n        nickname\n        username\n        email\n        number\n        createdAt\n        signinedAt\n        avatar {\n          id\n          hash\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n`,
      variables: {
        page,
        size: 20,
        topic: id
      },
      operationName: null
    }).then(function (res) {
      //成功
      console.log(res.getProducts.data);
      list = list.concat(res.getProducts.data);
      loading = false;
      ++page;
      total = res.total;
      that.setData({
        list,
        loading,
        page,
        total
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
  }
})