<template>
  <a-modal :width="800" v-model:visible="visible" :centered="true"  @cancel="cancel" :maskClosable="false" :keyboard="false" >
    <template #title>
      <b>审批流触发设置</b>
    </template>
    <div>
      <div class="ele-cell">
        <div class="ele-cell"><span class="ele-text-danger">*</span><h6>审批项目：</h6></div>
        <a-select
          v-model:value="data.project"
          placeholder="请选择审批项目"
          class="ele-cell-content"
          :options="options1"
          @change="changeProject"
        ></a-select>
      </div>
      <h6 class="margin-top-20">审批结果流转状态设置</h6>
      <div class="ele-cell margin-top-20">
        <div class="ele-cell title-left"><span class="ele-text-danger">*</span>同意</div>
        <a-select
          v-model:value="data.agree"
          placeholder="请选择同意后流转任务状态"
          class="ele-cell-content"
          :options="options2"
        ></a-select>
      </div>
      <div class="ele-cell margin-top-20">
        <div class="ele-cell title-left"><span class="ele-text-danger">*</span>拒绝</div>
        <a-select
          v-model:value="data.refuse"
          placeholder="请选择拒绝后流转任务状态"
          class="ele-cell-content"
          :options="options2"
        ></a-select>
      </div>
      <h6 class="margin-top-20 margin-bottom-10">审批字段设置</h6>
      <table class="ele-table ele-table-border ele-table-stripe ele-table-medium" style="display: block;">
          <colgroup>
              <col width="40" />
              <col width="160" />
              <col width="290" />
              <col width="160" />
              <col width="100" />
          </colgroup>
          <thead>
              <tr>
                  <th><em/></th>
                  <th style="color:var(--text-color-secondary);"><b>字段名称</b></th>
                  <th style="text-align: center;color:var(--text-color-secondary);"><b>默认值</b></th>
                  <th style="text-align: center;color:var(--text-color-secondary);"><b>是否必填</b></th>
                  <th><em/></th>
              </tr>
          </thead>
          <tbody>
                <tr v-for="(element,index) in data.fieldList">
                  <td><em/></td>
                  <td>{{element.name}}</td>
                  <td>
                    <a-select
                      v-if="element.type=='priority'"
                      v-model:value="element.value"
                      style="width: 100%"
                      :options="options"
                      placeholder="请选择优先级"
                    ></a-select>
                    <y-date v-if="element.type=='time'" width="100%" :showTime="true" dateFormat="YYYY-MM-DD HH:mm"></y-date>
                  </td>
                  <td  style="text-align: center;"><a-checkbox v-model:checked="element.checked"></a-checkbox></td>
                  <td><em/></td>
                </tr>
          </tbody>
      </table>

      <h6 class="margin-top-20 margin-bottom-10">审批内容显示字段设置</h6>
      <table class="ele-table ele-table-border ele-table-stripe ele-table-medium" style="display: block;">
          <colgroup>

          </colgroup>
          <thead>
              <tr>
                  <th width="40"><em/></th>
                  <th width="220" style="text-align: center;color:var(--text-color-secondary);"><b>审批内容字段</b></th>
                  <th width="50"></th>
                  <th width="290" style="text-align: center;color:var(--text-color-secondary);"><b>填充任务内容</b></th>
                  <th width="50"></th>
                  <th width="100" style="text-align: center;color:var(--text-color-secondary);"><b>操作</b></th>
              </tr>
          </thead>
          <vue-draggable
             tag="tbody"
             item-key="id"
             v-model:list="data.list"
             :animation="300"
             handle=".demo-table-drag-handle"
             style="height: 105px;display: block;"
             class="ele-scrollbar-hover ele-scrollbar-mini"
          >
             <template #item="{ element,index }">
                <tr @mouseenter="hoverIndex=index" @mouseleave="hoverIndex=-1">
                  <td width="40" style="text-align: center;">
                      <span v-show="hoverIndex==index" class="iconfont icon-zu40 ele-text-info demo-table-drag-handle" style="cursor: move;"></span>
                  </td>
                  <td width="220" style="text-align: center;">{{element.name}}</td>
                  <td width="50"></td>
                  <td width="290">
                    <a-select
                      v-model:value="element.value"
                      style="width: 100%"
                      :options="options3"
                    ></a-select>
                  </td>
                  <td width="50"></td>
                  <td width="100" style="text-align: center;">
                      <span class="iconfont icon-close pointer" @click="dlt(index)"></span>
                  </td>
                </tr>
             </template>
          </vue-draggable>
      </table>
      <div class="ele-text-primary pointer margin-top-10" @click="addField"><span class="iconfont icon-Add ele-text-small margin-right-7"></span>添加字段</div>
      <div class="ele-cell margin-top-20">
        <h6 class="margin-right-20">显示关联信息</h6>
        <a-switch v-model:checked="data.relationChecked" />
      </div>
      <div class="ele-cell margin-top-20">
        <h6 class="margin-right-20">显示附件信息</h6>
        <a-switch v-model:checked="data.enclosureChecked" />
      </div>
    </div>
    <template #footer>
      <a-button type="primary" @click="save">保存</a-button>
      <a-button class="margin-left-10" @click="cancel">取消</a-button>
    </template>
  </a-modal>
  <!-- 字段选择窗口 -->
  <approvalFieldModal ref="selectFieldEdit" @save="changeField"></approvalFieldModal>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,toRef,nextTick } from 'vue';
  import VueDraggable from 'vuedraggable';
  import { message } from 'ant-design-vue';
  import approvalFieldModal from './approval-field-modal.vue';
  const emit = defineEmits(["save"]);
  const props = defineProps({

  });
  const data = reactive({
      project:undefined,
      agree:undefined,
      refuse:undefined,
      fieldList:[
        {name:'优先级',value:undefined,type:'priority',checked:false},
        {name:'期望完成时间',value:'',type:'time',checked:false},
      ],
      list:[
        {name:'预计开始',value:''},
        {name:'截止时间',value:''},
      ],
      relationChecked:true,
      enclosureChecked:true,
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
  const options1 = ref([{
        value: '项目1',
        label: '项目1',
      }, {
        value: '项目2',
        label: '项目2',
      }, {
        value: '项目3',
        label: '项目3',
      }]);
  const options2 = ref([{
        value: '已评审',
        label: '已评审',
      }, {
        value: '已完成',
        label: '已完成',
      }, {
        value: '已拒绝',
        label: '已拒绝',
      }]);
  const options3 = ref([{
        value: '预计开始',
        label: '预计开始',
      }, {
        value: '截止时间',
        label: '截止时间',
      }, {
        value: '完成时间',
        label: '完成时间',
      }]);
  const visible = ref(false);
  const hoverIndex = ref(-1);
  const modal = ref(null);
  //审批项目选择变化的方法
  const changeProject = ()=> {
    data.list = [];
  }
  //删除表格记录方法
  const dlt = (i)=>{
    data.list.splice(i,1);
  }
  //添加字段方法
  const selectFieldEdit = ref(null);
  const addField = ()=> {
    if(!data.project){
      return message.warning('请选择【审批项目】选项')
    }
    selectFieldEdit.value.open(data.list);
  }
  //处理添加字段的回调
  const changeField = (e)=>{
    let arr = data.list.filter(item=>{
      let i = e.findIndex(childrenItem=>{
        return childrenItem.name == item.name
      })
      return i>-1;
    })
    e.forEach(item=>{
      let i = arr.findIndex(childrenItem=>{
        return childrenItem.name == item.name
      })
      if(i==-1){
        arr.push({name:item.name,value:''})
      }
    })
    data.list = arr;
  }
  const open = ()=> {
    visible.value = true;
  }
  const close = ()=> {
    visible.value = false;
  }
  //取消
  const cancel = ()=> {
    close();
  }
  //不保存
  const notOk = async ()=> {
    await nextTick();
    close();
  }
  //保存
  const save = async ()=> {

    let obj = {

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
.title-left{
  width: 86px;
  justify-content: flex-end;
}
</style>
