<template>
  <div class="table-layout">
    <div class="table-box ele-scrollbar-mini ele-scrollbar-hover">
      <table class="ele-table ele-table-border ele-table-stripe ele-table-medium">
          <thead>
              <tr>
                  <th class="text-center" v-for="(item,i) in columnData" :key="i" :width="item.width">{{item.columnName}}</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(item,i) in list" :key="i" :class="{'ele-table-active': i%2==1}">
                  <td class="ele-elip text-center" width="50">{{i+1}}</td>
                  <td class="ele-elip text-center" width="160">{{item.status}}</td>
                  <td class="ele-elip text-center" width="150">
                    <y-date placement="bottom"  :date="item.planStart" @confirm="changeDate($event,'planStart',i)">
                      <span>{{item.planStart || '— —'}}</span>
                    </y-date>
                  </td>
                  <td class="ele-elip text-center" width="150">
                    <y-date placement="bottom" :date="item.planEnd" @confirm="changeDate($event,'planEnd',i)">
                      <span>{{item.planEnd || '— —'}}</span>
                    </y-date>
                  </td>
                  <td class="ele-elip text-center" width="140">{{getDate(item.planStart,item.planEnd,'plan')}}</td>
                  <td class="ele-elip text-center" width="150">
                    <y-date placement="bottom" :date="item.realStart" dateFormat="YYYY-MM-DD HH:mm" :showTime="true"  @confirm="changeDate($event,'realStart',i)">
                      <span>{{item.realStart || '— —'}}</span>
                    </y-date>
                  </td>
                  <td class="ele-elip text-center" width="150">
                    <y-date placement="bottom" :date="item.realEnd" dateFormat="YYYY-MM-DD HH:mm" :showTime="true"  @confirm="changeDate($event,'realEnd',i)">
                      <span>{{item.realEnd || '— —'}}</span>
                    </y-date>
                  </td>
                  <td class="ele-elip text-center" width="140">{{getDate(item.realStart,item.realEnd,'real')}}</td>
                  <td class="ele-elip text-center" width="120">
                      <span v-if="!item.select" @click="item.select=!item.select">{{item.operator || '— —'}}</span>
                      <y-user-select v-if="item.select" v-model:value="item.operator" width="100%"  :isBody="true" :defaultOpen="true" @handleChange="item.select=!item.select"></y-user-select>
                  </td>

              </tr>
          </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,nextTick,provide } from 'vue';
  import dayjs from 'dayjs'
  import { message } from 'ant-design-vue';
  const columnData = ref([
    {columnName: '序号',width:50},
    {columnName: '状态',width:160},
    {columnName: '预计开始',width:150},
    {columnName: '预计结束',width:150},
    {columnName: '预计耗时',width:140},
    {columnName: '实际开始',width:150},
    {columnName: '实际完成',width:150},
    {columnName: '实际耗时',width:140},
    {columnName: '变更人',width:120},
  ])
  const list = ref([
    {status:'xx状态',planStart:'',planEnd:'2020-08-04',planDate:'2天',realStart:'2020-08-04 12:00',realEnd:'2020-08-04 12:00',realDate:'2天12小时',operator:'王老五2',select:false},
    {status:'xx状态',planStart:'',planEnd:'2020-08-04',planDate:'2天',realStart:'2020-08-04 12:00',realEnd:'2020-08-04 12:00',realDate:'2天12小时',operator:'',select:false},
  ])
  //计算耗时方法
  const getDate = (startDate,endDate,type)=>{
    let date = '— —';
    if(startDate && endDate){
      let total = dayjs(endDate).diff(startDate, 'hour');//相差的小时
      let d = parseInt(total/24);
      let h = Math.round(total%24);
      if(type=='plan'){
        date = d+'天';
      }else{
        if(h !=0){
          date = h+'小时';
          if(d!=0) date = d+'天' + date;
        }else{
          date = d+'天';
        }
      }
    }
    return date;
  }
  //修改时间事件
  const changeDate = (e,type,i)=>{
    let obj = list.value[i];
    if(type=='planStart'){
      if(obj.planEnd){
        let s = dayjs(obj.planEnd).diff(e.date, 'second');//相差的时间
        if(s<0) return message.warning('预计开始不能大于预计结束');
      }
      list.value[i].planStart = e.date;
    }
    if(type=='planEnd'){
      if(obj.planStart){
        let s = dayjs(e.date).diff(obj.planStart, 'second');//相差的时间
        if(s<0) return message.warning('预计结束不能小于预计开始');
      }
      list.value[i].planEnd = e.date;
    }
    if(type=='realStart'){
      if(obj.realEnd){
        let s = dayjs(obj.realEnd).diff(e.date, 'second');//相差的时间
        if(s<0) return message.warning('实际开始不能大于实际完成');
      }
      list.value[i].realStart = e.date;
    }
    if(type=='realEnd'){
      if(obj.realStart){
        let s = dayjs(e.date).diff(obj.realStart, 'second');//相差的时间
        if(s<0) return message.warning('实际完成不能小于实际开始');
      }
      list.value[i].realEnd = e.date;
    }
  }
</script>

<style lang="less" scoped>
  .table-layout{
    height: 400px;
    width:900px;
  }
  :deep(.ele-table.ele-table-medium th),
  :deep(.ele-table.ele-table-medium td){
    border-width: 0;
    display: inline-block;
  }
  .table-box{
    width: 100%;
    overflow-x: scroll;
    overflow-y: scroll;
    height: 100%;
  }
  .ele-table{
    display: inline-block;
    border: 1px solid var(--border-color-split);
  }
  .ele-table tr{
    display: inline-flex;
  }
  .text-center{
    text-align: center !important;
  }
</style>
