<template>
  <a-modal :width="550" v-model:visible="visible" :centered="true" @cancel="cancel" :maskClosable="false" :keyboard="false">
    <template #title>
      <b>选择字段</b>
    </template>
    <div style="min-height: 460px;">
      <div class="margin-bottom-10"><h6>基础字段</h6></div>
      <a-checkbox v-model:checked="data.base.priority" class="check-box">优先级</a-checkbox>

      <div class="margin-top-20"><h6>人员</h6></div>
      <a-checkbox v-model:checked="data.staff.fzr" class="check-box">负责人</a-checkbox>
      <a-checkbox v-model:checked="data.staff.cyr" class="check-box">参与人</a-checkbox>
      <a-checkbox v-model:checked="data.staff.csr" class="check-box">抄送人</a-checkbox>

      <div class="margin-top-20"><h6>时间</h6></div>
      <a-checkbox v-model:checked="data.time.start" class="check-box">预计开始</a-checkbox>
      <a-checkbox v-model:checked="data.time.end" class="check-box">截止时间</a-checkbox>

      <div class="margin-top-20"><h6>自定义字段</h6></div>
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
  const data = reactive({
    base:{
      priority:true,
    },
    staff:{
     fzr:true,
     cyr:false,
     csr:false
    },
    time:{
      start:false,
      end:false
    }
  })
  const list = ref([
    {name:'xx字段',checked:false},
    {name:'xx字段',checked:false},
    {name:'xx字段',checked:false},
    {name:'xx字段',checked:false},
    {name:'xx字段',checked:false},
    {name:'xx字段',checked:false}
  ])
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
.check-box{
  width:100px;
  margin-top:10px;
  margin-left: 0 !important;
}
</style>
