var network = require("../../common/request.js")
var app = getApp()
Page({
  onShareAppMessage: function () {
    return {
      title: '周公解梦-免费制作电子请柬贺卡，微喜帖微贺卡',
      desc: '解梦',
      path: '/pages/tabBar/jiemeng/jiemeng',

    }
  },
  data: {
    right: '>',
    cid: 1,
    title: "动物篇",
  },
  onLoad: function (options) {
    var that = this
    if (app.globalData.userInfo && app.globalData.userInfo != '') {
      this.setData({
        openid: app.globalData.userInfo[0],
        vip: app.globalData.userInfo[1],
      });
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoCallback = userInfo => {
        if (userInfo != '') {
          this.setData({
            openid: userInfo[0],
            vip: userInfo[1],
          })
        }
      }
    }
    
  
  },

  onShow: function (options) {

  },

  formSubmit: function (e) {
    var fId = e.detail.formId;
    var formData = e.detail.value;
    var openid = formData.openid;
    var word = formData.content.trim()
    var data = {
      fId: fId,
      openid: openid,
    }
    wx.navigateTo({
      url: "/pages/laohuangli/pages/jiemengDetail/jiemengDetail?key=" + word
    })
    network.requestFid(data, function (res) {//保存发送模板消息用的fId数据
    })
  },

  cate: function (e) {
    var title = e.target.dataset.name
    var cid = e.target.dataset.catid
    this.setData({
      cid: cid,
      title: title,
    })
  },

  onshare: function () {
    wx.showToast({
      title: '点击右上角-选择转发',
      icon: 'success',
    })
  },
})