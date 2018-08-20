// pages/xiaohua/xiaohua.js
var app = getApp()
Page({
  onShareAppMessage: function (options) {
    return {
      title: '哈哈哈，不笑你打我！-免费制作电子请柬贺卡',
      desc: '笑话',
      path: '/pages/laohuangli/pages/xiaohua/xiaohua'
    }
  },
  data: {
    resposition: [],
    resposition1: [],
    left: 'light_l',
    right: 'right',
    num: '1',
    dy: '>',
    options: {},
    page: 1,
    page1: 1,

  },
  onLoad: function (options) {
    
    this.xiaohua();
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  xiaohua: function () {

    var page = this.data.page
    var that = this;
    wx.request({
      method: 'GET',
      url: 'https://v.juhe.cn/joke/content/text.php?key=3f603c85f8aa24b1c13abfd8187a798a&page=' + page + '&pagesize=20',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var da = res.data.result.data;
        console.log(da)
        if (page < 2) {
          app.globalData.luck = da;
          //将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
          that.setData({
            resposition: da,
            condition: false,
            style: 'none',
            show: 'block',
            left: 'light_l',
            right: 'right',
            num: '1',
          });
        } else {
          var resposition = that.data.resposition;
          for (var i = 0; i < da.length; i++) {
            resposition.push(da[i]);
          }
          app.globalData.luck = resposition;
          //将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
          that.setData({
            resposition: resposition,
            condition: false,
            style: 'none',
            show: 'block',
            left: 'light_l',
            right: 'right',
            num: '1',
          });
        }



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

  qutu: function () {
    var page1 = this.data.page1
    console.log(page1)
    var that = this;
    wx.request({
      method: 'GET',
      url: 'https://v.juhe.cn/joke/img/text.php?key=3f603c85f8aa24b1c13abfd8187a798a&page=' + page1 + '&pagesize=20',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data.result.data.holiday)
        // var aa =res.data.result.data.holiday;
        // var bb = JSON.parse(aa);

        var da = res.data.result.data;
        console.log(da)
        if (page1 < 2) {
          app.globalData.luck = da;
          //将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
          that.setData({
            resposition1: da,
            condition: false,
            style: 'none',
            show: 'block',
            left: 'left',
            right: 'light_r',
            num: '2',
          });
        } else {
          var resposition1 = that.data.resposition1;
          for (var i = 0; i < da.length; i++) {
            resposition1.push(da[i]);
          }
          app.globalData.luck = resposition1;
          //将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
          that.setData({
            resposition1: resposition1,
            condition: false,
            style: 'none',
            show: 'block',
            left: 'left',
            right: 'light_r',
            num: '2',
          });
        }

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
  onShow: function () {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
  },
  pullUpLoad: function (e) {
    var that = this
    var _page = this.data.page + 1;
      that.setData({
        page: _page,
      });
      this.xiaohua();
  },
  pullUpLoad1: function (e) {
    var _page = this.data.page1 + 1;
      this.setData({
        page1: _page,

      });
      this.qutu();
  },

  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

})