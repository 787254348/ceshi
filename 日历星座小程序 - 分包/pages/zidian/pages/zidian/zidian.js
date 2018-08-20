var network = require("../../../common/request.js")
var app = getApp()
Page({
  onShareAppMessage: function (options) {
    var word = this.data.options.key
    console.log(word)
      return {
        title: '这个“' + word + '”字你认识吗？快来教我一起做个文化人-查字典',
        desc: '新华字典',
        path: '/pages/zidian/pages/zidian/zidian?key=' + word
      }
  },

  data: {
    options: {},
    right: '>',
    item: {
      b: '',
      c: 'none',
    },
    keyword: [
      '宾', '燕', '怡', '雅', '娴', '丽', '瑞', '懿', '芊', '谦', '茜', '倩', '娟', '悦', '阔', '顺', '婷', '惠', '敏', '婉', '熙','韶','幸','福',
      '诗','经','楚','辞','道','德',
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
      url: 'https://v.juhe.cn/xhzd/query?key=31c32a600634347a434faa21229d95ad&word=' + word,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var da = res.data;
        console.log(da.result)
        if (!da.result) {
          that.setData({
            item: {
              b: 'back',
              c: 'block',
              tt: "哎呦，暂时没有找到相关的字哟！请重新输入正确的字"
            },
          });
          return false
        }
        //将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
        that.setData({
          restation: da.result,
        });
      },
    })
  },

  zidian: function (e) {
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
      url: 'https://v.juhe.cn/xhzd/query?key=31c32a600634347a434faa21229d95ad&word=' + word,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var da = res.data;
        console.log(da.result)
        if (!da.result) {
          that.setData({
            item: {
              b: 'back',
              c: 'block',
              tt: "哎呦，暂时没有找到相关的字哟！请重新输入正确的字"
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
    })
    network.requestFid(data, function (res) {//保存发送模板消息用的fId数据
    })
  },

  select: function (e) {
    var word = e.target.dataset.name
    var that = this;
    wx.request({
      method: 'GET',
      url: 'https://v.juhe.cn/xhzd/query?key=31c32a600634347a434faa21229d95ad&word=' + word,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var da = res.data;
        console.log(da.result)
        //将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
        that.setData({
          options: { key: word },
          restation: da.result,
        });
      },
    })
  },

  charge:function(){
    this.setData({
      item: {
        b: '',
        c: 'none',
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