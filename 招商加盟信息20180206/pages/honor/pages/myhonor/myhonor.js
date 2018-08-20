// pages/myhonor/myhonor.js
var common = require('../../../common/common.js')
Page({
  onShareAppMessage: function () {
    var username = this.data.options.username
    var company = this.data.options.company
    var groupid = this.data.options.groupid
    var honor_id = this.data.options.honor_id
    return {
      title: '创业好生意，发布您商机信息，让客户找到您！',
      desc: '本衣招商加盟信息平台',
      path: '/pages/honor/pages/myhonor/myhonor?username=' + username + '&company=' + company + '&groupid=' + groupid + '&honor_id=' + honor_id
    }
  },
  data: {
    options: {},
    right: ">"
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    this.setData({
      options: options,
    })
    this.introduce()
    wx.getStorage({
      key: 'storage',
      success: function (res) {
        console.log(res.data);
        that.setData({
          storage: res.data[0],
          groupid: res.data[2],
        })
      }
    })
  },
  introduce: function () {
    var that = this;
    var username = that.data.options.username
    console.log(username)
    wx.request({
      url: 'https://wap.goods100.com/home/zsjapi/introduce',
      data: {
        username: username
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          content: res.data,
        })
      }
    })
  },

  onshare: function () {
    common.share()
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})