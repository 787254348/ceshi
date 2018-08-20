Page({
  onShareAppMessage: function () {
    var options = this.data.options
    var title = options.title
    var img1 = options.img1
    var img2 = options.img2
    var img3 = options.img3
    var date = options.date
    var url ='/pages/toutiao/pages/xq/xq?title='+title+'&img1='+img1+'&img2='+img2+'&img3='+img3+'&date='+date
    console.log(url)
    return {
      title: '今日新鲜事',
      path: url,
    }
  },
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options)
    this.setData({
      options:options
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