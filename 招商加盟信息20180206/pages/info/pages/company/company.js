// pages/company/company.js
var app = getApp()
Page({
  onShareAppMessage: function () {
    var company = this.data.options.company
    var groupid = this.data.options.groupid
    var honor_id = this.data.options.honor_id
    var username = this.data.options.username
    return {
      title: '创业好生意，发布您商机信息，让客户找到您！',
      desc: '本衣招商加盟商机平台',
      path: '/pages/info/pages/company/company?username=' + username + '&company=' + company + '&groupid=' + groupid + '&honor_id=' + honor_id
    }
  },
  data: {
    options: {},
    reply: 'none',
    page: 1,
    total: 0,
    imgUrls: [
      'https://wap.goods100.com/uploads/xcx/zhaoshang.jpg',
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },

  // 获取招商信息数据
  getGoodsData: function (options) {
    wx.showNavigationBarLoading();
    var _this = this;
    console.log(_this.data.options.username)
    wx.request({
      method: 'GET',
      url: 'https://wap.goods100.com/home/zsjapi/getNewcompany',
      data: {
        page: _this.data.page,
        username: _this.data.options.username,
      },
      success: function (res) {
        console.log(res.data);
        wx.hideNavigationBarLoading();
        var total = res.data.total;
        _this.setData({
          goodslist: res.data.data,
          style: 'block',
          reply: 'none',
          total: total,
        })

        wx.hideToast();
      },

      fail: function () {
        wx.hideNavigationBarLoading();
        _this.setData({
          style: 'none',
          reply: 'block',
        })
        wx.hideToast();
      }
    })
  },

  onLoad: function (options) {
    var storage = wx.getStorageSync('storage')
    var me_uid = storage[0]//本人的id
    this.setData({
      me_uid: me_uid,
    })
    wx.showToast({
      title: '数据加载中...',
      icon: 'loading',
      duration: 10000,
    })
    var _this = this;
    this.setData({
      options: options,
    })
    _this.getGoodsData(options);
  },

  onShow: function (e) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
        })
      }
    })
  },
  onReady: function () {

  },

  pullUpLoad: function (e) {
    var _page = this.data.page + 1;
    var _total = this.data.total;
    console.log(_page)
    if (_page <= _total) {
      this.setData({
        page: _page,
      });
      this.getGoodsData();
    }
  },
  onshare: function () {
    wx.showToast({
      title: '点击右上角-选择转发',
      icon: 'success',
    })
  }
})