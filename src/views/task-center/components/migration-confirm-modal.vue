<template>
	<a-modal :width="600" v-model:visible="visible" :centered="true" @cancel="close" :maskClosable="false" :keyboard="false">
		<template #title>
			<div><span class="iconfont icon-warning ele-text-warning margin-right-5" ></span>将任务迁移到{{title}}</div>
		</template>
		<div class="content">
			<div>xx字段自定义</div>
			<div>xx字段自定义</div>
		</div>
		<a-checkbox class="margin-top-10" v-model:checked="checked"><span class="ele-text-danger">我已清楚转移到风险性并愿意承担对应的责任</span></a-checkbox>
		<template #footer>
			<a-button type="primary" danger :disabled="!checked" @click="save">确认迁移</a-button>
			<a-button class="margin-left-10" @click="close">我再想一想</a-button>
		</template>
	</a-modal>
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
	const emit = defineEmits(["save"]);
	const props = defineProps({
	       title:{
	         type:String,
	         default:'',
	       },
	})
	const visible = ref(false);
	const checked = ref(false)
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
	.content{
		padding: 10px;
		min-height: 120px;
		border: 1px solid var(--modal-footer-border-color-split);
	}
</style>
