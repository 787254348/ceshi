
function share() {
  wx.showToast({
    title: '点右上角-转发',
    icon: 'success',
  })
  setTimeout(function () {
    wx.hideToast()
  }, 2000)
}

function is_array(array,str){
  for (var i = 0; i < array.length; i++) {
    if (array[i] == str) {
      return true
    } 
  }
  return false
}

module.exports = {
  share: share,
  is_array:is_array,
}  