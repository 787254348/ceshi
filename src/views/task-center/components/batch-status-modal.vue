<template>
  <a-modal width="80%" class="batch-status" v-model:visible="visible" :centered="true" @cancel="close" :maskClosable="false" :keyboard="false" :footer="null">
    <template #title>
      <b>批量状态流转</b>
    </template>
	<div class="flex space-between tabs">
		<div class="flex">
			<div v-for="(item,i) in statusList" :key="i" class="margin-right-40 pointer flex align-center tab-item" :class="{'tab-item-active':item.name==status}" @click="changeStatus(item.name)">{{item.name}}<span v-if="item.value!=0">({{item.value}})</span></div>
		</div>
		<a-button class="margin-bottom-10" type="primary" @click="editStatus">批量流转</a-button>
	</div>
	<div class="table">
		<yTable
		  ref="grid"
		  v-model:listData="listData"
		  v-model:columnData="columnData"
		  :defalutData="defalutData"
		  :selection="true"
		  :showPage="false"
		  style="height: calc(100vh - 250px);"
		>
		  <!-- 自定义表格方法  FirstName是自定义字段名称-->
		  <!-- 优先级 -->
		  <template #priority="{data}" >
		    <y-priority-select class="priority margin-left-12" v-model:value="data.data.priority" :disabled="true">
		      <div class="priority-empty" v-if="!data.data.priority">-----</div>
		    </y-priority-select>
		  </template>
		</yTable>
	</div>
  </a-modal>
  <!-- 状态流转窗口 -->
  <stateAdjustmentModal ref="stateAdjustmentEdit"></stateAdjustmentModal>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,toRef,nextTick } from 'vue';
  import { message } from 'ant-design-vue';
  import stateAdjustmentModal from './state-adjustment-modal.vue';
  const visible = ref(false);
  const status = ref('待处理')
  const statusList = ref([
    { name:'待处理', value:2},
    { name:'xx状态', value:0},
    { name:'x状态', value:2},
    { name:'其他状态', value:6}
  ])
  const changeStatus = (value)=>{
	  status.value = value;
  }
  const listData = ref([{
          id: 1,
          title:'任务标题',
		  order:'【采购订单】CDD2204070011',
          priority: '紧急',
          kssj:'2022-11-21 11:06',
          jzsj:'2022-11-21 11:06',
          fzr:'张三',
          cyr:'李四',
          csr:'李四',
          cjr:'创建人',
          bgr:'变更人',
          bg_sj:'2022-11-21 11:06',
        }]);
	for(let i=2;i<40;i++){
		listData.value.push({
          id: i,
          title:'任务标题',
		  order:'【采购订单】CDD2204070011',
          priority: '紧急',
          kssj:'2022-11-21 11:06',
          jzsj:'2022-11-21 11:06',
          fzr:'张三',
          cyr:'李四',
          csr:'李四',
          cjr:'创建人',
          bgr:'变更人',
          bg_sj:'2022-11-21 11:06',
        })
	}
  //表头数据
  const columnData = ref([
      { id: 2, type:'string', fieldName:'title', columnName: '任务标题', visible: true,bold:false,width:150,fixed:false,alignment:'left' },
	  { id: 3, type:'string', fieldName:'order', columnName: '关联单号', visible: true,bold:false,width:250,fixed:false,alignment:'left' },
      { id: 4, type:'string', fieldName:'priority', columnName: '优先级', visible: true,bold:false,width:100,fixed:false,alignment:'center' },
      { id: 5, type:'string',fieldName:'bg_sj', columnName: '状态变更时间', visible: true,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 6, type:'string',fieldName:'kssj', columnName: '预计开始', visible: true,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 7, type:'string',fieldName:'jzsj', columnName: '截止时间', visible: true,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 8, type:'string',fieldName:'fzr', columnName: '负责人', visible: true,bold:false,width:100,fixed:false,alignment:'center' },
	  { id: 9, type:'string',fieldName:'bgr', columnName: '变更人', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 11, type:'string',fieldName:'cyr', columnName: '参与人', visible: true,bold:false,width:100,fixed:false,alignment:'center' },
      { id: 12, type:'string',fieldName:'csr', columnName: '抄送人', visible: true,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 24, type:'string',fieldName:'cjr', columnName: '创建人', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
    ]);
  const defalutData = ref(JSON.parse(JSON.stringify(columnData.value)));
  const stateAdjustmentEdit = ref(null);
  const grid = ref(null);
  const editStatus = async ()=> {
	let arr = await grid.value.getSelectedRowKeys();
	if(arr.length==0) return message.warning('请选择记录行!');
	stateAdjustmentEdit.value.open();
  }
  const open = (arr)=> {
	setTimeout(()=>{
		grid.value.selectRows([1]);
	},100)
    visible.value = true;
  }
  const close = ()=> {
    visible.value = false;
  }
  //暴露函数，给通过ref绑定的dom元素使用
  defineExpose({
    open,
    close
  })
</script>

<style lang="less" scoped>
	:global(.batch-status .ant-modal-body){
		padding: 0;
	}
	.tabs{
		padding:14px 24px 0;
		border-bottom: 1px solid var(--modal-header-border-color-split);
	}
	.table{
		padding:24px;
	}
	.tab-item:hover{
		color: var(--primary-color);
	}
	.tab-item-active{
		color: var(--primary-color);
		border-bottom: 2px solid var(--primary-color);
	}
</style>
