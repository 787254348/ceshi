// pages/tabBar/qingjian/qingjian.js
var app = getApp()
Page({

  onShareAppMessage: function (options) {
    return {
      title: '电子请柬-免费制作电子请柬贺卡，微喜帖微贺卡',
      desc: '电子请柬',
      path: '/pages/tabBar/qingjian/qingjian' 
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    //select:4,
    img: [
      'https://wap.goods100.com/qingjian/slt/jiehun3.gif',
      'https://wap.goods100.com/qingjian/slt/jiehun2.gif',
      'https://wap.goods100.com/qingjian/slt/jiehun1.gif',
      'https://wap.goods100.com/qingjian/slt/m1.jpg',
      'https://wap.goods100.com/qingjian/slt/m2.jpg',
      'https://wap.goods100.com/qingjian/slt/m3.jpg',
      'https://wap.goods100.com/qingjian/slt/q1.jpg',
      'https://wap.goods100.com/qingjian/slt/q2.png',
      'https://wap.goods100.com/qingjian/slt/q3.jpg',
      'https://wap.goods100.com/qingjian/slt/h1.jpg',
      'https://wap.goods100.com/qingjian/slt/h2.jpg',
      'https://wap.goods100.com/qingjian/slt/h3.jpg',
      'https://wap.goods100.com/qingjian/slt/h4.jpg',
      'https://wap.goods100.com/qingjian/slt/h5.jpg',
      'https://wap.goods100.com/qingjian/slt/h6.jpg',
      'https://wap.goods100.com/qingjian/slt/s1.jpg',
      'https://wap.goods100.com/qingjian/slt/s2.jpg',
      'https://wap.goods100.com/qingjian/slt/s3.jpg',
      'https://wap.goods100.com/qingjian/slt/b1.jpg',
      'https://wap.goods100.com/qingjian/slt/b2.jpg',
      'https://wap.goods100.com/qingjian/slt/b3.jpg',
      'https://wap.goods100.com/qingjian/slt/bir2.jpg',
      'https://wap.goods100.com/qingjian/slt/bir3.jpg',
      'https://wap.goods100.com/qingjian/slt/bir4.jpg',
      'https://wap.goods100.com/qingjian/slt/jiehun1.jpg',
      'https://wap.goods100.com/qingjian/slt/jiehun2.jpg',
      'https://wap.goods100.com/qingjian/slt/jiehun3.jpg',
      'https://wap.goods100.com/qingjian/slt/qiaoqian1.jpg',
      'https://wap.goods100.com/qingjian/slt/qiaoqian2.jpg',
      'https://wap.goods100.com/qingjian/slt/qiaoqian3.jpg',
      'https://wap.goods100.com/qingjian/slt/tongxue1.jpg',
      'https://wap.goods100.com/qingjian/slt/tongxue2.jpg',
      'https://wap.goods100.com/qingjian/slt/tongxue3.jpg',
      'https://wap.goods100.com/qingjian/slt/shengri1.jpg',
      'https://wap.goods100.com/qingjian/slt/shengri2.jpg',
      'https://wap.goods100.com/qingjian/slt/shengri3.jpg',
      'https://wap.goods100.com/qingjian/slt/manyue1.jpg',
      'https://wap.goods100.com/qingjian/slt/manyue2.jpg',
      'https://wap.goods100.com/qingjian/slt/bairi1.jpg',
      'https://wap.goods100.com/qingjian/slt/bairi2.jpg',
      'https://wap.goods100.com/qingjian/slt/kaiye1.jpg',
      'https://wap.goods100.com/qingjian/slt/shangwu1.jpg',
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  binderrorimg: function (e) {
    var errorImgIndex = e.target.dataset.errorimg 
    var image = 'img[' + errorImgIndex + ']'
    this.setData({
      [image]: '/i/m.jpg'
    }) //修改数据源对应的数据
  },
  select:function(e){
    var a = e.target.dataset.name
    app.globalData.select = a
    this.setData({
      select:a,
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.userInfo && app.globalData.userInfo != '') {
      console.log(555)
      console.log(app.globalData.userInfo)
      this.setData({
        openid: app.globalData.userInfo[0],
        vip: app.globalData.userInfo[1],
      });
    } else {
      console.log(666)
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoCallback = userInfo => {
        console.log(userInfo)
        if (userInfo != '') {
          this.setData({
            openid: userInfo[0],
            vip: userInfo[1],
          })
        }
      }
    }
    this.setData({
      select: app.globalData.select
    })
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

  /**
   * 用户点击右上角分享
   */
 
})