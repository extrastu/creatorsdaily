// pages/user/user.js
const app = getApp()
var gql = require('wxapp-graphql');
var GraphQL = gql.GraphQL;
import api from '../../utils/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCheck: false,
    user: {
      nickname: "请登录",
      isCheck: false
    },
    account: {
      username: "",
      password: ""
    },
    storage: '',
    dataHei: 0,
    isScroll: false, //是否开启滚动
    isShowMore: false, //是否显示更多结果
    startY: 0, //滑动开始的坐标Y
    endY: 0, //滑动结束的坐标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let {
      storage
    } = this.data;
    let that = this;
    wx.getStorageInfo({
      success(res) {
        that.setData({
          storage: res.currentSize
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let {
      user
    } = this.data;
    let that = this;
    wx.getStorage({
      key: 'user',
      success(res) {
        user = res.data;

        that.setData({
          user
        })
        if (user.token) {
          that.getUserAll(user.id, user.token, true)
        }
      }
    })


    wx.vibrateShort({
      complete: (res) => {},
    })
    wx.setNavigationBarTitle({
      title: '我的',
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
  checkLogin: function () {
    let {
      user
    } = this.data;
    let that = this;
    wx.vibrateShort({
      complete: (res) => {},
    })
    if (!user.isCheck) {
      wx.showModal({
        title: '提示',
        content: '确定切换账号？',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
            wx.vibrateShort({
              complete: (res) => {},
            })
            user.isCheck = true;
            wx.setStorage({
              data: user,
              key: 'user',
            })
            that.setData({
              user
            }, () => {
              that.showLogin()
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  showLogin: function (e) {
    wx.vibrateShort({
      complete: (res) => {},
    })
    this.setData({
      modalName: 'bottomModal'
    }, () => {
      wx.hideTabBar({
        animation: true,
      })
    })
  },
  hideModal(e) {
    wx.vibrateShort({
      complete: (res) => {},
    })
    this.setData({
      modalName: null
    }, () => {
      wx.showTabBar({
        animation: true,
      })
    })
  },
  changeUsername: function (e) {
    let {
      account
    } = this.data
    let {
      value
    } = e.detail;
    account.username = value;
    this.setData({
      account
    })
  },
  changePwd: function (e) {
    let {
      account
    } = this.data
    let {
      value
    } = e.detail;
    account.password = value;
    this.setData({
      account
    })
  },
  doLogin: function () {
    let {
      modalName,
      account,
      user
    } = this.data;
    let that = this;
    if (account.username && account.password) {
      let gql = GraphQL({
        url: 'https://api.creatorsdaily.com/graphql' // url 必填 
      }, true);

      // query 查询，mutation 请使用 gql.mutate
      api.query({
        query: `mutation ($username: String!, $password: String!) {\n  signin(username: $username, password: $password) {\n    id\n    username\n    nickname\n    token\n    oneSignal\n    __typename\n  }\n}\n`,
        variables: account,
        operationName: null
      }).then(function (res) {
        //成功
        console.log(res.signin);

        user.nickname = res.signin.nickname;
        res.signin.avatar = user.avatar;
        res.signin.isCheck = true;
        app.globalData.token = res.signin.token;

        wx.setStorage({
          data: res.signin,
          key: 'user',
        })
        wx.setStorage({
          data: res.signin.token,
          key: 'token',
        })
        // that.getUser(res.signin.token)
        that.getUserAll(res.signin.id, res.signin.token)
        that.onReady();
        // that.setData({
        //   user,
        //   modalName:null
        // })
        // wx.showToast({
        //   title: '登录成功'
        // })
        // wx.showTabBar({
        //   animation: true,
        // })
      }).catch(function (error) {
        //失败
        console.log(error);
        wx.showToast({
          title: '登录失败,请检查登录信息',
          icon: "none"
        })
      });
    } else {
      wx.showToast({
        title: '请完善登录信息',
        icon: "none"
      })
    }
  },
  getUser: function (token) {
    let that = this;
    let {
      user
    } = that.data;
    let gql = GraphQL({
      url: 'https://api.creatorsdaily.com/graphql',
      header: {
        'authorization': "Bearer " + token
      }
    }, true);

    // query 查询，mutation 请使用 gql.mutate
    gql.query({
      query: `{\n  viewer {\n    id\n    nickname\n    username\n    email\n    number\n    createdAt\n    signinedAt\n    avatar {\n      id\n      hash\n      __typename\n    }\n    link\n    description\n    token\n    oneSignal\n    __typename\n  }\n}\n`,
      variables: {},
      operationName: null
    }).then(function (res) {
      //成功
      console.log(res.viewer);
      res.viewer.isCheck = true;
      user = res.viewer

      wx.setStorage({
        data: res.viewer,
        key: 'user',
      })
      that.setData({
        user,
        modalName: null
      })
      wx.showToast({
        title: '登录成功'
      })
      wx.showTabBar({
        animation: true,
      })
    }).catch(function (error) {
      //失败
      console.log(error);
      wx.showToast({
        title: '登录失败,请检查登录信息',
        icon: "none"
      })
    });
  },
  clearStorage: function () {
    let that = this;
    wx.vibrateShort({
      complete: (res) => {},
    })
    wx.showModal({
      title: '确定要清理缓存吗？',
      content: '"清理缓存"功能可帮助小程序解决运行时出现的问题。若小程序运行正常，我们不建议你使用此功能。',
      confirmText: "清理缓存",
      confirmColor: '#CD5C5C',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.vibrateShort({
            complete: (res) => {},
          })
          try {
            wx.clearStorageSync();
            that.setData({
              user: {
                nickname: "请登录",
                isCheck: false
              },
              storage: 0
            })
          } catch (e) {
            // Do something when catch error
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  getUserAll: function (id, token, isShow) {
    let that = this;
    let {
      user
    } = that.data;
    let gql = GraphQL({
      url: 'https://api.creatorsdaily.com/graphql',
      header: {
        'authorization': "Bearer " + token
      }
    }, true);

    // query 查询，mutation 请使用 gql.mutate
    gql.query({
      query: `query ($id: String!, $createdPage: Int, $createdSize: Int, $discoveredPage: Int, $discoveredSize: Int, $likedPage: Int, $likedSize: Int, $postPage: Int, $postSize: Int) {\n  user(id: $id) {\n    id\n    nickname\n    username\n    email\n    number\n    createdAt\n    signinedAt\n    avatar {\n      id\n      hash\n      __typename\n    }\n    link\n    description\n    createdProducts(page: $createdPage, size: $createdSize) {\n      total\n      data {\n        id\n        name\n        description\n        isLike\n        likeCount\n        commentCount\n        createdAt\n        isMiniProgram\n        topics {\n          id\n          name\n          __typename\n        }\n        icon {\n          id\n          hash\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    discoveredProducts(page: $discoveredPage, size: $discoveredSize) {\n      total\n      data {\n        id\n        name\n        description\n        isLike\n        likeCount\n        commentCount\n        createdAt\n        isMiniProgram\n        topics {\n          id\n          name\n          __typename\n        }\n        icon {\n          id\n          hash\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    likedProducts(page: $likedPage, size: $likedSize) {\n      total\n      data {\n        id\n        name\n        description\n        isLike\n        likeCount\n        commentCount\n        createdAt\n        isMiniProgram\n        topics {\n          id\n          name\n          __typename\n        }\n        icon {\n          id\n          hash\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    posts(page: $postPage, size: $postSize) {\n      total\n      data {\n        id\n        title\n        description\n        createdAt\n        media {\n          id\n          hash\n          __typename\n        }\n        user {\n          id\n          nickname\n          username\n          email\n          number\n          createdAt\n          signinedAt\n          avatar {\n            id\n            hash\n            __typename\n          }\n          __typename\n        }\n        products {\n          id\n          name\n          description\n          isLike\n          likeCount\n          commentCount\n          createdAt\n          isMiniProgram\n          topics {\n            id\n            name\n            __typename\n          }\n          icon {\n            id\n            hash\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n`,
      variables: {
        id,
        discoveredSize: 15
      },
      operationName: null
    }).then(function (res) {
      //成功
      console.log(res.user);
      res.user.isCheck = true;
      res.user.token = token;
      user = res.user

      wx.setStorage({
        data: res.user,
        key: 'user',
      })
      that.setData({
        user,
        modalName: null
      })
      if (!isShow) {
        wx.showToast({
          title: '登录成功'
        })
        wx.showTabBar({
          animation: true,
        })
      }
    }).catch(function (error) {
      //失败
      console.log(error);
      wx.showToast({
        title: '登录失败,请检查登录信息',
        icon: "none"
      })
    });
  },
  showChat: function () {
    wx.vibrateShort({
      complete: (res) => {},
    })
    let {
      dataHei
    } = this.data;
    dataHei = 820;
    this.setData({
      dataHei
    }, () => {
      wx.hideTabBar({
        animation: true,
      })
    })
  },

  hideChat: function () {
    wx.vibrateShort({
      complete: (res) => {},
    })
    let {
      dataHei
    } = this.data;
    dataHei = 0;
    this.setData({
      dataHei
    }, () => {
      wx.showTabBar({
        animation: true,
      })
    })
  },
  setMoreData() {
    let {
      dataHei,
      isScroll,
      isShowMore
    } = this.data;
    if (dataHei === 820) {
      isScroll = true;
      isShowMore = true;
    } else {
      isScroll = false;
      isShowMore = false;
    }
    wx.vibrateShort({
      complete: (res) => {},
    })
    this.setData({
      isScroll,
      isShowMore
    })
  },
  setHidden: function () {
    console.log('收缩')
    wx.vibrateShort({
      complete: (res) => {},
    })
    let {
      dataHei,
      isScroll,
      isShowMore
    } = this.data;
    dataHei = 0;
    isScroll = false;
    isShowMore = false;
    this.setData({
      dataHei,
      isShowMore,
      isScroll
    },()=>{
      wx.showTabBar({
        animation: true,
      })
    })
  },
  //滑动的开始事件
  startTap(e) {
    let {
      startY,
      endY
    } = this.data;
    startY = endY = e.touches[0].pageY;
    this.setData({
      startY,
      endY
    })
  },

  //滑动的过程事件
  moveTap(e) {
    let {
      endY
    } = this.data;
    endY = e.touches[0].pageY;
    this.setData({
      endY
    })
  },

  //滑动的结束事件
  endTap(e) {
    let {
      startY,
      endY,
      dataHei
    } = this.data;
    endY = e.changedTouches[0].pageY;
    let top = e.target.offsetTop;
    //判断是不是下滑，并且下滑的距离是不是超过120和top要小于200，否则就不能下滑
    if ((endY > startY && Math.abs(endY - startY) > 120 && top < 200)) {
      dataHei = 0;
      // this.isScroll=false;
      this.setData({
        dataHei
      },()=>{
        this.hideChat();
      })
      this.setMoreData();
      return;
    }
  },
})