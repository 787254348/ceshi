var app = getApp();
Page({
  data: {
    options: {},
  },
  onLoad: function (options) {
    var that = this;
    console.log("option:", options)
    that.setData({ options: options });
    wx.getStorage({
      key: 'storage',
      success: function (res) {
        console.log("用户ID：", res.data);
        that.setData({
          openid: res.data[1],
        })
      }
    })
  },


  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    var content = formData.content;
    var fId = e.detail.formId;
    if (!content.trim()) {
      wx.showModal({
        title: '提示',
        content: '请填写内容！',
        success: function () {
        }
      })
      return false
    }
    var truename = formData.truename;
    if (!truename.trim()) {
      wx.showModal({
        title: '提示',
        content: '请填写姓名！',
        success: function () {
        }
      })
      return false
    }
    var mobile = formData.mobile;
    if (!(/^1[234578]\d{9}$/.test(mobile))) {
      wx.showModal({
        title: '提示',
        content: '请填写正确的11位手机号码！',
        success: function () {
        }
      })
      return false
    }
    wx.request({
      url: 'https://wap.goods100.com/home/zsapi/sendInquiry',      //请求的接口URL 
      data: {
        title: formData.title,
        content: formData.content,
        uid: formData.uid,
        username: formData.username,
        mobile: formData.mobile,
        truename: formData.truename,
        openid: formData.openid,
        fid: formData.fid,
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
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
            content: res.data[0],
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '/pages/tabBar/me/me'
                })
              }
            }
          })
        }
      },
    })
  }
})
