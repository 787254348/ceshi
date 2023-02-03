<template>
  <a-modal width="80%"  v-model:visible="visible" :centered="true" @cancel="close" :maskClosable="false" :keyboard="false" :footer="null">
    <template #title>
      <b>批量修改父任务</b>
    </template>
	<div class="flex margin-bottom-24">
		<y-search></y-search>
		<a-button class="margin-left-20" type="primary" @click="save">批量修改</a-button>
	</div>
	<div class="table">
		<yTable
		  ref="grid"
		  v-model:listData="listData"
		  v-model:columnData="columnData"
		  :defalutData="defalutData"
		  :showPage="false"
		  style="height: calc(100vh - 250px);"
		>
		  <!-- 自定义表格方法  FirstName是自定义字段名称-->
		  <template #sort-title>
			  <div><em/><em/></div>
		  </template>
		  <template #sort="{data}">
		  	  <a-radio v-model:checked="data.data.checked" @change="change($event,data.data.id)"></a-radio>
		  </template>
		  <!-- 优先级 -->
		  <template #priority="{data}" >
		    <y-priority-select class="priority margin-left-12" v-model:value="data.data.priority" :disabled="true">
		      <div class="priority-empty" v-if="!data.data.priority">-----</div>
		    </y-priority-select>
		  </template>
		</yTable>
	</div>
  </a-modal>

</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,toRef,nextTick } from 'vue';
  import { message } from 'ant-design-vue';
  const visible = ref(false);
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
					checked:false,
        }]);
	for(let i=2;i<40;i++){
		listData.value.push({
          id: i,
          title:'任务标题'+i,
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
					checked:false,
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
  const change = (e,id)=> {
	  console.log(333,e,id)
	  listData.value.forEach((item)=>{
		  if(item.id!=id){
			  item.checked = false;
		  }
	  })
  }
  const open = (data) => {
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

</style>
