// pages/CompanyProfile/CompanyProfile.js
Page({
  data: {},
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'storage',
      success: function (res) {
        console.log('缓存到的uid为：', res.data);
        that.setData({
          storage: res.data[0],
          username: res.data[3],
        })
      }
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var that = this;
    var formData = e.detail.value;
    var content = formData.content.trim();
    if (!content) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写公司介绍',
        complete: function () {
        }
      })
      return false
    }
    wx.request({
      url: 'https://wap.goods100.com/home/vfapi/CompanyProfile',
      data: formData,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: res.data,
          complete: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/tabBar/me/me'
              })
            }
          }
        })
      }
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