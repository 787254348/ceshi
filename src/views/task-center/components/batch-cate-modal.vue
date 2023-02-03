<template>
	<a-modal :width="400" v-model:visible="visible" :centered="true" @cancel="close" :maskClosable="false" :keyboard="false">
		<template #title>
			<b>批量修改分类</b>
		</template>
		<div class="content">
			<a-tree class="batch-cate" block-node defaultExpandAll :tree-data="treeData" @select="onSelect" />
		</div>
		<template #footer>
			<a-button type="primary" @click="save">确定</a-button>
			<a-button class="margin-left-10" @click="close">取消</a-button>
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
	const visible = ref(false);
	const treeData = [{
		title: '所有的',
		key: '所有的',
		children: [{
			title: 'parent 1-0',
			key: '0-0-0',
			children: [{
		 	title: 'leaf',
				key: '0-0-0-0',
			}, {
				title: 'leaf',
				key: '0-0-0-1',
			}],
		}, {
			title: 'parent 1-1',
			key: '0-0-1',
			children: [{
		 	key: '0-0-1-0',
				title: 'sss',
			}],
		}],
	}];
	const selectValue = ref('');
	const onSelect = (e) => {
		selectValue.value = e[0]=='所有的' ? '未分类' : e[0];
	}
	const save = ()=> {
	  if(!selectValue.value){
	    return message.warning('请选择分类');
	  }
	  emit('save',selectValue.value);
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
	.content {
		min-height: 400px;
	}

	:global(.batch-cate .ant-tree-treenode-selected) {
		background-color: var(--primary-color);
		color: #fff;
	}

	:global(.batch-cate .ant-tree-node-content-wrapper.ant-tree-node-selected) {
		background-color: unset;
	}

	:global(.batch-cate .ant-tree-node-content-wrapper:hover) {
		background-color: unset;
	}
</style>
