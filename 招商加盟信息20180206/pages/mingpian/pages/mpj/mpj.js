Page({
  
  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this 
    var storage = wx.getStorageSync('storage')
    var me_uid = storage[0]//本人的id
    this.setData({
      me_uid:me_uid,
    })
    
  },
    
  getcard:function(){
    var that = this;
    var uid = this.data.me_uid
    wx.request({
      url: 'https://wap.goods100.com/home/zsapi/getmycard',
      data: {
        userid: uid
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res.data)
        var result = res.data
        that.setData({
          my_card:res.data[0],
          other_card:res.data[1],
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
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
    this.getcard()
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