// pages/honor/honor.js
Page({
  data: {
    botton: 'block',
    img: 'none',
    content: '例如：营业执照/身份证',
    company: '与营业执照一致',
    array: ['营业执照', '身份证'],
    index: 0,
    right: '>',
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var _this = this;
    wx.getStorage({
      key: 'storage',
      success: function (res) {
        console.log('缓存到的uid为：', res.data);
        _this.setData({
          storage: res.data[0],
        })
      }
    })
  },
  chooseimage: function () {
    var _this = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: 'https://wap.goods100.com/home/vfapi/honorUpload', //图片上传接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (ress) {
            var data = ress.data
            console.log(data)
            console.log("res.tempFilePaths:", res.tempFilePaths)
            var data = ress.data
            _this.setData({
              a: res.tempFilePaths,
              botton: 'none',
              img: 'block',
              imgUrl1: data,
            })
          }
        })
      }
    })
  },
  delete1: function () {
    this.setData({
      botton: 'block',
      img: 'none',
      imgUrl1: '',
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var that = this;
    var formData = e.detail.value;
    var img = formData.imgUrl1;
    var company = formData.company.trim();
    if (!company) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写公司名称',
        complete: function () {
        }
      })
      return false
    }
    if(!img){
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请上传证书',
        complete: function () {
        }
      })
      return false
    }
    console.log(formData)
    wx.request({
      url: 'https://wap.goods100.com/home/vfapi/honor',
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
 
  onfocus: function () {
    this.setData({
      content: '',
    })
  },
  blur: function () {
    this.setData({
      content: '例如：营业执照/身份证',
    })
  },
  onfocus1: function () {
    this.setData({
      company: '',
    })
  },
  blur1: function () {
    this.setData({
      company: '与营业执照一致',
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