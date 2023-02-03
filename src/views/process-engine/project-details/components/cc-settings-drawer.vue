<template>
    <a-drawer
      :width="600"
      placement="right"
      :closable="false"
      :visible="visible"
      class="settings-drawer"
    >
      <template #title>
        <b>抄送人<span class="iconfont icon-edit ele-text-placeholder margin-left-10"></span></b>
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
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="set" tab="抄送人设置">
          <div><b>抄送人设置</b></div>
          <a-radio-group v-model:value="setData.set" name="radioGroup" class="flex">
            <a-radio class="margin-top-10 width-23" value="member">指定成员</a-radio>
            <a-radio class="margin-top-10 width-23" value="role">指定角色</a-radio>
            <a-radio class="margin-top-10 width-23" value="approval">流程参与人</a-radio>
          </a-radio-group>
          <a-checkbox class="margin-top-10" v-model:checked="setData.applyChecked">提交申请时，允许发起人修改当前节点处理人</a-checkbox>
          <!-- 指定成员 -->
          <div v-show="setData.set=='member'">
            <div class="margin-top-20"><b>选择抄送人</b></div>
            <yUserSelect class="margin-top-5"  width="550px" mode="multiple"   v-model:value="setData.staff"  @handleChange="handleChange"></yUserSelect>
          </div>
          <!-- 指定角色 -->
          <div v-show="setData.set=='role'">
            <div class="margin-top-20"><b>选择角色</b></div>
            <div class="input-style settings-drawer-tag ant-input margin-top-10 pointer">
              <a-tag v-for="(item,i) in setData[setData.set]" class="margin-top-2 margin-bottom-2" closable @close="log" color="var(--select-selection-item-bg)">{{item.name}}</a-tag>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-drawer>
    <!-- 是否保存数据弹窗 -->
    <yModal ref="modal" title="是否保存数据" :showNotOk="true" okText="保存" notOkType="link" :centered="true" @ok="save" @notOk="notOk"></yModal>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,nextTick,provide } from 'vue';
  import { message } from 'ant-design-vue';
  import yModal from '@/components/y-modal/index.vue';
  const visible = ref(false);
  const modal = ref(null);
  const setData = reactive({
    set:'member',
    applyChecked:false,
    staff:[],
    role:[
      {name:'张三'},
      {name:'张三'},
      {name:'张三'},
      {name:'张三'},
      {name:'张三'},
      {name:'张三'},
      {name:'张三'},
      {name:'张三'},
      {name:'张三'},
      {name:'张三'},
    ],
  });
  const defalutSetData = JSON.parse(JSON.stringify(setData));
  const activeKey = ref('set');
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
    if(JSON.stringify(setData) != JSON.stringify(defalutSetData)){
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
  :global(.settings-drawer .ant-drawer-body){
    padding: 0 24px 24px 24px;
  }
  :global(.settings-drawer .ant-tabs){
    height: 100%;
  }
  .width-23{
    width: 23%;
  }
  .settings-drawer-tag .ant-tag-has-color{
      color: #000;
  }
  :global(.settings-drawer-tag .ant-tag-has-color .anticon-close){
      color: #969799;
  }
  .input-style{
    width: 550px;
    padding: 1px 4px;
    min-height: 32px;
  }
</style>
