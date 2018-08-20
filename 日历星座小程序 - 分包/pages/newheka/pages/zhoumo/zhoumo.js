var network = require("../../../common/request.js")
var app = getApp()
Page({
  onShareAppMessage: function (options) {
    var nickName = this.data.nickName;
    var avatarUrl = this.data.avatarUrl;
    var vip = this.data.vip  //用户自己的vip等级数字0为不去广告1为去广告
    if (nickName) {
      var title = nickName + '给您送来周末祝福，请查收！'
      var url = '/pages/newheka/pages/zhoumo/zhoumo?nickName=' + nickName + '&avatarUrl=' + avatarUrl + '&v=' + vip
    } else {
      var title = '我給您送来周末祝福，请查收！'
      var url = '/pages/newheka/pages/zhoumo/zhoumo?v=' + vip
    }
    return {
      title: title,
      desc: '电子贺卡',
      path: url,
      success: function (res) {
      },
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    yinyue: '',
    play: 1,
    nickName: '',
    avatarUrl: '',
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
    this.setData({
      options: options
    })
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
    if (options.nickName) {
      this.setData({
        nickName: options.nickName,
        avatarUrl: options.avatarUrl,
      })
    }
    wx.setNavigationBarTitle({//导航栏标题
      title: '周末祝福贺卡'
    })
  },

  bindGetUserInfo: function (e) {
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

  heka: function (e) {
    var fId = e.detail.formId;
    var openid = e.detail.value.openid;
    var data = {
      fId: fId,
      openid: openid,
    }
    network.requestFid(data, function (res) {//保存发送模板消息用的fId数据
    })
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