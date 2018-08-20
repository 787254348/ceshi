var app = getApp();
Page({
  onShareAppMessage: function (options) {
    var itemid = this.data.options.itemid;
    var tl = this.data.options.title;
    return {
      title: '大量采购商在找货源，发布您的供应，让买家找到您！',
      desc: '本衣优质服装供求平台',
      path: '/pages/sell/pages/good/good?itemid=' + itemid + '&title=' + tl
    }
  },
  data: {
    options: {},
    good: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    right: ">",
  },

  onLoad: function (options) {
    var that = this
    console.log('onLoad的时候：', options)
    this.setData({
      options: options,
    })
    var tl = this.data.options.title;
    wx.setNavigationBarTitle({//导航栏标题
      title: tl + ' 一 服装批发采购小程序'
    })
    var value = wx.getStorageSync(options.itemid)
    var totime = value.totime
    var nowtime = new Date()/1000
    if(!value||totime<nowtime){//判断商品数据是否存在缓存且是否过期
      that.getGoodsData(options)
    }else{
      console.log(value)
      that.setData({ good: value.good });
    }
    wx.getStorage({
      key: 'storage',
      success: function (res) {
        console.log("用户ID：", res.data);
        that.setData({
          storage: res.data[0],
          groupid: res.data[2],

        })
      },
    })
  },

  //点击图片预览函数
  aaa: function (e) {
    var a = e.target.dataset.name
    var b = e.target.dataset.b
    var c = e.target.dataset.c
    var d = e.target.dataset.d
    var g = e.target.dataset.e
    var f = e.target.dataset.f
    console.log(e)
    if (g.length == 0) {
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
    } else {
      if (f.length == 0) {
        var s = [b, c, d, g]
      } else {
        var s = [b, c, d, g, f]
      }
    }
    wx.previewImage({
      current: a, // 当前显示图片的http链接
      urls: s // 需要预览的图片http链接列表
    })
  },
  shouquan: function () {
    wx.showModal({
      title: '提示',
      content: '请点询单上方按钮授权，方可询单！',
      success: function (res) {

      }
    })
    return false
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
  //拨打电话
  mobile: function (e) {
    var num = e.currentTarget.dataset.name
    wx.makePhoneCall({
      phoneNumber: num
    })
  },
 
  // 获取商品详情数据
  getGoodsData: function (options) {
    wx.showToast({
      title: '数据加载中...',
      icon: 'loading',
      duration: 10000
    })
    var itemid = this.data.options.itemid;
    var that = this;
    wx.request({
      method: 'GET',
      url: 'https://wap.goods100.com/home/vipapi/getSellDetail',
      header: {
        mid: 0,
        token: 0,
      },
      data: {
        itemid: options.itemid
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.retcode == 1) {
          var good = res.data.data;
          console.log("good：", good)
          that.setData({ good: good });
          var totime = new Date()/1000+60*60*24*30  //设置缓存30天到期时间
          var obj={
            good:good,
            totime:totime
          }
          wx.setStorage({//将获取的数组缓存
            key: good.itemid,
            data: obj
          })
        }
        wx.hideToast();
      },
      fail: function () {

      }
    })
  },

  onshare: function () {
    wx.showToast({
      title: '点击右上角-选择转发',
      icon: 'success',
    })
    setTimeout(function () {
      wx.hideToast()
    }, 2000)
  }
})
