// pages/tabBar/heka/heka.js
var app = getApp()
Page({

  onShareAppMessage: function(options) {
    return {
      title: '电子祝福贺卡-免费制作电子请柬贺卡，微喜帖微贺卡',
      desc: '电子贺卡',
      path: '/pages/tabBar/heka/heka'
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    jieri: [{
        title: '七夕其实并不美丽，美丽的是和你共度七夕的那种感觉……我爱你!节日快乐!',
        img: 'https://wap.goods100.com/heka/yt/qx3.gif',
        name: '七夕',
        BarTitle: '七夕节快乐',
        slt: 'https://wap.goods100.com/heka/slt/qx3.png'
      },
      {
        title: '七夕其实并不美丽，美丽的是和你共度七夕的那种感觉……我爱你!节日快乐!',
        img: 'https://wap.goods100.com/heka/yt/qx2.gif',
        name: '七夕',
        BarTitle: '七夕节快乐',
        slt: 'https://wap.goods100.com/heka/slt/qx2.png'
      },
      {
        title: '七夕其实并不美丽，美丽的是和你共度七夕的那种感觉……我爱你!节日快乐!',
        img: 'https://wap.goods100.com/heka/yt/qx1.gif',
        name: '七夕',
        BarTitle: '七夕节快乐',
        slt: 'https://wap.goods100.com/heka/slt/qx1.png'
      },
      {
        title: '老师！您是字典，有着说不完的故事；您是粉笔，有着写不完的传奇；您是瀑布，有着不竭的动力；您是红烛，照亮了我们的心灵。祝您节日愉快！',
        img: 'https://wap.goods100.com/heka/yt/js2.jpg',
        name: '教师节',
        BarTitle: '教师节快乐',
        slt: 'https://wap.goods100.com/heka/slt/js2.jpg'
      },
      {
        title: '老师！您是字典，有着说不完的故事；您是粉笔，有着写不完的传奇；您是瀑布，有着不竭的动力；您是红烛，照亮了我们的心灵。祝您节日愉快！',
        img: 'https://wap.goods100.com/heka/yt/js1.jpg',
        name: '教师节',
        BarTitle: '教师节快乐',
        slt: 'https://wap.goods100.com/heka/slt/js1.jpg'
      },
      {
        title: '今夜月明人尽望，不知秋思落谁家。送上香甜的月饼，连同一颗祝福的心！ 在此中秋佳节来临之际，愿你心情如秋高气爽！笑脸如鲜花常开！愿望个个如愿，中秋快乐！',
        img: 'https://wap.goods100.com/heka/yt/zq2.jpg',
        name: '中秋',
        BarTitle: '中秋节快乐',
        slt: 'https://wap.goods100.com/heka/slt/zq2.jpg'
      },
      {
        title: '今夜月明人尽望，不知秋思落谁家。送上香甜的月饼，连同一颗祝福的心！ 在此中秋佳节来临之际，愿你心情如秋高气爽！笑脸如鲜花常开！愿望个个如愿，中秋快乐！',
        img: 'https://wap.goods100.com/heka/yt/zq1.jpg',
        name: '中秋',
        BarTitle: '中秋节快乐',
        slt: 'https://wap.goods100.com/heka/slt/zq1.jpg'
      },
      {
        title: '感谢上帝，让你投胎到我这里；感谢计划生育，让你平安呱呱坠地；感谢油盐菜米，让你长到百来厘米；感谢手机，让我提前祝你感恩节开心！',
        img: 'https://wap.goods100.com/heka/yt/ganen2.jpg',
        name: '感恩节',
        BarTitle: '感恩节快乐',
        slt: 'https://wap.goods100.com/heka/slt/ganen2.jpg'
      },
      {
        title: '感谢上帝，让你投胎到我这里；感谢计划生育，让你平安呱呱坠地；感谢油盐菜米，让你长到百来厘米；感谢手机，让我提前祝你感恩节开心！',
        img: 'https://wap.goods100.com/heka/yt/ganen1.jpg',
        name: '感恩节',
        BarTitle: '感恩节快乐',
        slt: 'https://wap.goods100.com/heka/slt/ganen1.jpg'
      },
      {
        title: '立冬了，送你一束璀璨的阳光，照耀你整个人生；送你一朵晶莹的雪花，甜蜜你整个心窝；送你一声朴素的问候，温暖你整个寒冬',
        img: 'https://wap.goods100.com/heka/yt/dongzhi2.jpg',
        name: '冬至',
        BarTitle: '冬至节快乐',
        slt: 'https://wap.goods100.com/heka/slt/dongzhi2.jpg'
      },
      {
        title: '立冬了，送你一束璀璨的阳光，照耀你整个人生；送你一朵晶莹的雪花，甜蜜你整个心窝；送你一声朴素的问候，温暖你整个寒冬',
        img: 'https://wap.goods100.com/heka/yt/dongzhi1.jpg',
        name: '冬至',
        BarTitle: '冬至节快乐',
        slt: 'https://wap.goods100.com/heka/slt/dongzhi1.jpg'
      },
      {
        title: '圣诞老人笑哈哈，一年一度礼物发。挨家挨户不落下，吉祥幸福送到家。坎坷不顺全不怕，今天就会脚下踏。开心快乐人人夸，美满生活顶呱呱。祝圣诞快乐!',
        img: 'https://wap.goods100.com/heka/yt/shendan2.png',
        name: '圣诞',
        BarTitle: '圣诞节快乐',
        slt: 'https://wap.goods100.com/heka/slt/shendan2.png'
      },
      {
        title: '圣诞老人笑哈哈，一年一度礼物发。挨家挨户不落下，吉祥幸福送到家。坎坷不顺全不怕，今天就会脚下踏。开心快乐人人夸，美满生活顶呱呱。祝圣诞快乐!',
        img: 'https://wap.goods100.com/heka/yt/shendan1.jpg',
        name: '圣诞',
        BarTitle: '圣诞节快乐',
        slt: 'https://wap.goods100.com/heka/slt/shendan1.jpg'
      },
      {
        title: '又是一年腊月来到，祝你来年大旺，前程似锦，吉星高照，财运亨通，飞黄腾达，美梦连连！腊八节快乐！',
        img: 'https://wap.goods100.com/heka/yt/laba2.jpg',
        name: '腊八',
        BarTitle: '腊八节快乐',
        slt: 'https://wap.goods100.com/heka/slt/laba2.jpg'
      },
      {
        title: '又是一年腊月来到，祝你来年大旺，前程似锦，吉星高照，财运亨通，飞黄腾达，美梦连连！腊八节快乐！',
        img: 'https://wap.goods100.com/heka/yt/laba1.jpg',
        name: '腊八',
        BarTitle: '腊八节快乐',
        slt: 'https://wap.goods100.com/heka/slt/laba1.jpg'
      },
      {
        title: '小年到来多恭喜，事业发达好福气，阖家欢乐话情谊，身体康健要快乐，财源滚滚更得意。祝你小年祥瑞到，天天开心好脾气！',
        img: 'https://wap.goods100.com/heka/yt/xiaonian.jpg',
        name: '小年',
        BarTitle: '小年快乐',
        slt: 'https://wap.goods100.com/heka/slt/xiaonian.jpg'
      },
      {
        title: '初恋的人，期待着情人节的到来；热恋的人，每天过着都是情人节！但愿天下的有情人，天天都是情人节!',
        img: 'https://wap.goods100.com/heka/yt/qingrenjie1.jpg',
        name: '情人节',
        BarTitle: '情人节快乐',
        slt: 'https://wap.goods100.com/heka/slt/qingrenjie1.jpg'
      },
      {
        title: '初恋的人，期待着情人节的到来；热恋的人，每天过着都是情人节！但愿天下的有情人，天天都是情人节!',
        img: 'https://wap.goods100.com/heka/yt/qingrenjie2.jpg',
        name: '情人节',
        BarTitle: '情人节快乐',
        slt: 'https://wap.goods100.com/heka/slt/qingrenjie2.jpg'
      },
      {
        title: '初恋的人，期待着情人节的到来；热恋的人，每天过着都是情人节！但愿天下的有情人，天天都是情人节!',
        img: 'https://wap.goods100.com/heka/yt/qr.jpg',
        name: '情人节',
        BarTitle: '情人节快乐',
        slt: 'https://wap.goods100.com/heka/slt/qr.jpg'
      },
      {
        title: '初恋的人，期待着情人节的到来；热恋的人，每天过着都是情人节！但愿天下的有情人，天天都是情人节!',
        img: 'https://wap.goods100.com/heka/yt/qr2.jpg',
        name: '情人节',
        BarTitle: '情人节快乐',
        slt: 'https://wap.goods100.com/heka/slt/qr2.jpg'
      },
      {
        title: '初恋的人，期待着情人节的到来；热恋的人，每天过着都是情人节！但愿天下的有情人，天天都是情人节!',
        img: 'https://wap.goods100.com/heka/yt/qr3.jpg',
        name: '情人节',
        BarTitle: '情人节快乐',
        slt: 'https://wap.goods100.com/heka/slt/qr3.jpg'
      },
      {
        title: '元宵到，元宵闹，花灯猜谜生活俏，思念此刻在欢跳，祝福立马来报到，好运特地来关照，幸福常伴常微笑，欢欣袭来欢乐傲，万种如意陪元宵。祝你元宵快乐！',
        img: 'https://wap.goods100.com/heka/yt/yuanxiao1.jpg',
        name: '元宵',
        BarTitle: '元宵节快乐',
        slt: 'https://wap.goods100.com/heka/slt/yuanxiao1.jpg'
      },
      {
        title: '元宵到，元宵闹，花灯猜谜生活俏，思念此刻在欢跳，祝福立马来报到，好运特地来关照，幸福常伴常微笑，欢欣袭来欢乐傲，万种如意陪元宵。祝你元宵快乐！',
        img: 'https://wap.goods100.com/heka/yt/yuanxiao2.jpg',
        name: '元宵',
        BarTitle: '元宵节快乐',
        slt: 'https://wap.goods100.com/heka/slt/yuanxiao2.jpg'
      },
      {
        title: '又到三八节，祝福不停歇，祝你美丽如花人人羡，可爱笑脸乐无边，爱人天天来相伴，喜气洋洋像过年，妇女节开心快乐!',
        img: 'https://wap.goods100.com/heka/yt/fn.jpg',
        name: '妇女节',
        BarTitle: '妇女节快乐',
        slt: 'https://wap.goods100.com/heka/slt/fn.jpg'
      },
      {
        title: '母亲节到了，在此我谨代表广大的儿女们，向还未成为但将来会成为，已经成为或即将成为母亲的美女/辣妈们致以崇高敬意！你们是最美的！母亲节快乐！',
        img: 'https://wap.goods100.com/heka/yt/mq2.jpg',
        name: '母亲节',
        BarTitle: '母亲节快乐',
        slt: 'https://wap.goods100.com/heka/slt/mq2.jpg'
      },
      {
        title: '母亲节到了，在此我谨代表广大的儿女们，向还未成为但将来会成为，已经成为或即将成为母亲的美女/辣妈们致以崇高敬意！你们是最美的！母亲节快乐！',
        img: 'https://wap.goods100.com/heka/yt/mq.jpg',
        name: '母亲节',
        BarTitle: '母亲节快乐',
        slt: 'https://wap.goods100.com/heka/slt/mq.png'
      },
      {
        title: '日子把风霜刻在脸上，岁月把回忆印在心头。但童心是一种心态，即使岁月蹉跎，时光荏苒，珍惜它，爱惜它，你将年轻永驻，六一儿童节，记得保持童心！',
        img: 'https://wap.goods100.com/heka/yt/et2.jpg',
        name: '儿童节',
        BarTitle: '儿童节快乐',
        slt: 'https://wap.goods100.com/heka/slt/et2.jpg'
      },
      {
        title: '日子把风霜刻在脸上，岁月把回忆印在心头。但童心是一种心态，即使岁月蹉跎，时光荏苒，珍惜它，爱惜它，你将年轻永驻，六一儿童节，记得保持童心！',
        img: 'https://wap.goods100.com/heka/yt/et1.jpg',
        name: '儿童节',
        BarTitle: '儿童节快乐',
        slt: 'https://wap.goods100.com/heka/slt/et1.jpg'
      },
      {
        title: '为了儿女的人生您辛苦了大半辈子！今天是您的节日，我想对您说：谢谢您，我最亲最爱的爸！',
        img: 'https://wap.goods100.com/heka/yt/fq2.png',
        name: '父亲节',
        BarTitle: '父亲节快乐',
        slt: 'https://wap.goods100.com/heka/slt/fq2.png'
      },
      {
        title: '为了儿女的人生您辛苦了大半辈子！今天是您的节日，我想对您说：谢谢您，我最亲最爱的爸！',
        img: 'https://wap.goods100.com/heka/yt/fq.png',
        name: '父亲节',
        BarTitle: '父亲节快乐',
        slt: 'https://wap.goods100.com/heka/slt/fq.png'
      },
      {
        title: '端午节到了，送你一个粽子，以甜蜜为叶，以开心为馅，以吉祥为线，一心一意地包裹，通过手机传送，愿你品尝出五月五的快乐情怀！',
        img: 'https://wap.goods100.com/heka/yt/dw2.gif',
        name: '端午',
        BarTitle: '端午节快乐',
        slt: 'https://wap.goods100.com/heka/slt/dw2.gif'
      },
      {
        title: '端午节到了，送你一个粽子，以甜蜜为叶，以开心为馅，以吉祥为线，一心一意地包裹，通过手机传送，愿你品尝出五月五的快乐情怀！',
        img: 'https://wap.goods100.com/heka/yt/dw.jpg',
        name: '端午',
        BarTitle: '端午节快乐',
        slt: 'https://wap.goods100.com/heka/slt/dw1.jpg'
      },

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          clientHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
    var tarrHight = [];
    var arr = [];
    var length = this.data.jieri.length
    for (var i = 0; i < length; i++) {
      if(i<3){
        arr[i] = true;
      }else{
        arr[i] = false;
      }
      tarrHight[i] = Math.floor(i / 3)  * 127;
    }
    this.setData({
      arr: arr,
      arrHight: tarrHight
    })
  },
  binderrorimg: function(e) {//图片加载错误时显示默认的图片
    var errorImgIndex = e.target.dataset.errorimg
    var jieri = 'jieri[' + errorImgIndex + '].slt'
    this.setData({
      [jieri]: '/i/m.jpg',  
    }) //修改数据源对应的数据
  },
  cate: function(e) {
    var catid = e.target.dataset.catid
    app.globalData.catid = catid
    this.setData({
      catid: catid
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
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
    this.setData({
      catid: app.globalData.catid
    })
  },

  scroll: function(e) {//下拉图片懒加载
    var catid = this.data.catid
    if (catid == 2) {
      var seeHeight = this.data.clientHeight; //可见区域高度  
      var arrHight = this.data.arrHight;
      var scrollTop = e.detail.scrollTop;
      var arr = this.data.arr;
      var length = this.data.jieri.length
      for (var i = 0; i < length; i++) {
        if (arrHight[i] < scrollTop+127) {
          if (arr[i] == false) {
            arr[i] = true;
          }
        }
      }
      this.setData({
        arr: arr,
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */

})