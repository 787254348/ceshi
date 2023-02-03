<template>
  <a-modal :width="500" v-model:visible="visible" :centered="true"  title="项目信息" @cancel="cancel" :maskClosable="false" :keyboard="false">
    <div class="margin-bottom-10">项目名称</div>
    <a-input v-model:value="title" placeholder="请输入项目名称" />
    <div class="margin-top-20 margin-bottom-10">项目描述</div>
    <a-textarea v-model:value="describe" placeholder="请输入项目描述" :rows="4" />
    <div class="ele-text-primary pointer margin-top-20" @click="setAuth"><span class="iconfont icon-Setting margin-right-5"></span>权限设置</div>
    <template #footer>
      <div class="ele-cell space-between">
        <a-checkbox v-model:checked="checked">停用</a-checkbox>
        <div class="ele-cell">
          <a-button type="primary" @click="save">保存</a-button>
          <a-button class="margin-left-10" @click="cancel">取消</a-button>
        </div>
      </div>
    </template>
  </a-modal>
  <!-- 是否保存数据弹窗 -->
  <yModal ref="modal" title="是否保存数据" :showNotOk="true" okText="保存" notOkType="link" :centered="true" @ok="save" @notOk="notOk"></yModal>
  <!-- 权限设置弹窗 -->
  <authEdit ref="authModal"></authEdit>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,toRef,nextTick } from 'vue';
  import { message } from 'ant-design-vue';
  import yModal from '@/components/y-modal/index.vue';
  import authEdit from './auth-edit.vue';
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
    checked:{
      type:Boolean,
      default:false
    }
  })
  const title = ref(props.title);
  const describe = ref(props.describe);
  const checked = ref(props.checked);
  const visible = ref(false);
  const modal = ref(null);
  const authModal = ref(null);
  const open = ()=> {
    title.value = props.title;
    describe.value = props.describe;
    checked.value = props.checked;
    visible.value = true;
  }
  const close = ()=> {
    visible.value = false;
  }
  //权限设置
  const setAuth = ()=> {
    authModal.value.open();
  }
  //取消
  const cancel = ()=> {
    if(title.value.trim() != props.title || describe.value.trim() != props.describe || checked.value != props.checked){
      visible.value = true;
      modal.value.open();
    }else{
      close();
    }
  }
  //不保存
  const notOk = async ()=> {
    await nextTick();
    close();
  }
  //保存
  const save = async ()=> {
    if(title.value.trim()==''){
      return message.warning('请输入项目名称');
    }
    let obj = {
      title:title.value,
      describe:describe.value,
      checked:!checked.value,
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
  .space-between{
    justify-content: space-between;
  }
  .margin-bottom-10{
    margin-bottom:10px;
  }
  .margin-top-20{
    margin-top:20px;
  }
  .margin-right-5{
    margin-right: 5px;
  }
  .pointer{
    cursor: pointer;
  }
</style>
