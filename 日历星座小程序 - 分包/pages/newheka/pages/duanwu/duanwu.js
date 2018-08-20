
Page({
  onShareAppMessage: function (options) {
    var nickName = this.data.nickName;
    var avatarUrl = this.data.avatarUrl;
    console.log(nickName)
    if(nickName){
      var title = nickName+'给您送来端午祝福，请查收！'
      var url = '/pages/newheka/pages/duanwu/duanwu?nickName=' + nickName + '&avatarUrl=' + avatarUrl
    }else{
      var title = '我給您送来端午祝福，请查收！'
      var url = '/pages/newheka/pages/duanwu/duanwu'
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
    yinyue:'',
    play:1,
    nickName:'',
    avatarUrl:'',
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
    if (options.nickName){
      this.setData({
        nickName: options.nickName,
        avatarUrl: options.avatarUrl,
      })
    }
    wx.setNavigationBarTitle({//导航栏标题
      title: '端午贺卡'
    })
  },

  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    if (e.detail.userInfo){
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

  audioPlay: function () {
    this.audioCtx.play()
    this.setData({
      yinyue:'',
      play:1,
    })
  },
  audioPause: function () {
    this.audioCtx.pause()
    this.setData({
      yinyue: 1,
      play:2,
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