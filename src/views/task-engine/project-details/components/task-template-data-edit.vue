<template>
  <a-modal :width="800" v-model:visible="visible" :centered="true"  @cancel="cancel" :maskClosable="false" :keyboard="false" >
    <template #title>
      <b>模板消息</b>
    </template>
    <div style="height: 500px;">
      <div class="margin-bottom-10">模板名称</div>
      <a-input v-model:value="title" style="height: 40px;" placeholder="请输入模板名称" />
      <div class="margin-top-20 margin-bottom-10">选择字段</div>
      <table class="ele-table ele-table-border ele-table-stripe ele-table-medium" style="display: block;">
          <colgroup>
              <col width="40" />
              <col width="160" />
              <col width="290" />
              <col />
          </colgroup>
          <thead>
              <tr>
                  <th width="40"><em/></th>
                  <th width="160" style="color:var(--text-color-secondary);"><b>字段名称</b></th>
                  <th width="290" style="text-align: center;color:var(--text-color-secondary);"><b>默认值</b></th>
                  <th width="160" style="text-align: center;color:var(--text-color-secondary);"><b>是否必填</b></th>
                  <th width="100" style="text-align: center;color:var(--text-color-secondary);"><b>操作</b></th>
              </tr>
          </thead>
          <vue-draggable
             tag="tbody"
             item-key="id"
             v-model:list="data.list"
             :animation="300"
             handle=".demo-table-drag-handle"
             style="height: 260px;display: block;"
             class="ele-scrollbar-hover ele-scrollbar-mini"
          >
             <template #item="{ element,index }">
                <tr @mouseenter="hoverIndex=index" @mouseleave="hoverIndex=-1">
                  <td width="40" style="text-align: center;">
                      <span v-show="hoverIndex==index" class="iconfont icon-zu40 ele-text-info demo-table-drag-handle" style="cursor: move;"></span>
                  </td>
                  <td width="160">{{element.name}}</td>
                  <td width="290">
                    <a-select
                      v-if="element.type=='priority'"
                      ref="select"
                      v-model:value="element.value"
                      style="width: 100%"
                      :options="options"
                    ></a-select>
                    <y-user-select v-if="element.type=='user'" :isBody="true" mode="multiple" width="100%" v-model:value="element.value"></y-user-select>
                    <y-date v-if="element.type=='time'" width="100%" :showTime="true" dateFormat="YYYY-MM-DD HH:mm"></y-date>
                  </td>
                  <td width="160" style="text-align: center;"><a-checkbox v-model:checked="element.checked"></a-checkbox></td>
                  <td width="100" style="text-align: center;">
                      <span class="iconfont icon-close pointer" @click="dlt(index)"></span>
                  </td>
                </tr>
             </template>
          </vue-draggable>
      </table>
      <div class="ele-text-primary pointer margin-top-10" @click="addField"><span class="iconfont icon-Add ele-text-small margin-right-7"></span>添加字段</div>
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
  <!-- 字段选择窗口 -->
  <selectFieldModal ref="selectFieldEdit"></selectFieldModal>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,toRef,nextTick } from 'vue';
  import VueDraggable from 'vuedraggable';
  import { message } from 'ant-design-vue';
  import yModal from '@/components/y-modal/index.vue';
  import selectFieldModal from './select-field-modal.vue';
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
      list:[
        {name:'优先级',value:'',type:'priority',checked:false},
        {name:'负责人',value:[],type:'user',checked:false},
        {name:'开始时间',value:'',type:'time',checked:false},
        {name:'截止时间',value:'',type:'time',checked:false},
        {name:'负责人',value:[],type:'user',checked:false},
      ]
  });
  const options = ref([{
        value: '紧急',
        label: '紧急',
      }, {
        value: '快办',
        label: '快办',
      }, {
        value: '普通',
        label: '普通',
      }, {
        value: '缓办',
        label: '缓办',
      }, {
        value: '靠后',
        label: '靠后',
      }]);
  const visible = ref(false);
  const hoverIndex = ref(-1);
  const modal = ref(null);
  //删除表格记录方法
  const dlt = (i)=>{
    data.list.splice(i,1);
  }
  //添加字段方法
  const selectFieldEdit = ref(null);
  const addField = ()=> {
    selectFieldEdit.value.open();
  }
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
.ele-table{
  border: 1px solid var(--border-color-base);
}
:deep(.ele-table.ele-table-border th){
  border-width: 0;
}
:deep(.ele-table.ele-table-border td){
  border-width: 0;
}
:deep(.ele-table tbody tr:hover td){
  background-color: var(--primary-1);
}
</style>
