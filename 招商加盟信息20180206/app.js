//app.js
App({
  onLaunch: function () {
    var that = this
    wx.getStorageInfo({
      success: function (res) {
        var currentSize = res.currentSize
        if (currentSize > 10000) {//缓存数据大于10M时清除缓存
          wx.clearStorage()
          that.getUserInfo()
        }
        console.log(res.keys)
        console.log(res.currentSize)
        console.log(res.limitSize)
      }
    })
    var storage = wx.getStorageSync('storage')
    if (!storage) {
      that.getUserInfo()
    } else {
      this.showMessageStatus()
    }
  },
  getUserInfo: function (cb) {
    var that = this
    //调用登录接口
    if (!this.globalData.uid) {
      wx.login({
        success: function (ress) {
          that.globalData.code = ress.code
          wx.request({
            method: 'GET',
            url: 'https://wap.goods100.com/home/zsapi/creatUserNew', //接口地址
            data: {
              code: that.globalData.code,
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data)
              that.globalData.uid = res.data[0]
              wx.setStorage({
                key: "storage",
                data: res.data
              })
              that.showMessageStatus(res)
            }
          })
        }
      })
    }
  },

  //查询是否有新消息
  showMessageStatus: function (res) {
    var storage = wx.getStorageSync('storage')
    if (!storage) {
      var storage = res.data
    }
    console.log(storage)
    var that = this;
    wx.request({
      url: 'https://wap.goods100.com/home/zsjapi/showMessageStatus',
      data: {
        uid: storage[0],
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res.data[0]);
        if (res.data[0] == 0) {//显示 tabBar 个人页的右上角的红点
          wx.showTabBarRedDot({
            index: 3
          })
        }

      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  globalData: {
    userInfo: null,
    uid: '',
  }
})
