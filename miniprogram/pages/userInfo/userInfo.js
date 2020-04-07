// pages/userInfo/userInfo.js
import api from '../../utils/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '个人信息',
    })
    let {
      user
    } = this.data;
    let that = this;
    wx.getStorage({
      key: 'user',
      success(res) {
        console.log(res.data)
        user = res.data;
        that.setData({
          user
        })
      }
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
  changeAvatar: function () {
    let that = this;
    let {
      user
    } = that.data
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        wx.showLoading({
          title: '上传中',
        })
        wx.uploadFile({
          url: 'https://api.creatorsdaily.com/medias/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          header: {
            'authorization': 'Bearer ' + user.token
          },
          success(res) {
            const data = res.data
            console.log(data);
            that.createdMedia(JSON.parse(data)[0].hash)
            //do something
          }
        })
      }
    })
  },
  createdMedia: function (hash) {
    let that = this;
    api.query({
      query: `mutation ($media: IMedia!) {\n  createMedia(media: $media) {\n    id\n    hash\n    __typename\n  }\n}\n`,
      variables: {
        media: {
          hash
        }
      },
      operationName: null
    }).then(function (res) {
      //成功
      console.log(res.createMedia.id);
      that.updateUser(res.createMedia)

    }).catch(function (error) {
      //失败
      console.log(error);
    });
  },
  updateUser: function (media) {
    let that = this;
    let {
      user
    } = that.data;

    api.query({
      query: `mutation ($user: IUser!) {\n  updateUser(user: $user) {\n    id\n    nickname\n    email\n    link\n    description\n    avatar {\n      id\n      hash\n      __typename\n    }\n    __typename\n  }\n}\n`,
      variables: {
        user: {
          id: user.id,
          nickname: user.nickname,
          email: user.email,
          avatar:{
            id:media.id
          },
          link: user.link,
          description: user.description
        }
      },
      operationName: null
    }).then(function (res) {
      //成功
      console.log(res.updateUser);
      user.avatar = res.updateUser.avatar;
      that.setData({
        user
      },()=>{
        wx.hideLoading({
          complete: (res) => {},
        })
      })

    }).catch(function (error) {
      //失败
      console.log(error);
    });
  }
})