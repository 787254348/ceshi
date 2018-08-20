
var app = getApp()
Page({
  onShareAppMessage: function (options) {
    return {
      title: '历史上的今天，有点意思-免费制作电子请柬贺卡',
      desc: '历史上的今天',
      path: '/pages/laohuangli/pages/lishi/lishi'
    }
  },
  data: {
    dy: '>',
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var lishi = app.globalData.lishi
    if(lishi){
      this.setData({
        lishi:lishi
      })
    }else{
      this.lishi()
    }
  },
  lishi: function () {
    var that = this
    var month = new Date().getMonth() + 1
    var day = new Date().getDate()
    wx.request({
      method: 'GET',
      url: 'https://wap.goods100.com/home/xzapi/lishi',
      data: {
        month: month,
        day: day,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var da = res.data.result;
        app.globalData.lishi = da
        console.log(da)
        //将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
        that.setData({
          lishi: da
        });
      },

      fail: function () {

      }

    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  
  onShow: function () {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
  },
 

  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onshare: function () {
    wx.showToast({
      title: '点击右上角-选择转发',
      icon: 'success',

    })
    setTimeout(function () {
      wx.hideToast()
    }, 2000)


  }
})