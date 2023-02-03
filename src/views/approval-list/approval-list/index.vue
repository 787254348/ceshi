<template>
  <div class="ele-body">
      <div class="ele-cell">
        <a-select
          ref="select"
          v-model:value="search.name"
          style="width: 160px;"
          allowClear
          showSearch
          :options="options"
          class="approval-list-select"
        ></a-select>
        <div v-for="(item,i) in statusList" :key="i" class="margin-left-40 pointer text-color-secondary" :class="{'tab-item-active':item.name==search.status}" @click="changeStatus(item.name)">{{item.name}}({{item.value}})</div>
        <div class="ele-cell flex-end ele-cell-content">
            <SelectDate v-model:startDate="startDate" v-model:endDate="endDate" v-model:type="type" offsetStyle="margin-left:-260px"></SelectDate>
            <SchemeSettings className="margin-left-40"></SchemeSettings>
        </div>
      </div>
      <div class="ant-card ant-card-body title margin-top-16">
        <yTable
          ref="grid"
          v-model:listData="listData"
          v-model:columnData="columnData"
          :defalutData="defalutData"
          style="height: calc(100vh - 250px);"
          @rowClick="cellClick"
          @mouseover="(e)=>{ hoverIndex=e.rowIndex }"
          @mouseout="(e)=>{ hoverIndex=-1 }"
        >
          <!-- 自定义表格方法  FirstName是自定义字段名称-->
          <!-- 关注 -->
          <template #star="{data}" >
            <span v-show="!data.data.star&&data.rowIndex == hoverIndex" class="iconfont icon-star pointer" @click="data.data.star=!data.data.star"></span>
            <span v-show="data.data.star&&data.rowIndex == hoverIndex" class="iconfont icon-star-filled pointer" style="color:#ffc614" @click="data.data.star=!data.data.star"></span>
          </template>
          <!-- 优先级 -->
          <template #priority="{data}" >
            <yPrioritySelect class="priority" v-model:value="data.data.priority" @change="onchange">

            </yPrioritySelect>
          </template>
          <!-- 审批状态 -->
          <template #approval_status="{data}">
            <div class="ele-cell justify-center">
              <div class="dot" :style="'background:'+getColor(data.value)"></div>
              <div>{{data.value}}</div>
            </div>
          </template>
          <!-- 操作 -->
          <template #operation="{data}">
            <div class="ele-cell justify-center ele-text-primary">
              <div class="pointer" @click.stop="edit('edit',data)"><span class="iconfont icon-rename margin-right-5" ></span>转交</div>
              <div class="margin-left-20 pointer"  @click.stop="edit('copy',data)"><span class="iconfont icon-fuzhi margin-right-5"></span>抄送</div>
            </div>
          </template>
        </yTable>
        <approvalDetails ref="detailsPage"></approvalDetails>
      </div>
  </div>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,nextTick,provide } from 'vue';
  import approvalDetails from '../approval-details/index.vue';
  const search = reactive({
    name:'全部项目',
    status:'待处理',
  })
  const options = ref([
    {
      value:'全部项目',
      label:'全部项目',
    },
    {
      value:'项目1',
      label:'项目1',
    },
    {
      value:'项目2',
      label:'项目2',
    }
  ])
  const statusList = ref([
    { name:'待处理', value:2},
    { name:'已处理', value:2},
    { name:'抄送我', value:2},
    { name:'已发送', value:2},
    { name:'全部', value:2}
  ])
  const grid = ref(null);
  const type = ref('预计开始');
  const startDate = ref('');
  const endDate = ref('');
  const detailsPage = ref(null);
  const listData = ref([{
          id: 1,
          star:false,
          project:'采购订单-单价审批',
          priority: '紧急',
          proposer: '张三',
          approval_status:'审批中',
          order:'【采购订单】CDD2232134321',
          tj_sj:'2022-11-21',
          qwwc_sj:'2022-11-21',
          handle:'李四',
          process_id:'131321313',
          process_name:'流程名称',
          department:'申请部门',
          fq_sj:'2022-11-21',
          sy_sj:'2022-11-21',
          wc_sj:'2022-11-21',
        },{
          id: 2,
          star:false,
          project:'采购订单-单价审批',
          priority: '紧急',
          proposer: '张三',
          approval_status:'已同意',
          order:'【采购订单】CDD2232134321',
          tj_sj:'2022-11-21',
          qwwc_sj:'2022-11-21',
          handle:'李四',
          process_id:'131321313',
          process_name:'流程名称',
          department:'申请部门',
          fq_sj:'2022-11-21',
          sy_sj:'2022-11-21',
          wc_sj:'2022-11-21',
        }]);
  //表头数据
  const columnData = ref([
      { id: 0, type:'string', fieldName:'star', columnName: '', visible: true,bold:false,width:20,fixed:'left',alignment:'right',hideSet:true },
      { id: 1, type:'string', fieldName:'project', columnName: '审批项目', visible: true,bold:false,width:150,fixed:false,alignment:'left' },
      { id: 2, type:'string', fieldName:'priority', columnName: '优先级', visible: true,bold:false,width:100,fixed:false,alignment:'center' },
      { id: 3, type:'string',fieldName:'proposer', columnName: '申请人', visible: true,bold:false,width:100,fixed:false,alignment:'center' },
      { id: 4, type:'string',fieldName:'approval_status', columnName: '审批状态', visible: true,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 5, type:'string',fieldName:'order', columnName: '关联单据', visible: true,bold:false,width:150,fixed:false,alignment:'left' },
      { id: 6, type:'string',fieldName:'tj_sj', columnName: '提交时间', visible: true,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 7, type:'string',fieldName:'qwwc_sj', columnName: '期望完成时间', visible: true,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 8, type:'string',fieldName:'handle', columnName: '当前处理人', visible: true,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 9, type:'string',fieldName:'process_id', columnName: '流程ID', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 10, type:'string',fieldName:'process_name', columnName: '流程名称', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 11, type:'string',fieldName:'department', columnName: '申请部门', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 12, type:'string',fieldName:'fq_sj', columnName: '发起时间', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 13, type:'string',fieldName:'sy_sj', columnName: '剩余时间', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 14, type:'string',fieldName:'wc_sj', columnName: '完成时间', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 15, type:'string',fieldName:'operation', columnName: '操作', visible: true,bold:false,width:150,fixed:'right',alignment:'center',hideSet:true },
    ]);
  const defalutData = ref(JSON.parse(JSON.stringify(columnData.value)));
  const hoverIndex = ref(-1);
  //点击顶部状态标签
  const changeStatus = (value)=>{
    search.status = value;
  }
  //获取审批状态圆点颜色
  const getColor = (value)=>{
    switch(value){
      case '审批中':
        return '#e6a23c';
        break;
      case '已同意':
        return '#67c23a';
        break;
      case '已拒绝':
        return '#f56c6c';
        break;
      case '已退回':
        return '#fb723f';
        break;
      case '已撤销':
        return '#c8c9cc';
        break;
      case '已确认':
        return '#409eff';
        break;
      case '确认中':
        return '#e6a23c';
        break;
      case '已抄送':
        return '#409eff';
        break;
    }
  }
  //优先级选择的回调
  const onchange = async (e)=>{
    console.log(111,e,listData.value)
    // let ss = await grid.value.getSelectedRowKeys();
    // console.log(ss)

  }
  //点击表格记录行事件
  const cellClick = (e)=>{
    console.log(222,e,e.event.target.className)
    if(e.event.target.className.indexOf('priority')>-1) return;//点击表格优先级，阻止打开详情页
    detailsPage.value.open();
  }
</script>

<style lang="less" scoped>
  :global(.approval-list-select .ant-select-selector){
    background: none !important;
  }
  .tab-item-active{
    color: var(--primary-color);
    border-bottom: 1px solid var(--primary-color);
  }
  .dot{
    width: 8px;
    height: 8px;
    background: #c8c9cc;
    border-radius: 50%;
    margin-right: 5px;
  }
</style>
