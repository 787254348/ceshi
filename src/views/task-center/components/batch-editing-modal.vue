<template>
  <a-modal :width="650" v-model:visible="visible" :centered="true" @cancel="close" :maskClosable="false" :keyboard="false">
    <template #title>
      <b>属性批量编辑</b>
    </template>
    <h6 class="margin-bottom-10">更新N个任务的属性</h6>
    <a-select
      ref="select"
      v-model:value="value"
      style="width: 100%"
      :options="options"
      placeholder="请选择任务属性"
      @change="onChange"
    ></a-select>
    <h6 class="margin-top-20 margin-bottom-10">更新后的属性值为</h6>
    <a-input v-if="!value" style="width: 100%;" disabled></a-input>
    <div v-else>
      <y-priority-select v-if="selectType=='priority'"  v-model:value="selectValue">
        <div class="ant-input pointer">{{selectValue || '--'}}</div>
      </y-priority-select>
      <y-user-select v-if="selectType=='user'"  mode="multiple" width="100%"  :isBody="true"></y-user-select>
      <y-date v-if="selectType=='date'" width="100%"  v-model:date="selectValue" :isModel="true" dateFormat="YYYY-MM-DD HH:mm" :showTime="true"></y-date>
    </div>
    <template #footer>
      <a-button type="primary" @click="save">确定</a-button>
      <a-button class="margin-left-10" @click="close">取消</a-button>
    </template>
  </a-modal>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,toRef,nextTick } from 'vue';
  import { message } from 'ant-design-vue';
  const emit = defineEmits(["save"]);
  const visible = ref(false);
  const value = ref(null);
  const selectValue = ref('');
  const options = ref([{
    key:'priority',
    value: '优先级',
    label: '优先级',
  }, {
    key:'user',
    value: '负责人',
    label: '负责人',
  }, {
    key:'user',
    value: '抄送人',
    label: '抄送人',
  }, {
    key:'date',
    value: '预计开始',
    label: '预计开始',
  }, {
    key:'date',
    value: '截止时间',
    label: '截止时间',
  }]);
  const selectType = computed(()=>{
    let obj = options.value.find(item=>{
      return item.value == value.value;
    })
    return obj?.key;
  })
  const onChange = (e)=>{
    console.log(11,e)
    selectValue.value = '';
  }
  const save = ()=> {
    if(!value.value){
      return message.warning('请选择内容')
    }
    if(!selectValue.value){
      return message.warning('更新属性不允许为空')
    }
    close();
  }
  const open = (data)=> {
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

</style>
