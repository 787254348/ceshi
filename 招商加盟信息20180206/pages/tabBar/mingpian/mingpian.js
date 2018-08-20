var app = getApp()
Page({
  onShareAppMessage: function (options) {
    var ty = options.from
    console.log(ty)
    if(ty=="menu"){
      return {
        title: "制作个人专属名片，抓住小程序商机！",
        path: 'pages/tabBar/mingpian/mingpian'
      }
    }else{
      var uid = this.data.userid
      var name = this.data.name
      var title = "我是" + name + ",这是我的名片，请惠存"
      return {
        title: title,
        path: '/pages/mingpian/pages/mpxq/xq?scene=' + uid
      }
    }
    
  },

  /**
   * 页面的初始数据
   */
  data: {
    xq:'none',
    zb:'none',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
   
  },
    
  getcard:function(res){
    var that = this;
    wx.request({
      url: 'https://wap.goods100.com/home/zsapi/getcard',
      data: {
        userid: res.data[0]
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res.data)
        var result = res.data[0][0]
        var title = res.data[1]
        if (title == null) {
          var title = ""
        } else {
          var title = title.title
        }
        
        if(result.job){
          that.setData({
            result: result,
            card_img:result.card_img,
            name: result.truename,
            company: result.company,
            job: result.job,
            mobile: result.mobile,
            email: result.email,
            address: result.address,
            content: result.content,
            title:title,
            xq:"block",
            zb:"none"
          })
          if (!result.card_img) {
            that.getCardImg()
          }
        }else{
          that.setData({
            zb:"block",
            xq:"none"
          })
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  getCardImg: function () {
      var that = this
      var uid = this.data.userid
      console.log(uid)
      wx.request({
        url: 'https://wap.goods100.com/home/zsapi/getcode',
        data: {
          userid: uid
        },
        method: 'GET',
        success: function (res) {
          console.log(res.data)
          that.setData({
            card_img:res.data
          })
        },
      })
  },

  tishi:function(){
    wx.showModal({
      title: '提示',
      showCancel: false,
      content: '请点击下方按钮授权制作名片！',
      complete: function () {

      }
    })
  },

  onGotUserInfo: function (e) {//重新获取用户信息
    var that = this
    var userInfo = e.detail.userInfo
    app.globalData.userInfo = userInfo
    wx.login({
      success: function (ress) {
        var code = ress.code
        wx.request({
          method: 'GET',
          url: 'https://wap.goods100.com/home/zsapi/creatUserNew', //接口地址
          data: {
            userinfo: userInfo,
            code: code,
            nickName: userInfo.nickName,
            sex: userInfo.gender,
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res)
            that.setData({
              userid: res.data[0],
              openid: res.data[1],
              groupid: res.data[2],
              username: res.data[3],
            })
            wx.setStorage({
              key: "storage",
              data: res.data
            })
          }
        })
      }
    })
  },

  save: function (e) {
    const canvasCtx = wx.createCanvasContext('shareCanvas');
    var height = 0
    //绘制背景颜色
    canvasCtx.setFillStyle('#fff');
    //canvasCtx.setShadow(2, 2, 5, '#aaa')
    canvasCtx.fillRect(0, 0, 375, 355);
    //绘制姓名
    var name = this.data.name
    height += 30
    canvasCtx.setFontSize(20);
    canvasCtx.setFillStyle('#35495e');
    canvasCtx.setTextAlign('center');
    canvasCtx.fillText(name, 188, height);
    //绘制部门职位
    var job = this.data.job
    height += 25
    canvasCtx.setFontSize(16);
    canvasCtx.setFillStyle('#666');
    canvasCtx.setTextAlign('center');
    canvasCtx.fillText(job, 188, height);
    //绘制公司名称
    var company = this.data.company
    height += 25
    canvasCtx.setFontSize(16);
    canvasCtx.setFillStyle('#666');
    canvasCtx.setTextAlign('center');
    canvasCtx.fillText(company, 188, height);
    //绘制电话
    var mobile = this.data.mobile
    height += 25
    console.log(height)
    canvasCtx.drawImage('/image/dianhua.png', 10, height-15, 20, 20);
    canvasCtx.setFontSize(16);
    canvasCtx.setFillStyle('#666');
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText(mobile, 35, height);
    //绘制邮箱
    var email = this.data.email
    height += 25
    console.log(height)
    canvasCtx.drawImage('/image/youxiang.png', 10, height - 15, 20, 20);
    canvasCtx.setFontSize(16);
    canvasCtx.setFillStyle('#666');
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText(email, 35, height);
    //绘制地址
    var address = this.data.address
    height += 25
    console.log(height)
    canvasCtx.drawImage('/image/dizhi.png', 10, height - 15, 20, 20);
    canvasCtx.setFontSize(16);
    canvasCtx.setFillStyle('#666');
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText(address, 35, height);
    //绘制主营业务
    var title = this.data.title
    console.log(title)
    height += 25
    if(title){
      console.log(666)
      var tl = '主营业务：'+title
      console.log(height)
      canvasCtx.setFontSize(16);
      canvasCtx.setFillStyle('#009933');
      canvasCtx.setTextAlign('left');
      canvasCtx.fillText(tl, 10, height);
    }
    //绘制下划线
    height += 10
    canvasCtx.beginPath()
    canvasCtx.setLineWidth(4)
    canvasCtx.setStrokeStyle('#009933')
    canvasCtx.moveTo(10, height)
    canvasCtx.lineTo(360, height)
    canvasCtx.stroke()
    //绘制二维码外边框
    height += 10
    canvasCtx.setLineWidth(2)
    canvasCtx.setStrokeStyle('#009933')
    canvasCtx.strokeRect(138, height, 110, 110)
    //绘制二维码
    height += 5
    var card_img = this.data.card_img
    wx.getImageInfo({//把网络图片生成为本地图片，再绘制图片
      src: card_img,
      success: function (res) {
        var url = res.path
        canvasCtx.drawImage(url, 143, height, 100, 100);
        //绘制二维码下方文字
        canvasCtx.setFontSize(10);
        canvasCtx.setFillStyle('#009933');
        canvasCtx.setTextAlign('left');
        canvasCtx.fillText("长按识别二维码了解我的工作", 126, height+125);
        //绘制整个图片的外边框
        console.log(height)
        canvasCtx.setLineWidth(4)
        canvasCtx.setStrokeStyle('#bbb')
        canvasCtx.strokeRect(4, 4, 367, 347)
        canvasCtx.draw();
      }
    })

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
                content: "保存成功!可将图片分享到朋友圈",
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
    var that = this
    if (!app.globalData.uid) {
      wx.login({
        success: function (ress) {
          wx.request({
            method: 'GET',
            url: 'https://wap.goods100.com/home/zsapi/creatUserNew', //接口地址
            data: {
              code: ress.code,
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data)
              app.globalData.uid = res.data[0]
              if (res.data[0] != null) {
                that.setData({
                  userid: res.data[0],
                })
                that.getcard(res);
              } else {
                that.setData({
                  zb: 'block'
                })
              }
            }
          })
        }
      })
    }else{
      wx.getStorage({
        key: 'storage',
        success: function (res) {
          console.log(res.data);
          if(res.data[0]!=null){
            that.setData({
              userid: res.data[0],
            })
            that.getcard(res);
          }else{
            that.setData({
              zb:'block'
            })
          }
          
        }
      })
    }
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