// pages/product/product.js
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
    product: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      id
    } = options;
    this.setData({
      id
    },()=>{
      this.getProduct()
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
  getProduct: function () {
    let {
      id,
      product,
      user
    } = this.data;
    let that = this;
    wx.vibrateShort({
      complete: (res) => {},
    });
    // 初始化对象
    

    // query 查询，mutation 请使用 gql.mutate
    api.query({
      query: `query ($id: String!) {\n  product(id: $id) {\n    id\n    name\n    description\n    isLike\n    likeCount\n    commentCount\n    createdAt\n    isMiniProgram\n    topics {\n      id\n      name\n      __typename\n    }\n    icon {\n      id\n      hash\n      __typename\n    }\n    content\n    discovererId\n    links\n    codes {\n      id\n      code\n      redeemedAt\n      redeemer {\n        id\n        nickname\n        username\n        email\n        number\n        createdAt\n        signinedAt\n        avatar {\n          id\n          hash\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    miniProgramQRCode {\n      id\n      hash\n      __typename\n    }\n    discoverer {\n      id\n      nickname\n      username\n      email\n      number\n      createdAt\n      signinedAt\n      avatar {\n        id\n        hash\n        __typename\n      }\n      __typename\n    }\n    creators {\n      id\n      nickname\n      username\n      email\n      number\n      createdAt\n      signinedAt\n      avatar {\n        id\n        hash\n        __typename\n      }\n      __typename\n    }\n    likes {\n      id\n      nickname\n      username\n      email\n      number\n      createdAt\n      signinedAt\n      avatar {\n        id\n        hash\n        __typename\n      }\n      __typename\n    }\n    medias {\n      id\n      hash\n      __typename\n    }\n    milestones {\n      data {\n        id\n        title\n        content\n        createdAt\n        __typename\n      }\n      __typename\n    }\n    wishes(size: 10) {\n      data {\n        id\n        type\n        title\n        content\n        isLike\n        likeCount\n        createdAt\n        user {\n          id\n          nickname\n          username\n          email\n          number\n          createdAt\n          signinedAt\n          avatar {\n            id\n            hash\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    options {\n      rank\n      question {\n        id\n        name\n        __typename\n      }\n      ups {\n        id\n        reason\n        positive\n        createdAt\n        user {\n          id\n          nickname\n          username\n          email\n          number\n          createdAt\n          signinedAt\n          avatar {\n            id\n            hash\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      downs {\n        id\n        reason\n        positive\n        createdAt\n        user {\n          id\n          nickname\n          username\n          email\n          number\n          createdAt\n          signinedAt\n          avatar {\n            id\n            hash\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      value\n      __typename\n    }\n    __typename\n  }\n}\n`,
      variables: {
        id
      },
      operationName: null
    }).then(function (res) {
      //成功
      console.log(res);
      that.setData({
        product: res.product
      })

    }).catch(function (error) {
      //失败
      console.log(error);
    });
  },
  preview(e) {
    console.log(e)
    let url = e.currentTarget.dataset.url;
    let ImageLinkArray = [];
    for (let i of this.data.product.medias) {
      ImageLinkArray.push('https://media.creatorsdaily.com/' + i.hash)
    }
    wx.previewImage({
      current: url,
      urls: ImageLinkArray,
      fail: function () {
        console.log('fail')
      },
      complete: function () {
        console.info("点击图片了");
      },
    })
  },
  doLike: function () {
    let {
      product,
      user
    } = this.data;
    let that = this;
    wx.vibrateShort({
      complete: (res) => {},
    });
    // 初始化对象
    
    if (product.isLike) {
      product.likeCount = product.likeCount - 1
    } else {
      product.likeCount = product.likeCount + 1
    }
    api.query({
      query: `mutation ($id: String!, $dislike: Boolean) {\n  likeProduct(id: $id, dislike: $dislike) {\n    id\n    isLike\n    likeCount\n    __typename\n  }\n}\n`,
      variables: {
        "id": product.id,
        "dislike": product.isLike
      },
      operationName: null
    }).then(function (res) {
      //成功
      console.log(res);
      product.isLike = !product.isLike
      that.setData({
        product
      })

    }).catch(function (error) {
      //失败
      console.log(error);
    });
  },
  doCopy:function(){
    let {product} = this.data;
    wx.vibrateShort({
      complete: (res) => {},
    })
    wx.setClipboardData({
      data: product.links[0],
      success (res) {
        wx.getClipboardData({
          success (res) {
            console.log(res.data) // data
          }
        })
      }
    })
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