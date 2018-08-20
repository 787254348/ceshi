var app = getApp()
Page({
  onShareAppMessage: function (options) {
    var itemid = this.data.itemid;
    return {
      title: '大量采购商在找货源，发布您的供应，让买家找到您！',
      desc: '本衣优质服装供求平台',
      path: '/pages/buy/pages/qgxq/qgxq?itemid=' + itemid
    }
  },
  data: {
    options: {},
    good: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    right: '>'
  },
  onLoad: function (options) {
    wx.showToast({
      title: '数据加载中...',
      icon: 'loading',
    })
    console.log(options)
    this.setData({
      itemid: options.itemid,
    })
    var that = this
    wx.getStorage({
      key: 'storage',
      success: function (res) {
        console.log("用户ID：", res.data);
        that.setData({
          storage: res.data[0],
          groupid: res.data[2],
          username: res.data[3],
        })
        that.getGoodsData(res)
      },
      fail: function (res) {
        wx.login({
          success: function (ress) {
            wx.request({
              method: 'GET',
              url: 'https://wap.goods100.com/home/vipapi/creatUserNew', //接口地址
              data: {
                code: ress.code,
              },
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                console.log(res.data)
                app.globalData.uid = res.data[0]
                that.setData({
                  storage: res.data[0],
                })
                wx.setStorage({
                  key: "storage",
                  data: res.data
                })
                that.getGoodsData(res)
              }
            })
          }
        })
      }
    })
  },

  // 获取商店详情数据
  getGoodsData: function (res) {
    var that = this;
    console.log(res.data[3])
    console.log(that.data.itemid)
    wx.request({
      method: 'GET',
      url: 'https://wap.goods100.com/home/vipapi/getBuyDetail',
      header: {
        mid: 0,
        token: 0,
      },
      data: {
        itemid: that.data.itemid,
        username: res.data[3],
      },
      success: function (res) {
        console.log(res.data)
      
          var good = res.data.data;
          that.setData({ good: good });
        
        wx.hideToast();
      },

      fail: function () {

      }
    })
  },
  tishi: function (e) {
    var uid = e.target.dataset.name
    if (!uid) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请点查看联系方式上方授权按钮，方可使用！',
        complete: function () {

        }
      })
      return false
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '亲，您每日2次免费查看求购联系方式的次数已用完，请明天再来~您可购买供货通服务，198元/年，每天可无限查看求购信息联系方式，助您及时抓住商机！',
        complete: function () {
          wx.navigateTo({
            url: '/pages/pay/pages/qgpay/qgpay'
          })
        }
      })
    }
  },
  //拨打电话
  mobile: function (e) {
    var num = e.currentTarget.dataset.name
    wx.makePhoneCall({
      phoneNumber: num
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
            that.getGoodsData(res)
          }
        })
      }
    })
  },
 
  //点击图片预览函数
  aaa: function (e) {
    var a = e.target.dataset.name
    var b = e.target.dataset.hi
    var c = e.target.dataset.nam
    var d = e.target.dataset.nm
    if (b.length > 0 && c.length == 0 && d.length == 0) {
      var s = [b]
    } else if (c.length > 0 && b.length == 0 && d.length == 0) {
      var s = [c]
    } else if (d.length > 0 && b.length == 0 && c.length == 0) {
      var s = [d]
    } else if (b.length > 0 && c.length > 0 && d.length == 0) {
      var s = [b, c]
    } else if (b.length > 0 && d.length > 0 && c.length == 0) {
      var s = [b, d]
    } else if (c.length > 0 && d.length > 0 && b.length == 0) {
      var s = [c, d]
    } else {
      var s = [b, c, d]
    }
    wx.previewImage({
      current: a, // 当前显示图片的http链接
      urls: s // 需要预览的图片http链接列表
    })
  },

  onshare: function () {
    wx.showToast({
      title: '点击右上角-选择转发',
      icon: 'success',
      duration: 10000
    })

    setTimeout(function () {
      wx.hideToast()
    }, 2000)
  },


})
