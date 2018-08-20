
var app = getApp()
var t = new Date()
Page({
  onShareAppMessage: function (options) {
    return {
      title: '今日老黄历查询宜和忌-免费制作电子请柬贺卡',
      desc: '黄历',
      path: '/pages/laohuangli/pages/huangli/huangli'
    }
  },
  data: {
    left: '<',
    right: '>',
    style: 'none',
    show: 'block',
    word: [
      '人生是一条没有回程的单行线，上帝不会给你一张返程的票。',
      '对待生活中的每一天若都像生命中的最后一天去对待，人生定会更精彩。',
      '活在昨天的人失去过去，活在明天的人失去未来，活在今天的人拥有过去和未来。',
      '只有不断找寻机会的人才会及时把握机会。',
      '做一个决定，并不难，难的是付诸行动，并且坚持到底。',
      '环境不会改变，解决之道在于改变自己。',
      '还能冲动，表示你还对生活有激情，总是冲动，表示你还不懂生活。',
      '运气就是机会碰巧撞到了你的努力。',
      '得之坦然，失之淡然，顺其自然，争其必然。',
      '时间是治疗心灵创伤的大师，但绝不是解决问题的高手。',
      '天道酬勤。也许你付出了不一定得到回报，但不付出一定得不到回报。',
      '人一生下就会哭，笑是后来才学会的。所以忧伤是一种低级的本能，而快乐是一种更高级的能力。',
      '要让事情改变，先改变我自己；要让事情变得更好，先让自己变得更好。',
      '你是你的敌人，只有你才能打倒你；你是你的上帝，只有你才能拯救你。',
      '世事忙忙如水流，休将名利挂心头。粗茶淡饭随缘过，富贵荣华莫强求。',
      '成功呈概率分布，关键是你能不能坚持到成功开始呈现的那一刻。',
      '没有一个朋友比得上健康，没有一个敌人比得上病魔，与其为病痛暗自流泪，不如运动健身为生命添彩。',
      '为别人鼓掌的人也是在给自己的生命加油。',
      '人生在世，应该这样，在芬芳别人的同时美丽自己。',
      '善待自己，幸福无比，善待别人，快乐无比，善待生命，健康无比。',
      '人生就像骑单车，想保持平衡就得往前走。',
      '当你的才华还撑不起你的野心时，那你就应该静下心来学习。',
      '生活中的许多事，并不是我们不能做到，而是我们不相信能够做到。',
      '如果你向神求助，说明你相信神的能力；如果神没有帮助你，说明神相信你的能力。',
      '心存希望，幸福就会降临你；心存梦想，机遇就会笼罩你。',
      '人生在世，最重要的不是自己处境如何，而是你如何看待自己的处境。',
      '机会是自己创造的，而不能一味的等待别人的赐予。',
      '一个人幸运的前提，其实是他有能力改变自己。',
    ]
  },
  onLoad: function (options) {
    var that = this
    var value = wx.getStorageSync('laohuangli')
    if (value) {
      that.getData()
    } else {
      that.laohuangli()
    }
    //随机获取人生格言
    var index = Math.floor(Math.random() * 28)
    var motto = this.data.word[index]
    this.setData({
      options: options,
      motto: motto
    })

    var toYear = t.getFullYear()
    var toMonth = t.getMonth() + 1
    var toDate = t.getDate()
    var toMonth = toMonth < 10 ? '0' + toMonth : toMonth
    var toDate = toDate < 10 ? '0' + toDate : toDate
    var date = toYear + '-' + toMonth + '-' + toDate
    console.log(date)
    this.getWeekday(date)

  },

  onShow: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
  },

  getData: function () {
    var year = t.getFullYear()
    var month = t.getMonth() + 1
    var date = t.getDate()
    var data = this.data;
    var that = this;
    wx.getStorage({//获取缓存数据
      key: 'laohuangli',
      success: function (res) {
        var data = res.data.nongli;
        console.log(res)
        var nl = data.yinli;
        var nian = nl.substring(0, 6);
        var yue = nl.substring(6, 11);
        console.log(yue)
        console.log(nian)
        console.log(res.data)
        //将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
        that.setData({
          restation: data,
          year: year,
          month: month,
          date: date,
          nian: nian,
          yue: yue,
          style: 'none',
          show: 'block'
        });

        wx.hideToast();
      },
      fail: function (options) {
        that.laohuangli(options);
      }
    })
  },
  laohuangli: function () {
    var that = this
    var year = t.getFullYear()
    var month = t.getMonth() + 1
    var date = t.getDate()
    wx.request({
      method: 'GET',
      url: 'https://v.juhe.cn/laohuangli/d?date=' + year + '-' + month + '-' + date + '&key=fd6dd1de40a2cfe1725d43c323e057c7',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var data = res.data;
        var nl = data.result.yinli;
        var nian = nl.substring(0, 6);
        var yue = nl.substring(6, 11);
        console.log(yue)
        console.log(nian)
        console.log(res.data)
        //将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
        that.setData({
          restation: data.result,
          year: year,
          month: month,
          date: date,
          nian: nian,
          yue: yue,
          style: 'none',
          show: 'block'
        });
        wx.setStorage({//将获取的数组缓存
          key: "laohuangli",
          data: data.result
        })

        wx.hideToast();
      },
      fail: function () {
        that.setData({
          hidden: true,
          style: 'block',
          show: 'none'
        });
        // wx.hideNavigationBarLoading();
      }
    })
  },

  //后一天的日期
  nextdate: function () {
    var y = this.data.year;
    var n = this.data.month;
    var r = this.data.date;
    if (n == 1 || n == 3 || n == 5 || n == 7 || n == 8 || n == 10) {
      if (r == 31) {
        this.setData({
          date: 1,
          month: ++n,
        });
      }
      else {
        this.setData({
          date: ++r,
        });
      }
    } else if (n == 2) {
      if (y % 4 == 0) {
        if (r == 29) {
          this.setData({
            date: 1,
            month: ++n,
          });
        }
        else {
          this.setData({
            date: ++r,
          });
        }
      } else {
        if (r == 28) {
          this.setData({
            date: 1,
            month: ++n,
          });
        }
        else {
          this.setData({
            date: ++r,
          });
        }
      }

    } else if (n == 12) {
      if (r == 31) {
        this.setData({
          date: 1,
          month: 1,
          year: ++y,
        });
      }
      else {
        this.setData({
          date: ++r,
        });
      }
    } else {
      if (r == 30) {
        this.setData({
          date: 1,
          month: ++n,
        });
      }
      else {
        this.setData({
          date: ++r,
        });
      }
    }

    this.getda();
  },
  //前一天的日期
  lastdate: function () {
    var y = this.data.year;
    var n = this.data.month;
    var r = this.data.date;
    if (r == 1) {
      if (n == 2 || n == 4 || n == 6 || n == 9 || n == 11) {
        this.setData({
          date: 31,
          month: --n,
        });
      } else if (n == 3) {
        if (y % 4 == 0) {
          this.setData({
            date: 29,
            month: --n,
          });
        } else {
          this.setData({
            date: 28,
            month: --n,
          });
        }

      } else if (n == 1) {
        this.setData({
          date: 31,
          month: 12,
          year: --y,
        });
      } else {
        this.setData({
          date: 28,
          month: --n,
        });
      }

    }
    else {
      this.setData({
        date: --r,
      });
    }
    this.getda();
  },

  getda: function () {
    var data = this.data;
    var year = data.year
    var month = data.month<10?'0'+data.month:data.month
    var d= data.date<10?'0'+data.date:data.date
    var date = year + '-' + month + '-' + d
    this.getWeekday(date)
    var that = this;
    wx.request({
      method: 'GET',
      url: 'https://v.juhe.cn/laohuangli/d?date=' + data.year + '-' + data.month + '-' + data.date + '&key=fd6dd1de40a2cfe1725d43c323e057c7',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var data = res.data;
        var nl = data.result.yinli;
        var nian = nl.substring(0, 6);
        var yue = nl.substring(6, 11);
        console.log(yue)
        console.log(nian)
        console.log(res.data)
        //将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
        that.setData({
          restation: data.result,
          condition: false,
          year: that.data.year,
          month: that.data.month,
          date: that.data.date,
          nian: nian,
          yue: yue,
        });

        wx.hideToast();
      },
      fail: function () {
        that.setData({ hidden: true });
        // wx.hideNavigationBarLoading();
      }
    })
  },
  //获取星期
  getWeekday:function(date){
    var day = new Date(date).getDay()
    switch (day) {
      case 0:
        var text = "星期日";
        break;
      case 1:
        var text = "星期一";
        break;
      case 2:
        var text = "星期二";
        break;
      case 3:
        var text = "星期三";
        break;
      case 4:
        var text = "星期四";
        break;
      case 5:
        var text = "星期五";
        break;
      case 6:
        var text = "星期六";
        break;
    }
    console.log(text)
    this.setData({
      weekday: text,
    });
  },
 
  save: function () {
    const canvasCtx = wx.createCanvasContext('shareCanvas');
    //绘制背景颜色
    canvasCtx.setFillStyle('#FFEBCD');
    canvasCtx.fillRect(0, 0, 375, 490);
    //绘制顶部横线
    canvasCtx.beginPath()
    canvasCtx.setLineWidth(12)
    canvasCtx.setStrokeStyle('#009933')
    canvasCtx.moveTo(0, 6)
    canvasCtx.lineTo(375, 6)
    canvasCtx.stroke()
    //绘制年月文字
    var year = this.data.year
    var month = this.data.month
    var y = year + '年' + month + '月'
    canvasCtx.setFontSize(18);
    canvasCtx.setFillStyle('#009933');
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText(y, 7, 40);
    //绘制今天几号数字
    var date = this.data.date
    canvasCtx.setFontSize(150);
    canvasCtx.setFillStyle('#009933');
    canvasCtx.setTextAlign('center');
    canvasCtx.fillText(date, 188, 160);
    //绘制农历时间文字
    var nian = this.data.nian
    var yue = this.data.yue
    var n = nian+'农历 '+yue
    canvasCtx.setFontSize(18);
    canvasCtx.setFillStyle('#009933');
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText(n, 7, 190);
    //绘制星期文字
    var weekday = this.data.weekday
    canvasCtx.setFontSize(18);
    canvasCtx.setFillStyle('#009933');
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText(weekday, 310, 190);
    //绘制下划线
    canvasCtx.beginPath()
    canvasCtx.setLineWidth(5)
    canvasCtx.setStrokeStyle('#009933')
    canvasCtx.moveTo(0, 200)
    canvasCtx.lineTo(375,200)
    canvasCtx.stroke()
    //绘制宜内容文字的圆形背景
    canvasCtx.beginPath()
    canvasCtx.arc(30,230, 10, 0, 2 * Math.PI)
    canvasCtx.lineTo(30,230)
    canvasCtx.setFillStyle('#009933')
    canvasCtx.fill()
    canvasCtx.stroke()
    //绘制文字宜
    canvasCtx.setFontSize(18);
    canvasCtx.setFillStyle('#fff');
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText('宜', 21, 236);
    var goodsTitle = this.data.restation.yi
    let goodsTitleArray = [];
    //分割宜内容文字,每行20个
    for (let i = 0; i < goodsTitle.length / 20; i++) {
      goodsTitleArray.push(goodsTitle.substr(i * 20, 20));
    }
    var yOffset = 235
    goodsTitleArray.forEach(function (value) {
      canvasCtx.setFontSize(18);
      canvasCtx.setFillStyle('#009933');
      canvasCtx.setTextAlign('left');
      canvasCtx.fillText(value, 60, yOffset,340);
      yOffset += 25;
    });
    //绘制宜忌之间的横线
    canvasCtx.beginPath()
    canvasCtx.setLineWidth(1)
    canvasCtx.setStrokeStyle('#009933')
    canvasCtx.moveTo(7, yOffset-10)
    canvasCtx.lineTo(367, yOffset-10)
    canvasCtx.stroke()
    //绘制忌内容文字
    var yOffset = yOffset + 17
      //绘制圆形背景
    canvasCtx.beginPath()
    canvasCtx.setStrokeStyle('#666')
    canvasCtx.arc(30, yOffset-7, 12, 0, 2 * Math.PI)
    canvasCtx.lineTo(30, yOffset-7)
    canvasCtx.setFillStyle('#666')
    canvasCtx.fill()
    canvasCtx.stroke()
      //绘制文字忌
    canvasCtx.setFontSize(18);
    canvasCtx.setFillStyle('#fff');
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText('忌', 21, yOffset-1);
    var goods = this.data.restation.ji
    let goodsArray = [];
    //分割忌内容文字,每行20个
    for (let i = 0; i < goods.length / 20; i++) {
      goodsArray.push(goods.substr(i * 20, 20));
    }
    goodsArray.forEach(function (value) {
      canvasCtx.setFontSize(18);
      canvasCtx.setFillStyle('#666');
      canvasCtx.setTextAlign('left');
      canvasCtx.fillText(value, 60, yOffset, 340);
      yOffset += 25;
    });
    //绘制忌下面的横线
    canvasCtx.beginPath()
    canvasCtx.setLineWidth(1)
    canvasCtx.setStrokeStyle('#009933')
    canvasCtx.moveTo(7, yOffset - 10)
    canvasCtx.lineTo(367, yOffset - 10)
    canvasCtx.stroke()
    //绘制人生格言
    var h = yOffset - 5
    yOffset += 12
    canvasCtx.setFontSize(16);
    canvasCtx.setFillStyle('#009933');
    canvasCtx.setTextAlign('center');
    canvasCtx.fillText("今日金句", 135, yOffset, 250);
    var word = this.data.motto
    //分割人生格言内容文字,每行20个
    yOffset += 24
    let wordArray = []
    for (let i = 0; i < word.length / 20; i++) {
      wordArray.push(word.substr(i * 20, 20));
    }
    wordArray.forEach(function (value) {
      canvasCtx.setFontSize(14);
      canvasCtx.setFillStyle('#009933');
      canvasCtx.setTextAlign('left');
      canvasCtx.fillText(value, 18, yOffset, 250);
      yOffset += 20;
    });
    //绘制二维码
    canvasCtx.drawImage('/i/huangli.jpg', 275, h+6, 80, 80);
    //绘制扫码提示文字
    canvasCtx.setFontSize(12);
    canvasCtx.setFillStyle('#666');
    canvasCtx.setTextAlign('left');
    canvasCtx.fillText('长按识别码更精彩', 265, h + 100);
    //绘制文字的边框线
    canvasCtx.setStrokeStyle('#009933');
    canvasCtx.setLineWidth(1)
    canvasCtx.strokeRect(7, 210, 360, h - 100);
    canvasCtx.draw();

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
                content: "已保存到相册！立即去发朋友圈",
                complete: function () {
                }
              })
            },
            fail(res) {
              console.log(res)
            }
          })
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }, 1000);

  },
  //重新加载
  restart: function (options) {
    this.laohuangli(options)
  },

})