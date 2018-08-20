var common = require('../../../common/common.js')
var app = getApp()
Page({
  onShareAppMessage: function (res) {
    var uid = this.data.options.scene
    var truename = this.data.result.truename
    var username = this.data.result.username
    var company = this.data.result.company
    if(truename==username){//如果用户名和真名一样就显示公司名，否则显示真名
      var name = company
    }else{
      var name = truename
    }
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
    var uid = this.data.options.scene
    var value = wx.getStorageSync("mp_"+uid)
    var totime = value.totime
    var nowtime = new Date() / 1000   //获取当前时间戳
    if (value && totime > nowtime) {//判断名片数据存在缓存且没有过期
      that.setData({
        result:value.result,
        title:value.title
      })
      if (value.result.truename==value.result.username){//真名和用户名一样就显示公司名，否则显示真名
        var BarTitle = value.result.company
      }else{
        var BarTitle = value.result.truename
      }
      wx.setNavigationBarTitle({//导航栏标题
        title: BarTitle + '的名片'
      })
      return false
    }
    wx.request({
      url: 'https://wap.goods100.com/home/zsapi/getcard',
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

        if(result.truename==result.username){//真名和用户名一样就是显示公司名，否则显示真名
          var BarTitle = result.company
        }else{
          var BarTitle = result.truename
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
      url: 'https://wap.goods100.com/home/zsapi/getcardId',
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
      url: 'https://wap.goods100.com/home/zsapi/savecard',
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
      url: 'https://wap.goods100.com/home/zsapi/dltcard',
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
          content: '删除成功！',
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