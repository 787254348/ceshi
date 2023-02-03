<template>
  <a-modal :width="700" v-model:visible="visible" :centered="true"  @cancel="cancel" :maskClosable="false" :keyboard="false" class="agree-modal">
    <template #title>
      <b>{{title}}</b>
    </template>
    <div class="content">
      <h6>{{title}}对象</h6>
      <yUserSelect class="margin-top-20"  width="650px" mode="multiple"  v-model:value="staff" :placeholder="placeholder"  @handleChange="handleChange"></yUserSelect>
    </div>
    <template #footer>
      <div class="flex">
        <y-editor ref="editor" v-model:valueHtml="valueHtml" :isUpload="false" :isButton="false" placeholder="请输入处理意见" style="border: 1px solid var(--border-color-base);min-height: 32px;padding: 3px 0 0 10px;line-height: 20px;width: 600px;" ></y-editor>
        <a-button class="margin-left-10" type="primary" @click="agree">{{title}}</a-button>
      </div>
    </template>
  </a-modal>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,toRef,nextTick,inject  } from 'vue';
  import { message } from 'ant-design-vue';
  const props = defineProps({
	  title:{
	    type:String,
	    default:'转交',
	  },
  })
  const visible = ref(false);
  const title = ref(props.title);
  const staff = ref([]);
  const valueHtml = ref('');
  const editor = ref(null);
  const placeholder = computed(()=>{
    return title.value=='转交' ? '请输入关键字搜索' : '请选择抄送对象';
  })
  const agree = ()=>{
    let value = editor.value.getText();
    if(value.trim()==''){
      message.warning('请输入处理意见');
    }else{
	  message.success(`${title.value}成功`);
      close();
    }
  }
  const open = ()=> {
    title.value = props.title;
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
  :global(.agree-modal .ant-modal-footer){
    text-align: left;
  }
  .content{
    min-height: 300px;
  }
  .process-icon{
    width: 25px;
    height: 25px;
    background: #ccc;
    text-align: center;
    line-height: 25px;
    color: #fff;
    border-radius: 50%;
    margin-right: 10px;
  }
  .process-user-img{
    width: 35px;
    height: 35px;
  }
</style>
