var network = require("../../common/request.js")
var CN_Date = require('../../common/getCNDate.js');
var app = getApp()
var t = new Date();
Page({
  onShareAppMessage: function () {
    return {
      title: '免费制作电子请柬贺卡，微喜帖微贺卡',
      desc: '日历',
      path: '/pages/tabBar/calendar/calendar',
      success: function (res) {

      },
      fail: function (res) {

      }
    }
  },
  data: {
    dateValue: '2017年4月',
    array: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'],
    MONTH_EN: ['JAN ', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    toDate: t.getDate(),
    toMonth: t.getMonth() + 1,
    toYear: t.getFullYear(),
    nongliDetail: CN_Date(t.getFullYear(), t.getMonth() + 1, t.getDate()),
    restation: [],
    right: '>',
    resposition: [],
    item: {
      b: '',
      c: 'none'
    },  
  },

  onLoad: function (options) {
    var that = this;
    if (app.globalData.userInfo && app.globalData.userInfo != '') {
      console.log(555)
      console.log(app.globalData.userInfo)
      this.setData({
        openid: app.globalData.userInfo[0],
        totime: app.globalData.userInfo[2]
      });
    } else {
      console.log(666)
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoCallback = userInfo => {
        console.log(userInfo)
        if (userInfo != '') {
          this.setData({
            openid: userInfo[0],
            totime: userInfo[2]
          })
        }
      }
    }
    this.date2();
    //判断老黄历数据是否存在缓存且是否是当天的
    var value = wx.getStorageSync("laohuangli")
    var totime = value.sessionTime//设置缓存时的时间
    var timestamp = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;   //当天0点时间
    if (value && totime > timestamp) {
      wx.getStorage({
        key: 'laohuangli',
        success: function (res) {
          console.log(res.data)
          that.setData({
            restation: res.data.nongli,
          });
        }
      })
    } else {
      that.date();
    }
    //
    //判断星座数据是否存在缓存且是否是当天的
    var starValue = wx.getStorageSync("xingzuo")
    var starTotime = starValue.sessionTime//设置缓存时的时间
    var nowtime = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;   //当天0点时间
    if (value && starTotime > nowtime) {
      wx.getStorage({
        key: 'xingzuo',
        success: function (res) {
          console.log(res.data)
          that.setData({
            star: res.data.data
          });
        }
      })
    } else {
      that.xingzuo();
    }
    this.xiaohua();
    this.lishi();
   
  },

  onShow: function () {
    
  },

  date: function () {
    var data = this.data;
    console.log(data.toMonth)
    console.log(data.toDate)
    var that = this;
    wx.request({
      method: 'GET',
      url: 'https://v.juhe.cn/laohuangli/d?date=' + data.toYear + '-' + data.toMonth + '-' + data.toDate + '&key=fd6dd1de40a2cfe1725d43c323e057c7',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var data = res.data;
        console.log(data)
        app.globalData.yangli = data.result.yangli;
        console.log(app.globalData.yangli)
        //将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
        that.setData({
          restation: data.result,
        });
        //缓存获取到的数据并添加缓存时间
        var sessionTime = new Date()/1000  //获取当前时间戳
        var obj = {
          nongli: data.result,
          sessionTime: sessionTime
        }
        wx.setStorage({//将获取的数组缓存
          key: "laohuangli",
          data: obj
        })

      },
      fail: function () {

      }
    })


  },

  date2: function () {
    var data = this.data;
    var that = this;
    var toYear = data.toYear
    var toMonth = data.toMonth
    var toDate = data.toDate
    if (toMonth < 10) {
      var toMonth = "0" + toMonth
    }
    if (toDate < 10) {
      var toDate = "0" + toDate
    }
    var date = toYear + '-' + toMonth + '-' + toDate
    //获取星期
    var day = new Date(date).getDay()
    switch (day) {
      case 0:
        var text = "星期日";
        break;
      case 1:
        var text = "星期一";
        break;
      case 2:
        var text = "星期二";
        break;
      case 3:
        var text = "星期三";
        break;
      case 4:
        var text = "星期四";
        break;
      case 5:
        var text = "星期五";
        break;
      case 6:
        var text = "星期六";
        break;
    }
    that.setData({
      weekday: text,
    });
  },



  xingzuo: function () {
    var that = this;
    wx.request({
      method: 'GET',
      url: 'https://wap.goods100.com/home/xzapi/shizi',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var da = res.data;
        console.log(da)
        //将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
        that.setData({
          star: da
        });
        //缓存获取到的数据并添加缓存时间
        var sessionTime = new Date() / 1000  //获取当前时间戳
        var obj = {
          data: da,
          sessionTime: sessionTime
        }
        wx.setStorage({//将获取的数组缓存
          key: "xingzuo",
          data: obj
        })
        
      },

      fail: function () {

      }
    })
  },

  xingzuochange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var i = e.detail.value
    var name = this.data.array[i]
    var that = this
    console.log(name)
    this.setData({
      index: e.detail.value,
    })

    wx.request({
      method: 'GET',
      url: 'https://wap.goods100.com/home/xzapi/index',
      data: {
        catid: name,
        ty: 'today',
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var da = res.data;
        console.log(da)
        //将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
        that.setData({
          star: da
        });
      },

      fail: function () {


      }

    })
  },

  xiaohua: function () {
    var that = this;
    wx.request({
      method: 'GET',
      url: 'https://v.juhe.cn/joke/content/text.php?key=3f603c85f8aa24b1c13abfd8187a798a',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var da = res.data.result.data;
        app.globalData.detail = da;
        console.log(da)
        //将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
        that.setData({
          resposition: da,
        });
      },
      
      fail: function () {

      }
    })
  },

  lishi:function(){
    var that = this
    var month = t.getMonth() + 1
    var day = t.getDate()
    wx.request({
      method: 'GET',
      url: 'https://wap.goods100.com/home/xzapi/lishi',
      data: {
        month: month,
        day: day,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var da = res.data.result;
        app.globalData.lishi = da 
        console.log(da)
        //将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
        that.setData({
          lishi: da
        });
      },

      fail: function () {

      }

    })
  },

  
  //解梦搜索框
  formSubmit: function (e) {
    var fId = e.detail.formId;
    var formData = e.detail.value;
    var openid = formData.openid;
    var word = formData.content.trim()
    var num = formData.num
    var data={
      fId: fId,
      openid: openid,
    }
    if(!word){
      wx.switchTab({
        url: "/pages/tabBar/jiemeng/jiemeng"
      })
    }else{
      wx.navigateTo({
        url: "/pages/laohuangli/pages/jiemengDetail/jiemengDetail?key=" + word + "&num=" + num
      })
    } 
    network.requestFid(data, function (res) {//保存发送模板消息用的fId数据
    })
  },

  //火星文查询框
  huoxing: function (e) {
    var formData = e.detail.value;
    var word = formData.content.trim()
    if (!word) {
      wx.navigateTo({
        url: "/pages/huoxing/pages/hx/hx"
      })
    } else {
      wx.navigateTo({
        url: "/pages/huoxing/pages/hx/hx?word=" + word 
      })
    }
  },

  //繁体字查询框
  fanti: function (e) {
    var formData = e.detail.value;
    var word = formData.content.trim()
    if (!word) {
      wx.navigateTo({
        url: "/pages/huoxing/pages/ft/ft"
      })
    } else {
      wx.navigateTo({
        url: "/pages/huoxing/pages/ft/ft?word=" + word
      })
    }
  },

  //新华字典查询框
  zidian: function (e) {
    var fId = e.detail.formId;
    var formData = e.detail.value;
    var openid = formData.openid;
    var word = formData.content.trim()
    var data = {
      fId: fId,
      openid: openid,
    }
    wx.navigateTo({
        url: "/pages/zidian/pages/zidian/zidian?key=" + word 
    })
    network.requestFid(data, function (res) {//保存发送模板消息用的fId数据
    })
  },

  //成语词典查询框
  chengyu: function (e) {
    var fId = e.detail.formId;
    var formData = e.detail.value;
    var openid = formData.openid;
    var word = formData.content.trim()
    var data = {
      fId: fId,
      openid: openid,
    }
    wx.navigateTo({
      url: "/pages/zidian/pages/chengyu/chengyu?key=" + word
    })
    network.requestFid(data, function (res) {//保存发送模板消息用的fId数据
    })
  },

  charge: function () {
    this.setData({
      item: {
        b: '',
        c: 'none'
      },
    })
  },

  //请柬分类导航
  qingjian: function (e) {
    var num = e.target.dataset.num
    app.globalData.select = num
    wx.switchTab({
      url: "/pages/tabBar/qingjian/qingjian"
    })
  },

  //贺卡分类导航
  heka: function (e) {
    var num = e.target.dataset.num
    app.globalData.catid = num
    wx.switchTab({
      url: "/pages/tabBar/heka/heka"
    })
  },
 
})