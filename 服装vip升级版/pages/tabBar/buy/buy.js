var app = getApp()
Page({
  onShareAppMessage: function () {
    return {
      title: '大量采购商在找货源，发布您的供应，让买家找到您！',
      desc: '本衣优质服装供求平台',
      path: '/pages/tabBar/buy/buy'
    }
  },
  data: {
    goodsList: [],
    page: 1,
    total: 0,
    reply: 'none',
  },

  // 获取求购数据
  getGoodsData: function (options) {
    wx.showNavigationBarLoading();
    var _this = this;
    wx.request({
      method: 'GET',
      url: 'https://wap.goods100.com/home/vipapi/getBuy',
      data: {
        page: _this.data.page,
      },
      success: function (res) {
        console.log(res.data);
        wx.hideNavigationBarLoading();
        if (_this.data.page < 2) {
          _this.setData({
            goodslist: res.data.data,
            style: 'block',
            reply: 'none',
          })
        } else {
          var goodslist = _this.data.goodslist;
          for (var i = 0; i < res.data.data.length; i++) {
            goodslist.push(res.data.data[i]);
          }
          _this.setData({
            goodslist: goodslist,
            style: 'block',
            reply: 'none',
          });
        }
        wx.hideToast();

      },
      fail: function () {
        wx.hideNavigationBarLoading();
        _this.setData({
          style: 'none',
          reply: 'block',
        })
      }
    })
  },

  onLoad: function () {
    wx.showToast({
      title: '数据加载中...',
      icon: 'loading',
    })
    var _this = this;
    _this.getGoodsData();
    console.log('onLoad')
    wx.getStorage({
      key: 'storage',
      success: function (res) {
        console.log("用户ID：", res.data);
        _this.setData({
          storage: res.data[0],
          groupid: res.data[2],
          username: res.data[3],
        })
      }
    })
  },

  onShow: function (e) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
  },
  pullDownRefresh: function (e) {
    console.log("下拉刷新....")
    this.setData({
      page: 1,
    });
    this.getGoodsData()
  },

  pullUpLoad: function (e) {
    console.log("上拉加载更多....")
    var _page = this.data.page + 1;
    if (_page <= 50) {
      this.setData({ page: _page });
      this.getGoodsData();
    } else {
      this.setData({ moreText: "亲，暂时只能显示到此，如需查看更多请前往本衣网。" });
    }
  },

})
