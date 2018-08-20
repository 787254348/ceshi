var app = getApp()
Page({
  data: {
    userInfo: {},
    storage: '',
    right: ">",

  },
  onLoad: function () {
    
  },

  onShow: function (e) {
    var that = this
    //调用应用实例的方法获取全局数据
    wx.getStorage({
      key: 'storage',
      success: function (res) {
        console.log(res.data);
        that.setData({
          storage: res.data[0],
          groupid: res.data[2],
          userInfo: app.globalData.userInfo
        })
        that.showMessageStatus(res);
      }
    })
  },

  onGotUserInfo: function (e) {//重新获取用户信息
    var that = this
    var userInfo = e.detail.userInfo
    app.globalData.userInfo = userInfo
    that.setData({
      userInfo:userInfo,
    })
    if (!this.data.storage) {
      wx.login({
        success: function (ress) {
          var code = ress.code
              wx.request({
                method: 'GET',
                url: 'https://wap.goods100.com/home/vipapi/creatUserNew', //接口地址
                data: {
                  userinfo:userInfo,
                  code: code,
                  nickName: userInfo.nickName,
                  sex:userInfo.gender,
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  if (res.data[1] == 1) {
                    wx.showModal({
                      title: '提示',
                      showCancel: false,
                      content: res.data[0],
                      complete: function () {
                        wx.switchTab({
                          url: '/pages/tabBar/me/me'
                        })
                      }
                    })
                    return false
                  }
                  that.setData({
                    storage: res.data[0],
                    groupid: res.data[2],
                  })
                  wx.setStorage({
                    key: "storage",
                    data: res.data
                  })
                  that.showMessageStatus(res);
                }
              })
        }
      })
    }
  },

  //未注册用户点击时的提示信息
  tishi: function () {
    wx.showModal({
      title: '提示',
      showCancel: false,
      content: '请点击上方授权按钮,方可使用此功能！',
      complete: function () {
        wx.switchTab({
          url: '/pages/tabBar/me/me'
        })
      }
    })
  },
  //查询是否有新消息
  showMessageStatus: function (res) {
    var that = this;
    wx.request({
      url: 'https://wap.goods100.com/home/vfapi/showMessageStatus',
      data: {
        uid: res.data[0],
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res.data);
        that.setData({
          isread: res.data[0],
          username: res.data[1],
          company: res.data[2],
          honor_id: res.data[3],
          introduce_id: res.data[4],
        });
        if (res.data[0] == 0) {//显示 tabBar 个人页的右上角的红点
          wx.showTabBarRedDot({
            index: 4
          })
        }
        if (res.data[0] == 1) {//隐藏 tabBar 个人页的右上角的红点
          wx.hideTabBarRedDot({
            index: 4
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

})
