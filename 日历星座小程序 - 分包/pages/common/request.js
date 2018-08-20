function requestLoading(url, params, message, success, fail) {
  console.log(params)
  wx.showNavigationBarLoading()
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }
  wx.request({
    url: url,
    data: params,
    header: {
      'Content-Type': 'application/json'
      //'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    success: function (res) {
      //console.log(res.data)
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      if (res.statusCode == 200) {
        success(res.data)
      } else {
        fail()
      }

    },
    fail: function (res) {
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      fail()
    },
    complete: function (res) {

    },
  })
}

function requestFid(data, success){
    wx.request({
      url: "https://wap.goods100.com/home/rl/getfId",
      data: data,
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        success(res.data)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
}
module.exports = {
  //request: request,
  requestLoading: requestLoading,
  requestFid:requestFid,
}

