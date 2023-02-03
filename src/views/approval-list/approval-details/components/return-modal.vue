<template>
  <a-modal :width="700" v-model:visible="visible" :centered="true"  @cancel="cancel" :maskClosable="false" :keyboard="false" class="agree-modal">
    <template #title>
      <b>退回</b>
    </template>
    <div class="content">
      <h6>退回位置</h6>
      <div class="text-color-secondary margin-top-10">对方处理后，将会直接提交给你继续审批</div>
      <a-select
        ref="select"
        v-model:value="value"
        style="width:100%;margin-top:10px"
        :options="options"
      ></a-select>
      <h6 class="margin-top-20">退回对象</h6>
      <yUserSelect class="margin-top-10"  width="100%" mode="multiple"  v-model:value="staff"  @handleChange="handleChange"></yUserSelect>
    </div>
    <template #footer>
      <div class="flex">
        <y-editor ref="editor" v-model:valueHtml="valueHtml" :isUpload="false" :isButton="false" placeholder="请输入处理意见" style="border: 1px solid var(--border-color-base);min-height: 32px;padding: 3px 0 0 10px;line-height: 20px;width: 600px;" ></y-editor>
        <a-button class="margin-left-10" type="primary" danger @click="agree">退回</a-button>
      </div>
    </template>
  </a-modal>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,toRef,nextTick,inject  } from 'vue';
  import { message } from 'ant-design-vue';
  const props = defineProps({

  })
  const visible = ref(false);
  const options = ref([{
    value: '退回发起人',
    label: '退回发起人',
  },{
    value: '退回上一节点',
    label: '退回上一节点',
  },{
    value: '退回任意节点',
    label: '退回任意节点',
  }]);
  const value = ref('退回任意节点');
  const staff = ref([]);
  const valueHtml = ref('');
  const editor = ref(null);
  const agree = ()=>{
    let value = editor.value.getText();
    if(value.trim()==''){
      message.warning('请输入处理意见');
    }else{
	  message.success(`退回成功`);
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
