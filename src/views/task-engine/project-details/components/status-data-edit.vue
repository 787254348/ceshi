<template>
  <a-modal :width="500" v-model:visible="visible" :centered="true"  @cancel="close" :maskClosable="false" :keyboard="false">
    <template #title>
      <b>状态信息</b>
    </template>
    <div class="margin-bottom-10">状态名称<span class="ele-text-danger">*</span></div>
    <a-input v-model:value="title" placeholder="请输入状态名称" />
    <div class="flex margin-top-20">
      <div>
        <div class="margin-bottom-10">状态图标</div>
        <a-select
          ref="select"
          v-model:value="icon"
          style="width: 150px"
        >
          <a-select-option value="icon-a-lujing279"><span class="iconfont icon-a-lujing279"></span></a-select-option>
          <a-select-option value="icon-47"><span class="iconfont icon-47"></span></a-select-option>
        </a-select>
      </div>
      <div class="margin-left-30">
        <div class="margin-bottom-10">图标风格</div>
        <a-select
          ref="select1"
          :listHeight="160"
          v-model:value="color"
          style="width: 150px"
          class="status-select"
          dropdownClassName="status-select-option"
        >
          <a-select-option v-for="(item,i) in colorOptions" :value="item"><div class="status-select-item" :style="'background:'+item"></div></a-select-option>

        </a-select>
      </div>
    </div>
    <div class="margin-bottom-10">状态描述</div>
    <a-textarea v-model:value="describe" placeholder="请输入状态描述" :rows="6" />
    <template #footer>
      <div>
        <a-button type="primary" @click="save">保存</a-button>
        <a-button class="margin-left-10" @click="close">取消</a-button>
      </div>
    </template>
  </a-modal>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,toRef,nextTick } from 'vue';
  import { message } from 'ant-design-vue';
  const emit = defineEmits(["save"]);
  const props = defineProps({
    title:{
      type:String,
      default:'',
    },
    describe:{
      type:String,
      default:'',
    },
    icon:{
      type:String,
      default:'icon-a-lujing279',
    },
    color:{
      type:String,
      default:'rgba(34, 215, 187,1)',
    }
  })
  const title = ref(props.title);
  const describe = ref(props.describe);
  const icon = ref(props.icon);
  const color = ref(props.color);
  const visible = ref(false);
  const colorOptions = ref([
    'rgba(34, 215, 187,1)','rgba(24, 191, 164,1)','rgba(44, 204, 218,1)','rgba(45, 188, 255,1)','rgba(78, 138, 249,1)','rgba(112, 118, 250,1)','rgba(148, 115, 253,1)','rgba(196, 114, 238,1)','rgba(239, 126, 222,1)','rgba(249, 105, 170,1)','rgba(252, 88, 123,1)','rgba(250, 90, 85,1)','rgba(255, 119, 71,1)','rgba(255, 164, 21,1)','rgba(255, 210, 52,1)','rgba(153, 215, 90,1)','rgba(102, 192, 96,1)','rgba(57, 186, 93,1)'
  ])
  const open = ()=> {
    title.value = props.title;
    describe.value = props.describe;
    icon.value = props.icon;
    color.value = props.color;
    visible.value = true;
  }
  const close = ()=> {
    visible.value = false;
  }
  //保存
  const save = async ()=> {
    if(title.value.trim()==''){
      return message.warning('请输入状态名称');
    }
    let obj = {
      title:title.value,
      describe:describe.value,
      icon:icon.value,
      color:color.value
    }
    emit('save',obj);
    await nextTick();
    close();
  }
  //暴露函数，给通过ref绑定的dom元素使用
  defineExpose({
    open,
    close
  })
</script>

<style lang="less" scoped>
:global(.status-select .ant-select-selector){
  padding: 2px 11px 2px 2px !important;
}
:global(.status-select-option .ant-select-item){
  padding:2px 4px;
}
.status-select-item{
  width: 100%;
  height: 100%;
}
</style>
