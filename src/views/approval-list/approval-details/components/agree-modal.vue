<template>
  <a-modal :width="700" v-model:visible="visible" :centered="true"  @cancel="cancel" :maskClosable="false" :keyboard="false" class="agree-modal">
    <template #title>
      <b>处理意见</b>
    </template>
    <div class="content">
      <div>下一节点</div>
      <div class="ele-cell margin-top-20">
        <span class="iconfont icon-wode1 ele-text-small process-icon" style="background: #e6a23c;"></span>
        审批人
      </div>
      <div class="ele-cell margin-top-20">
        <div class="margin-right-20">
          <img src="/src/assets/user.png" class="process-user-img"/>
          <div class="text-color-secondary margin-top-5 ele-text-small">刘亦菲</div>
        </div>
        <div>
          <img src="/src/assets/user.png" class="process-user-img"/>
          <div class="text-color-secondary margin-top-5 ele-text-small">刘亦菲</div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="flex">
        <y-editor ref="editor" v-model:valueHtml="valueHtml" :isUpload="false" :isButton="false" placeholder="请输入处理意见" style="border: 1px solid var(--border-color-base);min-height: 32px;padding: 3px 0 0 10px;line-height: 20px;width: 600px;" ></y-editor>
        <a-button class="margin-left-10" type="primary" @click="agree">同意</a-button>
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
  const agree = ()=>{
    let value = editor.value.getText();
    if(value.trim()==''){
      message.warning('请输入处理意见');
    }else{
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
  .process-icon{
    width: 25px;
    height: 25px;
    background: #ccc;
    text-align: center;
    line-height: 25px;
    color: #fff;
    border-radius: 50%;
    margin-right: 10px;
  }
  .process-user-img{
    width: 35px;
    height: 35px;
  }
</style>
