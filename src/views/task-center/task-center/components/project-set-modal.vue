<template>
  <a-modal :width="550" v-model:visible="visible" :centered="true" @cancel="close" :maskClosable="false" :keyboard="false" :footer="null">
    <template #title>
      <b>个人待办设置</b>
    </template>
    <div class="ele-cell text-center space-around margin-bottom-10">
      <div class="pointer" v-for="(item,i) in list" :key="i" @click="openSet(item.key)">
        <img class="img" :src="item.img" />
        <div><b>{{item.name}}</b></div>
      </div>
    </div>
  </a-modal>
  <!-- 模板设置弹窗 -->
  <taskTemplateDataEdit ref="taskTemplateData"></taskTemplateDataEdit>
  <!-- 字段设置弹窗 -->
  <fieldSetModal ref="fieldSet"></fieldSetModal>
  <!-- 工作流设置弹窗 -->
  <workflowSettingsEdit ref="workflowSettings"></workflowSettingsEdit>
  <!-- 推送规则弹窗 -->
  <ruleSetModal ref="ruleSet"></ruleSetModal>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,toRef,nextTick,inject  } from 'vue';
  import taskTemplateDataEdit from '/src/views/task-engine/project-details/components/task-template-data-edit.vue';
  import fieldSetModal from './field-set-modal.vue';
  import workflowSettingsEdit from '/src/views/task-engine/project-details/components/workflow-settings-edit.vue';
  import ruleSetModal from './rule-set-modal.vue';
  const visible = ref(false);
  const list = ref([
    {key:'template',name:'模板设置',img:'/src/assets/mbsz.png'},
    {key:'field',name:'字段设置',img:'/src/assets/zdsz.png'},
    {key:'workflow',name:'工作流',img:'/src/assets/gzl.png'},
    {key:'rule',name:'推送规则',img:'/src/assets/tsgz.png'},
  ])
  const taskTemplateData = ref(null);
  const fieldSet = ref(null);
  const workflowSettings = ref(null);
  const ruleSet = ref(null);
  const openSet = (key)=> {
    switch(key){
      case 'template':
          taskTemplateData.value.open();
        break;
      case 'field':
          fieldSet.value.open();
        break;
      case 'rule':
          ruleSet.value.open();
        break;
      case 'workflow':
          workflowSettings.value.open();
        break;
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
.img{
  width: 100px;
}
</style>
