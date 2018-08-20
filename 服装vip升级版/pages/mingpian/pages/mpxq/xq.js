var common = require('../../../common/common.js')
var app = getApp()
Page({
  onShareAppMessage: function (res) {
    var uid = this.data.options.scene
    var name = this.data.result.truename
    var username = this.data.result.username
    if(username==name){//如果真名和用户名一样就显示公司名
      var name = this.data.result.company
    }
    console.log(uid)
    var title = "我是"+name+",这是我的名片，请惠存"
    return {
      title: title,
      path: '/pages/mingpian/pages/mpxq/xq?scene=' + uid
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    bc:'none',
    fs:'none',
    dlt:'none',
    sq:'none'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this 
    var storage = wx.getStorageSync('storage')
    var me_uid = storage[0]//本人的id
    console.log(options.scene)
    var uid = decodeURIComponent(options.scene)
    console.log(uid)
    this.setData({
      options:options,
      me_uid:me_uid,
    })
    var options_uid = options.scene//名片的id
    this.getcard()
    if(me_uid==null){//如果是还没注册的新用户就显示授权按钮
      that.setData({
        sq: 'block'
      })
    }else{
      if (options_uid == me_uid) {//是本人的名片就显示修改名片
        that.setData({
          fs: 'block'
        })
      } else {
        this.get_mycard()
      }
    }

   

  },
  //获取名片详情
  getcard:function(){
    var that = this;
    var me_uid = this.data.me_uid//本人id
    var uid = this.data.options.scene//传值过来的id
    var value = wx.getStorageSync("mp_"+uid)
    var totime = value.totime
    var nowtime = new Date() / 1000   //获取当前时间戳
    if (value && totime > nowtime) {//判断名片数据存在缓存且没有过期
      that.setData({
        result:value.result,
        title:value.title
      })
      if(uid==me_uid&&!value.result.card_img){//是本人的名片且没有二维码图片就去生成二维码图片
        that.getcardImg()
      }
      var username = value.result.username
      var truename = value.result.truename
      if (username == truename) {//如果真名和用户名一样就显示公司名
        var BarTitle = value.result.company
      }else{
        var BarTitle = truename
      }
      wx.setNavigationBarTitle({//导航栏标题
        title: BarTitle + '的名片'
      })
      return false
    }
    wx.request({
      url: 'https://wap.goods100.com/home/vipapi/getcard',
      data: {
        userid: uid
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res.data)
        var result = res.data[0][0]
        var title =res.data[1]
        if(title==null){
          var title=""
        }else{
          var title=title.title
        }
        that.setData({
          result:result,
          title:title
        })

        var totime = new Date() / 1000 + 60 * 60 * 24 * 7  //设置缓存30天到期时间
        var obj = {
          result: result,
          title:title,
          totime: totime
        }
        wx.setStorage({//将获取的数组缓存
          key: 'mp_'+result.userid,
          data: obj
        })
        if (uid==me_uid&&!result.card_img) {//是本人的名片且没有二维码图片就去生成二维码图片
          that.getcardImg()
        }
        var username = result.username
        var truename = result.truename
        if (username == truename) {//如果真名和用户名一样就显示公司名
          var BarTitle = result.company
        }else{
          var BarTitle = truename
        }
        wx.setNavigationBarTitle({//导航栏标题
          title: BarTitle + '的名片'
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
  //生成专属自己的二维码图片
  getcardImg:function(){
      var that = this
      var userid = this.data.result.userid
      var value = wx.getStorageSync("mp_" + userid)
      wx.request({
        url: 'https://wap.goods100.com/home/vipapi/getcode',
        data: {
          userid: userid
        },
        method: 'GET',
        success: function (res) {
          value.result['card_img'] = res.data//修改对象里的card_img数据
          wx.setStorage({//修改缓存数据
            key: 'mp_' + userid,
            data: value
          })
          that.setData({
            result:value.result
          })
        },
      })
  },
  //判断该名片是否保存过
  get_mycard: function () {
    var that = this;
    var uid = this.data.me_uid
    var options_uid = this.data.options.scene
    var value = wx.getStorageSync("mpid_" + uid)
    var totime = value.totime
    var nowtime = new Date() / 1000   //获取当前时间戳
    if (value && totime > nowtime) {//判断名片数据存在缓存且没有过期
      var card_id = value.result
      var array = card_id.split(",")
      var ss = common.is_array(array, options_uid)//判断该名片是否保存过
      if (ss) {//保存过该名片,显示删除按钮
        that.setData({
          dlt: "block"
        })
      } else {//没有保存过该名片，显示保存按钮
        that.setData({
          bc: "block",
        })
      }
      return false
    }
    wx.request({
      url: 'https://wap.goods100.com/home/vipapi/getcardId',
      data: {
        userid: uid
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res.data)
        var result = res.data
        var card_id = result.card_id
        var array = card_id.split(",")
        console.log(options_uid)
        var ss = common.is_array(array,options_uid)//判断该名片是否保存过
        if (ss) {//保存过该名片，显示删除按钮
          that.setData({
            dlt:"block"
          })
        } else {//没有保存过该名片，显示保存按钮
          that.setData({
            bc:"block",
          })
        }

        var totime = new Date() / 1000 + 60 * 60 * 24 * 30  //设置缓存30天到期时间
        var obj = {
          result: card_id,
          totime: totime
        }
        wx.setStorage({//将获取的数组缓存
          key: 'mpid_' + uid,
          data: obj
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
  //保存名片
  save:function(e){
    var that = this
    var card_id = e.target.dataset.cid
    var me_uid = this.data.me_uid
    wx.request({
      url: 'https://wap.goods100.com/home/vipapi/savecard',
      data: {
        card_id:card_id,
        me_uid:me_uid
      },
      method:'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
          console.log(res)
          //将返回的名片id数据缓存
          var totime = new Date() / 1000 + 60 * 60 * 24 * 30  //设置缓存30天到期时间
          var obj = {
            result: res.data[1],
            totime: totime
          }
          wx.setStorage({//将获取的数组缓存
            key: 'mpid_' + me_uid,
            data: obj
          })
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '保存成功，在名片夹可查看！',
            complete: function () {
              wx.redirectTo({
                url:'/pages/mingpian/pages/mpj/mpj?uid='+me_uid
              })
            }
          })
         
      }
    })
  },
  //删除名片
  dlt:function(e){
    var that = this
    var card_id = e.target.dataset.cid
    var me_uid = this.data.me_uid
    wx.request({
      url: 'https://wap.goods100.com/home/vipapi/dltcard',
      data: {
        card_id: card_id,
        me_uid: me_uid
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          dlt: 'none'
        })
        //将返回的名片id数据缓存
        var totime = new Date() / 1000 + 60 * 60 * 24 * 30  //设置缓存30天到期时间
        var obj = {
          result: res.data[1],
          totime: totime
        }
        wx.setStorage({//将获取的数组缓存
          key: 'mpid_' + me_uid,
          data: obj
        })
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '删除成功，在名片夹可查看！',
          complete: function () {
            wx.navigateBack({
              delta: 1
            })
          }
        })
        
      },
      fail: function () {

      },
    })
  },

  //重新获取用户信息
  onGotUserInfo: function (e) {
    var that = this
    var userInfo = e.detail.userInfo
    app.globalData.userInfo = userInfo
    wx.login({
      success: function (ress) {
        var code = ress.code
        wx.request({
          method: 'GET',
          url: 'https://wap.goods100.com/home/vipapi/creatUserNew', //接口地址
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
              me_uid:res.data[0],
              bc:'block',
              sq:'none'
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

  //生成带二维码的图片
  canvas: function (e) {
    var result = this.data.result
    const canvasCtx = wx.createCanvasContext('shareCanvas');
    var height = 0
    //绘制背景颜色
    canvasCtx.setFillStyle('#fff');
    canvasCtx.fillRect(0, 0, 375, 355);
    //绘制姓名
    var username = result.username
    var truename = result.truename
    if (username != truename) {//如果真名和用户名不一样就绘制真名
      height += 30
      canvasCtx.setFontSize(20);
      canvasCtx.setFillStyle('#666');
      canvasCtx.setTextAlign('center');
      canvasCtx.fillText(truename, 188, height);
    }
    
    //绘制部门职位
    var job = result.job
    if(job){
      height += 25
      canvasCtx.setFontSize(16);
      canvasCtx.setFillStyle('#666');
      canvasCtx.setTextAlign('center');
      canvasCtx.fillText(job, 188, height);
    }
    
     //绘制公司名称
    var company = result.company
    console.log(company)
    height += 25
    canvasCtx.setFontSize(16);
    canvasCtx.setFillStyle('#666');
    canvasCtx.setTextAlign('center');
    canvasCtx.fillText(company, 188, height);
    //绘制电话
    var mobile = result.mobile
    height += 25
    console.log(height)
    canvasCtx.drawImage('/image/dianhua.png', 10, height - 15, 20, 20);
    canvasCtx.setFontSize(16);
    canvasCtx.setFillStyle('#666');
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText(mobile, 35, height);
    //绘制邮箱
    var email = result.email
    height += 25
    console.log(height)
    canvasCtx.drawImage('/image/youxiang.png', 10, height - 15, 20, 20);
    canvasCtx.setFontSize(16);
    canvasCtx.setFillStyle('#666');
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText(email, 35, height);
    //绘制地址
    var address = result.address
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
    if (title) {
      console.log(666)
      var tl = '主营业务：' + title
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
    var card_img = result.card_img
    wx.getImageInfo({//把网络图片生成为本地图片，再绘制图片
      src: card_img,
      success: function (res) {
        var url = res.path
        canvasCtx.drawImage(url, 143, height, 100, 100);
        //绘制二维码下方文字
        canvasCtx.setFontSize(10);
        canvasCtx.setFillStyle('#009933');
        canvasCtx.setTextAlign('left');
        canvasCtx.fillText("长按识别二维码了解我的工作", 126, height + 125);
        //绘制整个图片的外边框
        console.log(height)
        canvasCtx.setLineWidth(4)
        canvasCtx.setStrokeStyle('#bbb')
        canvasCtx.strokeRect(4, 4, 367, 347)
        canvasCtx.draw();
      }
    })
    //canvasCtx.draw();
    //canvasCtx.drawImage(card_img, 10, 100, 100, 100);
    //console.log(card_img)


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