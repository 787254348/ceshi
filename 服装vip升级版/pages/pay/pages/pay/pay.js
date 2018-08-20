// pages/pay/pay.js
var util = require('../../utils/md5.js')
var app = getApp();
Page({
  data: {
    storage: [],
    options: {},
    Number: 1,
    ty: 1,
    img: 'https://wap.goods100.com/uploads/xcx/8.png',
    img2: 'https://wap.goods100.com/uploads/xcx/7.png',
    img3: 'https://wap.goods100.com/uploads/xcx/5.png'
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      options: options,
    })
    var that = this;
    that.setToken()
    wx.getStorage({
      key: 'storage',
      success: function (res) {
        console.log("用户ID：", res.data);
        that.setData({
          storage: res.data[0],
          openid: res.data[1],
          username: res.data[3],
        })
        that.open(res)
      }
    })

  },
  tishi: function () {
    wx.showModal({
      title: '提示',
      showCancel: false,
      content: "请点确定上方按钮授权，方可确定",
      complete: function () {

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
            that.open(res)
            wx.setStorage({
              key: "storage",
              data: res.data
            })
          }
        })
      }
    })
  },
  open: function (res) {
    var username = res.data[3]
    var that = this
    wx.request({
      url: 'https://wap.goods100.com/home/zzfapi/getvip', //仅为示例，并非真实的接口地址
      data: {
        username: username,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          information: res.data,
        })
      }
    })
  },
  //获取token
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
  onReady: function () {
    // 页面渲染完成
  },
  //发起支付
  pay: function (e) {
    var that = this
    var fId = e.detail.formId;
    var aa = e.detail.value;
    var username = aa.username;
    var openid = aa.openid;
    var money = aa.money * 100;
    var ty = aa.ty;
    var num = aa.number;
    var address = aa.address;
    var totime = aa.totime;
    if (!username) {//授权提示信息
      wx.showModal({
        title: '提示',
        content: '去个人中心授权才能使用！',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/tabBar/me/me'
            })
          }
        }
      })
      return false
    }
    var date = (Date.parse(new Date()) / 1000).toString();
    var Num = "";
    for (var i = 0; i < 6; i++) {
      Num += Math.floor(Math.random() * 10);
    }
    var time = date + Num;
    that.setData({
      Out_trade_no: time,
    })
    wx.request({
      url: 'https://wap.goods100.com/home/zzfapi/index',
      data: {
        openid: openid,
        money: money,
        Out_trade_no: time,
        ty: ty,
        username: username,
        num: num,
        address: address,
        totime: totime,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (response) {
        var appId = response.data.appid;
        var prepay_id = response.data.prepay_id;
        var timeStamp = (Date.parse(new Date()) / 1000).toString();
        var pkg = 'prepay_id=' + response.data.prepay_id;
        var nonceStr = response.data.nonce_str;
        // var paySign=response.data.sign;
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
            that.getchange(e);//购买成功后发送服务通知
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '恭喜您购买成功！',
              complete: function () {
                wx.switchTab({
                  url: '/pages/tabBar/me/me'
                })
              }
            })
          },
          'fail': function (res) {

          },
        });
      },

    });
  },
  //发送服务通知
  getchange: function (e) {
    var cc = e.detail.value;
    console.log(cc)
    var userid = cc.userid;
    var money = cc.money * 100;
    var username = cc.username;
    var openid = cc.openid;
    var ty = cc.ty;
    var Number = cc.number;
    var fId = e.detail.formId;
    var totime = cc.totime * 1000;
    var timestamp = Date.parse(new Date());
    if (totime > timestamp) {
      var timestamp = totime;
    } else {
      var timestamp = Date.parse(new Date());
    }
    var times = timestamp / 1000;
    var t = times * 1000;
    var da = new Date(t);
    //当前时间的年份
    var year = da.getFullYear();
    //当前时间的月份  
    var month = (da.getMonth() + 1 < 10 ? '0' + (da.getMonth() + 1) : da.getMonth() + 1);
    //当前时间的日期  
    var today = da.getDate() < 10 ? '0' + da.getDate() : da.getDate();
    //某一天后的时间
    timestamp = timestamp / 1000 + 365 * 24 * 60 * 60;
    var n = timestamp * 1000;
    var date = new Date(n);
    //某一天后的年份
    var Y_tomorrow = date.getFullYear();
    //某一天后的月份  
    var M_tomorrow = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //某一天后的日期  
    var D_tomorrow = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var Ndata = year + '年' + month + '月' + today + '日'
    var Tdata = Y_tomorrow + '年' + M_tomorrow + '月' + D_tomorrow + '日'
    var timestamp1 = Date.parse(new Date());
    var times = timestamp1 / 1000;
    var t = times * 1000;
    var da = new Date(t);
    //当前时间的年份
    var nyear = da.getFullYear();
    //当前时间的月份  
    var nmonth = (da.getMonth() + 1 < 10 ? '0' + (da.getMonth() + 1) : da.getMonth() + 1);
    //当前时间的日期  
    var ntoday = da.getDate() < 10 ? '0' + da.getDate() : da.getDate();
    var Nowdata = nyear + '年' + nmonth + '月' + ntoday + '日'
    var content = '本衣网络VIP服务'
    var totime = '12个月'
    var that = this;
    var Out_trade_no = that.data.Out_trade_no
    var  l  =  'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token='  + wx.getStorageSync('token');
    wx.request({
      url:  l,
      data: {
        touser: openid,
        template_id:  'o_J3zLa7jVcGAU32kNt29r79HHzmoSQDkCWsMXaVct0',//这个是1、申请的模板消息id，  
        page:  'pages/tabBar/me/me',
        form_id: fId,
        data:  {
          "keyword1":  {
            "value":  Nowdata,
            "color":  "#9b9b9b"
          },
          "keyword2":  {
            "value":  content,
            "color":  "#009933"
          },
          "keyword3":  {
            "value":  totime,
            "color":  "#9b9b9b"
          },
          "keyword4":  {
            "value":  Ndata + "-" + Tdata,
            "color":  "#9b9b9b"
          },
          "keyword5":  {
            "value":  "感谢您的惠顾！您在本衣网（www.goods100.com）的账号是" + username + "，小程序服装批发采购，继续用您的手机正常使用。诚邀您关注我们官方公众号“服装批发生意（fzpf9188）”，助力您的服装生意！",
            "color":  "#9b9b9b"
          },
        },
        // color: '#ccc',  
        //emphasis_keyword: 'keyword1.DATA' 
      },
      method:  'POST',
      success:  function (res) {
        console.log("push msg");
      },
      fail:  function (err)  {
        // fail  
        console.log(err);
      }
    });
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