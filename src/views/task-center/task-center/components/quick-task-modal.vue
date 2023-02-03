<template>
  <a-modal :width="550" v-model:visible="visible" :closable="false" :centered="true"  :footer="null" :title="null" class="quick-task">
    <div class="ele-cell ele-fluid">
      <a-input class="quick-task-input ele-cell-content" v-model:value="value" :bordered="false" size="large" placeholder="请输入任务标题" @pressEnter="pressEnter">
      </a-input>
      <div class="quick-button" @click="confirm"><span class="iconfont icon-tz ele-text-primary" style="font-size:30px"></span></div>
    </div>
  </a-modal>
  <!-- 创建任务普通弹窗 -->
  <createTaskDrawer ref="createTask"></createTaskDrawer>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,toRef,nextTick,inject  } from 'vue';
  import createTaskDrawer from './create-task-drawer.vue';
  const createTask = ref(null);
  const value = ref('');
  const visible = ref(false);
  //按回车键
  const pressEnter = (e)=> {
    if(value.value.trim()==''){
      close();
    }
  }
  //点击右边按钮
  const confirm = ()=> {
    createTask.value.open();
    close();
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
:global(.quick-task .ant-modal-body){
  padding: 0;
}
.quick-task-input{
  height: 55px;
}
.quick-button{
  border-left: 2px solid var(--layout-body-background);
  height: 55px;
  line-height: 55px;
  text-align: center;
  padding:0 15px;
  cursor: pointer;
}
</style>
