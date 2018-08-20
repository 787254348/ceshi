// pages/mybuy/mybuy.js
var app = getApp()
Page({
  data: {
    city: '',
    province: '',
    district: '',
    a: [],
    imgUrl1: '',
  },

  onLoad: function () {
    this.loadInfo();
  },
  onShow: function () {
    var _this = this
    wx.getStorage({
      key: 'storage',
      success: function (res) {
        console.log("用户ID：", res.data);
        _this.setData({
          storage: res.data[0],
          openid: res.data[1],
          groupid: res.data[2],
          username: res.data[3],
        })
      }
    })
  },
 
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var that = this;
    var formData = e.detail.value;
    if (!formData.uid) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请点确认按钮上方授权发布！',
        complete: function () {

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
      url: 'https://wap.goods100.com/home/vipapi/getBuyFabu',
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
      }
    })
  },


  chooseimage: function () {
    var _this = this;
    var l = _this.data.a
    console.log(l.length)
    if (l.length == 3) {
      wx.showModal({
        title: '提示',
        content: '最多上传3张图片',
        success: function (res) {

        }
      })
      return false
    }
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: 'https://wap.goods100.com/home/vipapi/uploads', //图片上传接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (ress) {
            console.log("res.tempFilePaths:", res.tempFilePaths)
            var data = ress.data
            var a = _this.data.a
            var imgUrl1 = _this.data.imgUrl1
            var imgUrl1 = imgUrl1 + data + ","
            var ss = imgUrl1.split(",");
            console.log(imgUrl1)
            console.log(ss)
            console.log(ss.length)
            if (a.length < 1) {
              _this.setData({
                a: res.tempFilePaths,
                imgUrl1: imgUrl1,
                ss: ss,
              })
            } else {
              a.push(res.tempFilePaths[0]);
              _this.setData({
                a: a,
                imgUrl1: imgUrl1,
                ss: ss,
              })
            }
          }
        })
      }
    })
  },
  //删除图片
  delete1: function (e) {
    var k = e.target.dataset.name
    var img = this.data.ss
    img.splice(k, 1)
    var b = img.join(",");
    console.log(b)
    var s = this.data.a
    console.log(k)
    console.log(s)
    var ss = s.splice(k, 1)
    console.log(ss)
    this.setData({
      a: s,
      ss: img,
      imgUrl1: b
    })
  },
  onGotUserInfo: function (e) {//重新获取用户信息
    var that = this
    var userInfo = e.detail.userInfo
    app.globalData.userInfo = userInfo
    that.setData({
      userInfo: userInfo,
    })
    wx.login({
      success: function (ress) {
        var code = ress.code
        wx.request({
          method: 'GET',
          url: 'https://wap.goods100.com/home/vipapi/creatUserNew', //接口地址
          data: {
            userinfo: userInfo,
            code: code,
            nickName: userInfo.nickName,
            sex: userInfo.gender,
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            if (res.data[1] == 1) {
              wx.showModal({
                title: '提示',
                showCancel: false,
                content: res.data[0],
                complete: function () {

                }
              })
              return false
            }
            that.setData({
              storage: res.data[0],
              openid: res.data[1],
              groupid: res.data[2],
              username: res.data[3],
            })
            wx.setStorage({
              key: "storage",
              data: res.data
            })
          }
        })
      }
    })

  },
  //获取当前位置函数
  loadInfo: function () {
    var page = this
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标 
      success: function (res) {
        // success 
        var longitude = res.longitude
        var latitude = res.latitude
        page.loadCity(longitude, latitude)
      },
      fail: function () {
        // fail 
      },
      complete: function () {
        // complete 
      }
    })
  },
  loadCity: function (longitude, latitude) {
    var page = this
    var l = 'https://api.map.baidu.com/geocoder/v2/?ak=08056362638948c41f72463616dcd173&location=' + latitude + ',' + longitude + '&output=json'
    console.log(l)
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=08056362638948c41f72463616dcd173&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // success 
        console.log(res);
        var city = res.data.result.addressComponent.city;
        var province = res.data.result.addressComponent.province;
        var district = res.data.result.addressComponent.district;
        page.setData({
          city: city,
          province: province,
          district: district,
        });
      },
      fail: function () {
        // fail 
      },
      complete: function () {
        // complete 
      }
    })
  }
})