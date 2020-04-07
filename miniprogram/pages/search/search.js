// pages/search/search.js
const app = getApp()
var gql = require('wxapp-graphql');
var GraphQL = gql.GraphQL;
import api from '../../utils/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    loading: false,
    page: 1,
    keyword: '',
    isSearch: 0,
    likes: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLikesList()
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
    // let {
    //   user
    // } = this.data;
    // let that = this;
    // wx.getStorage({
    //   key: 'user',
    //   success(res) {
    //     console.log(res.data)
    //     user = res.data;
    //     that.setData({
    //       user
    //     }, () => {
    //       that.getLikesList();
    //     })
    //   }
    // })
    wx.setNavigationBarTitle({
      title: '搜索',
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
    if (this.data.likes.length == 0) {
      wx.vibrateShort({
        complete: (res) => {},
      })
      this.searchProduct()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  doSearch:function(){
   let {list} = this.data;
   list = []
   this.setData({
     list
   },()=>{
     this.searchProduct()
   }) 
  },
  searchProduct: function () {
    let {
      loading,
      list,
      keyword,
      page,
      user
    } = this.data;
    let that = this;
    wx.vibrateShort({
      complete: (res) => {},
    });
    

    // query 查询，mutation 请使用 gql.mutate
    api.query({
      query: `query ($page: Int, $size: Int, $score: Int, $keyword: String!) {\n  searchProducts(page: $page, size: $size, score: $score, keyword: $keyword) {\n    total\n    data {\n      codeCount\n      id\n      name\n      description\n      isLike\n      likeCount\n      commentCount\n      createdAt\n      isMiniProgram\n      topics {\n        id\n        name\n        __typename\n      }\n      icon {\n        id\n        hash\n        __typename\n      }\n      discoverer {\n        id\n        nickname\n        username\n        email\n        number\n        createdAt\n        signinedAt\n        avatar {\n          id\n          hash\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n`,
      variables: {
        page,
        size: 20,
        keyword,
        likes: []
      },
      operationName: null
    }).then(function (res) {
      //成功
      console.log(res.searchProducts);
      if (res.searchProducts.data.length === 0) {

      }
      list = list.concat(res.searchProducts.data);

      page++;
      that.setData({
        list,
        page
      })
    }).catch(function (error) {
      //失败
      console.log(error);
    });
  },
  inputChange: function (e) {
    let {
      value
    } = e.detail;
    this.setData({
      keyword: value,
      likes: []
    })
  },
  toProductDetail: function (e) {
    let {
      id
    } = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../product/product?id=' + id
    })
  },
  beginSearch: function () {
    wx.vibrateShort({
      complete: (res) => {},
    });
    this.setData({
      isSearch: 1
    })
  },
  cannelSearch: function () {
    wx.vibrateShort({
      complete: (res) => {},
    });
    this.setData({
      isSearch: 0,
      list: [],
      keyword: ''
    }, () => {
      this.getLikesList()
    })
  },
  getLikesList: function () {
    let {
      likes,
      user
    } = this.data;
    let that = this;
    wx.vibrateShort({
      complete: (res) => {},
    });
    

    // query 查询，mutation 请使用 gql.mutate
    api.query({
      query: `query ($page: Int, $size: Int, $topic: [String!], $keyword: [String!], $order: String) {\n  getProducts(page: $page, size: $size, topic: $topic, keyword: $keyword, order: $order) {\n    total\n    data {\n      codeCount\n      id\n      name\n      description\n      isLike\n      likeCount\n      commentCount\n      createdAt\n      isMiniProgram\n      topics {\n        id\n        name\n        __typename\n      }\n      icon {\n        id\n        hash\n        __typename\n      }\n      discoverer {\n        id\n        nickname\n        username\n        email\n        number\n        createdAt\n        signinedAt\n        avatar {\n          id\n          hash\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n`,
      variables: {
        order: "likes",
        size: 10
      },
      operationName: null
    }).then(function (res) {
      //成功
      likes = res.getProducts.data;
      that.setData({
        likes
      })
    }).catch(function (error) {
      //失败
      console.log(error);
    });
  }
})