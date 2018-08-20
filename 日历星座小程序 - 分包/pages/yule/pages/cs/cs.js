
Page({
  onShareAppMessage: function (options) {
    return {
      title: '测测您的命运?',
      desc: '电子请柬贺卡',
      path: '/pages/yule/pages/cs/cs'
    }

  },

  data: {
    radioCheckVal:1,
  },
  onLoad: function (options) {
   
    
  },

  formSubmit:function(e){
    var name = e.detail.value.name.trim()
    if (!name) {//验证是否填写名字
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入您的名字',
        complete: function () {
        }
      })
      return false
    }
    var sex = e.detail.value.sex
    wx.navigateTo({
      url: "/pages/yule/pages/csxq/xq?name=" + name +"&sex="+sex
    })
  },

  //性别选择器
  radioChange: function (e) {
    this.setData({
      radioCheckVal: e.detail.value
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