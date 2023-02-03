<template>
    <a-drawer
      :width="950"
      placement="right"
      :closable="false"
      :visible="visible"
      class="create-task-drawer"
    >
      <template #title>
        <a-input class="title-input" v-model:value="title" :bordered="false" :maxlength="60"  placeholder="请输入标题">
          <template #suffix>
            <span class="iconfont icon-close pointer" @click="title=''"></span>
          </template>
        </a-input>
      </template>
      <!-- <template #extra>
        <span class="iconfont icon-close pointer"  @click="close"></span>
      </template> -->
      <template #footer>
        <div class="ele-cell flex-end">
          <a-button type="primary" @click="save">保存</a-button>
          <a-button class="margin-left-8" @click="close">取消</a-button>
        </div>
      </template>
      <!-- 状态信息栏 -->
      <headerInformation></headerInformation>
      <!-- 内容 -->
      <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane key="1" tab="任务信息">
            <information></information>
          </a-tab-pane>
          <a-tab-pane key="2" tab="附件">
            <fileList></fileList>
          </a-tab-pane>
          <a-tab-pane key="3">
            <template #tab>
              <span class="iconfont icon-Setting"></span>
            </template>
            <div class="margin-bottom-10"><span class="iconfont icon-Setting margin-right-5 ele-inline-block"></span><span class="font-size-16">系统信息</span></div>
            <div class="flex ele-fluid flex-wrap">
              <div class="set-item ele-cell margin-bottom-10">
                <div class="set-item-left text-color-secondary">模板：</div>
                <y-table-select></y-table-select>
              </div>
              <div class="set-item ele-cell margin-bottom-10">
                <div class="set-item-left text-color-secondary">工作流：</div>
                <y-table-select></y-table-select>
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
  import dayjs from 'dayjs'
  import { message } from 'ant-design-vue';
  import information from '../../components/information.vue';
  import headerInformation from '../../components/header.vue';
  import fileList from '../../components/file-list.vue';
  const visible = ref(false);
  const modal = ref(null);
  const title = ref(null);

  const activeKey = ref('1');


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
    // if(JSON.stringify(setData) != JSON.stringify(defalutSetData)){
    //   modal.value.open();
    // }else{
      visible.value = false;
    //}
  };
  //暴露函数，给通过ref绑定的dom元素使用
  defineExpose({
    open,
    close
  })
</script>

<style lang="less" scoped>
:global(.title-input .ant-input:placeholder-shown){
  font-size: 16px;
}
:global(.title-input .ant-input){
  font-size: 16px;
}
.create-task-drawer .ele-cell .ele-cell-desc{
  margin-top: 2px;
}
.ele-cell .ele-cell-title{
  font-size: 16px;
}

.set-item{
  width: 33.33%;
}
.set-item-left{
  width: 100px;
  text-align: right;
}

</style>
