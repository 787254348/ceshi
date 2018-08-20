// pages/jiemengDetail/jiemengDetail.js
var app = getApp()
Page({
  onShareAppMessage: function (options) {
    var word = this.data.options.key
    console.log(word)
    return {
      title: '梦见' + word +'周公解梦-免费制作电子请柬贺卡',
      desc: '解梦',
      path: '/pages/laohuangli/pages/jiemengDetail/jiemengDetail?key=' + word
    }

  },

  data: {
    options: {},
    right: '>',
    item: {
      b: '',
      c: 'none'
    },
  },
  onLoad: function (options) {
    this.setData({
      options: options,
    })
    this.star(options)
  },
  star: function (options) {
    var word = this.data.options.key;
    var that = this;
    wx.request({
      method: 'GET',
      url: 'https://v.juhe.cn/dream/query?key=8043cfc9dc5e29daa32f8acda415d90b&q=' + word,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var da = res.data;
        console.log(da.result)
        if (!da.result) {
          that.setData({
            item: {
              b: 'back',
              c: 'block',
              tt: "哎呦，暂时没有找到相关的梦境哟！请重新输入您的梦境"
            },
          });
          return false
        }
        //将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
        that.setData({
          restation: da.result,
        });
      },

      fail: function () {

      }

    })
  },

  charge: function () {
    this.setData({
      item: {
        b: '',
        c: 'none'
      },
    });
    wx.switchTab({
      url: "/pages/tabBar/jiemeng/jiemeng"
    })
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