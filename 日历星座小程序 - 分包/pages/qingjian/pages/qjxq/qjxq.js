var CN_Date = require('../../../common/getCNDate.js');
var app = getApp()
Page({
  onShareAppMessage: function (options) {
    var id = this.data.options.id;
    var templet = this.data.options.templet;
    var cate_id = this.data.options.cate_id;
    var BarTitle = this.data.BarTitle;
    var yname = this.data.item.good.yname;
    var xname = this.data.item.good.xname;
    var bname = this.data.item.good.bname;
    var tname = this.data.item.good.tname;
    var ytitle = this.data.item.good.ytitle;
    var vip = this.data.vip;
    // var img = this.data.img[0];
    // console.log(img)
    return {
      title: BarTitle +"-恭候您的光临",
      desc: '电子请柬',
      path: '/pages/qingjian/pages/qjxq/qjxq?id=' + id + '&xname=' + xname + '&templet=' + templet + '&cate_id=' + cate_id + '&yname=' + yname + '&bname=' + bname + '&tname=' + tname + '&ytitle=' + ytitle + '&share=1' + '&v=' + vip,
      // imageUrl:img
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    yinyue: '',
    play: 1,
    b: '',
    n: '',
    item: {
      opacity: 1,
    },
    index: 0,
    animationData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      options: options,
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
    console.log(options.t)
    if(options.t==0&&options.v==0){//t等于0说明从制作页跳转过来的且vip等于0才提示去升级会员
      setTimeout(function () {//延迟4秒钟弹出提示框
        wx.showModal({
          title: '提示',
          content: '恭喜主人，在这喜庆之日，您可升级电子请柬贺卡会员免广告。',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.navigateTo({
                url: '/pages/pay/pages/pay/pay',
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },2000);
    }
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
    //判断是否存在缓存
    console.log(options.id)
    var value = wx.getStorageSync(options.id)
    if (value) {
      that.getStorage(options)
    } else {
      that.qingjian(options)
    }
    //

    var cate_id = this.data.options.cate_id;
    console.log(cate_id)
    switch (cate_id) {//设置导航栏标题
      case "1"://结婚请柬
        var yname = this.data.options.yname;
        var xname = this.data.options.xname;
        var BarTitle = yname + "与" + xname + "结婚宴请您-请帖"
        wx.setNavigationBarTitle({//导航栏标题
          title: BarTitle
        })
        that.setData({
          BarTitle: BarTitle,
        })
        break;
      case "2"://满月请柬
        var bname = this.data.options.bname;
        var BarTitle = bname + "小宝宝满月宴请您-请帖"
        wx.setNavigationBarTitle({//导航栏标题
          title: BarTitle
        })
        that.setData({
          BarTitle: BarTitle,
        })
        break;
      case "3"://乔迁新房请柬
        var tname = this.data.options.tname;
        var BarTitle = tname + "新居入屋宴请您-请帖"
        wx.setNavigationBarTitle({//导航栏标题
          title: BarTitle
        })
        that.setData({
          BarTitle: BarTitle,
        })
        break;
      case "4"://同学、商务请柬
        var ytitle = this.data.options.ytitle;
        var BarTitle = ytitle + "活动宴席-邀请函"
        wx.setNavigationBarTitle({//导航栏标题
          title: BarTitle
        })
        that.setData({
          BarTitle: BarTitle,
        })
        break;
      case "5"://升学宴请柬
        var bname = this.data.options.bname;
        var BarTitle = '祝贺'+bname + "金榜题名-请帖"
        wx.setNavigationBarTitle({//导航栏标题
          title: BarTitle
        })
        that.setData({
          BarTitle: BarTitle,
        })
        break;
      case "6"://百日宴请柬
        var bname = this.data.options.bname;
        var BarTitle = bname + "小宝宝百日宴请您-请帖"
        wx.setNavigationBarTitle({//导航栏标题
          title: BarTitle
        })
        that.setData({
          BarTitle: BarTitle,
        })
        break;
      case "7"://生日请柬
        var bname = this.data.options.bname;
        var BarTitle = bname + "生日宴请您-请帖"
        wx.setNavigationBarTitle({//导航栏标题
          title: BarTitle
        })
        that.setData({
          BarTitle: BarTitle,
        })
        break;
      case "8"://庆灯宴席请柬
        var bname = this.data.options.bname;
        var BarTitle = bname + "小宝宝的庆灯宴席-请帖"
        wx.setNavigationBarTitle({//导航栏标题
          title: BarTitle
        })
        that.setData({
          BarTitle: BarTitle,
        })
        break;
    }
  },

  getStorage: function (options) {
    var that = this
    var id = options.id
    wx.getStorage({//获取缓存数据
      key: id,
      success: function (res) {
        console.log(res.data)
        var good = res.data
        that.setData({
          item: {
            yinli: good.yinli,
            good: good.good,
            week: good.week,
          },
          img: good.img,
          length: good.length,
          music: good.good.music
        })
      }
    })
  },

  qingjian: function (options) {
    var that = this
    var id = options.id
    wx.request({
      url: 'https://wap.goods100.com/home/rl/getdata', //接口地址
      data: {
        id: id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        var img1 = res.data.img1
        var img2 = res.data.img2
        var img3 = res.data.imgurl
        var img4 = img1 + ',' + img2 + ',' + img3
        var imgarray = img4.split(",")
        var good = res.data
        var date = good.date
        //获取星期
        var day = new Date(good.date).getDay()
        switch (day) {
          case 0:
            var text = "星期日";
            console.log(text)
            break;
          case 1:
            var text = "星期一";
            console.log(text)
            break;
          case 2:
            var text = "星期二";
            console.log(text)
            break;
          case 3:
            var text = "星期三";
            console.log(text)
            break;
          case 4:
            var text = "星期四";
            console.log(text)
            break;
          case 5:
            var text = "星期五";
            console.log(text)
            break;
          case 6:
            var text = "星期六";
            console.log(text)
            break;
        }
        //
        var D = date.split("-")
        var yinli = CN_Date(D[0], D[1], D[2])//获取农历时间
        that.setData({
          item: {
            yinli: yinli,
            good: good,
            week: text,
          },
          img: imgarray,
          length: imgarray.length - 2,
          music: good.music
        })
        //缓存获取到的数据
        var obj = {
          good: good,
          yinli: yinli,
          img: imgarray,
          week: text,
          length: imgarray.length - 2,
        }
        wx.setStorage({
          key: good.itemid,
          data: obj
        })
        console.log(obj)
        //
      }
    })
  },
  binderrorimg: function (e) {
    var errorImgIndex = e.target.dataset.errorimg
    var image = 'img[' + errorImgIndex + ']'
    this.setData({
      [image]: '/i/m.jpg'
    }) //修改数据源对应的数据
  },
  handleTouchStart: function (e) {
    var startY = e.changedTouches[0].clientY;
    this.setData({
      startY: startY
    })
  },
  handleTouchEnd: function (e) {//上下滑动翻转图片
    var that = this
    var endY = e.changedTouches[0].clientY;
    var startY = this.data.startY
    var index = this.data.index
    var length = this.data.length
    console.log(endY - startY)
    if (endY - startY > 0) {
      var num = index - 1
      if (num < 0) {
        var num = length
      }
      that.setData({
        index: num
      })
    } else if (endY - startY < 0) {
      var num = index + 1
      if (num > length) {
        var num = 0
      }
      that.setData({
        index: num
      })
    }
  },
  audioPlay: function () {
    this.audioCtx.play()
    this.setData({
      yinyue: '',
      play: 1,
    })
  },
  audioPause: function () {
    this.audioCtx.pause()
    this.setData({
      yinyue: 1,
      play: 2,
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
    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 1500,
      timingFunction: "ease-in-out",
      delay: 0
    })
    setTimeout(function () {
      animation.translate(0, -30).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 1000)
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