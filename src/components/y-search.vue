<template>
	<a-input v-model:value="value" :placeholder="placeholder" style="width: 250px;" @change="change" @pressEnter="pressEnter">
	  <template #prefix>
	    <span class="iconfont icon-search2 font-size-14" style="transform: scale(1.2);color: var(--text-color-secondary)"></span>
	  </template>
	</a-input>
</template>

<script setup>
	import { ref,reactive,watch,defineProps,computed,toRefs,toRef,nextTick } from 'vue';
	const props = defineProps({
        placeholder:{
          type:String,
          default:'请输入关键字搜索',
        },
	})
	const value = ref('');
	const emit = defineEmits(["change","pressEnter","update:value"]);
	const change = (e)=> {
		emit('change',e);
		emit('update:value',value.value);
	}
	const pressEnter = (e)=> {
		emit('pressEnter',e);
	}
</script>

<style>
</style>