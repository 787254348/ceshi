var app = getApp()
Page({
  onShareAppMessage: function (options) {
    var title = this.data.options.title;
    var id = this.data.options.id;
    var templet = this.data.options.templet;
    var cate_id = this.data.options.cate_id;
    return {
      title: title +'-免费制作电子请柬贺卡，微喜帖微贺卡',
      desc: '电子请柬',
      path: '/pages/qingjian/pages/qj/qj?title=' + title + '&id=' + id + '&templet=' + templet + '&cate_id=' + cate_id,
      success: function (res) {
      },
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    date: '2018-02-14',
    time: '12:00',
    a: [],
    imgUrl1: '',
    status: 1,
    radioCheckVal: '爱子',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      options: options,
    })
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
    var name = this.data.options.title;
    wx.setNavigationBarTitle({//导航栏标题
      title: name
    })
    if (app.globalData.userInfo && app.globalData.userInfo != '') {
      console.log(555)
      console.log(app.globalData.userInfo)
      this.setData({
        openid: app.globalData.userInfo[0],
        vip: app.globalData.userInfo[1],
      });
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
          })
        }
      }
    }
  },
  //日期选择器
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  //时间选择器
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  //性别选择器
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail)
    this.setData({
      radioCheckVal: e.detail.value
    })
  },
  //图片上传
  chooseimage: function () {
    var _this = this;
    var l = _this.data.a
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: 'https://wap.goods100.com/home/rl/uploads', //图片上传接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (ress) {
            console.log("res.tempFilePaths:", res.tempFilePaths)
            var data = ress.data
            var a = _this.data.a
            var imgUrl1 = _this.data.imgUrl1
            var imgUrl1 = imgUrl1 + data + ","
            var ss = imgUrl1.split(",");
            console.log(imgUrl1)
            console.log(ss)
            console.log(ss.length)
            if (a.length < 1) {
              _this.setData({
                a: res.tempFilePaths,
                imgUrl1: imgUrl1,
                ss: ss,
                display: "inline-block"
              })
            } else {
              a.push(res.tempFilePaths[0]);
              _this.setData({
                a: a,
                imgUrl1: imgUrl1,
                ss: ss,
                display: "inline-block"
              })
            }
          }
        })
      }
    })
  },
  //删除图片
  delete1: function (e) {
    var k = e.target.dataset.name
    var img = this.data.ss
    var de = img[k]
    console.log(img[k])
    img.splice(k, 1)
    var b = img.join(",");
    console.log(b)
    var s = this.data.a
    console.log(k)
    console.log(s)
    var ss = s.splice(k, 1)
    console.log(ss)
    this.setData({
      a: s,
      ss: img,
      imgUrl1: b
    })
    wx.request({
      url: 'https://wap.goods100.com/delete.php', //接口地址
      data: {
        de: de,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  //结婚请柬数据提交
  jiehun: function (e) {
    var that = this;
    var vip = that.data.vip
    var fId = e.detail.formId;
    var cate_id = that.data.options.cate_id
    var formData = e.detail.value;
    var openid = formData.openid
    var date = formData.date
    var time = formData.time
    var title = formData.title
    var imgUrl = formData.imgUrl
    var templet = formData.templet
    var id = formData.id
    console.log(formData)
    var yname = formData.yname.trim()
    if (!yname) {//验证是否填写新郎名字
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写新郎的名字',
        complete: function () {
        }
      })
      return false
    }
    var xname = formData.xname.trim()
    if (!xname) {//验证是否填写新娘名字
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写新娘的名字',
        complete: function () {
        }
      })
      return false
    }
    var hotel = formData.hotel.trim()
    if (!hotel) {//验证是否填写设宴酒店
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写设宴酒店',
        complete: function () {
        }
      })
      return false
    }
    var address = formData.address.trim()
    if (!address) {//验证是否填写地址
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写地址',
        complete: function () {
        }
      })
      return false
    }

    that.setData({
      status: 2,
    })
    wx.request({
      url: 'https://wap.goods100.com/home/rl/getqingjian', //接口地址
      data: {
        fId: fId,
        yname: yname,
        xname: xname,
        hotel: hotel,
        address: address,
        date: date,
        time: time,
        title: title,
        openid: openid,
        imgUrl: imgUrl,
        id: id,
        templet: templet,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var id = res.data
        console.log(id)
        that.setData({
          status: 1,
        })
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '制作成功！请柬可向上翻阅，发给好友',
          complete: function () {
            wx.navigateTo({
              url: '/pages/qingjian/pages/qjxq/qjxq?id=' + id + '&templet=' + templet + '&yname=' + yname + '&xname=' + xname + '&cate_id=' + cate_id + '&v=' + vip + '&t=0'
            })
          }
        })
      }
    })
  },

  //满月、百日请柬数据提交
  manyue: function (e) {
    var that = this;
    var vip = that.data.vip
    var fId = e.detail.formId;
    var cate_id = that.data.options.cate_id
    var formData = e.detail.value;
    var openid = formData.openid
    var date = formData.date
    var time = formData.time
    var title = formData.title
    var imgUrl = formData.imgUrl
    var templet = formData.templet
    var id = formData.id
    var sex = formData.sex
    console.log(formData)
    var bname = formData.bname.trim()
    if (!bname) {//验证是否填写宝宝的名字
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写宝宝的名字',
        complete: function () {
        }
      })
      return false
    }
    var hotel = formData.hotel.trim()
    if (!hotel) {//验证是否填写设宴酒店
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写设宴酒店',
        complete: function () {
        }
      })
      return false
    }
    var address = formData.address.trim()
    if (!address) {//验证是否填写地址
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写地址',
        complete: function () {
        }
      })
      return false
    }
    var tname = formData.tname.trim()
    if (!tname) {//验证是否填写邀请人的名字
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写邀请人的名字',
        complete: function () {
        }
      })
      return false
    }

    that.setData({
      status: 2,
    })
    wx.request({
      url: 'https://wap.goods100.com/home/rl/getqingjian', //接口地址
      data: {
        fId: fId,
        bname: bname,
        tname: tname,
        hotel: hotel,
        address: address,
        date: date,
        time: time,
        title: title,
        openid: openid,
        imgUrl: imgUrl,
        id: id,
        templet: templet,
        sex: sex,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var id = res.data
        console.log(id)
        that.setData({
          status: 1,
        })
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '制作成功！请柬可向上翻阅，发给好友',
          complete: function () {
            wx.navigateTo({
              url: '/pages/qingjian/pages/qjxq/qjxq?id=' + id + '&templet=' + templet + '&bname=' + bname + '&cate_id=' + cate_id + '&v=' + vip + '&t=0'
            })
          }
        })
      }
    })
  },

  //乔迁请柬数据提交
  qiaoqian: function (e) {
    var that = this;
    var vip = that.data.vip
    var fId = e.detail.formId;
    var cate_id = that.data.options.cate_id
    var formData = e.detail.value;
    var openid = formData.openid
    var date = formData.date
    var time = formData.time
    var title = formData.title
    var imgUrl = formData.imgUrl
    var templet = formData.templet
    var id = formData.id
    console.log(formData)
    var hotel = formData.hotel.trim()
    if (!hotel) {//验证是否填写设宴酒店
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写设宴酒店',
        complete: function () {
        }
      })
      return false
    }
    var address = formData.address.trim()
    if (!address) {//验证是否填写地址
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写地址',
        complete: function () {
        }
      })
      return false
    }
    var tname = formData.tname.trim()
    if (!tname) {//验证是否填写邀请人的名字
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写邀请人（屋主）的名字',
        complete: function () {
        }
      })
      return false
    }

    that.setData({
      status: 2,
    })
    wx.request({
      url: 'https://wap.goods100.com/home/rl/getqingjian', //接口地址
      data: {
        fId: fId,
        tname: tname,
        hotel: hotel,
        address: address,
        date: date,
        time: time,
        title: title,
        openid: openid,
        imgUrl: imgUrl,
        id: id,
        templet: templet,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var id = res.data
        console.log(id)
        that.setData({
          status: 1,
        })
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '制作成功！请柬可向上翻阅，发给好友',
          complete: function () {
            wx.navigateTo({
              url: '/pages/qingjian/pages/qjxq/qjxq?id=' + id + '&templet=' + templet + '&cate_id=' + cate_id + '&tname=' + tname + '&v=' + vip + '&t=0'
            })
          }
        })
      }
    })
  },
  //同学会|商务请柬数据提交
  tongxue: function (e) {
    var that = this;
    var vip = that.data.vip
    var fId = e.detail.formId;
    var cate_id = that.data.options.cate_id
    var formData = e.detail.value;
    var openid = formData.openid
    var date = formData.date
    var time = formData.time
    var title = formData.title
    var imgUrl = formData.imgUrl
    var templet = formData.templet
    var id = formData.id
    console.log(formData)
    var ytitle = formData.ytitle.trim()
    if (!ytitle) {//验证是否填写宴会主题
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写宴会主题',
        complete: function () {
        }
      })
      return false
    }
    var hotel = formData.hotel.trim()
    if (!hotel) {//验证是否填写设宴酒店
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写设宴酒店',
        complete: function () {
        }
      })
      return false
    }
    var address = formData.address.trim()
    if (!address) {//验证是否填写地址
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写地址',
        complete: function () {
        }
      })
      return false
    }
    var tname = formData.tname.trim()
    if (!tname) {//验证是否填写邀请人的名字
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写邀请人的名字',
        complete: function () {
        }
      })
      return false
    }

    that.setData({
      status: 2,
    })
    wx.request({
      url: 'https://wap.goods100.com/home/rl/getqingjian', //接口地址
      data: {
        fId: fId,
        tname: tname,
        hotel: hotel,
        address: address,
        date: date,
        time: time,
        title: title,
        openid: openid,
        imgUrl: imgUrl,
        id: id,
        templet: templet,
        ytitle: ytitle
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var id = res.data
        console.log(id)
        that.setData({
          status: 1,
        })
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '制作成功！请柬可向上翻阅，发给好友',
          complete: function () {
            wx.navigateTo({
              url: '/pages/qingjian/pages/qjxq/qjxq?id=' + id + '&templet=' + templet + '&cate_id=' + cate_id + '&ytitle=' + ytitle + '&v=' + vip + '&t=0'
            })
          }
        })
      }
    })
  },

  //升学请柬数据提交
  shengxue: function (e) {
    var that = this;
    var vip = that.data.vip
    var fId = e.detail.formId;
    var cate_id = that.data.options.cate_id;
    var formData = e.detail.value;
    var openid = formData.openid
    var date = formData.date
    var time = formData.time
    var title = formData.title
    var imgUrl = formData.imgUrl
    var templet = formData.templet
    var id = formData.id
    console.log(formData)
    var bname = formData.bname.trim()
    if (!bname) {//验证是否填写升学人的名字
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '升学人的名字',
        complete: function () {
        }
      })
      return false
    }
    var hotel = formData.hotel.trim()
    if (!hotel) {//验证是否填写设宴酒店
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写设宴酒店',
        complete: function () {
        }
      })
      return false
    }
    var address = formData.address.trim()
    if (!address) {//验证是否填写地址
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写地址',
        complete: function () {
        }
      })
      return false
    }
    var tname = formData.tname.trim()
    if (!tname) {//验证是否填写邀请人的名字
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写邀请人的名字',
        complete: function () {
        }
      })
      return false
    }

    that.setData({
      status: 2,
    })
    wx.request({
      url: 'https://wap.goods100.com/home/rl/getqingjian', //接口地址
      data: {
        fId: fId,
        bname: bname,
        tname: tname,
        hotel: hotel,
        address: address,
        date: date,
        time: time,
        title: title,
        openid: openid,
        imgUrl: imgUrl,
        id: id,
        templet: templet,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var id = res.data
        console.log(id)
        that.setData({
          status: 1,
        })
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '制作成功！请柬可向上翻阅，发给好友',
          complete: function () {
            wx.navigateTo({
              url: '/pages/qingjian/pages/qjxq/qjxq?id=' + id + '&templet=' + templet + '&cate_id=' + cate_id + '&bname=' + bname + '&v=' + vip + '&t=0'
            })
          }
        })
      }
    })
  },

  //生日请柬数据提交
  shengri: function (e) {
    var that = this;
    var vip = that.data.vip
    var fId = e.detail.formId;
    var cate_id = that.data.options.cate_id
    var formData = e.detail.value;
    var openid = formData.openid
    var date = formData.date
    var time = formData.time
    var title = formData.title
    var imgUrl = formData.imgUrl
    var templet = formData.templet
    var id = formData.id
    console.log(formData)
    var bname = formData.bname.trim()
    if (!bname) {//验证是否填写生日人的名字
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写生日人的名字',
        complete: function () {
        }
      })
      return false
    }
    var hotel = formData.hotel.trim()
    if (!hotel) {//验证是否填写设宴酒店
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写设宴酒店',
        complete: function () {
        }
      })
      return false
    }
    var address = formData.address.trim()
    if (!address) {//验证是否填写地址
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写地址',
        complete: function () {
        }
      })
      return false
    }
    var tname = formData.tname.trim()
    if (!tname) {//验证是否填写邀请人的名字
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写邀请人的名字',
        complete: function () {
        }
      })
      return false
    }

    that.setData({
      status: 2,
    })
    wx.request({
      url: 'https://wap.goods100.com/home/rl/getqingjian', //接口地址
      data: {
        fId: fId,
        bname: bname,
        tname: tname,
        hotel: hotel,
        address: address,
        date: date,
        time: time,
        title: title,
        openid: openid,
        imgUrl: imgUrl,
        id: id,
        templet: templet,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var id = res.data
        console.log(id)
        that.setData({
          status: 1,
        })
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '制作成功！请柬可向上翻阅，发给好友',
          complete: function () {
            wx.navigateTo({
              url: '/pages/qingjian/pages/qjxq/qjxq?id=' + id + '&templet=' + templet + '&bname=' + bname + '&cate_id=' + cate_id + '&v=' + vip + '&t=0'
            })
          }
        })
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