Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this 
    this.setData({
      options:options
    })
   this.getcard()
  },
    
  getcard:function(){
    var that = this;
    var uid = this.data.options.uid
    var value = wx.getStorageSync("mp_" + uid)
    var totime = value.totime
    var nowtime = new Date() / 1000   //获取当前时间戳
    if (value && totime > nowtime) {//判断名片数据存在缓存且没有过期
      var result = value.result
      that.setData({
        name: result.truename,
        company: result.company,
        job: result.job,
        mobile: result.mobile,
        email: result.email,
        address: result.address,
        content: result.content,
        username:result.username,
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
        console.log(res.data[0])
        var result = res.data[0][0]
        that.setData({
          name:result.truename,
          company:result.company,
          username:result.username,
          job:result.job,
          mobile:result.mobile,
          email:result.email,
          address:result.address,
          content:result.content,
          img:result.card_img,
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

  formSubmit:function(e){
    var that = this
    var formData = e.detail.value
    var name = formData.name.trim()
    var company = formData.company.trim()
    var job = formData.job.trim()
    if(!name){
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: "请填写姓名",
        complete: function () {
        }
      })
      return false
    }
    if(!company){
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: "请填写公司/单位",
        complete: function () {
        }
      })
      return false
    }
    if (!job) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: "请填写部门/职务",
        complete: function () {
        }
      })
      return false
    }
    wx.request({
      url: 'https://wap.goods100.com/home/zsapi/addcard',
      data: formData,
      method:'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
          console.log(res)
          var value = wx.getStorageSync("mp_" + formData.userid)
          var totime = value.totime
          var nowtime = new Date() / 1000   //获取当前时间戳
          if (value) {//判断名片数据存在缓存就修改改缓存数据
            var totime = new Date() / 1000 + 60 * 60 * 24 * 7  //设置缓存30天到期时间
            var result = value.result
            var new_result = {
              userid:result.userid,
              groupid:result.groupid,
              honor_id:result.honor_id,
              username:result.username,
              card_id:result.card_id,
              company:company,
              job:job,
              truename:name,
              email:formData.email,
              mobile:formData.mobile,
              address:formData.address,
              content:formData.content,
              card_img:result.card_img,
            }
            var obj = {
              result: new_result,
              title:value.title,
              totime: totime
            }
            wx.setStorage({//将获取的数组缓存
              key: 'mp_' + result.userid,
              data: obj
            })
          }
          wx.navigateTo({
            url: '/pages/mingpian/pages/mpxq/xq?scene=' + formData.userid,
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