<template>
  <a-modal :width="700" v-model:visible="visible" :centered="true"  @cancel="cancel" :maskClosable="false" :keyboard="false" class="agree-modal">
    <template #title>
      <b>撤销</b>
    </template>
    <div class="content ele-cell justify-center">
      <img src="/src/assets/cancel.png" class="process-user-img"/>
    </div>
    <template #footer>
      <div class="flex">
        <y-editor ref="editor" v-model:valueHtml="valueHtml" :isUpload="false" :isButton="false" placeholder="请输入处理意见" style="border: 1px solid var(--border-color-base);min-height: 32px;padding: 3px 0 0 10px;line-height: 20px;width: 600px;" ></y-editor>
        <a-button class="margin-left-10" type="primary" danger @click="refuse">拒绝</a-button>
      </div>
    </template>
  </a-modal>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,toRef,nextTick,inject  } from 'vue';
  import { message } from 'ant-design-vue';
  const visible = ref(false);
  const valueHtml = ref('');
  const editor = ref(null);
  const refuse = ()=>{
    let value = editor.value.getText();
    if(value.trim()==''){
      message.warning('请输入处理意见');
    }else{
	    message.success('已拒绝');
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
  :global(.agree-modal .ant-modal-footer){
    text-align: left;
  }
  .content{
    min-height: 300px;
  }
</style>
