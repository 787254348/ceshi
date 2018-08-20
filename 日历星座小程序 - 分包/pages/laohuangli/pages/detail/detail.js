// pages/detail/detail.js
var app = getApp()
Page({
  onShareAppMessage: function (options) {
    var catid = this.data.options.catid;
    var date = this.data.options.date;
    var ty = this.data.options.type;
    return {
      title: catid + date + '运势-免费制作电子请柬贺卡',
      desc: '星座运势',
      path: '/pages/laohuangli/pages/detail/detail?catid=' + catid + '&type=' + ty
    }
  },
  data: {
    options: {},
    restation: [],
    style: 'none',
    show: 'block',
    right: '>'
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      options: options,
    })
    this.detail(options);
  },
  detail: function (options) {
    var that = this;
    wx.request({
      method: 'GET',
      url: 'https://wap.goods100.com/home/xzapi/index',
      data: {
        ty: that.data.options.type,
        catid: that.data.options.catid,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var da = res.data;
        console.log(da)
        //将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
        that.setData({
          restation: da,
          condition: false,
          style: 'none',
          show: 'block'
        });

        wx.hideToast();
      },

      fail: function () {
        that.setData({
          hidden: true,
          style: 'block',
          show: 'none'
        });
        wx.hideNavigationBarLoading();
      }

    })
  },

  cate: function (e) {
    var catid = e.target.dataset.catid
    var ty = e.target.dataset.type
    var date = e.target.dataset.date
    this.setData({
      options: {
        catid: catid,
        type: ty,
        date: date
      },
    })
    this.detail()
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

  },


})