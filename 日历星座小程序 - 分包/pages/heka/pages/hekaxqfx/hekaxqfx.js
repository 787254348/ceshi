var app = getApp()
Page({
  onShareAppMessage: function (options) {
    var title = this.data.options.title;
    var music = this.data.options.music;
    var img = this.data.img;
    var name = this.data.options.name;
    var BarTitle = this.data.options.BarTitle;
    var nickName = this.data.nickName;
    var avatarUrl = this.data.avatarUrl;
    var vip = this.data.vip  //用户自己的vip等级数字0为不去广告1为去广告
    if (nickName) {
      var t = nickName + '给您送来' + name + '祝福，请查收！';
      var path = '/pages/heka/pages/hekaxqfx/hekaxqfx?title=' + title + '&music=' + music + '&img=' + img + '&name=' + name + '&BarTitle=' + BarTitle + '&nickName=' + nickName + '&avatarUrl=' + avatarUrl + '&v=' + vip
    } else {
      var t = '我给您送来' + name + '祝福，请查收！';
      var path = '/pages/heka/pages/hekaxqfx/hekaxqfx?title=' + title + '&music=' + music + '&img=' + img + '&name=' + name + '&BarTitle=' + BarTitle + '&v=' + vip
    }
    return {
      title: t,
      desc: '电子贺卡',
      path: path,
      success: function (res) {
      },
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    yinyue: '',
    play: 1,
    item: {
      b: '',
      c: 'none',
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
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
      img: options.img
    })
    if (options.nickName) {
      this.setData({
        nickName: options.nickName,
        avatarUrl: options.avatarUrl,
      })
    }
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })

    var name = this.data.options.BarTitle;
    wx.setNavigationBarTitle({//导航栏标题
      title: name
    })

  },

  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      this.setData({
        avatarUrl: e.detail.userInfo.avatarUrl,
        nickName: e.detail.userInfo.nickName,
        item: {
          b: 'back',
          c: 'block',
          tt: "制作成功,可以送祝福给好友了"
        },
      })
    }
  },

  charge: function () {
    this.setData({
      item: {
        b: '',
        c: 'none',
      },
    });
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },

  binderrorimg: function (e) {//图片加载错误默认图片函数
    this.setData({
      img: '/i/m.jpg'
    }) //修改数据源对应的数据
  },

  audioPlay: function () {
    this.audioCtx.play()
    this.setData({
      yinyue: '',
      play: 1,
    })
  },
  audioPause: function () {
    this.audioCtx.pause()
    this.setData({
      yinyue: 1,
      play: 2,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio')
    this.audioCtx.play()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },


})