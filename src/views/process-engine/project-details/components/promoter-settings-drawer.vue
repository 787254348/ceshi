<template>
    <a-drawer
      :width="600"
      placement="right"
      :closable="false"
      :visible="visible"
      class="settings-drawer"
    >
      <template #title>
        <b>发起人</b>
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
        <a-tab-pane key="operation" tab="操作">
              <table class="ele-table ele-table-border ele-table-medium">
                  <colgroup>
                      <col width="180" />
                      <col width="180" />
                      <col />
                  </colgroup>
                  <thead>
                      <tr>
                          <th>操作按钮</th>
                          <th>显示名称</th>
                          <th>启用</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(item,i) in data.data" :key="item.key">
                          <td>{{item.name}}</td>
                          <td>
                            <div v-if="clickIndex!=i" class="content" @click="onClick(i)" @mouseenter="mouseenter(i)" @mouseleave="mouseleave(i)">
                              {{item.value}}
                              <span v-show="hoverIndex == i" class="iconfont icon-edit ele-text-placeholder ele-text-small"></span>
                            </div>
                            <a-input v-else :ref="setItemRef" v-model:value="item.value" placeholder="" @focus="onFocus" @blur="onBlur"/>
                          </td>
                          <td><a-checkbox v-model:checked="item.enable" :disabled="item.disabled"></a-checkbox></td>
                      </tr>
                  </tbody>
              </table>
        </a-tab-pane>
      </a-tabs>

      <div v-show="isShow">
        <div class="margin-top-20 margin-bottom-20"><b>撤销审批</b></div>
        <a-checkbox v-model:checked="data.checked">撤销是否审批</a-checkbox>
      </div>
    </a-drawer>
    <!-- 是否保存数据弹窗 -->
    <yModal ref="modal" title="是否保存数据" :showNotOk="true" okText="保存" notOkType="link" :centered="true" @ok="save" @notOk="notOk"></yModal>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,nextTick,provide } from 'vue';
  import yModal from '@/components/y-modal/index.vue';
  const visible = ref(false);
  const modal = ref(null);
  const data = reactive({
    data:[
      {key:'submit',name:'提交',value:'提交',enable:true,disabled:true},
      {key:'cancel',name:'撤销',value:'撤销',enable:true,disabled:false},
      {key:'resubmit',name:'再次提交',value:'再次提交',enable:true,disabled:false}
    ],
    checked:false
  })
  // const data = ref([
  //   {key:'submit',name:'提交',value:'提交',enable:true,disabled:true},
  //   {key:'cancel',name:'撤销',value:'撤销',enable:true,disabled:false},
  //   {key:'resubmit',name:'再次提交',value:'再次提交',enable:true,disabled:false}
  // ])
  //const checked= ref(false);
  const defalutData = JSON.parse(JSON.stringify(data));
  // const defalutChecked = JSON.parse(JSON.stringify(checked));
  const activeKey = ref('operation');
  const clickIndex = ref(-1);
  const hoverIndex = ref(-1);
  const contentInput = ref(null);
  const isShow = computed(()=>{
    return data.data[1].enable;
  })
  // 赋值动态ref到变量
  const setItemRef = el => {
      if (el) {
          contentInput.value = el
      }
  }
  const mouseenter = (i)=> {
    hoverIndex.value = i;
  }
  const mouseleave = (i)=> {
    hoverIndex.value = -1;
  }
  const onClick = (i)=> {
    clickIndex.value = i;
    setTimeout(()=>{
      contentInput.value.focus();
    },100)
  }
  const onFocus = (e)=>{
    e.target.select()
  }
  const onBlur = ()=>{
    clickIndex.value = -1;
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
  :global(.settings-drawer .ant-drawer-body){
    padding: 0 24px 24px 24px;
  }
  :deep(.ele-table.ele-table-border th){
    height: 53px;
    border-width: 1px 0;
  }
  :deep(.ele-table.ele-table-border td){
    height: 53px;
    border-width: 1px 0;
  }
  table{
    border-left: 1px solid var(--border-color-split);
    border-right: 1px solid var(--border-color-split);
  }
  .content{
    height: 32px;
    line-height: 32px;
    cursor: pointer;
  }
  .content:hover{
    border: 1px solid var(--primary-5);
    border-radius: 2px;
    padding-left: 11px;
  }
</style>
