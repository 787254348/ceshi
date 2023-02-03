<template>
  <div class="table-layout">
    <div class="table-box ele-scrollbar-mini">
      <table class="ele-table ele-table-border ele-table-stripe ele-table-medium">
          <colgroup>
              <col width="50" />
              <col width="160" />
              <col width="100" />
              <col width="120" />
              <col />
              <col />
              <col />
          </colgroup>
          <thead>
              <tr>
                  <th class="text-center" v-for="(item,i) in columnData" :key="i" >{{item.columnName}}</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(item,i) in list" :key="i" :class="{'ele-table-active': i%2==1}">
                  <td class="ele-elip text-center" >{{i+1}}</td>
                  <td class="ele-elip text-center" >{{item.time}}</td>
                  <td class="ele-elip text-center" >{{item.operator}}</td>
                  <td class="ele-elip text-center" >{{item.type}}</td>
                  <td class="ele-elip text-center" >
                    <div v-for="childrenItem in item.field">{{childrenItem}}</div>
                  </td>
                  <td class="ele-elip text-center" >
                    <div v-for="childrenItem in item.before">{{childrenItem || '--'}}</div>
                  </td>
                  <td class="ele-elip text-center" >
                    <div v-for="childrenItem in item.after">{{childrenItem}}</div>
                  </td>
              </tr>
          </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,nextTick,provide } from 'vue';
  const columnData = ref([
    {columnName: '序号',width:50},
    {columnName: '变更时间',width:160},
    {columnName: '变更人',width:100},
    {columnName: '变更类型',width:120},
    {columnName: '变更字段',width:150},
    {columnName: '变更前',width:150},
    {columnName: '变更后',width:150},
  ])
  const list = ref([
    {time:'2020-08-04 12:00:38',operator:'王老五',type:'手动变更',field:['预计开始','截止时间'],before:['',''],after:['2020-08-04 12:00','2020-08-04 12:00']},
    {time:'2020-08-04 12:00:38',operator:'王老五',type:'手动变更',field:['完成时间'],before:['2020-08-04 12:00'],after:['2020-08-04 12:00']},
    {time:'2020-08-04 12:00:38',operator:'王老五',type:'手动变更',field:['状态'],before:['草稿'],after:['已发布']},
    {time:'2020-08-04 12:00:38',operator:'王老五',type:'手动变更',field:['优先级','需求分类','标题','创建人'],before:['',''],after:['紧急','所有的','这是任务标题','李四']},
  ])
</script>

<style lang="less" scoped>
  .table-layout{
    height: 400px;
  }
  :deep(.ele-table.ele-table-medium th),
  :deep(.ele-table.ele-table-medium td){
    border-width: 0;
  }
  .table-box{
    width: 100%;
    overflow-x: scroll;
    overflow-y: scroll;
    height: 100%;
  }
  .ele-table{
    border: 1px solid var(--border-color-split);
  }
  .text-center{
    text-align: center !important;
  }
</style>
