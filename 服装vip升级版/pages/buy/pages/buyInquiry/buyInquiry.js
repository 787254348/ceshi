var app = getApp();
Page({
  data: {},
  onLoad: function (options) {
    this.setData({ options: options });
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var that = this;
    var formData = e.detail.value;
    if (formData.uid == "null") {
      wx.showModal({
        title: '提示',
        content: '请去个人中心页点击授权获取此功能',
        success: function (res) {
          wx.switachTab({
            url: '/pages/tabBar/me/me'
          })
        }
      })
      return false
    }
    var content = formData.content;
    if (!content.trim()) { //验证是否填写内容
      wx.showModal({
        title: '提示',
        content: '请填写内容',
        success: function (res) {

        }
      })
      return false
    }
    var mobile = formData.mobile;
    if (!(/^1[34578]\d{9}$/.test(mobile))) { //验证是不是正确的11位手机号码
      wx.showModal({
        title: '提示',
        content: '请输入11位正确的手机号码',
        success: function (res) {

        }
      })
      return false
    }
    wx.request({
      url: 'https://wap.goods100.com/home/vipapi/sendBuyInquiry',      //请求的接口URL 
      data: formData,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data[1] == 1) {
          wx.showModal({
            title: '提示',
            content: res.data[0],
            success: function (res) {

            }
          })
          return false
        } else {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: res.data,
            complete: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '/pages/tabBar/home/home'
                })
              }
            }
          })
        }
      }
    })
  }

})
