
var app = getApp()
Page({
  data: {
  },
  onLoad: function (res) {
    wx.showToast({
      title: '数据加载中...',
      icon: 'loading',
    })
    wx.hideNavigationBarLoading();
    var _this = this;
    wx.request({
      url: 'https://wap.goods100.com/home/zsjapi/myMessagesNew',
      data: {
        nickName: res.nickName,
        uid: res.uid
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        _this.setData({
          messages: res.data
        });
        wx.hideToast();
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  onReady: function () {

  },
})
