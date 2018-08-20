
var app = getApp()
Page({
  onShareAppMessage: function (options) {
    var share = JSON.stringify(this.data.luck);
    console.log(share);
    return {
      title: '哈哈哈，不笑你打我！-免费制作电子请柬贺卡',
      desc: '笑话',
      path: '/pages/laohuangli/pages/xhd/xhd?share=' + share 
    }
  },
  data: {
    options: {},
    luck: [],
    hashId: '',
    share: [],
    right: '>'
  },
  onLoad: function (options) {
    if ((options.share).length > 2) {
      var share = JSON.parse(options.share)
      var i = 1;
      var luck = 1;
      console.log(share)
    } else {
      var share = '';
      var i = options.hashId;
      var luck = app.globalData.luck[i];
    }
    console.log(luck)
    console.log(options)
    this.setData({
      luck: luck,
      hashId: i,
      options: options,
      share: share,
    })
  },

  

  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

})