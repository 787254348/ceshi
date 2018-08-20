Page({
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var word = this.data.options.word
    var url = '/pages/huoxing/pages/hxfx/hxfx?word=' + word 
    var title = '火星文，谁认识的算我输'
    return {
      title: title,
      path: url,
      success: function (res) {

      },
      fail: function (res) {

      }
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.huoxing(options)
    this.setData({
      options:options
    })
  },

  //点击查询按钮查询
  formSubmit:function(e){
    var that = this
    var text = e.detail.value.word.trim()
    if(!text){
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: "请输入您要查询的文字，不能为空！",
        complete: function () {
        }
      })
      return false
    }
    wx.navigateTo({
      url: "/pages/huoxing/pages/hx/hx?word=" + text
    })
  },

  
   //获取火星文
  huoxing: function (options) {
    var that = this
    var text = options.word
    wx.request({
      method: 'GET',
      url: 'https://japi.juhe.cn/charconvert/change.from?text=' + text + '&type=2&key=ea58b4225e0db75f6f63d5f3a6d4fba3',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          huoxing: res.data.outstr,
          word: text,
        })

      },

      fail: function () {

      }
    })
  },

  //绘制带二维码图片
  save: function (e) {
    var content = this.data.huoxing
    var title = '猜猜以下火星文讲什么'
    const canvasCtx = wx.createCanvasContext('shareCanvas');
    var color = "#00688B"
    //绘制背景颜色
    canvasCtx.setFillStyle('#fff');
    canvasCtx.fillRect(0, 0, 320, 380);
    //绘制博士帽图标
    canvasCtx.setFontSize(60);
    canvasCtx.setFillStyle(color);
    canvasCtx.setTextAlign('center');
    canvasCtx.fillText('🎓', 160, 75);
    //绘制标题
    canvasCtx.setFontSize(24);
    canvasCtx.setFillStyle(color);
    canvasCtx.setTextAlign('center');
    canvasCtx.fillText(title, 160, 120);
    //绘制火星文/繁体内容并分割每行16个字
    let contentArray = [];
    var length = content.length / 16
    var length = Math.ceil(length)//向上取整
    var length = length < 6 ? length : 6
    console.log(length)
    for (let i = 0; i < length; i++) {//截取内容不超过6行
      if (i == length - 1) {//最后一行加省略号
        contentArray.push(content.substr(i * 16, 15) + '...');
      } else {
        contentArray.push(content.substr(i * 16, 16));
      }
    }
    var yOffset = 150
    contentArray.forEach(function (value) {
      canvasCtx.setFontSize(18);
      canvasCtx.setFillStyle(color);
      canvasCtx.setTextAlign('left');
      canvasCtx.fillText(value, 20, yOffset, 280);
      yOffset += 25;
    });
    console.log(yOffset)
    //绘制二维码上面的横线
    canvasCtx.beginPath()
    canvasCtx.setLineWidth(4)
    canvasCtx.setStrokeStyle('#eee')
    canvasCtx.moveTo(0, 295)
    canvasCtx.lineTo(320, 295)
    canvasCtx.stroke()
    //绘制火星文/繁体转换文字
    canvasCtx.setFontSize(16);
    canvasCtx.setFillStyle(color);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText('火星大本营👉', 90, 330);
    //绘制二维码
    canvasCtx.drawImage('/i/huoxing.jpg', 240, 305, 60, 60);
    //绘制扫码提示文字
    canvasCtx.setFontSize(12);
    canvasCtx.setFillStyle(color);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText('长按识别二维码更多精彩', 90, 350);
    canvasCtx.setLineWidth(8)
    canvasCtx.setStrokeStyle('#00bab8')
    canvasCtx.strokeRect(4, 4, 312, 372)
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
              console.log(res)
            }
          })
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }, 1000);
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