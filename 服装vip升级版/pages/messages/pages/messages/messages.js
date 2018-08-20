Page({
  data: {
    
  },
  onLoad: function (res) {
  
    wx.showToast({
      title: '数据加载中...',
      icon: 'loading',
      duration: 10000
    })
    wx.hideNavigationBarLoading();
 
    var _this = this;
    wx.request({
      url: 'https://wap.goods100.com/home/vfapi/myMessagesNew',
      data: {
        uid: res.uid
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res.data);
        _this.setData({
          messages: res.data
        });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
        wx.hideToast()
      }
    })

    
  },


})
