Page({
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '今日新鲜事',
      path: '/pages/toutiao/pages/liebiao/liebiao'
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    ty:'top',
    num:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          clientHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
    var tarrHight = [];
    var arr = [];
    for (var i = 0; i < 30; i++) {
      if (i < 2) {
        arr[i] = true;
      } else {
        arr[i] = false;
      }
      tarrHight[i] = i * 250;
    }
    this.setData({
      arr: arr,
      arrHight: tarrHight
    })
    this.getNews() 
  },

  charge:function(e){//点击分类导航
      var ty = e.target.dataset.name
      var num = e.target.dataset.num
      var arr = [];
      for (var i = 0; i < 30; i++) {
        if (i < 2) {
          arr[i] = true;
        } else {
          arr[i] = false;
        }
      }
      this.setData({
        ty:ty,
        num:num,
        arr: arr,
      })
      this.getNews()
  },

  getNews:function(){
    var that = this
    var ty = this.data.ty
    wx.request({
      url: 'https://v.juhe.cn/toutiao/index?type='+ty+'&key=1eac5a9960d9c08c800e55da0024249a',
      success: function (res) {
        console.log(res)
        var result = res.data.result.data
        console.log(result)
        that.setData({
          result: result
        })
      }
    })
  },

  scroll: function (e) {//下拉图片懒加载
      var seeHeight = this.data.clientHeight; //可见区域高度  
      var arrHight = this.data.arrHight;
      var scrollTop = e.detail.scrollTop;
      var arr = this.data.arr;
      for (var i = 0; i < 30; i++) {
        if (arrHight[i] < scrollTop + 250) {
          if (arr[i] == false) {
            arr[i] = true;
          }
        }
      }
      this.setData({
        arr: arr,
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