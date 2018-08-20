var app = getApp();
Page({
  data: {
    options: {},
  },
  onLoad: function (options) {
    var that = this;
    console.log("option:", options)
    that.setData({ options: options });
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var that = this;
    var formData = e.detail.value;
    var content = formData.content;
    if (!content.trim()) {
      wx.showModal({
        title: '提示',
        content: '请填写回复内容！',
        success: function () {
        }
      })
      return false
    }
    wx.request({
      url: 'https://wap.goods100.com/home/zsjapi/replyInquiry',      //请求的接口URL 
      data: formData,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        wx.showModal({
          title: '提示',
          content: res.data,
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/tabBar/me/me'
              })
            }
          }
        })
      }
    })
  }
})
