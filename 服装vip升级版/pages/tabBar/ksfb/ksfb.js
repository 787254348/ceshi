//获取应用实例  
var app = getApp()
Page({
  data: {
    tempFilePaths: '',
    array: ['女装', '母婴', '男装', '童装', '鞋子', '箱包', '运动服饰', '服装辅料', '展示道具', '加工设备', '其他服饰'],
    cateIdArray: [890, 891, 892, 893, 894, 895, 9, 10, 12, 13, 32],
    array1: ['件', '套', '个', '只', '条'],
    index: 0,
    array1index: 0,
    userInfo: {},
    storage: '',
    city: '',
    province: '',
    district: '',
    a: [],
    imgUrl1: '',
  },

  onLoad: function () {
    this.loadInfo();
    this.setToken();
    var _this = this;
    var Num = "";
    for (var i = 0; i < 6; i++) {
      Num += Math.floor(Math.random() * 10);
    }
    _this.setData({
      num: Num,
    })
  
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
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
    })
  },

  bindPickerChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      array1index: e.detail.value
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
          url: 'https://wap.goods100.com/home/vipapi/upload', //图片上传接口地址
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

  

  setToken: function () {
    var that = this
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx78d67b2f2e81ffea&secret=71822bbe2ef4113b4bf4ca95dcefcee1',
      data: {},
      method: 'GET',
      success: function (res) {
        var token = res.data.access_token
        that.setData({
          token: token
        })
        wx.setStorageSync('token', token)
      },
      fail: function (res) {
        console.log("获取token失败")
        console.log(res)
      }
    })
  },

  // ccc:function(){ //内容安全检查接口
  //   console.log(1)
  //   wx.request({
  //     url: 'https://api.weixin.qq.com/wxa/msg_sec_check?access_token=' + wx.getStorageSync('token'),
  //     data: {
  //       content:"毒品，白粉，海洛因，冰毒，可卡因"
  //     },
  //     method: 'POST',
  //     success: function (res) {
  //       console.log(res)
     
  //     },
  //     fail: function (res) {
  //       console.log(res)
  //     }
  //   })
  // },



  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var that = this;
    var formData = e.detail.value;
    var openid = formData.openid
    var username = formData.username
    var num = formData.num
    var fId = e.detail.formId;
    if (!username) {//验证是否授权过
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请点确认按钮上方授权发布！',
        complete: function () {

        }
      })
      return false
    }
    var mobile = formData.telephone;
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
      url: 'https://wap.goods100.com/home/vipapi/ksfb',
      data: formData,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data[1] > 2) {
          if (res.data[1] == 3) {
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
                console.log(1)
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/pay/pages/pay/pay'
                  })
                } else if (!res.confirm) {
                  wx.switchTab({
                    url: '/pages/tabBar/me/me'
                  })
                }
              }
            })
          }
        } else {
          wx.showModal({
            title: '提示',
            content: res.data[0],
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/pay/pages/payment/payment'
                })
              } else if (!res.confirm) {
                wx.switchTab({
                  url: '/pages/tabBar/me/me'
                })
              }
            }
          })
        }
        //发送模板消息
        if (res.data[1] < 3) {
          console.log(11)
          if (res.data[1] == 0) {
            var content = "感谢您使用本衣网小程序！您在本衣网（与小程序互通）的账户名为" + username + "密码是" + num + "，我们能为您提供以下专业的服务助力您的服装生意:1.信息优先展示；2.诚信VIP专属标识提升信誉，促进交易；3.让产品在平台获得全网曝光。如需办理请点个人->服务升级。     提示:上传营业执照/身份证实名认证，可提升信誉促进交易!(进入小程序点个人找到‘上传证书’)。重点：敬请保持每天查看“个人->我的消息”,及时查看客户询单。"
          } else {
            var content = "感谢您使用本衣网小程序！我们能为您提供以下专业的服务助力您的服装生意:1.信息优先展示；2.诚信VIP专属标识提升信誉，促进交易；3.让产品在平台获得全网曝光。如需办理请点个人->服务升级。     提示:上传营业执照/身份证实名认证，可提升信誉促进交易!(进入小程序点个人找到‘上传证书’)。重点：敬请保持每天查看“个人->我的消息”,及时查看客户询单。"
          }
          var  l  =  'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token='  + wx.getStorageSync('token');
          wx.request({
            url:  l,
            data: {
              touser: openid,
              template_id:  'rLV_E_KOsIGFzClU0wtAbq0Vr330Cp5yT4nC5_6tBZE',//这个是1、申请的模板消息id，  
              page:  'pages/tabBar/me/me',
              form_id: fId,
              data:  {
                "keyword1":  {
                  "value":  username,
                  "color":  "#000000"
                },
                "keyword2":  {
                  "value":  "供应信息推广",
                  "color":  "#000000"
                },
                "keyword3":  {
                  "value":  content,
                  "color":  "#000000"
                },
              },
              // color: '#ccc',  
              //emphasis_keyword: 'keyword1.DATA' 
            },
            method:  'POST',
            success:  function (res) {
              console.log("push msg");
              console.log(res);
            },
            fail:  function (err)  {
              console.log("push err")
              console.log(err);
            }
          });
        }
      }
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
  loadInfo: function () {
    var page = this
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标 
      success: function (res) {
        var longitude = res.longitude
        var latitude = res.latitude
        page.loadCity(longitude, latitude)
      },
      fail: function () {
      },
      complete: function () {
      }
    })
  },
  loadCity: function (longitude, latitude) {
    var page = this
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=08056362638948c41f72463616dcd173&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //console.log(res);
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



