var app = getApp()
Page({
  onShareAppMessage: function () {
    var catid = this.data.options.catid
    return {
      title: '创业好生意，发布您商机信息，让客户找到您！',
      desc: '本衣招商加盟商机平台',
      path: '/pages/info/pages/categroy/categroy?catid=' + catid
    }
  },
  data: {
    options: {},
    reply: 'none',
    title: "招商加盟信息",
    moreText: "none",
    page: 1,
    total: 0,
    imgUrls: [
      'https://wap.goods100.com/uploads/xcx/zhaoshang.jpg',
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    arr: [],
    arrHight: [],
  },

  // 获取招商信息数据
  getGoodsData: function (options) {
    wx.showNavigationBarLoading();
    this.setData({
      hidden: false
    });
    var _this = this;
    var tarrHight = [];
    console.log(_this.data.options.catid)
    wx.request({
      method: 'GET',
      url: 'https://wap.goods100.com/home/zsapi/getNewcategory',
      data: {
        page: _this.data.page,
        catid: _this.data.options.catid,
      },
      success: function (res) {
        console.log(res.data);
        wx.hideNavigationBarLoading();
        var windowWidth = _this.data.windowWidth
        var total = res.data.total;
        if (_this.data.page < 2) {
          var arr = [];
          var length = Array.from(res.data.data).length;
          for (var i = 0; i < length; i++) {
            if (i < 5) {
              arr[i] = true;
            } else {
              arr[i] = false;
            }
            tarrHight[i] = i * (windowWidth / 750) * 254;
          }
          console.log(arr)
          _this.setData({
            goodslist: res.data.data,
            style: 'block',
            reply: 'none',
            hidden: true,
            total: total,
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
            tarrHight[i] = i * (windowWidth / 750) * 254;
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
            hidden: true,
            total: total,
            arr: arr,
            arrHight: tarrHight
          });
        }
      },

      fail: function () {
        wx.hideNavigationBarLoading();
        wx.hideToast();
        _this.setData({
          style: 'none',
          reply: 'block',
          hidden: true,
        })
      }
    })
  },
  cate: function (e) {
    var catid = e.target.dataset.name
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
    this.setData({
      options: {
        catid: catid,
      },
      page: 1,
      goodslist: [],
      moreText: "none"
    })
   
    this.getGoodsData()
  },
  onLoad: function (options) {
    this.setData({
      options: options,
    })
    var _this = this;
    _this.getGoodsData(options);
  },

  onShow: function (e) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          clientHeight: res.windowHeight,
          windowWidth: res.windowWidth,
        })
      }
    })
  },
  onReady: function () {

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
      goodslist: [],
      style: 'none',
      moreText: "none"
    })
    this.getGoodsData();
  },

  pullUpLoad: function (e) {
    var _page = this.data.page + 1;
    var _total = this.data.total;
    if (_page <= _total) {
      this.setData({ page: _page });
      this.getGoodsData();
    } else {
      this.setData({ moreText: "block" });
    }
  },
})
