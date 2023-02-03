<template>
  <a-modal :width="550" v-model:visible="visible" :centered="true" @cancel="cancel" :maskClosable="false" :keyboard="false">
    <template #title>
      <b>选择字段</b>
    </template>
    <div style="min-height: 460px;">
      <div><h6>审批内容字段</h6></div>
      <a-checkbox v-for="(item,i) in list" v-model:checked="item.checked" class="check-box">{{item.name}}</a-checkbox>
    </div>
    <template #footer>
      <div>
        <a-button type="primary" @click="save">确定</a-button>
        <a-button class="margin-left-10" @click="close">取消</a-button>
      </div>
    </template>
  </a-modal>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,toRef,nextTick } from 'vue';
  import { message } from 'ant-design-vue';
  const emit = defineEmits(["save"]);
  const visible = ref(false);
  const list = ref([
    {name:'预计开始',checked:false},
    {name:'截止时间',checked:false},
    {name:'xx字段1',checked:false},
    {name:'xx字段2',checked:false},
    {name:'xx字段3',checked:false},
    {name:'xx字段4',checked:false}
  ])
  const save = ()=> {
    let data = list.value.filter(item=>{
      return item.checked == true;
    })
    emit('save',data)
    close();
  }
  const open = (data)=> {
    //设置选中的值
    list.value.forEach(item=>{
      let i = data.findIndex(childrenItem=>{
        return childrenItem.name == item.name
      })
      if(i>-1){
        item.checked = true;
      }else{
        item.checked = false;
      }
    })
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
.check-box{
  width:100px;
  margin-top:10px;
  margin-left: 0 !important;
}
</style>
