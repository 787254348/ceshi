<template>
  <a-modal :width="700" v-model:visible="visible" :centered="true"  @cancel="cancel" :maskClosable="false" :keyboard="false">
    <template #title>
      <b>处理意见</b>
    </template>
    <div class="content">
      <a-textarea v-model:value="value" placeholder="请输入处理意见" :rows="6" />
    </div>
    <template #footer>
      <a-button type="primary" @click="comfirm">提交</a-button>
      <a-button class="margin-left-10" @click="close">取消</a-button>
    </template>
  </a-modal>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,toRef,nextTick,inject  } from 'vue';
  import { message } from 'ant-design-vue';
  const visible = ref(false);
  const value = ref('');
  const comfirm = ()=>{
    if(value.value.trim()==''){
      message.warning('请输入处理意见');
    }else{
	    message.success('提交成功');
      close();
    }
  }
  const open = ()=> {
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
  .content{
    min-height: 180px;
  }
</style>
