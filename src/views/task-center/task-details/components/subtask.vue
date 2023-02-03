<template>
  <div>
    <div class="ele-cell space-between margin-bottom-20">
      <div class="top-tag ele-cell text-color-secondary pointer" @click="createTask">
        <span class="iconfont icon-kscj margin-right-5 ele-inline-block"></span>
        快速创建子任务
      </div>
      <div class="top-tag ele-cell text-color-secondary pointer">
        <span class="iconfont icon-zrw margin-right-5 ele-inline-block"></span>
        查看完整父子任务
      </div>
    </div>
    <div style="height:390px">
      <tableList></tableList>
    </div>
  </div>
  <!-- 快速创建任务弹窗 -->
  <quickTaskModal ref="quickTask"></quickTaskModal>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,nextTick,provide } from 'vue';
  import { message } from 'ant-design-vue';
  import tableList from '../../components/table-list.vue';
  import quickTaskModal from '../../task-center/components/quick-task-modal.vue';
  const quickTask = ref(null);
  const createTask = ()=> {
    quickTask.value.open();
  }
</script>

<style lang="less" scoped>
  .top-tag:hover{
    color: var(--primary-color);
  }
</style>
