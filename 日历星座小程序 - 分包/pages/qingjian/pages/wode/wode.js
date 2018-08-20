var app = getApp()
Page({
  data:{
    block:"none",
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    if (app.globalData.userInfo && app.globalData.userInfo != '') {
      console.log(555)
      console.log(app.globalData.userInfo)
      this.setData({
        openid: app.globalData.userInfo[0],
        vip: app.globalData.userInfo[1],
        totime: app.globalData.userInfo[2]
      });
      that.getqingjian(app.globalData.userInfo)
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
            totime: userInfo[2]
          })
        }
        that.getqingjian(userInfo)
      }
    }
  },
  //获取我的请柬
  getqingjian:function(res){
    var openid = res[0]
     var that = this
      wx.request({
        url: 'https://wap.goods100.com/home/rl/qjgr', //仅为示例，并非真实的接口地址
        data: {
          openid: openid ,
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          console.log(res.data)
          if(res.data.length>0){//有制作过请柬
             that.setData({
              information:res.data,
              block:"none",
            })
          }else{//没有制作过请柬
             that.setData({
              information:res.data,
              block:"block",
            })
          }
         
        }
      })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})