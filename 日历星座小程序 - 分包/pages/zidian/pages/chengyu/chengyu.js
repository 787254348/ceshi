var network = require("../../../common/request.js")
var app = getApp()
Page({
  onShareAppMessage: function (options) {
    var word = this.data.options.key
    console.log(word)
    return {
      title: '“' + word +'”?，懂的大侠一起来学成语,做个文化人',
      desc: '成语字典',
      path: '/pages/zidian/pages/chengyu/chengyu?key=' + word
    }

  },

  data: {
    options: {},
    right: '>',
    item: {
      b: '',
      c: 'none',
    },
    keyword:[
      '喜出望外',
      '陶情适性',
      '青山绿水',
      '神采奕奕',
      '金榜题名',
      '喜上眉梢',
      '意气风发',
      '笑逐颜开',
      '满面春风',
      '安居乐业',
      '春华秋实',
      '心旷神怡',
      '心满意足',
      '功成名就',
      '心花怒放',
      '喜气洋洋',
      '金玉满堂',
      '国泰民安',
    ]
  },
  onLoad: function (options) {
    var that = this;
    if (app.globalData.userInfo && app.globalData.userInfo != '') {
      this.setData({
        openid: app.globalData.userInfo[0],
        vip: app.globalData.userInfo[1],
      });
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoCallback = userInfo => {
        if (userInfo != '') {
          this.setData({
            openid: userInfo[0],
            vip: userInfo[1],
          })
        }
      }
    }
    this.setData({
      options: options,
    })
    this.star(options) 
  },
  star: function (options) {
    var word = this.data.options.key;
    var that = this;
    wx.request({
      method: 'GET',
      url: 'https://v.juhe.cn/chengyu/query?key=884690c2086476d5d28323c967d0a0eb&word=' + word,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var da = res.data;
        console.log(da.result)
        if (!da.result) {
          wx.setNavigationBarTitle({//导航栏标题
            title: '成语词典'
          })
          that.setData({
            item: {
              b: 'back',
              c: 'block',
              tt: "哎呦，暂时没有找到相关的成语哟！请重新输入正确的成语"
            },
          });
          return false
        }
        wx.setNavigationBarTitle({//导航栏标题
          title: word + '-成语词典'
        })
        //将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
        that.setData({
          restation: da.result,
        });
      },

      fail: function () {

      }

    })
  },

  chengyu: function (e) {
    var fId = e.detail.formId;
    var formData = e.detail.value;
    var openid = formData.openid;
    var word = formData.content.trim()
    var data = {
      fId: fId,
      openid: openid,
    }
    var that = this;
    wx.request({
      method: 'GET',
      url: 'https://v.juhe.cn/chengyu/query?key=884690c2086476d5d28323c967d0a0eb&word=' + word,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.setNavigationBarTitle({//导航栏标题
          title: word + '-成语词典'
        })
        var da = res.data;
        console.log(word)
          if (!da.result) {
            that.setData({
              item: {
                b: 'back',
                c: 'block',
                tt: "哎呦，暂时没有找到相关的成语哟！请重新输入正确的成语"
              },
            });
            return false
          }
        //将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
        that.setData({
          options: { key: word },
          restation: da.result,
        });
      },

      fail: function () {

      }

    })

    network.requestFid(data, function (res) {//保存发送模板消息用的fId数据
    })
  },

  select: function (e) {
    var word = e.target.dataset.name
    var that = this;
    wx.request({
      method: 'GET',
      url: 'https://v.juhe.cn/chengyu/query?key=884690c2086476d5d28323c967d0a0eb&word=' + word,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.setNavigationBarTitle({//导航栏标题
          title: word + '-成语词典'
        })
        var da = res.data;
        console.log(word)
        //将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
        that.setData({
          options: { key: word },
          restation: da.result,
        });
      },

      fail: function () {

      }

    })
  },

  charge: function () {
    this.setData({
      item: {
        b: '',
        c: 'none'
      },
    });
  },

  onshare: function () {
    wx.showToast({
      title: '点击右上角-选择转发',
      icon: 'success',
    })
    setTimeout(function () {
      wx.hideToast()
    }, 2000)
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