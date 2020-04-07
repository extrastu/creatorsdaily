// pages/class/class.js
import api from '../../utils/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconList: [{
        icon: 'https://media.creatorsdaily.com/Qmab4MUCF4VjFdSZDJTe7CWwqDWQTZiHZi5PDNkS8Rkvce-60-60',
        color: 'red',
        name: '工具',
        id: "d85e4a90-3b14-473a-9c38-b7e50982b7ee"
      }, {
        icon: 'https://media.creatorsdaily.com/QmXvqtjgmLNUznRSe8UV4ioZQjXynyWD3Ynra8YQ4nz2Y3-60-60',
        color: 'orange',
        name: '网站应用',
        id: "09f957b1-28b2-4461-a43d-fa10a196d0f3"
      }, {
        icon: 'https://media.creatorsdaily.com/QmeNp7tAHjDNGgAxN28hXTXGANpGP1RtDbtdizWVYk14Ky-60-60',
        color: 'yellow',
        name: '生产力',
        id: '16a70048-94b6-4794-8356-3be55db7d481'
      }, {
        icon: 'https://media.creatorsdaily.com/QmW8knz1zWHdHTAapUykhfNK15bw3qDSuBVVqELCp72em6-60-60',
        color: 'olive',
        name: '效率',
        id: '2c270163-30ee-4095-ac2f-fbb0fc3f2551'
      }, {
        icon: 'https://media.creatorsdaily.com/QmeRQhqUrCssxD9e8nLwyUdR1ty5HnfTri6uaKTdLwLYrx-60-60',
        color: 'cyan',
        name: '生活',
        id: "4b311149-a67d-4e5b-b531-3a7c82766dd9"
      }, {
        icon: 'https://media.creatorsdaily.com/Qmaaqy8PUdy7uo7VveXsxuGetsrfHS2HQKv9CyvVPPVbQY-60-60',
        color: 'blue',
        name: 'macOS',
        id: "c374fe37-7111-4930-929c-5165667cb615"
      }, {
        icon: 'https://media.creatorsdaily.com/QmVyXv2VayjWCVL585UUB7h9XwK7Viuh86xxA88RxowR3G-60-60',
        color: 'purple',
        name: '设计',
        id: "630bfd7c-7edd-42d2-89dd-7662eeb3eb90"
      }, {
        icon: 'https://media.creatorsdaily.com/QmVefaMR5HGq5UbHYTEGfjVy66q13wXtuNr6dGKmQaf97P-60-60',
        color: 'mauve',
        name: '社区',
        id: "92cd6712-63e9-40df-9d99-ccf68d7903da"
      }, {
        icon: 'https://media.creatorsdaily.com/QmQCBKv5nhtWbhsakLRmybgkB41c5Tja4BGHvDgEccnpG6-60-60',
        color: 'purple',
        name: '开发者工具',
        id: "efb461b3-8bb1-4119-985e-47bd5d0f77df"
      }, {
        icon: 'https://media.creatorsdaily.com/Qmbbzr2XMqCY6hrdkL2DDtM6RYTfiwX5S86gFmQbFDpoFe-60-60',
        color: 'mauve',
        name: 'APP',
        id: '157f3a68-51c6-4e8c-9c3c-7ab9dd799479'
      },
      {
        icon: 'https://media.creatorsdaily.com/QmaCPpWfzApVRFY6raheQoBQdm8ooCcJWAWaP1G5tWTsEg-60-60',
        color: 'red',
        name: 'iOS',
        id: '9c69dd54-bacb-4bd6-8aaf-f010d62bc166'
      }, {
        icon: 'https://media.creatorsdaily.com/QmcpHgSwNGnfdxvCRsqj8wFHEtZjdhHd8oHZGHjPuwHvBd-60-60',
        color: 'orange',
        name: '教育',
        id: '6eaaf767-0821-461d-8516-2a7b9f185c49'
      }, {
        icon: 'https://media.creatorsdaily.com/QmXPWEd9zqe6dnngDAaeZNJe6KDqfY2f7Ls7JHiPpzex7W-60-60',
        color: 'yellow',
        name: '微信小程序',
        id: '7e0c8978-d906-432e-9265-edb626978f87'
      }, {
        icon: 'https://media.creatorsdaily.com/QmbHdBkwwGcwi7TBFHeEyHn7Qrpm87KVfuDCi5qYi4qsgS-60-60',
        color: 'olive',
        name: '博客',
        id: 'f3246a6c-2358-49e9-ad08-0cfe1a65db2d'
      }, {
        icon: 'https://media.creatorsdaily.com/QmVJ6muxJHoHd5Vn7LD5UudwLWqVb7TpyvJFd7ZEuW4kuw-60-60',
        color: 'cyan',
        name: '办公',
        id: '7464d0c5-83f9-4631-9ab2-8a8cf51a7652'
      }, {
        icon: 'https://media.creatorsdaily.com/QmQ5FjtuoLHKRSobq9ZLDcAuca4hzkKtpt8a1oeAk7jiWU-60-60',
        color: 'blue',
        name: '图片',
        id: '60c8c23b-0831-4b0a-ab67-277db78e160f'
      }, {
        icon: 'https://media.creatorsdaily.com/QmVr13yC5XN5ai8UiemTEAia3MuB724U3PNx62aJevVnpn-60-60',
        color: 'purple',
        name: 'Chrome',
        id: "1e90ad52-426e-4b5a-add5-cf1b1df189ea"
      }, {
        icon: 'https://media.creatorsdaily.com/QmXYvx8ANbjvfR9Ke9qBc6GTzVad7CGYE2oPgBbLjwC78j-60-60',
        color: 'mauve',
        name: '阅读',
        id: '87e08bb9-9986-4531-be8b-220ffa20cb01'
      }, {
        icon: 'https://media.creatorsdaily.com/QmeRZpqvdWqM21sWsxzPLZ2eA4dKngrgTRwnx9UBLqsUfh-60-60',
        color: 'purple',
        name: '日程管理',
        id: 'd7117a06-bf2c-43f1-bf3d-3f4841307476'
      }, {
        icon: 'https://media.creatorsdaily.com/QmPsLp4P6ZKAXTYPZyWuykiSv3oaEyNGLM1GSWEMJT8MCx-60-60',
        color: 'mauve',
        name: '微信',
        id: '4708620d-97e5-41cb-afde-0a6fcf628dc0'
      },
      {
        icon: 'https://media.creatorsdaily.com/QmUQLwWTJfq6RnHyz5kBv43f8cGsdkpNqT6VACUnUUiUPT-60-60',
        color: 'red',
        name: '导航网站',
        id: 'e5e2417a-382e-4711-b1f5-f87e2b94fc0f'
      }, {
        icon: '',
        color: 'orange',
        name: '视频',
        id: '1518431b-7376-4372-9dee-40e66d9a3564'
      }, {
        icon: 'https://media.creatorsdaily.com/QmfD4aBhgFLQXVJv2EXfBZE8xKK2U8RtjQGJXoM2EGcFvz-60-60',
        color: 'yellow',
        name: '文字',
        id: 'fc129ec5-cafa-48d3-b8e5-8bd7196480ad'
      }, {
        icon: 'https://media.creatorsdaily.com/QmcGVURiyf9N8DR9ugN7s1mRhruKG2JqKbNY1S7AQtgUJr-60-60',
        color: 'olive',
        name: '待办事项',
        id: 'bf8a23a4-9c4f-4e48-9eb9-08a86e0cbab5'
      }, {
        icon: 'https://media.creatorsdaily.com/QmVz5TJnaXCFqayajY27cvevN8MjGFsYiPcshV1cXu2TsB-60-60',
        color: 'cyan',
        name: '游戏',
        id: "67514bc9-c70c-413c-aef1-05f828499d2c"
      }, {
        icon: 'https://media.creatorsdaily.com/QmdZbnQ4s2Cr7LoweffAmMM7yioEZzTL8Y7gRdsRfhFJkA-60-60',
        color: 'blue',
        name: '人工智能',
        id: "cc9ceab5-52a2-486a-9a16-f17997588387"
      }, {
        icon: 'https://media.creatorsdaily.com/QmT1DGThpiuB9atxXPb6ptFs3ttd6UZM6zJfE5GX7tPDGF-60-60',
        color: 'purple',
        name: '写作',
        id: 'a97976c3-e94f-4d31-b6e4-b482d535196d'
      }, {
        icon: 'https://media.creatorsdaily.com/QmYFns9uEFdZZuaAEUHi6FTGSGznCm9wmuGjJJYUjBXcoZ-60-60',
        color: 'mauve',
        name: '资讯',
        id: '81d91207-4a79-4542-bc2e-f2953749e264'
      }, {
        icon: 'https://media.creatorsdaily.com/QmP3J9K2TTyYcojyr8qLpc1x1ZQP4DUSHsJLMEhyuJbov4-60-60',
        color: 'purple',
        name: '科技',
        id: '9be451ec-ecbf-4db9-ae04-7ed541a31fa2'
      }, {
        icon: '',
        color: 'mauve',
        name: '安卓',
        id: "a1ba5e7d-f80d-4057-9007-291e8136a75b"
      },
      {
        icon: 'https://media.creatorsdaily.com/QmYedZTd44s8FjatsEgCNehdkBWz8SBCBR269vpAY4G9Zr-60-60',
        color: 'red',
        name: '音乐',
        id: '3395d8fc-1c32-4af4-9bf7-418c7302e4dd'
      }, {
        icon: 'https://media.creatorsdaily.com/QmPZV7wYDSMwkGwf9Y5PDVEhv26RpCY37kbsPNgqzEP3gW-60-60',
        color: 'orange',
        name: '相机',
        id: 'f5ff928d-ded5-455d-b8ea-3c9913535a00'
      }, {
        icon: 'https://media.creatorsdaily.com/QmeqNfGE6doWeoEQxLjUr52p3QkgKirCpmFv2Q4WqLtYkJ-60-60',
        color: 'yellow',
        name: '自媒体',
        id: 'd2fd03ff-358b-40ed-a56f-69ef5b625b58'
      }, {
        icon: 'https://media.creatorsdaily.com/QmYLd2rU347ixqKLdvhQGyqiVgkNJoGnaXUxUsduiBJvL4-60-60',
        color: 'olive',
        name: 'Github',
        id: 'fefd4050-ffa0-487a-9ba8-a234434215d1'
      }, {
        icon: '',
        color: 'cyan',
        name: '文化',
        id: '9d1b3261-a576-40a4-8644-31fe8e1f467c'
      }, {
        icon: 'https://media.creatorsdaily.com/Qmd68yqKDzhUrnNC89LDi8tpyMwvRiJfbW8fWv6Hx7tX56-60-60',
        color: 'blue',
        name: '学习',
        id: "81ea000b-0a54-469d-9cf0-ad283dca3b1f"
      }, {
        icon: 'https://media.creatorsdaily.com/QmYrN3YLvQ2ASieVpuPfrkiqtguZRNwMhDh1saS4eDcGL9-60-60',
        color: 'purple',
        name: '新闻',
        id: "4075d235-7ed4-4101-aa4b-006eae9fe96b"
      }, {
        icon: 'https://media.creatorsdaily.com/QmbVNGjSseR3YFweH7tqusKeRbCcB2e8NeGoN52n8sK711-60-60',
        color: 'mauve',
        name: '评测',
        id: '1337df96-f4bf-4f7c-a775-f1e1602d785c'
      }, {
        icon: '',
        color: 'purple',
        name: '开源',
        id: "f777967c-e3ad-480e-9b5e-9c1c856bf0b4"
      }, {
        icon: 'https://media.creatorsdaily.com/QmSrta3yCxkqAMMvgi6xfuqFM6jVPheiabH9nE7qrkZJAG-60-60',
        color: 'mauve',
        name: '协作',
        id: "1a9e8389-315d-4270-bf14-01c647afbdfd"
      }, {
        icon: 'https://media.creatorsdaily.com/QmQjQgVVJQadEhukGiW6sWQejZjqormqRZ1yTJGyQ59rN2-60-60',
        color: 'yellow',
        name: '社交',
        id: "1fa31f13-1a60-4d0b-8178-f0f13ffa4319"
      }, {
        icon: 'https://media.creatorsdaily.com/QmSJii888pvcJpgbYhJY6LCQ1tyPKnWzAxCknUXKvBwqib-60-60',
        color: 'olive',
        name: '儿童',
        id: "89b0e1b7-9cda-4735-ac44-9e0ce8f79d97"
      }, {
        icon: '',
        color: 'cyan',
        name: '人文',
        id: "5a1ded29-8178-448d-a5dd-bf2cbd4c3395"
      }, {
        icon: 'https://media.creatorsdaily.com/QmWDJr7XFaqeNEaUbDHcHCw9V2s86cL1kEr3ek1Yraeqxi-60-60',
        color: 'blue',
        name: 'ACG',
        id: "adb5656b-e45b-4fb7-9571-9f174235f950"
      }, {
        icon: 'https://media.creatorsdaily.com/QmXMXFxuPfxhs8622E9FDmdHZfNh5R8E4CTZju5Qc4922q-60-60',
        color: 'purple',
        name: '动漫',
        id: "0fd23726-acfd-457c-acb7-3929d16ac4c0"
      }, {
        icon: 'https://media.creatorsdaily.com/QmSZxrvJ7SB22VVinzQx1Vu6dYfhNhPVRCeUXKhcgv46US-60-60',
        color: 'mauve',
        name: '理财',
        id: "abb12a97-71e0-4dae-a366-b346b6a735fa"
      }, {
        icon: 'https://media.creatorsdaily.com/QmfAqdzsyJzCA6NpDnXP4i2TrpxmWZKdrY96EDL9dU1swd-60-60',
        color: 'purple',
        name: '播客',
        id: "79c9be2b-3f80-42c3-8cac-857e69b5d81e"
      }, {
        icon: '',
        color: 'mauve',
        name: '信息流',
        id: "c2d25e28-e824-492f-bdaa-ec020c19c75d"
      },
      {
        icon: '',
        color: 'purple',
        name: '可视化',
        id: "1c6dad76-c87e-496b-a7d4-390f31a5f9d3"
      }, {
        icon: '',
        color: 'mauve',
        name: 'AI',
        id: "01ffc069-eadb-4bc1-94a2-a182c312236b"
      }
    ],
    gridCol: 4,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTopics()
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
      title: '分类',
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
  goToTopic: function (e) {
    let {
      id,
      title
    } = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../topic/topic?id=' + id + "&title=" + title
    })
  },
  getTopics:function(){
    let {iconList} = this.data;
    let that = this;
    api.query({
      query: `query ($page: Int, $size: Int, $keyword: [String!]) {\n  getTopics(page: $page, size: $size, keyword: $keyword) {\n    data {\n      id\n      name\n      icon {\n        id\n        hash\n        __typename\n      }\n      __typename\n    }\n    count\n    __typename\n  }\n}\n`,
      variables: {
        size:50
      },
      operationName: null
    }).then(function (res) {
      //成功
      console.log(res.getTopics);
      iconList = res.getTopics.data;
      that.setData({
        iconList
      })
      
    }).catch(function (error) {
      //失败
      console.log(error);
    
    });
  }
})