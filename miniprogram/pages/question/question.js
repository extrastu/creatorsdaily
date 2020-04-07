// pages/question/question.js
const app = getApp()
var gql = require('wxapp-graphql');
var GraphQL = gql.GraphQL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    loading: true,
    page: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getQuestions()
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
    wx.vibrateShort({
      complete: (res) => {},
    })
    wx.setNavigationBarTitle({
      title: '问题',
    })
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
    this.getQuestions();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getQuestions: function () {
    let {
      loading,
      list,
      page
    } = this.data;
    let that = this;
    wx.vibrateShort({
      complete: (res) => {},
    });
    // 初始化对象
    let gql = GraphQL({
      url: 'https://api.creatorsdaily.com/graphql',
    }, true);

    // query 查询，mutation 请使用 gql.mutate
    gql.query({
      query: `query ($page: Int, $size: Int, $topic: [String!], $user: String) {\n  getQuestions(page: $page, size: $size, topic: $topic, user: $user) {\n    total\n    data {\n      id\n      name\n      createdAt\n      user {\n        id\n        nickname\n        username\n        email\n        number\n        createdAt\n        signinedAt\n        avatar {\n          id\n          hash\n          __typename\n        }\n        __typename\n      }\n      topics {\n        id\n        name\n        __typename\n      }\n      options {\n        rank\n        value\n        product {\n          id\n          name\n          description\n          isLike\n          likeCount\n          commentCount\n          createdAt\n          isMiniProgram\n          topics {\n            id\n            name\n            __typename\n          }\n          icon {\n            id\n            hash\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n`,
      variables: {
        page,
        size: 20,
      },
      operationName: null
    }).then(function (res) {
      //成功
      if(res.getQuestions.data.length ===0){
        that.setData({
          loading:false
        },()=>{
          return wx.showToast({
            title: '已经到底了～',
          })
        })
      }
      list = list.concat(res.getQuestions.data);
      page++;
      that.setData({
        list,page
      })
    }).catch(function (error) {
      //失败
      console.log(error);
    });
  },
  skipQuestionInfo:function(e){
    let {
      id
    } = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../questionInfo/questionInfo?id=' + id
    })
  }
})