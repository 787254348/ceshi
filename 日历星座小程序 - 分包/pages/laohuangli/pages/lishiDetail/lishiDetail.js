Page({
  onShareAppMessage: function (options) {
    var id = this.data.options.id;
    console.log(id)
    return {
      title: '历史上的今天，有点意思-免费制作电子请柬贺卡',
      desc: '历史上的今天',
      path: '/pages/laohuangli/pages/lishiDetail/lishiDetail?id=' + id
    }
  },
  data: {

  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    var id = options.id
    wx.request({
      method: 'GET',
      url: 'https://wap.goods100.com/home/xzapi/lishiDetail',
      data: {
        id: id,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var da = res.data.result[0];
        console.log(da)
        //将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
        that.setData({
          lishi: da,
          options:options
        });
      },

      fail: function () {

      }
    })
  },

  
 
  onReady: function (options) {
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
  },
 
})