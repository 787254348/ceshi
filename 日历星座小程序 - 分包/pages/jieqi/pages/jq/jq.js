var network = require("../../../common/request.js")
var app = getApp()
Page({
  onShareAppMessage: function (options) {
    var options = this.data.options
    var title = options.title
    var date = options.date
    var introduce = options.introduce
    var content = options.content
    var img = options.img
    var vip = this.data.vip  //用户自己的vip等级数字0为不去广告1为去广告
    var bt = '今日' + title + '-送您一份节气文化保健提示'
    var url = '/pages/jieqi/pages/jq/jq?content=' + content + '&img=' + img + '&title=' + title + '&date=' + date + '&introduce=' + introduce + '&v=' + vip
    console.log(url)
    return {
      title: bt,
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
        options:options
    })
    var BarTitle = '今日'+options.title+'-节气文化保健提示'
    wx.setNavigationBarTitle({//导航栏标题
      title: BarTitle
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
     
     //把网络图片下载到本地用做绘图用
    wx.getImageInfo({
      src: options.img,
      success: function (res) {
        that.setData({
          url:res.path
        })
      }
    })
  },

  //保存图片
  save:function(e){
    var that = this
    var options = this.data.options
    var title = '['+options.title+']'//传值过来的节气名称
    var date = options.date//节气时间
    var introduce = options.introduce //节气简介
    var content = options.content //节气内容
    const canvasCtx = wx.createCanvasContext('shareCanvas');
    //绘制背景颜色
    canvasCtx.setFillStyle('#FDF5E6');
    canvasCtx.fillRect(0, 0, 360, 660);
    //绘制左边的线
    canvasCtx.beginPath()
    canvasCtx.setLineWidth(1)
    canvasCtx.setStrokeStyle('#ccc')
    canvasCtx.moveTo(10, 40)
    canvasCtx.lineTo(80, 40)
    canvasCtx.stroke()
    //绘制左边的点
    canvasCtx.setFontSize(30);
    canvasCtx.setFillStyle('#00bab8');
    canvasCtx.setTextAlign('center');
    canvasCtx.fillText(".", 90, 42);
    //绘制中间的文字
    canvasCtx.setFontSize(16);
    canvasCtx.setFillStyle('#00bab8');
    canvasCtx.setTextAlign('center');
    canvasCtx.fillText("中国传统二十四节气", 176, 45);
    //绘制右边的点
    canvasCtx.setFontSize(30);
    canvasCtx.setFillStyle('#00bab8');
    canvasCtx.setTextAlign('center');
    canvasCtx.fillText(".", 260, 42);
    //绘制右边的线
    canvasCtx.beginPath()
    canvasCtx.setLineWidth(1)
    canvasCtx.setStrokeStyle('#ccc')
    canvasCtx.moveTo(270, 40)
    canvasCtx.lineTo(350, 40)
    canvasCtx.stroke()
    //绘制节气名称
    canvasCtx.setFontSize(65);
    canvasCtx.setFillStyle('#2F4F4F');
    canvasCtx.setTextAlign('center');
    canvasCtx.fillText(title, 175, 120);
  
    
    //绘制节气内容文字
    var goodsTitle = content
    let goodsTitleArray = [];
    //分割节气内容文字,每行22个
    for (let i = 0; i < goodsTitle.length / 22; i++) {
      goodsTitleArray.push(goodsTitle.substr(i * 22, 22));
    }
    var yOffset = 155
    goodsTitleArray.forEach(function (value) {
      canvasCtx.setFontSize(15);
      canvasCtx.setFillStyle('#8B814C');
      canvasCtx.setTextAlign('center');
      canvasCtx.fillText(value, 180, yOffset);
      yOffset += 25;
    });
    console.log(yOffset)
    //绘制节气图片
    var url= this.data.url
    canvasCtx.drawImage(url, 10, yOffset-10, 337.5, 292);
    //绘制扫码提示文字
    canvasCtx.setFontSize(12);
    canvasCtx.setFillStyle('#666');
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText('👈', 95, yOffset + 362);
    canvasCtx.fillText('扫码了解更多', 110, yOffset + 362);
    //绘制二维码
    canvasCtx.drawImage('/i/heka.jpg', 10, yOffset + 287, 80, 80);
    //绘制节气简介
    canvasCtx.setFontSize(20);
    canvasCtx.setFillStyle('#00bab8');
    canvasCtx.setTextAlign('right');
    canvasCtx.fillText(introduce, 350, yOffset + 322);
    //绘制节气时间
    canvasCtx.setFontSize(13);
    canvasCtx.setFillStyle('#666');
    canvasCtx.setTextAlign('right');
    canvasCtx.fillText(date, 350, yOffset + 362);
    canvasCtx.draw();
    
    setTimeout(function () {//设置一秒的延时任务，等绘图完成再保存图片到相册
      wx.canvasToTempFilePath({
        canvasId: 'shareCanvas',
        success: function (res) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              wx.showModal({
                title: '提示',
                showCancel: false,
                content: "已保存到相册！立即去发朋友圈",
                complete: function () {
                }
              })
            },
            fail(res) {

            }
          })
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }, 1000);

    var fId = e.detail.formId;
    var openid = e.detail.value.openid;
    var data = {
      fId: fId,
      openid: openid,
    }
    network.requestFid(data, function (res) {//保存发送模板消息用的fId数据
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