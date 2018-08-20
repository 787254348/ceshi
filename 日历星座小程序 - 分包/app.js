//app.js
App({
  onLaunch: function (options) {
    console.log(options)
    var that = this
    wx.getStorageInfo({
      success: function (res) {
        var currentSize = res.currentSize
        if (currentSize > 10000) {//缓存数据大于10M时清除缓存
          wx.clearStorage()
          that.getUserInfo()
        }
        console.log(currentSize)
        console.log(res.keys)
        console.log(res.limitSize)
      }
    })
    // var value = wx.getStorageSync('storage')
    // if(!value){
    //   this.getUserInfo()
    // } 
    this.getUserInfo()
  },

  getUserInfo: function () {
    var that = this
    wx.login({
      success: function (ress) {
        var code = ress.code
        wx.request({
          method: 'GET',
          url: 'https://wap.goods100.com/home/rl/creatUser', //接口地址
          data: {
            code: code,
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res.data)
            that.globalData.userInfo=res.data
            if (that.userInfoCallback) {
              that.userInfoCallback(res.data);
            }
            wx.setStorage({
              key: "storage",
              data: res.data
            })
          }
        })
      }
    })
  },

  globalData: {
    userInfo: '',
    yangli: '',
    luck: '',
    detail: '',
    openid:'',
    select:4,
    catid:1,
  }

  

})