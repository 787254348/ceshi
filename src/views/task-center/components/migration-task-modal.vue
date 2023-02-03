<template>
	<a-modal :width="600" v-model:visible="visible" :centered="true" @cancel="close" :maskClosable="false" :keyboard="false">
		<template #title>
			<b>移动任务</b>
		</template>
		<a-alert class="warning" type="info" show-icon banner>
			<template #icon>
				<div><span class="iconfont icon-warning warning-icon"></span></div>
			</template>
			<template #message>
				<div class="flex">
					<div>注意：</div>
					<div>
						<div>1、如果目标和源项目的字段配置不一致，移动后这些字段值将被情况</div>
						<div>2、跨项目移动任务，任务的访问范围名单将被清空</div>
						<div>3、移动后，清空源任务工作流，使用目标项目的默认工作流</div>
					</div>
				</div>
			</template>
		</a-alert>
		<h6 class="margin-top-10 margin-bottom-10">目标任务</h6>
		<a-select
		  placeholder="请选择项目"
		  style="width:100%"
		  v-model:value="value1"
		  :options="options1"
		  @change="handleChange1"
		></a-select>
		<h6 class="margin-top-10 margin-bottom-10">目标工作流</h6>
		<a-select
		  placeholder="请选择工作流"
		  style="width:100%"
		  v-model:value="value2"
		  :options="options2"
		  @change="handleChange2"
		></a-select>
		<div class="margin-top-12"><b>基本信息</b></div>
		<h6 class="margin-top-10 margin-bottom-10">状态</h6>
		<a-select
		  placeholder="请选择状态"
		  style="width:100%"
		  v-model:value="value3"
		  :options="options3"
		></a-select>
		<h6 class="margin-top-10 margin-bottom-10">负责人</h6>
		<y-user-select ref="userSelect" v-model:value="user" mode="multiple" width="100%"  :isBody="true" ></y-user-select>
		<template #footer>
			<a-button type="primary" @click="confirm">确定</a-button>
			<a-button class="margin-left-10" @click="close">取消</a-button>
		</template>
	</a-modal>
	<!-- 迁移确认框 -->
	<migrationConfirmModal ref="migrationConfirm" :title="value1" @save="save"></migrationConfirmModal>
</template>

<script setup>
	import {
		ref,
		reactive,
		watch,
		defineProps,
		computed,
		toRefs,
		toRef,
		nextTick
	} from 'vue';
	import {
		message
	} from 'ant-design-vue';
	import migrationConfirmModal from './migration-confirm-modal.vue';
	const emit = defineEmits(["save"]);
	const visible = ref(false);
	const value1 = ref(null);
	const options1 = ref([{
	  value: '项目1',
	  label: '项目1',
	}, {
	  value: '项目2',
	  label: '项目2',
	}, {
	  value: '项目3',
	  label: '项目3',
	}]);
	const value2 = ref(null);
	const options2 = ref([{
	  value: '工作流1',
	  label: '工作流1',
	}, {
	  value: '工作流2',
	  label: '工作流2',
	}, {
	  value: '工作流3',
	  label: '工作流3',
	}]);
	const value3 = ref(null);
	const options3 = ref([{
	  value: '状态1',
	  label: '状态1',
	}, {
	  value: '状态2',
	  label: '状态2',
	}, {
	  value: '状态3',
	  label: '状态3',
	}]);
	const user = ref([]);
	const userSelect = ref(null);
	const handleChange1 = ()=>{
		value2.value = null;
		value3.value = null;
		userSelect.value.clear();
	}
	const handleChange2 = ()=>{
		value3.value = null;
	}
	const migrationConfirm = ref(null);
	const confirm = ()=> {
	  if(!value1.value) return message.warning('请选择目标项目');
	  if(!value3.value) return message.warning('请选择任务状态');
	  migrationConfirm.value.open();
	  save();
	}
	const save = ()=> {
		emit('save');
		close();
	}
	const open = (data) => {
		visible.value = true;
	}
	const close = () => {
		visible.value = false;
	}
	//暴露函数，给通过ref绑定的dom元素使用
	defineExpose({
		open,
		close
	})
</script>

<style lang="less" scoped>
	.warning{
		display: flex;
		align-items: baseline;
	}
	.warning-icon{
		top: 1px;
		position: relative;
	}
</style>
