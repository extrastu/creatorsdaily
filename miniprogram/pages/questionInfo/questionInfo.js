// pages/questionInfo/questionInfo.js
import api from '../../utils/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {id} = options;
    this.setData({
      id
    },()=>{
      this.getQuestionInfoById()
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
    wx.setNavigationBarTitle({
      title: ''
    })
    wx.vibrateShort({
      complete: (res) => {},
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getQuestionInfoById:function(){
    let that = this;
    let {id,question} = that.data;
    api.query({
      query: `query ($id: String!) {\n  getQuestion(id: $id) {\n    id\n    name\n    createdAt\n    user {\n      id\n      nickname\n      username\n      email\n      number\n      createdAt\n      signinedAt\n      avatar {\n        id\n        hash\n        __typename\n      }\n      __typename\n    }\n    topics {\n      id\n      name\n      __typename\n    }\n    options {\n      rank\n      value\n      questionId\n      product {\n        id\n        name\n        description\n        isLike\n        likeCount\n        commentCount\n        createdAt\n        isMiniProgram\n        topics {\n          id\n          name\n          __typename\n        }\n        icon {\n          id\n          hash\n          __typename\n        }\n        medias {\n          id\n          hash\n          __typename\n        }\n        __typename\n      }\n      ups {\n        id\n        reason\n        positive\n        createdAt\n        user {\n          id\n          nickname\n          username\n          email\n          number\n          createdAt\n          signinedAt\n          avatar {\n            id\n            hash\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      downs {\n        id\n        reason\n        positive\n        createdAt\n        user {\n          id\n          nickname\n          username\n          email\n          number\n          createdAt\n          signinedAt\n          avatar {\n            id\n            hash\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n`,
      variables: {
       id
      },
      operationName: null
    }).then(function (res) {
      //成功
      console.log(res.getQuestion);
      that.setData({
        question:res.getQuestion
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
})