
Page({
  onShareAppMessage: function (options) {
    var name = this.data.name
    var sex = this.data.sex
    var xueli = this.data.xueli
    var yinyuan = this.data.yinyuan
    var shiye = this.data.shiye
    var zinv = this.data.zinv
    var haozhai = this.data.haozhai
    var zuojia = this.data.zuojia
    var cunkuan = this.data.cunkuan
    var shouming = this.data.shouming
    var fenshu = this.data.fenshu
    return {
      title: name + '的命理分析,赶快来测试一下！',
      desc: '电子请柬贺卡',
      path: '/pages/yule/pages/csxq/xq?name=' + name + '&sex=' + sex + '&xueli=' + xueli + '&yinyuan=' + yinyuan +'&shiye=' + shiye +'&zinv=' + zinv + '&haozhai=' + haozhai + '&zuojia=' + zuojia + '&cunkuan=' + cunkuan + '&shouming=' + shouming + '&fenshu=' + fenshu
    }

  },

  data: {
    xueli:[
      '中学', '大学', '硕士', '大学', '硕士', '大学', '硕士', '大学', '硕士', '大学'
    ],
    shiye:[
      '蒸蒸日上','如日中天','欣欣向荣','独占鳌头','颇有建树','飞黄腾达','蓬勃发展','前途无量', '朝气蓬勃'
    ],
    haozhai:[
      '一','二','三'
    ],
    zuojia:[
      '宝马5系', '雷克萨斯ES', '奥迪A6L', '奔驰E级', '奔驰S级', '宝马7系', '迈巴赫S级', '奥迪A8', '奔驰S级AMG', '保时捷718', '保时捷911','雷克萨斯LS'
    ]
  },
  onLoad: function (options) {
    var that = this
    //获取手机屏幕宽度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          width: res.windowWidth,
        })
      }
    })
    var width = this.data.width
    if(width<375){//根据屏幕尺寸改变字体大小
      var fontsize=12
    }else{
      var fontsize=16
    }
    var name = options.name
    var sex = options.sex
    if(Object.prototype.toString.call(options.xueli) === '[object Undefined]') {//通过表单提交进入的页面
      //随机获取学历
      var index1 = Math.floor(Math.random() * 10)
      var xueli = this.data.xueli[index1]
      //随机获取姻缘数字
      var chulian_num = Math.floor(Math.random() * 8 + 18);//随机获取一个18-25之间的初恋年龄
      var jiehun_num = Math.floor(Math.random() * 7 + 22)//随机获取一个22-28之间的结婚年龄
      if (chulian_num>=jiehun_num){//如果随机的初恋年龄大于等于结婚年龄，就在初恋的年龄基础上加2
        var jiehun_num = chulian_num+2
      }
      var f_num = Math.floor(Math.random() * 3 + 1)//几任男女朋友
      if (sex == 1) {
        var yinyuan = chulian_num + '岁初恋，' + jiehun_num + '岁结婚，' + '婚前有' + f_num + '任女朋友'
      } else {
        var yinyuan = chulian_num + '岁初恋，' + jiehun_num + '岁结婚，' + '婚前有' + f_num + '任男朋友'
      }
      //随机获取事业
      var index2 = Math.floor(Math.random() * 9)
      var shiye = this.data.shiye[index2]
      //随机获取子女数字
      var y_num = Math.floor(Math.random() * 2 + 1)//儿子个数
      var x_num = Math.floor(Math.random() * 2 + 1)//女儿个数
      var zinv = y_num + '个儿子，' + x_num + '个女儿'
      //随机获取豪宅
      var index3 = Math.floor(Math.random() * 3)
      var hz_num = this.data.haozhai[index3]
      var bs_num = Math.floor(Math.random() * 5 + 2)//别墅栋数
      var haozhai = hz_num + '线城市' + bs_num + '栋别墅'
      //随机获取座驾
      var index4 = Math.floor(Math.random() * 12)
      var zuojia = this.data.zuojia[index4]
      //随机获取存款数目
      var cunkuan = Math.floor(Math.random() * 541 + 60)
      //随机获取寿命
      var shouming = Math.floor(Math.random() * 15 + 96)
      //随机获取综合得分
      var fenshu = Math.floor(Math.random() * 6 + 95)
    }else{//通过分享进入的页面
      var xueli = options.xueli
      var yinyuan = options.yinyuan
      var shiye = options.shiye
      var zinv = options.zinv
      var haozhai = options.haozhai
      var zuojia = options.zuojia
      var cunkuan = options.cunkuan
      var shouming = options.shouming
      var fenshu = options.fenshu
    }
    
    this.setData({
      name:name,
      sex:sex,
      xueli:xueli,
      yinyuan:yinyuan,
      shiye:shiye,
      zinv:zinv,
      haozhai:haozhai,
      zuojia:zuojia,
      cunkuan:cunkuan,
      shouming:shouming,
      fenshu:fenshu,
    })

    const canvasCtx = wx.createCanvasContext('shareCanvas');
    //绘制背景颜色
    canvasCtx.setFillStyle('#FFEBCD');
    canvasCtx.fillRect(0, 0, width, 500);
    //绘制矩形
    canvasCtx.rect(width / 2 -150, 20, 300,40)
    canvasCtx.setFillStyle('#EE2C2C')
    canvasCtx.fill()
    //绘制文字
    canvasCtx.setFontSize(24);
    canvasCtx.setFillStyle('#fff');
    canvasCtx.setTextAlign('center');
    canvasCtx.fillText(name+"的命理分析😂", width / 2 , 50);
    var color = "#00868B"
    var cl ="#556B2F"
    //绘制学历文字
    canvasCtx.setFontSize(fontsize+4);
    canvasCtx.setFillStyle(color);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText("学历:", 20, 100);
    canvasCtx.setFontSize(fontsize);
    canvasCtx.setFillStyle(cl);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText(xueli, 70, 100);
    //绘制姻缘文字
    canvasCtx.setFontSize(fontsize + 4);
    canvasCtx.setFillStyle(color);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText("姻缘:", 20, 130);
    canvasCtx.setFontSize(fontsize);
    canvasCtx.setFillStyle(cl);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText(yinyuan, 70, 130);
    //绘制事业文字
    canvasCtx.setFontSize(fontsize + 4);
    canvasCtx.setFillStyle(color);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText("事业:", 20, 160);
    canvasCtx.setFontSize(fontsize);
    canvasCtx.setFillStyle(cl);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText(shiye, 70, 160);
    //绘制子女文字
    canvasCtx.setFontSize(fontsize + 4);
    canvasCtx.setFillStyle(color);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText("子女:", 20, 190);
    canvasCtx.setFontSize(fontsize);
    canvasCtx.setFillStyle(cl);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText(zinv, 70, 190);
    //绘制豪宅文字
    canvasCtx.setFontSize(fontsize + 4);
    canvasCtx.setFillStyle(color);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText("豪宅:", 20, 220);
    canvasCtx.setFontSize(fontsize);
    canvasCtx.setFillStyle(cl);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText(haozhai, 70, 220);
    //绘制座驾文字
    canvasCtx.setFontSize(fontsize + 4);
    canvasCtx.setFillStyle(color);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText("座驾:", 20, 250);
    canvasCtx.setFontSize(fontsize);
    canvasCtx.setFillStyle(cl);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText(zuojia, 70, 250);
    //绘制存款文字
    canvasCtx.setFontSize(fontsize + 4);
    canvasCtx.setFillStyle(color);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText("存款:", 20, 280);
    canvasCtx.setFontSize(fontsize);
    canvasCtx.setFillStyle(cl);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText(cunkuan+"万元", 70, 280);
    //绘制寿命文字
    canvasCtx.setFontSize(fontsize + 4);
    canvasCtx.setFillStyle(color);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText("寿命:", 20, 310);
    canvasCtx.setFontSize(fontsize);
    canvasCtx.setFillStyle(cl);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText(shouming+"岁", 70, 310);
    //绘制文字
    canvasCtx.setFontSize(20);
    canvasCtx.setFillStyle(color);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText("综合得分:", 20, 340);
    //绘制矩形
    canvasCtx.beginPath()
    canvasCtx.rect(20, 350, 200, 90)
    canvasCtx.setFillStyle('#FFF8DC')
    canvasCtx.fill()
    //绘制分数文字
    canvasCtx.setFontSize(60);
    canvasCtx.setFillStyle('red');
    canvasCtx.setTextAlign('center');
    canvasCtx.fillText(fenshu, 90, 410);
    canvasCtx.setFontSize(48);
    canvasCtx.setFillStyle('red');
    canvasCtx.setTextAlign('center');
    canvasCtx.fillText("分", 165, 405);
    //绘制分数下划线
    canvasCtx.beginPath()
    canvasCtx.setLineWidth(1)
    canvasCtx.setStrokeStyle('red')
    canvasCtx.moveTo(40, 420)
    canvasCtx.lineTo(200, 420)
    canvasCtx.stroke()
    canvasCtx.beginPath()
    canvasCtx.setLineWidth(1)
    canvasCtx.setStrokeStyle('red')
    canvasCtx.moveTo(40, 425)
    canvasCtx.lineTo(200, 425)
    canvasCtx.stroke()
    canvasCtx.draw();
  },
  
  //保存图片到本地相册
  save:function(){
    var that = this
    var width = this.data.width
    if (width < 375) {//根据屏幕尺寸改变字体大小
      var fontsize = 12
    } else {
      var fontsize = 16
    }
    var name = this.data.name
    var sex = this.data.sex
    var xueli = this.data.xueli
    var yinyuan = this.data.yinyuan
    var shiye = this.data.shiye
    var zinv = this.data.zinv
    var haozhai = this.data.haozhai
    var zuojia = this.data.zuojia
    var cunkuan = this.data.cunkuan
    var shouming = this.data.shouming
    var fenshu = this.data.fenshu
   
    const canvasCtx = wx.createCanvasContext('shareCanvas1');
    //绘制背景颜色
    canvasCtx.setFillStyle('#FFEBCD');
    canvasCtx.fillRect(0, 0, width, 500);
    //绘制矩形
    canvasCtx.rect(width / 2 - 150, 20, 300, 40)
    canvasCtx.setFillStyle('#EE2C2C')
    canvasCtx.fill()
    //绘制文字
    canvasCtx.setFontSize(24);
    canvasCtx.setFillStyle('#fff');
    canvasCtx.setTextAlign('center');
    canvasCtx.fillText(name + "的命理分析😂", width / 2, 50);
    var color = "#00868B"
    var cl = "#556B2F"
    //绘制学历文字
    canvasCtx.setFontSize(fontsize + 4);
    canvasCtx.setFillStyle(color);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText("学历:", 20, 100);
    canvasCtx.setFontSize(fontsize);
    canvasCtx.setFillStyle(cl);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText(xueli, 70, 100);
    //绘制姻缘文字
    canvasCtx.setFontSize(fontsize + 4);
    canvasCtx.setFillStyle(color);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText("姻缘:", 20, 130);
    canvasCtx.setFontSize(fontsize);
    canvasCtx.setFillStyle(cl);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText(yinyuan, 70, 130);
    //绘制事业文字
    canvasCtx.setFontSize(fontsize + 4);
    canvasCtx.setFillStyle(color);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText("事业:", 20, 160);
    canvasCtx.setFontSize(fontsize);
    canvasCtx.setFillStyle(cl);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText(shiye, 70, 160);
    //绘制子女文字
    canvasCtx.setFontSize(fontsize + 4);
    canvasCtx.setFillStyle(color);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText("子女:", 20, 190);
    canvasCtx.setFontSize(fontsize);
    canvasCtx.setFillStyle(cl);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText(zinv, 70, 190);
    //绘制豪宅文字
    canvasCtx.setFontSize(fontsize + 4);
    canvasCtx.setFillStyle(color);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText("豪宅:", 20, 220);
    canvasCtx.setFontSize(fontsize);
    canvasCtx.setFillStyle(cl);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText(haozhai, 70, 220);
    //绘制座驾文字
    canvasCtx.setFontSize(fontsize + 4);
    canvasCtx.setFillStyle(color);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText("座驾:", 20, 250);
    canvasCtx.setFontSize(fontsize);
    canvasCtx.setFillStyle(cl);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText(zuojia, 70, 250);
    //绘制存款文字
    canvasCtx.setFontSize(fontsize + 4);
    canvasCtx.setFillStyle(color);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText("存款:", 20, 280);
    canvasCtx.setFontSize(fontsize);
    canvasCtx.setFillStyle(cl);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText(cunkuan + "万元", 70, 280);
    //绘制寿命文字
    canvasCtx.setFontSize(fontsize + 4);
    canvasCtx.setFillStyle(color);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText("寿命:", 20, 310);
    canvasCtx.setFontSize(fontsize);
    canvasCtx.setFillStyle(cl);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText(shouming + "岁", 70, 310);
    //绘制文字
    canvasCtx.setFontSize(20);
    canvasCtx.setFillStyle(color);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText("综合得分:", 20, 340);
    //绘制矩形
    canvasCtx.beginPath()
    canvasCtx.rect(20, 350, 200, 90)
    canvasCtx.setFillStyle('#FFF8DC')
    canvasCtx.fill()
    //绘制分数文字
    canvasCtx.setFontSize(60);
    canvasCtx.setFillStyle('red');
    canvasCtx.setTextAlign('center');
    canvasCtx.fillText(fenshu, 90, 410);
    canvasCtx.setFontSize(48);
    canvasCtx.setFillStyle('red');
    canvasCtx.setTextAlign('center');
    canvasCtx.fillText("分", 165, 405);
    //绘制分数下划线
    canvasCtx.beginPath()
    canvasCtx.setLineWidth(1)
    canvasCtx.setStrokeStyle('red')
    canvasCtx.moveTo(40, 420)
    canvasCtx.lineTo(200, 420)
    canvasCtx.stroke()
    canvasCtx.beginPath()
    canvasCtx.setLineWidth(1)
    canvasCtx.setStrokeStyle('red')
    canvasCtx.moveTo(40, 425)
    canvasCtx.lineTo(200, 425)
    canvasCtx.stroke()
    //绘制文字
    canvasCtx.setFontSize(12);
    canvasCtx.setFillStyle(cl);
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText("立即扫码测试", width - 90, 355);
    //绘制二维码
    canvasCtx.drawImage('/i/ceshi.jpg', width - 90, 365, 75, 75);
    canvasCtx.draw();
    setTimeout(function () {//设置一秒的延时任务，等绘图完成再保存图片到相册
      wx.canvasToTempFilePath({
        canvasId: 'shareCanvas1',
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
        }
      }) 
    }, 1000);
  },
 

  onReady: function () {
    // 页面渲染完成
    var name = this.data.name;
    wx.setNavigationBarTitle({//导航栏标题
      title: name+'的命理分析'
    })
  },

  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})