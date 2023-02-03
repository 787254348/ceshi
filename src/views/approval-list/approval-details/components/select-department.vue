<template>
  <a-modal :width="550" v-model:visible="visible" :centered="true" @cancel="close" :maskClosable="false" :keyboard="false" :footer="null">
    <template #title>
      <b>选择申请部门</b>
    </template>
    <div class="content-item" v-for="(item,i) in list" :key="i" @click="select(item)">{{item.name}}</div>
  </a-modal>
  <!-- 再次确认页面 -->
  <approvalSubmit ref="approvalSubmitEdit"></approvalSubmit>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,toRef,nextTick,inject  } from 'vue';
  import approvalSubmit from '../approval-submit.vue';
  const visible = ref(false);
  const list = ref([
    {name:'部门1'},
    {name:'部门2'},
    {name:'部门3'}
  ])
  const approvalSubmitEdit = ref(null);
  const select = (e)=> {
    close();
    approvalSubmitEdit.value.open();
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
  .content-item{
    width: 100%;
    text-align: center;
    padding: 5px 0;
    border: 1px solid #f5f5f5;
    border-radius: 3px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .content-item:hover{
    color: #fff;
    background-color: var(--primary-color);
    border: 1px solid var(--primary-color);
  }
</style>
