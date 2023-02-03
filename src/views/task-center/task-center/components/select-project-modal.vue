<template>
  <a-modal :width="550" v-model:visible="visible" :centered="true" @cancel="close" :maskClosable="false" :keyboard="false" :footer="null">
    <template #title>
      <b>选择项目</b>
    </template>
    <a-input class="select-project-input margin-bottom-20" v-model:value="value" placeholder="搜索项目">
      <template #prefix>
        <span class="iconfont icon-search1 text-color-secondary pointer"></span>
      </template>
    </a-input>
    <div class="ele-scrollbar-hover ele-scrollbar-mini" style="height: 400px;">
      <div class="content-item" v-for="(item,i) in listData" :key="i" @click="select(item)">{{item.name}}</div>
    </div>
  </a-modal>

</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,toRef,nextTick,inject  } from 'vue';
  const value = ref('');
  const visible = ref(false);
  const list = ref([
    {name:'项目1'},
    {name:'项目2'},
    {name:'项目3'},
    {name:'项目1'},
    {name:'项目2'},
  ])
  const listData  = computed(()=>{
    if(value.value.trim()==''){
      return list.value;
    }else{
      let result = list.value.filter((item)=>{
        return item.name.indexOf(value.value)>-1;
      })
      return result;
    }
  })
  const select = (e)=> {
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
  :global(.select-project-input .ant-input-group-addon){
    display: none;
  }
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
