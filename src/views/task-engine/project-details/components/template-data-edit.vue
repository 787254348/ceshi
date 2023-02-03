<template>
  <a-modal :width="800" v-model:visible="visible" :centered="true"  title="消息模板配置" @cancel="cancel" :maskClosable="false" :keyboard="false" class="rule-modal">
    <div style="height: 600px;">
      <div class="ele-cell">
        <div class="margin-right-10 text-color-secondary">模板名称</div>
        <a-input class="ele-cell-content" v-model:value="data.name" placeholder="" />
      </div>
      <div class="flex margin-top-20">
        <div class="margin-right-10 text-color-secondary">模板描述</div>
        <a-textarea style="flex:1" v-model:value="data.describe" placeholder="" :rows="4" />
      </div>
      <h4 class="margin-top-20" style="margin-left: -20px;">模板内容</h4>
      <div class="ele-cell margin-top-20">
        <div class="margin-right-10 text-color-secondary">消息标题</div>
        <a-mentions
          v-model:value="data.content.title"
          placeholder=""
          :prefix="['【']"
          style="flex: 1;"
        >
          <a-mentions-option v-for="val in options" :key="val" :value="val">
            {{ val }}
          </a-mentions-option>
        </a-mentions>
      </div>
      <div class="flex margin-top-20">
        <div class="margin-right-10 text-color-secondary">消息内容</div>
        <a-mentions
          v-model:value="data.content.content"
          placeholder=""
          :prefix="['【']"
          rows="4"
          style="flex: 1;"
        >
          <a-mentions-option v-for="val in options" :key="val" :value="val">
            {{ val }}
          </a-mentions-option>
        </a-mentions>
      </div>
    </div>
    <template #footer>
      <div class="ele-cell space-between">
        <a-checkbox v-model:checked="data.checked">停用</a-checkbox>
        <div class="ele-cell">
          <a-button type="primary" @click="save">保存</a-button>
          <a-button class="margin-left-10" @click="cancel">取消</a-button>
        </div>
      </div>
    </template>
  </a-modal>
  <!-- 是否保存数据弹窗 -->
  <yModal ref="modal" title="是否保存数据" :showNotOk="true" okText="保存" notOkType="link" :centered="true" @ok="save" @notOk="notOk"></yModal>

</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,toRef,nextTick } from 'vue';
  import { message } from 'ant-design-vue';
  import yModal from '@/components/y-modal/index.vue';
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
  });
  const data = reactive({
      name:'',
      describe:'',
      checked:false,
      content:{
        title:'',
        content:''
      }
  });
  const options = ref(['xx字段','xx字段1','xx字段2','xx字段3']);
  const visible = ref(false);
  const modal = ref(null);
  let defalutData;
  const open = ()=> {
    data.name = props.title;
    data.describe = props.describe;
    data.checked = !props.checked;
    defalutData = JSON.parse(JSON.stringify(data));
    visible.value = true;
  }
  const close = ()=> {
    visible.value = false;
  }
  //取消
  const cancel = ()=> {
    if(JSON.stringify(data) != JSON.stringify(defalutData)){
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
    if(data.name.trim()==''){
      return message.warning('请输入规则名称');
    }
    let obj = {
      title:data.name,
      describe:data.describe,
      checked:data.checked,
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
  :global(.rule-modal .ant-modal-body){
    padding: 24px 120px 24px 80px;
  }
</style>
