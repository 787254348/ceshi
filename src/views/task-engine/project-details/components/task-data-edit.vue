<template>
  <a-modal :width="500" v-model:visible="visible" :centered="true"  title="字段信息" @cancel="cancel" :maskClosable="false" :keyboard="false">
    <div class="margin-bottom-10">字段名称</div>
    <a-input v-model:value="title" placeholder="请输入字段名称" />
    <div class="margin-top-20 margin-bottom-10">填充值</div>
    <a-select
      ref="select"
      v-model:value="value1"
      style="width: 452px;"
      :options="options1"
      :allowClear="true"
    ></a-select>
    <div class="margin-top-20 margin-bottom-10">控件类型</div>
    <a-select
      ref="select"
      v-model:value="type"
      style="width: 452px;"
      :options="options2"
      :disabled="disabled"
    ></a-select>
    <div class="ele-cell">
      <div class="ele-text-primary pointer margin-top-20" @click="setAuth"><span class="iconfont icon-Setting margin-right-5"></span>权限设置</div>
      <div class="ele-text-primary pointer margin-top-20 margin-left-20" v-show="isSelect" @click="openTable"><span class="iconfont icon-a-Seticon1 margin-right-5"></span>下拉选项</div>
    </div>

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
  <!-- 下拉选项弹窗 -->
  <SimpleArchives ref="tableModal" :title="tableTitle" v-model:listData="listData" @del="dlt"></SimpleArchives>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,toRef,nextTick } from 'vue';
  import { message } from 'ant-design-vue';
  import yModal from '@/components/y-modal/index.vue';
  import SimpleArchives from '@/components/SimpleArchives/index.vue';
  import authEdit from './auth-edit.vue';
  const emit = defineEmits(["save"]);
  const props = defineProps({
    title:{
      type:String,
      default:'',
    },
    value:{
      type:String,
      default:'',
    },
    type:{
      type:String,
      default:'text',
    },
    checked:{
      type:Boolean,
      default:false
    }
  });
  const options1 = ref([{
    value: 'kh',
    label: '客户名称',
  }, {
    value: 'gys',
    label: '供应商名称',
  }, {
    value: 'jgs',
    label: '加工商名称',
  }, {
    value: 'wl',
    label: '物流名称',
  }]);
  const value1 = ref(props.value);
  const options2 = ref([{
    value: 'text',
    label: '单行文本框',
  }, {
    value: 'select',
    label: '单选下拉框',
  }, {
    value: 'multiple',
    label: '多选下拉框',
  }, {
    value: 'staff',
    label: '人员选择框',
  }, {
    value: 'date',
    label: '日期',
  }, {
    value: 'number',
    label: '数值型',
  }]);
  const type = ref(props.type);
  const disabled = ref(true);
  const title = ref(props.title);
  const describe = ref(props.describe);
  const checked = ref(props.checked);
  const visible = ref(false);
  const modal = ref(null);
  const authModal = ref(null);
  const tableModal = ref(null);
  const isSelect = computed(()=>{
    return (type.value == 'select' || type.value == 'multiple') ? true : false;
  });
  const tableTitle = computed(()=>{
    return `【${title.value}】字段下拉选项`;
  });
  watch(
    value1,
    (newValue,preValue)=>{
      if(!!newValue){
        disabled.value = false;
      }else{
        disabled.value = true;
        type.value = 'text';
      }
    }
  );
  const listData = ref([]);
  for(let i=1;i<10;i++){
     let obj ={id:i,name:'xx选项'+i,sort:i};
     listData.value.push(obj)
  }
  const dlt = (i)=>{
    tableModal.value.del(i);
  }
  //打开下拉选项表格弹窗
  const openTable = ()=>{
    tableModal.value.open();
  };
  const open = ()=> {
    title.value = props.title;
    value1.value = props.value;
    type.value = props.type;
    checked.value = !props.checked;
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
    if(title.value.trim() != props.title || value1.value.trim() != props.value || checked.value == props.checked){
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
      return message.warning('请输入字段名称');
    }
    let type_obj = options2.value.find((item)=>{
      return item.value == type.value;
    })
    let obj = {
      title:title.value,
      value:value1.value,
      type:type.value,
      type_name:type_obj.label,
      checked:checked.value,
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
  .pointer{
    cursor: pointer;
  }
</style>
