

function getMonthFirstDay(m, y){
    var t = new Date();
    t.setFullYear(y);
    t.setMonth(m);
    t.setDate(1);
    // var mydate = new Date();
    // var year=y;
    // var month=m;
    // date=mydate.getDate();
    // console.log("date"+date)
    // var day=mydate.getDay();
    // console.log(day)
    // var nbsp=7-((date-day)%7);
    return t.getDay();
}

function getMonthTotalDate(m, y){
  var t = new Date();
    t.setFullYear(y);
    t.setMonth(m);
    t.setDate(0);
   console.log(t.getDate())
  
    return t.getDate();
    
    
  
}

function getFromTodayDays(d,m,y){
    var ret;
    var t = new Date();
    var t1 = new Date();
    t.setFullYear(y);
    t.setMonth(m);
    t.setDate(d);
    var days = Math.floor((t.getTime() - t1.getTime())/(24*60*60*1000));
    var ret = '今天';
    if(days == 0){
        ret = '今天';
    }
    else if(days == 1){
        ret = '明天';
    }
    else if(days == 1){
        ret = '昨天';
    }
    else if(days > 1){
        ret = days + '天后';
    }
    else if(days < -1){
        ret = 0 - days + '天前';
    }

    return ret;
}

module.exports = {
  'getMonthFirstDay': getMonthFirstDay,
  'getMonthTotalDate':getMonthTotalDate,
  'getFromTodayDays':getFromTodayDays,
}
