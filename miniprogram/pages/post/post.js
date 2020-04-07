// pages/post/post.js
const app = getApp()
var gql = require('wxapp-graphql');
var GraphQL = gql.GraphQL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    post:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {id} = options;
    this.setData({
      id
    },()=>{
      this.getPost();
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
      title: ""
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
  getPost:function(){
    wx.vibrateShort({
      complete: (res) => {},
    })
    let {
     post,id
    } = this.data;
    let that = this;
    // 初始化对象
    let gql = GraphQL({
      url: 'https://api.creatorsdaily.com/graphql', 
    }, true);

    // query 查询，mutation 请使用 gql.mutate
    gql.query({
      query: `query ($id: String!) {\n  getPost(id: $id) {\n    content\n    id\n    title\n    description\n    createdAt\n    media {\n      id\n      hash\n      __typename\n    }\n    user {\n      id\n      nickname\n      username\n      email\n      number\n      createdAt\n      signinedAt\n      avatar {\n        id\n        hash\n        __typename\n      }\n      __typename\n    }\n    products {\n      id\n      name\n      description\n      isLike\n      likeCount\n      commentCount\n      createdAt\n      isMiniProgram\n      topics {\n        id\n        name\n        __typename\n      }\n      icon {\n        id\n        hash\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n`,
      variables: {
       id
      },
      operationName: null
    }).then(function (res) {
      //成功
      console.log(res);
      that.setData({
        post:res.getPost
      })
    }).catch(function (error) {
      //失败
      console.log(error);
    });
  },
  toProductDetail:function(e){
    let {id} = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../product/product?id=' + id
    })
  }
})