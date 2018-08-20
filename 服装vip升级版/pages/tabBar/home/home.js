var app = getApp()
Page({
  onShareAppMessage: function () {
    return {
      title: '大量采购商在找货源，发布您的供应，让买家找到您！',
      desc: '本衣优质服装供求平台',
      path: '/pages/tabBar/home/home'
    }
  },
  data: {
    moreText: 'none',
    goodslist: [],
    reply: 'none',
    page: 1,
    clientHeight: 0,
    arr: [],
    arrHight: []
  },

  // 获取商品数据
  getGoodsData: function (options) {
    this.setData({
      hidden: false
    });
    wx.showNavigationBarLoading();
    var _this = this;
    var tarrHight = [];

    wx.request({
      method: 'GET',
      url: 'https://wap.goods100.com/home/vipapi/getNew',
      data: {
        page: _this.data.page,
      },
      success: function (res) {
        var windowWidth = _this.data.windowWidth
        wx.hideNavigationBarLoading();
        if (_this.data.page < 2) {
          var arr = [];
          var length = Array.from(res.data.data).length;
          for (var i = 0; i < length; i++) {
            arr[i] = false;
            tarrHight[i] = Math.floor(i / 2) * (windowWidth / 750) * 414;
          }
          for (var i = 0; i < 6; i++) {
              if (arr[i] == false) {
                arr[i] = true;
              }
          }
          console.log(arr)
          _this.setData({
            goodslist: res.data.data,
            style: 'block',
            reply: 'none',
            on: 'none',
            hidden: true,
            arr: arr,
            arrHight: tarrHight
          })
        } else {
          var arr = [];
          var goodslist = _this.data.goodslist;
          for (var i = 0; i < res.data.data.length; i++) {
            goodslist.push(res.data.data[i]);
          }
          var length = Array.from(goodslist).length;
          for (var i = 0; i < length; i++) {
            arr[i] = false;
            tarrHight[i] = Math.floor(i / 2) * (windowWidth / 750) * 414;
          }
          var seeHeight = _this.data.clientHeight;
          for (var i = 0; i < _this.data.goodslist.length; i++) {
            if (tarrHight[i] < _this.data.scrollTop + seeHeight) {
              if (arr[i] == false) {
                arr[i] = true;
              }
            }
          }
          _this.setData({
            goodslist: goodslist,
            style: 'block',
            reply: 'none',
            on: 'none',
            hidden: true,
            arr: arr,
            arrHight: tarrHight
          });
        }
      },
      fail: function (res) {
        wx.hideNavigationBarLoading();
        _this.setData({
          style: 'none',
          reply: 'block',
        })
      }
    })
  },

  onLoad: function () {
    var _this = this;
    _this.getGoodsData();
    wx.getStorage({
      key: 'storage',
      success: function (res) {
        console.log(res.data);
        _this.setData({
          storage: res.data[0],
          groupid: res.data[2],
        })
      }
    })
  },

  onShow: function (e) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          clientHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
        console.log(res.windowHeight)
        console.log(res.screenHeight)
      }
    })
  },

  scroll: function (e) {
    var seeHeight = this.data.clientHeight; //可见区域高度  
    var arrHight = this.data.arrHight;
    var scrollTop = e.detail.scrollTop;
    var arr = this.data.arr;
    for (var i = 0; i < this.data.goodslist.length; i++) {
      if (arrHight[i] < scrollTop + seeHeight) {
        if (arr[i] == false) {
          arr[i] = true;
        }
      }
    }
    this.setData({
      arr: arr,
      scrollTop: scrollTop
    })
  },

  pullDownRefresh: function (e) {
    console.log("下拉刷新....")
    this.setData({
      page: 1,
      on: 'block'
    });
    this.getGoodsData();
  },

  pullUpLoad: function (e) {
    var _page = this.data.page + 1;
    if (_page <= 50) {
      this.setData({
        page: _page,
        on: 'block',
        moreText: "none"
      });
      this.getGoodsData();
    } else {
      this.setData({ moreText: "block" });
    }
  },
  //供应信息搜索框
  formSubmit: function (e) {
    var formData = e.detail.value;
    var word = formData.rsearch.trim()
    if (!word) {
      wx.showModal({
        title: '提示',
        content: '请填写关键词！'
      })
      return false;
    }
    wx.navigateTo({
      url: "/pages/sell/pages/search/search?word=" + word
    })
  },
})
