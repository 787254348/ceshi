<template>
  <!-- 查询方案弹窗 -->
  <a-modal :width="500" v-model:visible="modalVisible" :centered="true"  title="保存查询方案">
    <div class="ele-cell">
      <div>方案标题：</div>
      <a-input class="ele-cell-content" v-model:value="title" placeholder="" />
    </div>
    <div class="ele-cell margin-top-20">
      <a-popover trigger="click" placement="bottom" overlayClassName="scheme-set" v-model:visible="dateTypeVisible">
          <template #content>
            <div class="line-height-30 padding-16 content-item" v-for="(item,i) in dateTypeList" :key="i" :class="{'bg-primary ele-text-primary':item.name==dateTypeValue}" @click="selectType(item.name)">{{item.name}}</div>
          </template>
          <div class="ele-text-primary pointer ele-text-right" style="width: 70px;"><ins>{{dateTypeValue}}</ins>：</div>
      </a-popover>
      <yDateRange width="380px"></yDateRange>
    </div>
    <div class="margin-top-20" style="padding-left: 70px;">
        <a-radio-group v-model:value="radioValue" name="radioGroup">
          <a-radio value="1">仅个人可见</a-radio>
          <a-radio value="2">所有人可见</a-radio>
        </a-radio-group>
    </div>
    <template #footer>
      <a-button type="primary" @click="save">保存</a-button>
      <a-button class="margin-left-10" @click="close">取消</a-button>
    </template>
  </a-modal>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,toRef,watchEffect } from 'vue';
  import yDateRange from '@/components/y-date-range/index.vue';
  const props = defineProps({
    title:{
      type:String,
      default:'',
    },
    radioValue:{
      type:String,
      default:'1',
    },
  })
  const emit = defineEmits(["save"]);
  const modalVisible = ref(false);
  const dateTypeVisible = ref(false);
  const dateTypeList = ref([
    {name:'预计开始'},
    {name:'截止时间'},
    {name:'xx时间'}
  ]);
  const dateTypeValue = ref('预计开始');
  const selectType = value => {
    dateTypeValue.value = value;
    dateTypeVisible.value = false;
  };
  const title = ref(props.title)
  const radioValue = ref(props.radioValue)
 // const state = reactive(props);
  //const {title,radioValue} = toRefs(props);
  //  const radioValue = toRef(props,'radioValue');

  const open = ()=> {
    modalVisible.value = true;
    title.value = props.title;
    radioValue.value = props.radioValue;
  }
  const close = ()=> {
    modalVisible.value = false;
  }
  const save = ()=>{
    close();
    let obj = {
      title:title.value,
      radioValue:radioValue.value
    }
    emit('save',obj)
  }
  //暴露函数，给通过ref绑定的dom元素使用
  defineExpose({
    open,
    close
  })
</script>

<style lang="less" scoped>
  :global(.scheme-set .ant-popover-inner-content){
    padding: 12px 0;
  }
  .content-item:hover{
    background: var(--primary-1);
    color: var(--primary-color);
    cursor: pointer;
  }
  .bg-primary{
    background: var(--primary-1);
  }
  .margin-left-10{
    margin-left: 10px;
  }
  .padding-16{
    padding: 0 16px;
  }
  .line-height-30{
    line-height: 30px;
  }
  .margin-top-20{
    margin-top:20px;
  }
  .pointer{
    cursor: pointer;
  }
</style>
