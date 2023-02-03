<template>
    <a-drawer
      :width="600"
      placement="right"
      :closable="false"
      :visible="visible"
    >
      <template #title>
        <b>全局设置</b>
      </template>
      <template #extra>
        <span class="iconfont icon-close pointer"  @click="close"></span>
      </template>
      <template #footer>
        <div class="ele-cell flex-end">
          <a-button type="primary" @click="save">保存</a-button>
          <a-button class="margin-left-8" @click="close">取消</a-button>
        </div>
      </template>
      <b>异常处理</b>
      <div class="margin-top-20"><span class="ele-text-danger">*</span>当系统获取不到审批人时，处理情况如下</div>
      <div class="ele-cell margin-top-20">
        <a-radio-group v-model:value="data.approvalStatus" name="radioGroup">
          <a-radio value="1">自动同意</a-radio>
          <a-radio value="2">提交指定成员</a-radio>
        </a-radio-group>
        <a-tooltip>
          <template #title><span class="ele-text-danger">*</span>获取不到指定成员时，自动同意</template>
          <span class="iconfont icon-47" ></span>
        </a-tooltip>
      </div>
      <yUserSelect class="margin-top-10" v-show="data.approvalStatus=='1'" width="550px" mode="multiple"  v-model="data.staff"  @handleChange="handleChange"></yUserSelect>
      <div class="margin-top-20"><b>自动审批</b></div>
      <a-radio-group v-model:value="data.approvalProcess">
        <a-radio class="margin-top-20"  value="1">当下一节点处理人跟当前节点处理人一致时，下一节点自动同意</a-radio>
        <a-radio class="margin-top-20"  value="2">当流程中重复出现同一处理人（包含发起人），只需处理第一次其他节点自动同意</a-radio>
        <a-radio class="margin-top-20" value="3">不做处理，依次审批</a-radio>
      </a-radio-group>
       <div class="margin-top-20 margin-bottom-20"><b>抄送设置</b></div>
      <a-checkbox v-model:checked="data.checked">允许抄送</a-checkbox>
    </a-drawer>
    <!-- 是否保存数据弹窗 -->
    <yModal ref="modal" title="是否保存数据" :showNotOk="true" okText="保存" notOkType="link" :centered="true" @ok="save" @notOk="notOk"></yModal>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,nextTick,provide } from 'vue';
  import yUserSelect from '@/components/y-user-select/y-user-select.vue';
  import yModal from '@/components/y-modal/index.vue';
  const visible = ref(false);
  const modal = ref(null);
  const data = reactive({
    approvalStatus:'1',
    staff:[],
    approvalProcess:'1',
    checked:false,
  })
  const defalutData = JSON.parse(JSON.stringify(data));
  //员工选择回调
  const handleChange = (arr)=> {
    console.log(66,arr)
    data.staff = arr;
  }
  //保存
  const save = ()=> {
    visible.value = false;
  }
  //不保存
  const notOk = ()=> {
    visible.value = false;
  }
  const open = () => {
    visible.value = true;
  };
  const close = () => {
    console.log(111,data,defalutData)
    if(JSON.stringify(data) != JSON.stringify(defalutData)){
      modal.value.open();
    }else{
      visible.value = false;
    }
  };
  //暴露函数，给通过ref绑定的dom元素使用
  defineExpose({
    open,
    close
  })
</script>

<style lang="less" scoped>
</style>
