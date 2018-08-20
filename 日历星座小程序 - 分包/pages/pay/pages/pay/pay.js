
var util = require('../../../../utils/md5.js')
var app = getApp();
Page({

  data: {
    Number: 1,
    style: 'none',
    total: '88',
    ty: 1,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    if (app.globalData.userInfo && app.globalData.userInfo != '') {
      var time = app.globalData.userInfo[2]*1000
      var date = new Date(time)
      var toDate = date.getDate()
      var toMonth = date.getMonth() + 1
      var toYear = date.getFullYear()
      var t_date = toYear + '年' + toMonth + '月' + toDate + '日'
      this.setData({
        openid: app.globalData.userInfo[0],
        vip: app.globalData.userInfo[1],
        totime: app.globalData.userInfo[2],
        t_date: t_date
      });
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoCallback = userInfo => {
        var time = userInfo * 1000
        var date = new Date(time)
        var toDate = date.getDate()
        var toMonth = date.getMonth() + 1
        var toYear = date.getFullYear()
        var t_date = toYear + '年' + toMonth + '月' + toDate + '日'
        if (userInfo != '') {
          this.setData({
            openid: userInfo[0],
            vip: userInfo[1],
            totime: userInfo[2],
            t_date: t_date
          })
        }
      }
    }
  },
 
  onReady: function () {
    // 页面渲染完成
  },
  //发起支付
  pay: function (e) {
    var that = this
    var fId = e.detail.formId;
    var aa = e.detail.value;
    var openid = aa.openid;
    var money = aa.money * 100;
    var num = aa.num;
    var date = (Date.parse(new Date()) / 1000).toString();
    var totime = aa.totime;
    var n = "";
    for (var i = 0; i < 6; i++) {
      n += Math.floor(Math.random() * 10);
    }
    var time = date + n;
    that.setData({
      Out_trade_no: time,
    })
    wx.request({
      url: 'https://wap.goods100.com/home/rl/index',
      data: {
        openid: openid,
        money: money,
        Out_trade_no: time,
        totime: totime,
        num:num,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (response) {
        console.log(response)
        var appId = response.data.appid;
        var prepay_id = response.data.prepay_id;
        var timeStamp = (Date.parse(new Date()) / 1000).toString();
        var pkg = 'prepay_id=' + response.data.prepay_id;
        var nonceStr = response.data.nonce_str;
        var paySign = util.hexMD5('appId=' + appId + '&nonceStr=' + nonceStr + '&package=' + pkg + '&signType=MD5&timeStamp=' + timeStamp + '&key=qRLIizxpFML4VbnCLCiQMXO5y3LCQpal');
        wx.requestPayment({
          'timeStamp': timeStamp,
          'nonceStr': nonceStr,
          'package': pkg,
          'signType': 'MD5',
          'paySign': paySign,
          'success': function (res) {
            console.log('success');
            console.log(res);
            if (totime > date) {
              var totime = parseInt(totime) + num * 180 * 86400
            } else {
              var totime = (Date.parse(new Date()) / 1000) + num * 180 * 86400
            }
            app.globalData.userInfo[1] = "1"
            app.globalData.userInfo[2] = totime.toString()
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '购买成功！',
              complete: function () {
                wx.navigateTo({
                  url: "/pages/qingjian/pages/wode/wode" 
                })
              }
            })
          },
          'fail': function (res) {
            console.log(res)
          },
        });
      },

    });
  },
  
  bindblur: function (e) {
    var a = e.detail.value
    if (a < 1) {
      var a = 1
    }
    var b = parseInt(a)
    var total = b * 88
    this.setData({
      Number: b,
      total: total,
    })
  },


  add: function () {
    var that = this
    var num = that.data.Number
    var aa = ++num
    var total = aa * 88
    this.setData({
      Number: aa,
      total: total
    })
  },
  down: function () {
    var that = this
    var num = that.data.Number
    var aa = --num
    if (aa < 1) {
      var aa = 1
    }
    var total = aa * 88
    this.setData({
      Number: aa,
      total: total
    })
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