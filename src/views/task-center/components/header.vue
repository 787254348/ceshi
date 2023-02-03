<template>
  <div class="ele-cell space-between">
    <div class="ele-cell ele-cell-content">
        <div><span class="iconfont icon-a-lujing279" style="color:#2ad8c2;font-size: 36px;"></span></div>
        <div class="ele-cell-content">
            <div class="ele-cell-title">xx状态</div>
            <div class="ele-cell-desc font-size-12">当前状态</div>
        </div>
    </div>
    <div class="ele-cell ele-cell-content pointer">
        <div class="avatar-box">
          <img v-for="(item,i) in list" :class="'avatar-img'+list.length" :src="item.img" />
        </div>

        <div class="ele-cell-content">
            <div class="ele-cell-title ele-elip" style="width: 210px;">{{director}}</div>
            <div class="ele-cell-desc font-size-12">负责人({{list.length}})</div>
        </div>
    </div>
    <y-date dateFormat="YYYY-MM-DD HH:mm" :showTime="true" @confirm="changeDate($event,'start')">
      <div class="ele-cell ele-cell-content pointer date-box" @mouseenter="dateIndex='start'" @mouseleave="dateIndex=''">
          <div><span class="iconfont icon-ks text-color-secondary" style="font-size: 36px;"></span></div>
          <div class="ele-cell-content">
              <div class="ele-cell-title date flex space-between align-center">
                {{startDate ? showData(startDate) : '— —'}}
                <span v-show="dateIndex=='start'&&startDate" class="iconfont icon-guanbi-shi text-color-secondary ele-text-small margin-right-5" @click.stop="clearDate('start')"></span>
              </div>
              <div class="ele-cell-desc font-size-12">开始时间<span v-show="estimateDate" class="ele-text-primary margin-left-5">预计{{estimateDate}}天</span></div>
          </div>
      </div>
    </y-date>
    <y-date dateFormat="YYYY-MM-DD HH:mm"  :showTime="true" @confirm="changeDate($event,'end')">
      <div class="ele-cell ele-cell-content pointer date-box" @mouseenter="dateIndex='end'" @mouseleave="dateIndex=''">
          <div><span class="iconfont icon-jz text-color-secondary" style="font-size: 36px;"></span></div>
          <div class="ele-cell-content">
              <div class="ele-cell-title date flex space-between align-center">
                {{endDate ? showData(endDate) : '— —'}}
                <span v-show="dateIndex=='end'&&endDate" class="iconfont icon-guanbi-shi text-color-secondary ele-text-small margin-right-5" @click.stop="clearDate('end')"></span>
              </div>
              <div class="ele-cell-desc font-size-12">截止时间<span v-show="remainDate" :class="{'ele-text-danger':remainDate<0}" class="ele-text-primary margin-left-5">剩<span>{{remainDate}}</span>天</span></div>
          </div>
      </div>
    </y-date>
  </div>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,nextTick,provide } from 'vue';
  import dayjs from 'dayjs'
  import { message } from 'ant-design-vue';
  const startDate = ref('');
  const endDate = ref('');
  const dateIndex = ref('');
  const estimateDate = ref('');//预计天数
  const remainDate = ref('');//剩余天数
  const list = ref([//负责人数据
    {img:'/src/assets/2222.jpg',name:'张三'},
    {img:'/src/assets/2222.jpg',name:'张三'},
    {img:'/src/assets/2222.jpg',name:'张三'},
    {img:'/src/assets/2222.jpg',name:'张三'},
    {img:'/src/assets/2222.jpg',name:'张三'},
    {img:'/src/assets/2222.jpg',name:'张三'},
    {img:'/src/assets/2222.jpg',name:'张三'},
  ])

  //获取负责人名字数据
  const director = computed(()=>{
    let arr = [];
    list.value.forEach(item=>{
      arr.push(item.name);
    })
    return arr.join('、');
  })
  //修改开始时间，截止时间事件
  const changeDate = (e,type)=>{
    if(type=='start'){
      if(endDate.value){
        let s = dayjs(endDate.value).diff(e.date, 'second');//相差的时间
        if(s<0) return message.warning('预计开始不能大于截止时间');
      }
      startDate.value = e.date;
    }else{
      if(startDate.value){
        let s = dayjs(e.date).diff(startDate.value, 'second');//相差的时间
        if(s<0) return message.warning('截止时间不能小于预计开始');
      }
      endDate.value = e.date;
    }
    //处理预计天数和剩余时间
    if(startDate.value && endDate.value){
      let h = dayjs(endDate.value).diff(startDate.value, 'hour');//相差的小时
      estimateDate.value = parseFloat((h/24).toFixed(1));
    }else{
      estimateDate.value = '';
    }
    if(endDate.value){
      let h = dayjs(endDate.value).diff(dayjs(), 'hour');//相差的小时
      remainDate.value = parseFloat((h/24).toFixed(1));
    }else{
      remainDate.value = '';
    }
  }
  //处理开始时间，截止时间显示格式的方法
  const showData = (e)=> {
    let arr = e.split(' ');
    let dateArr = arr[0].split('-');
    let nowYear = dayjs().year();
    let date = '';
    if(dateArr[0]!=nowYear){
      date += dateArr[0]+'年';
    }
    date += `${dateArr[1]}月${dateArr[2]}日 ${arr[1]}`;
    return date;
  }
  //清除时间
  const clearDate = (type)=>{
    estimateDate.value = '';
    if(type=='start'){
      startDate.value = '';
    }else{
      endDate.value = '';
      remainDate.value = '';
    }
  }
</script>

<style lang="less" scoped>
  // 用户头像九宫格样式
  .avatar-box{
    width: 50px;
    height: 50px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    flex-wrap:wrap-reverse;
    align-items: center;
    justify-items: center;
    align-content: center;
    flex:none;
    background-color: var(--layout-body-background);
    border-radius:3px;
  }
  .avatar-img1{
    height: 98%;
    width: 98%;
  }
  .avatar-img2,.avatar-img3,.avatar-img4{
    height: 46%;
    width: 46%;
    justify-self: center;
    margin:1%
  }
  .avatar-img5,.avatar-img6,.avatar-img7,.avatar-img8,.avatar-img9{
    height: 31.166%;
    width: 31.166%;
    margin:1%
  }
  //
  .date-box:hover{
    .date{
      background-color: var(--table-header-bg);
      padding-left: 5px;
    }
  }
</style>
