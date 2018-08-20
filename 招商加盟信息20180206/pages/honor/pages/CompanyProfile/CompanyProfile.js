// pages/CompanyProfile/CompanyProfile.js
Page({
  onShareAppMessage: function () {
    return {
      title: '创业好生意，发布您商机信息，让客户找到您！',
      desc: '本衣优质服装供求平台',
      path: '/pages/honor/pages/CompanyProfile/CompanyProfile'
    }
  },
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
    var content = formData.content;
    if (!content.trim()) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '公司介绍不能为空！',
        complete: function () {
        }
      })
      return false
    }
    wx.request({
      url: 'https://wap.goods100.com/home/zsjapi/CompanyProfile',
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