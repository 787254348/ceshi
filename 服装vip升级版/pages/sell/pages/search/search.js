var app = getApp()
Page({
  onShareAppMessage: function (options) {
    var word = this.data.options.word
    return {
      title: '大量采购商在找货源，发布您的供应，让买家找到您！',
      desc: '本衣优质服装供求平台',
      path: '/pages/sell/pages/search/search?word=' + word
    }
  },
  data: {
    options: {},
    moreText: 'none',
    goodsList: [],
    page: 1,
    tishi: 'none',
    arr: [],
    arrHight: []
  },

  onLoad: function (options) {
    this.setData({
      options: options,
    })
    var _this = this;
    _this.getGoodsData(options);
  },

  // 获取数据
  getGoodsData: function (options) {
    wx.showNavigationBarLoading();
    this.setData({
      hidden: false
    });
    var _this = this;
    var tarrHight = [];
    wx.request({
      method: 'GET',
      url: 'https://wap.goods100.com/home/vipapi/getNewsearchs',
      data: {
        page: _this.data.page,
        word: _this.data.options.word,
      },
      success: function (res) {
        if (res.data.data.length == 0) {
          _this.setData({
            moreText: "block",
            hidden: true,
            page: 51,
          })
        }
        console.log(res.data);
        wx.hideNavigationBarLoading();
        var windowWidth = _this.data.windowWidth
        if (_this.data.page < 2) {
          var arr = [];
          var length = Array.from(res.data.data).length;
          for (var i = 0; i < length; i++) {
            arr[i] = false;
            tarrHight[i] = Math.floor(i / 2) * (windowWidth / 750) * 414;
          }
          for (var i = 0; i < res.data.data.length; i++) {
            if (tarrHight[i] < _this.data.clientHeight) {
              if (arr[i] == false) {
                arr[i] = true;
              }
            }
          }
          _this.setData({
            goodslist: res.data.data,
            style: 'block',
            hidden: true,
            tishi: 'none',
            moreText: "none",
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
            hidden: true,
            tishi: 'none',
            moreText: "none",
            arr: arr,
            arrHight: tarrHight
          });
        }
        var sss = _this.data.goodslist;
        if (!sss || sss.length==0) {
          _this.setData({
            style: 'none',
            tishi: 'block',
          });
        }
      },

      fail: function () {
        wx.hideNavigationBarLoading();
        _this.setData({
          style: 'none',
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

  pullUpLoad: function (options) {
    var _page = this.data.page + 1;
    var that = this
    if (_page <= 50) {
      that.setData({
        page: _page,
        moreText: "none"
      });
      that.getGoodsData(options);
    } else {
      that.setData({ moreText: "block" });
    }
  },

  //供应信息搜索框
  formSubmit: function (options) {
    var formData = options.detail.value;
    var word = formData.rsearch.trim()
    console.log(word)
    if (!word) {
      wx.showModal({
        title: '提示',
        content: '请填写关键词！'
      })
      return false;
    }
    this.setData({
      page: 1,
      options: { word },
      goodslist: []
    })
    var a = this.data.options
    console.log(a)
    this.getGoodsData(options)
  },
})
