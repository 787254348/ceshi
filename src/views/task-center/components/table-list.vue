<template>
  <yTreeTable
    ref="grid"
    :selection="true"
    :sort="false"
    v-model:listData="listData"
    v-model:columnData="columnData"
    :defalutData="defalutData"
    @rowClick="cellClick"
    @mouseover="(e)=>{ hoverIndex=e.rowIndex }"
    @mouseout="(e)=>{ hoverIndex=-1 }"
  >
    <!-- 自定义表格方法  FirstName是自定义字段名称-->
    <!-- 关注 -->
    <template #star="{data}" >
      <div class="ele-cell space-between">
        <a-dropdown :trigger="['click']" @click="openMore">
          <span v-show="data.rowIndex == hoverIndex" class="iconfont icon-more2 pointer"></span>
          <template #overlay>
            <a-menu @click="clickMenu($event,data.data.id)">
              <a-menu-item v-for="item in operationOptions" :key="item.key">{{item.name}}</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <span v-show="!data.data.star&&data.rowIndex == hoverIndex" class="iconfont icon-star pointer" @click="data.data.star=!data.data.star"></span>
        <span v-show="data.data.star&&data.rowIndex == hoverIndex" class="iconfont icon-star-filled pointer" style="color:#ffc614" @click="data.data.star=!data.data.star"></span>
      </div>
    </template>
    <!-- 完成 -->
    <template #complete="{data}" >
      <span class="iconfont icon-check-circle pointer ele-text-primary"></span>
    </template>
    <!-- 优先级 -->
    <template #priority="{data}" >
      <y-priority-select class="priority margin-left-12" v-model:value="data.data.priority">
        <div class="priority-empty" v-if="!data.data.priority">-----</div>
      </y-priority-select>
    </template>
    <!-- 审批状态 -->
    <template #status="{data}">
      <div class="ele-cell justify-center">
        <div class="dot" :style="'background:'+getColor(data.value)"></div>
        <div>{{data.value}}</div>
      </div>
    </template>
    <!-- 预计开始 -->
    <template #kssj="{data}">
      <y-date placement="bottom" :date="data.data.kssj" dateFormat="YYYY-MM-DD HH:mm" :showTime="true"  @confirm="changeTableDate($event,'kssj',data.data.id)">
        <span class="priority-empty">{{data.data.kssj || '-----'}}</span>
      </y-date>
    </template>
    <!-- 截止时间 -->
    <template #jzsj="{data,index}">
      <y-date placement="bottom" :date="data.data.jzsj" dateFormat="YYYY-MM-DD HH:mm" :showTime="true"  @confirm="changeTableDate($event,'jzsj',data.data.id)">
        <span class="priority-empty">{{data.data.jzsj || '-----'}}</span>
      </y-date>
    </template>
    <!-- 预计耗时 -->
    <template #yjhs="{data}">
      <span>{{getDate(data.data.kssj,data.data.jzsj)}}</span>
    </template>
    <!-- 剩余天数 -->
    <template #syts="{data}">
      <span :style="getRemainDate(data.data.jzsj).color">{{getRemainDate(data.data.jzsj).date}}</span>
    </template>
    <!-- 实际开始 -->
    <template #sjks="{data}">
      <y-date placement="bottom" :date="data.data.sjks" dateFormat="YYYY-MM-DD HH:mm" :showTime="true"  @confirm="changeTableDate($event,'sjks',data.data.id)">
        <span class="priority-empty">{{data.data.sjks || '-----'}}</span>
      </y-date>
    </template>
    <!-- 实际结束 -->
    <template #sjjs="{data}">
      <y-date placement="bottom" :date="data.data.sjjs" dateFormat="YYYY-MM-DD HH:mm" :showTime="true"  @confirm="changeTableDate($event,'sjjs',data.data.id)">
        <span class="priority-empty">{{data.data.sjjs || '-----'}}</span>
      </y-date>
    </template>
    <!-- 实际耗时 -->
    <template #sjhs="{data}">
      <span>{{getDate(data.data.sjks,data.data.sjjs)}}</span>
    </template>
    <!-- 负责人-->
    <template #fzr="{data}">
      <y-user-select v-model:value="data.data.fzr" mode="multiple" width="100%"  :isBody="true" :defaultOpen="true" ></y-user-select>
    </template>

  </yTreeTable>
  <!-- 任务详情页 -->
  <taskDetails ref="detailsPage"></taskDetails>
  <!-- 删除提示弹窗 -->
  <yModal ref="delModal" title="删除提示" :closable="false" :content="delTipsContent" okText="删除" :danger="true" :centered="true" @ok="dlt"></yModal>
  
	<!-- 批量状态流转窗口 -->
	<batchStatusModal ref="batchStatus"></batchStatusModal>
  <!-- 批量编辑窗口 -->
  <batchEditingModal ref="batchEdit"></batchEditingModal>
  <!-- 批量修改分类窗口 -->
  <batchCateModal ref="batchCate"></batchCateModal>
  <!-- 批量修改父任务 -->
  <batchParentTaskModal ref="batchParentTask"></batchParentTaskModal>
  <!-- 迁移任务窗口 -->
  <migrationTaskModal ref="migrationTask"></migrationTaskModal>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,nextTick,provide } from 'vue';
  import dayjs from 'dayjs';
  import { message } from 'ant-design-vue';
  import taskDetails from '../task-details/index.vue';
  import batchEditingModal from './batch-editing-modal.vue';
  import batchStatusModal from './batch-status-modal.vue';
  import batchCateModal from './batch-cate-modal.vue';
  import batchParentTaskModal from './batch-parent-task-modal.vue';
  import migrationTaskModal from './migration-task-modal.vue';
  const listData = ref([{
          id: 1,
          star:false,
          complete:'',
          number:'132131',
          title:'任务标题',
          priority: '',
          status:'已同意',
          kssj:'',
          jzsj:'',
          yjhs:'3天3小时',
          syts:'3天3小时',
          fzr:'',
          cyr:'李四',
          csr:'李四',
          bq:'标签',
          jcx:'检查项',
          sjks:'',
          sjjs:'',
          sjhs:'3天3小时',
          js:'标签',
          jsr:'检查项',
          js_sj:'2022-11-21 11:06',
          wc:'完成',
          wcr:'完成人',
          wc_sj:'2022-11-21 11:06',
          cjr:'创建人',
          cj_sj:'2022-11-21 11:06',
          bgr:'变更人',
          bg_sj:'2022-11-21 11:06',
          rwxm:'任务项目',
          rwmb:'任务模板',
          rwgzl:'任务工作流',
          parent_id:0,
        },{
          id: 2,
          star:false,
          complete:'',
          number:'132131',
          title:'任务标题',
          priority: '紧急',
          status:'已同意',
          kssj:'2022-11-21 11:06',
          jzsj:'2022-11-21 11:06',
          yjhs:'3天3小时',
          syts:'3天3小时',
          fzr:'',
          cyr:'李四',
          csr:'李四',
          bq:'标签',
          jcx:'检查项',
          sjks:'2022-11-21 11:06',
          sjjs:'2022-11-21 11:06',
          sjhs:'3天3小时',
          js:'标签',
          jsr:'检查项',
          js_sj:'2022-11-21 11:06',
          wc:'完成',
          wcr:'完成人',
          wc_sj:'2022-11-21 11:06',
          cjr:'创建人',
          cj_sj:'2022-11-21 11:06',
          bgr:'变更人',
          bg_sj:'2022-11-21 11:06',
          rwxm:'任务项目',
          rwmb:'任务模板',
          rwgzl:'任务工作流',
          parent_id:0,
        },{
          id: 3,
          star:false,
          complete:'',
          number:'132131',
          title:'任务标题',
          priority: '紧急',
          status:'已同意',
          kssj:'2022-11-21 11:06',
          jzsj:'2022-11-21 11:06',
          yjhs:'3天3小时',
          syts:'3天3小时',
          fzr:'',
          cyr:'李四',
          csr:'李四',
          bq:'标签',
          jcx:'检查项',
          sjks:'2022-11-21 11:06',
          sjjs:'2022-11-21 11:06',
          sjhs:'3天3小时',
          js:'标签',
          jsr:'检查项',
          js_sj:'2022-11-21 11:06',
          wc:'完成',
          wcr:'完成人',
          wc_sj:'2022-11-21 11:06',
          cjr:'创建人',
          cj_sj:'2022-11-21 11:06',
          bgr:'变更人',
          bg_sj:'2022-11-21 11:06',
          rwxm:'任务项目',
          rwmb:'任务模板',
          rwgzl:'任务工作流',
          parent_id:1,
        }]);
  //表头数据
  const columnData = ref([
      { id: 0, type:'string', fieldName:'star', columnName: '', visible: true,bold:false,width:50,fixed:'left',alignment:'right',hideSet:true },
      { id: 1, type:'string', fieldName:'complete', columnName: '完成', visible: true,bold:false,width:90,fixed:false,alignment:'center' },
      { id: 2, type:'string', fieldName:'number', columnName: '任务编号', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 3, type:'string', fieldName:'title', columnName: '任务标题', visible: true,bold:false,width:150,fixed:false,alignment:'left' },
      { id: 4, type:'string', fieldName:'priority', columnName: '优先级', visible: true,bold:false,width:100,fixed:false,alignment:'center' },
      { id: 5, type:'string',fieldName:'status', columnName: '当前状态', visible: true,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 6, type:'string',fieldName:'kssj', columnName: '预计开始', visible: true,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 7, type:'string',fieldName:'jzsj', columnName: '截止时间', visible: true,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 8, type:'string',fieldName:'yjhs', columnName: '预计耗时', visible: true,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 9, type:'string',fieldName:'syts', columnName: '剩余天数', visible: true,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 10, type:'string',fieldName:'fzr', columnName: '负责人', visible: true,bold:false,width:100,fixed:false,alignment:'center' },
      { id: 11, type:'string',fieldName:'cyr', columnName: '参与人', visible: true,bold:false,width:100,fixed:false,alignment:'center' },
      { id: 12, type:'string',fieldName:'csr', columnName: '抄送人', visible: true,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 13, type:'string',fieldName:'bq', columnName: '标签', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 14, type:'string',fieldName:'jcx', columnName: '检查项', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 15, type:'string',fieldName:'sjks', columnName: '实际开始', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 16, type:'string',fieldName:'sjjs', columnName: '实际结束', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 17, type:'string',fieldName:'sjhs', columnName: '实际耗时', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 18, type:'string',fieldName:'js', columnName: '结束', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 19, type:'string',fieldName:'jsr', columnName: '结束人', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 20, type:'string',fieldName:'js_sj', columnName: '结束时间', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 21, type:'string',fieldName:'wc', columnName: '完成', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 22, type:'string',fieldName:'wcr', columnName: '完成人', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 23, type:'string',fieldName:'wc_sj', columnName: '完成时间', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 24, type:'string',fieldName:'cjr', columnName: '创建人', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 25, type:'string',fieldName:'cj_sj', columnName: '创建时间', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 26, type:'string',fieldName:'bgr', columnName: '变更人', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 27, type:'string',fieldName:'bg_sj', columnName: '变更时间', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 28, type:'string',fieldName:'rwxm', columnName: '任务项目', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 29, type:'string',fieldName:'rwmb', columnName: '任务模板', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 30, type:'string',fieldName:'rwgzl', columnName: '任务工作流', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
    ]);
  const defalutData = ref(JSON.parse(JSON.stringify(columnData.value)));
  const grid = ref(null);
  const hoverIndex = ref(-1);
  const detailsPage = ref(null);
  const delModal = ref(null);
  const delTipsContent = ref(' ');//删除提示弹窗的内容
  //更多操作按钮数据
  const operationData = [
    {key:'copy',name:'复制链接'},
    {key:'edit',name:'编辑'},
    {key:'del',name:'删除'}
  ];
  //更多批量操作按钮数据
  const operationDataBatch = [
    {key:'editBatch',name:'批量编辑'},
    {key:'statusBatch',name:'批量流转状态'},
    {key:'cateBatch',name:'批量修改分类'},
    {key:'taskBatch',name:'批量修改父任务'},
    {key:'transferBatch',name:'批量迁移'},
    {key:'delBatch',name:'批量删除'}
  ];
  const operationOptions = ref(operationData);
  const operation = reactive({//当前操作状态数据
    type:'del',
    index:-1
  })
  const openMore = ()=> {
    let arr = grid.value.getSelectedRowKeys();
    if(arr.length>0){
      operationOptions.value =  operationDataBatch;
    }else{
      operationOptions.value =  operationData;
    }
  }
  
  const batchEdit = ref(null);
  const batchStatus = ref(null);
  const batchCate = ref(null);
  const batchParentTask = ref(null);
  const migrationTask = ref(null);
  const clickMenu = (e,id)=> {
    console.log(333,e,id)
    operation.type = e.key;
    operation.index = listData.value.findIndex(item=>{
      return item.id==id
    })
    switch(e.key){
      case 'copy'://复制链接
          
        break;
      case 'edit'://编辑
          detailsPage.value.open();
        break;
      case 'del'://删除
          delTipsContent.value = '删除后将不可恢复，请确认删除';
          delModal.value.open();
        break;
      case 'editBatch'://批量编辑
          batchEdit.value.open();
        break;
      case 'statusBatch'://批量流转状态
		  let arr = grid.value.getSelectedRowKeys();
		  batchStatus.value.open(arr);
        break;
      case 'cateBatch'://批量修改分类
		  batchCate.value.open();
        break;
      case 'taskBatch'://批量修改父任务
		  batchParentTask.value.open();
        break;
      case 'transferBatch'://批量迁移
		  migrationTask.value.open();
        break;
      case 'delBatch'://批量删除
          delTipsContent.value = '批量删除后将不可恢复，请确认删除';
          delModal.value.open();
        break;
    }
  }
  //删除的回调方法
  const dlt = ()=>{
    if(operation.type=='del'){//单个删除
      listData.value.splice(operation.index,1);
    }else{//批量删除

    }
    message.success('删除成功');
    grid.value.refresh();
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
  const onchange = (e)=>{
    console.log(111,e,listData.value)
    let ss = grid.value.getSelectedRowKeys();
    console.log(ss)
  }
  //计算耗时方法
  const getDate = (startDate,endDate)=>{
    let date = '-----';
    if(startDate && endDate){
      let total = dayjs(endDate).diff(startDate, 'hour');//相差的小时
      let d = parseInt(total/24);
      let h = Math.round(total%24);
      if(h !=0){
        date = h+'小时';
        if(d!=0) date = d+'天' + date;
      }else{
        date = d+'天';
      }
    }
    return date;
  }
  //计算剩余天数方法
  const getRemainDate = (endDate)=>{
    let date = '-----',color='unset';
    if(endDate){
      let total = dayjs(dayjs().format('YYYY-MM-DD HH:mm')).diff(endDate, 'hour');//相差的小时
      if(total<0){
        color='#67C23A'
      }
      if(total>0){
        color='#F56C6C'
      }
      let d = Math.abs(parseInt(total/24));
      let h = Math.abs(Math.round(total%24));
      if(h !=0){
        date = h+'小时';
        if(d!=0) date = d+'天' + date;
      }else{
        date = d+'天';
      }
    }
    let obj = {
      date,
      color:`color:${color}`
    }
    return obj;
  }
  //修改表格里时间事件
  const changeTableDate = (e,type,id)=>{
    console.log(333333,e,type,id)
    let i = listData.value.findIndex(item=>{
      return item.id==id;
    })
    let obj = listData.value[i];
    if(type=='kssj'){
      if(obj.jzsj){
        let s = dayjs(obj.jzsj).diff(e.date, 'second');//相差的时间
        if(s<0) return message.warning('预计开始不能大于截止时间');
      }
      listData.value[i].kssj = e.date;
    }
    if(type=='jzsj'){
      if(obj.kssj){
        let s = dayjs(e.date).diff(obj.kssj, 'second');//相差的时间
        if(s<0) return message.warning('截止时间不能小于预计开始');
      }
      listData.value[i].jzsj = e.date;
    }
    if(type=='sjks'){
      if(obj.sjjs){
        let s = dayjs(obj.sjjs).diff(e.date, 'second');//相差的时间
        if(s<0) return message.warning('实际开始不能大于实际结束');
      }
      listData.value[i].sjks = e.date;
    }
    if(type=='sjjs'){
      if(obj.sjks){
        let s = dayjs(e.date).diff(obj.sjks, 'second');//相差的时间
        if(s<0) return message.warning('实际结束不能小于实际开始');
      }
      listData.value[i].sjjs = e.date;
    }
  }
  //点击表格记录行事件
  const cellClick = (e)=>{
    console.log(222,e,e.event.target.dataset?.name)
    if(e.event.target?.dataset?.name && e.event.target?.dataset?.name.indexOf('title')>-1){//点击标题打开详情页
      detailsPage.value.open();
      return;
    }
  }

</script>

<style lang="less" scoped>
  .priority-empty{
    padding: 0 10px;
    cursor: pointer;
    min-height: 23px;
  }
  .priority-empty:hover{
    background-color: #f8f8f8;
    border-radius: 2px;
  }
</style>
