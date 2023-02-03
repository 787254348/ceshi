<template>
  <a-modal :width="800" v-model:visible="visible" :centered="true" @cancel="close" :maskClosable="false" :keyboard="false" :footer="null" class="rule-set">
    <template #title>
      <b>推送规则</b>
    </template>
    <table class="ele-table ele-table-border ele-table-stripe ele-table-medium text-center" style="display: block;height: 500px;">
        <thead>
            <tr>
                <th width="90" style="text-align: center;"><b>序号</b></th>
                <th width="160" style="text-align: center;"><b>规则ID</b></th>
                <th width="200" style="text-align: center;"><b>规则名称</b></th>
                <th width="100" style="text-align: center;"><b>启用</b></th>
                <th width="250" style="text-align: center;"><b>操作</b></th>
            </tr>
        </thead>
        <tbody class="ele-scrollbar-hover ele-scrollbar-mini" style="max-height: 380px;display: block;">
          <tr v-for="(item,i) in list" :key="i">
            <td width="90" style="text-align: center;">
                {{i+1}}
            </td>
            <td width="160" style="text-align: center;">{{item.rule_id}}</td>
            <td width="200" style="text-align: center;">{{item.name}}</td>
            <td width="100" style="text-align: center;">
              <a-switch v-model:checked="item.checked" size="small"/>
            </td>
            <td width="250" style="text-align: center;">
                <div class="ele-cell justify-center">
                  <div class="pointer" @click="edit('edit',i)"><span class="iconfont icon-edit margin-right-5" ></span>编辑</div>
                  <div class="margin-left-20 pointer"  @click="edit('copy',i)"><span class="iconfont icon-a-zu6112 margin-right-5"></span>复制</div>
                  <div class="margin-left-20 pointer"  @click="dlt(i)"><span class="iconfont icon-shanchu margin-right-5"></span>删除</div>
                </div>
            </td>
          </tr>
        </tbody>
        <a-button type="dashed"  class="add-button" @click="add"><span class="iconfont icon-Add margin-right-5 ele-text-small"></span>添加规则</a-button>
    </table>
  </a-modal>
  <ruleDataEdit ref="ruleDataModal" :title="editData.title" :describe="editData.describe" :checked="editData.checked" @save="save"></ruleDataEdit>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,toRef,nextTick,inject  } from 'vue';
  import ruleDataEdit from '/src/views/task-engine/project-details/components/rule-data-edit.vue';
  const visible = ref(false);
  const list = ref([
    {rule_id:'jk13213',name:'xx通知',describe:'规则描述',checked:false},
    {rule_id:'jk13213',name:'xx通知1',describe:'规则描述',checked:false},
    {rule_id:'jk13213',name:'xx通知2',describe:'规则描述',checked:false},
    {rule_id:'jk13213',name:'xx通知',describe:'规则描述',checked:false},
    {rule_id:'jk13213',name:'xx通知',describe:'规则描述',checked:false},
    {rule_id:'jk13213',name:'xx通知',describe:'规则描述',checked:false},
  ])
  const operation = reactive({
    status:'add',
    index:-1,
  })
  //编辑弹窗记录数据
  const editData = reactive({
    title:'',
    describe:'',
    checked:false,
  })
  const ruleDataModal = ref(null);
  const add = async ()=> {
    operation.status = 'add';
    editData.title = '';
    editData.describe = '';
    editData.checked = false;
    await nextTick();
    ruleDataModal.value.open();
  }
  const edit = async (type,i)=> {
    operation.status = type;
    operation.index = i;
    editData.title = list.value[i].name;
    editData.describe = list.value[i].describe;
    editData.checked = list.value[i].checked;
    await nextTick();
    ruleDataModal.value.open();
  }
  //编辑回调接口
  const save = e=>{
    if(operation.status == 'add' || operation.status == 'copy'){
      let obj = {
        id: 4,
        rule_id:'jk13213',
        name: e.title,
        describe:e.describe,
        checked : !e.checked,
      }
      list.value.push(obj);
    }
    if(operation.status == 'edit'){
      list.value[operation.index].name = e.title;
      list.value[operation.index].describe = e.describe;
      list.value[operation.index].checked = !e.checked;
    }
  };
  const dlt = (i)=> {
    list.value.splice(i,1);
  }
  const open = ()=> {
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
:global(.rule-set .ant-modal-body){
  padding: 0;
}
.ele-table thead tr th{
  background: var(--table-header-bg);
}
.rule-set .ele-table.ele-table-border th{
  border-width: 0;
}
.rule-set .ele-table.ele-table-border td{
  border-width: 0;
}
.rule-set .ele-table tbody tr:hover td{
  background-color: var(--primary-1);
}
.add-button{
  color:var(--primary-color);
  border-color:var(--primary-color);
  background-color: var(--primary-1);
  width: 220px;
  margin-top: 20px;
}
</style>
