<template>
  <a-modal :width="1000" v-model:visible="visible" :centered="true"  @cancel="cancel" :maskClosable="false" :keyboard="false" >
    <template #title>
      <b>工作流设置</b>
    </template>
    <div style="height: 400px;">
      <a-steps :current="current" class="margin-bottom-20 steps">
        <a-step title="基本信息" />
        <a-step title="状态定义" />
        <a-step title="状态流转" />
      </a-steps>
      <div v-if="current==0"  style="padding: 0 70px;">
        <div class="ele-cell">
          <div class="margin-right-10 content-left"><span class="ele-text-danger">*</span>工作流名称：</div>
          <a-input class="ele-cell-content" v-model:value="data.name" placeholder="请输入工作流名称" />
        </div>
        <div class="flex margin-top-25">
          <div class="margin-right-10 content-left">工作流描述：</div>
          <a-textarea style="flex:1" v-model:value="data.describe" placeholder="请输入工作流描述" :rows="8" />
        </div>
      </div>

      <table v-if="current==1" class="ele-table ele-table-border ele-table-stripe ele-table-medium" style="display: block;">
          <colgroup>
             <!-- <col width="40" />
              <col width="160" />
              <col width="290" />
              <col /> -->
          </colgroup>
          <thead>
              <tr>
                  <th width="40"><em/></th>
                  <th width="100"><b>状态名称</b></th>
                  <th width="160" style="text-align: center;"><b>状态描述</b></th>
                  <th width="100" style="text-align: center;"><b>状态效果</b></th>
                  <th width="100" style="text-align: center;"><b>起始状态</b></th>
                  <th width="90" style="text-align: center;"><b>审批</b></th>
                  <th width="100" style="text-align: center;"><b>结束状态</b></th>
                  <th width="100" style="text-align: center;"><b>完成状态</b></th>
                  <th width="160" style="text-align: center;"><b>操作</b></th>
              </tr>
          </thead>
          <vue-draggable
             tag="tbody"
             item-key="id"
             v-model:list="data.list"
             :animation="300"
             handle=".demo-table-drag-handle"
             style="max-height: 220px;display: block;"
             class="ele-scrollbar-hover ele-scrollbar-mini"
          >
             <template #item="{ element,index }">
                <tr @mouseenter="hoverIndex=index" @mouseleave="hoverIndex=-1">
                  <td width="40" style="text-align: center;">
                      <span v-show="hoverIndex==index" class="iconfont icon-zu40 ele-text-info demo-table-drag-handle" style="cursor: move;"></span>
                  </td>
                  <td width="100">{{element.name}}</td>
                  <td width="160" style="text-align: center;">{{element.describe}}</td>
                  <td width="100" style="text-align: center;">
                    <div class="status-effect" :style="tagStyle(element.color)"><span class="iconfont margin-right-5" :class="element.icon" :style="'color:'+element.color"></span>{{element.name}}</div>
                  </td>
                  <td width="100" style="text-align: center;">
                    <a-radio :checked="element.startChecked" @click.stop="startRadio(index)"></a-radio>
                  </td>
                  <td width="90" style="text-align: center;position: relative;">
                    <a-checkbox v-model:checked="element.approvalChecked" @change="changeApproval"></a-checkbox>
                    <span v-if="element.approvalChecked" class="iconfont icon-a-lianhe115 margin-left-10 pointer ele-text-primary" style="position: absolute;" @click="openApprovalSet"></span>
                  </td>
                  <td width="100" style="text-align: center;">
                    <a-checkbox :checked="element.endChecked" @change="endCheck(index)"></a-checkbox>
                  </td>
                  <td width="100" style="text-align: center;">
                    <a-radio :checked="element.completeChecked" @click.stop="completeRadio(index)"></a-radio>
                  </td>
                  <td width="160" style="text-align: center;">
                      <div class="ele-cell justify-center">
                        <div class="pointer" @click="edit(index)"><span class="iconfont icon-edit margin-right-5" ></span>编辑</div>
                        <div class="margin-left-20 pointer"  @click="dlt(index)"><span class="iconfont icon-shanchu margin-right-5"></span>删除</div>
                      </div>
                  </td>
                </tr>
             </template>
          </vue-draggable>
          <a-button type="primary" ghost size="large" class="add-button" @click="addStatus"><span class="iconfont icon-Add margin-right-5 ele-text-small"></span>添加状态</a-button>
      </table>

      <div v-show="current==2"  style="padding: 0 70px;">
        <DxDataGrid
          ref="grid"
          id="gridContainer"
          v-model:data-source="data.statusArr"
          key-expr="id"
          :allow-column-reordering="true"
          :allow-column-resizing="true"
          :column-auto-width="true"
          :show-borders="false"
          :show-row-lines="false"
          :show-column-lines="false"
          :rowAlternationEnabled="true"
          :focused-row-enabled="false"
          :hoverStateEnabled="true"
          columnResizingMode="widget"
        >
          <!--竖向滚动条 -->
          <DxScrolling mode="standard"></DxScrolling>
          <DxColumn
           data-field="name"
           :width="200"
            caption=""
            cell-template="name"
            :fixed="true"
            alignment="center"
            :allowReordering="false"
            :allowSorting="false"
            :allowHeaderFiltering="false"
            :allowFiltering="false"
            :allowGrouping="false"
            :allowFixing="false"
          />
          <template #name="{data}"><div style="height: 32px;line-height: 32px;">{{statusArr[data.rowIndex]}}流转到</div></template>
          <DxColumn
            v-for="(item,i) in columnData"
           :data-field="item.fieldName"
           :cell-template="item.fieldName"
           :min-width="100"
            :caption="item.columnName"
            alignment="center"
            :allowReordering="false"
            :allowSorting="false"
            :allowHeaderFiltering="false"
            :allowFiltering="false"
            :allowGrouping="false"
            :allowFixing="false"
          />
          <template v-for="(item,i) in columnData"  #[item.fieldName]="{data}">
            <div style="height: 32px;line-height: 32px;">
              <a-checkbox v-model:checked="data.data[item.fieldName]" :disabled="data.rowIndex==i"></a-checkbox>
              <span v-if="data.data[item.fieldName]" class="iconfont icon-a-lianhe115 margin-left-10 pointer" :class="data.rowIndex==i ? 'gray-color' : 'ele-text-primary'" style="position: absolute;" @click="openFieldAuth"></span>
            </div>
          </template>
        </DxDataGrid>
      </div>

    </div>
    <template #footer>
      <div class="ele-cell space-between">
        <a-checkbox v-model:checked="data.checked">停用</a-checkbox>
        <div class="ele-cell">
          <a-button type="primary" @click="save">{{current!=2 ? '保存&下一步' : '保存'}}</a-button>
          <a-button v-if="current!=2" type="primary" class="margin-left-10 ele-border-info" ghost @click="cancel">保存&退出</a-button>
          <a-button type="text" class="margin-left-10 text-color-secondary" style="background: var(--layout-body-background);" @click="goBack">取消</a-button>
        </div>
      </div>
    </template>
  </a-modal>
  <!-- 是否保存数据弹窗 -->
  <yModal ref="modal" title="是否保存数据" :showNotOk="true" okText="保存" notOkType="link" :centered="true" @ok="save" @notOk="notOk"></yModal>
  <!-- 状态信息窗口 -->
  <statusDataEdit ref="statusDataModel" :title="statusData.title" :describe="statusData.describe" :icon="statusData.icon" :color="statusData.color" @save="statusSave"></statusDataEdit>
  <!-- 审批流触发设置窗口 -->
  <approvalSetModal ref="approvalSetEdit"></approvalSetModal>
  <!-- 附加字段和权限设置窗口 -->
  <fieldAuthModal ref="fieldAuthEdit"></fieldAuthModal>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,toRef,nextTick } from 'vue';
  import {
    DxDataGrid,
    DxColumn,
    DxScrolling
  } from 'devextreme-vue/data-grid';
  import VueDraggable from 'vuedraggable';
  import { message } from 'ant-design-vue';
  import yModal from '@/components/y-modal/index.vue';
  import statusDataEdit from './status-data-edit.vue';
  import approvalSetModal from './approval-set-modal.vue';
  import fieldAuthModal from './field-auth-modal.vue';
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
  const statusArr = ref(['状态1','状态2','状态3','状态1','状态2','状态3','状态1','状态2','状态3']);
  const columnData = ref([]);
  let arr = [];
  for(let i=0;i<statusArr.value.length;i++){
    columnData.value.push({columnName:statusArr.value[i],fieldName:String(i)})
    let arr1 = {id:i,name:statusArr.value[i]};
    for(let j=0;j<statusArr.value.length;j++){
      if(i==j){
        arr1[j] = true;
      }else{
        arr1[j] = false;
      }
    }
    arr.push(arr1);
  }


  const data = reactive({
      name:'',
      describe:'',
      checked:false,
      list:[
        {name:'xx状态',describe:'xx状态说明',icon:'icon-47',color:'rgba(34, 215, 187,1)',startChecked:false,approvalChecked:false,endChecked:false,completeChecked:false},
        {name:'xx状态',describe:'xx状态说明',icon:'icon-47',color:'rgba(34, 215, 187,1)',startChecked:false,approvalChecked:false,endChecked:false,completeChecked:false},
        {name:'xx状态',describe:'xx状态说明',icon:'icon-47',color:'rgba(34, 215, 187,1)',startChecked:false,approvalChecked:false,endChecked:false,completeChecked:false},
      ],
      statusArr:arr
  });
  const visible = ref(false);
  const current = ref(2);
  const hoverIndex = ref(-1);
  const modal = ref(null);
  const statusDataModel = ref(null);
  const statusData = reactive({});
  const approvalSetEdit = ref(null);
  const fieldAuthEdit = ref(null);
  //计算状态效果的背景颜色
  const tagStyle = (color)=> {
      let v = color.replace("rgba(","");
      let arr = v.replace(")","").split(",");
      arr[3] = '0.2';
      let background = 'rgba('+arr.join(",")+')';
      return `background:${background}`
  }
  //点击起始状态
  const startRadio = (i)=>{
    if(!data.list[i].startChecked){
      if(data.list[i].endChecked){
        return message.warning('结束状态不能设为起始');
      }
      if(data.list[i].completeChecked){
        return message.warning('完成状态不能设为起始');
      }
      data.list.forEach(item=>{
        item.startChecked = false;
      })
      setTimeout(()=>{
        data.list[i].startChecked = true;
      },10)
    }
  }
  //点击结束状态
  const endCheck = (i)=>{
    if(!data.list[i].endChecked){
      if(data.list[i].startChecked){
        return message.warning('起始状态不能设为结束');
      }
      if(data.list[i].completeChecked){
        return message.warning('完成状态不能取消');
      }
      data.list[i].endChecked = true;
    }else{
      data.list[i].endChecked = false;
    }
  }
  //点击完成状态
  const completeRadio = (i)=>{
    if(!data.list[i].completeChecked){
      if(data.list[i].startChecked){
        return message.warning('起始状态不能设为完成');
      }
      data.list.forEach(item=>{
        item.completeChecked = false;
      })
      setTimeout(()=>{
        data.list[i].completeChecked = true;
        data.list[i].endChecked = true;
      },10)
    }
  }
  //审批复选框改变事件
  const changeApproval = (e)=>{
    if(e.target.checked){
      openApprovalSet();
    }
  }
  //打开审批流触发设置窗口
  const openApprovalSet = ()=>{
    approvalSetEdit.value.open();
  }
  //编辑状态
  const edit = async(i)=>{
    statusData.title = data.list[i].name
    statusData.describe = data.list[i].describe
    statusData.icon = data.list[i].icon
    statusData.color = data.list[i].color
    statusData.type = 'edit';
    statusData.index = i;
    await nextTick();
    statusDataModel.value.open();
  }
  //状态编辑的回调
  const statusSave = (obj)=> {
    if(statusData.type == 'edit'){
      data.list[statusData.index].name = obj.title
      data.list[statusData.index].describe = obj.describe
      data.list[statusData.index].icon = obj.icon
      data.list[statusData.index].color = obj.color
    }else{
      data.list.push({
        name:obj.title,
        describe:obj.describe,
        icon:obj.icon,
        color:obj.color,
        startChecked:false,
        approvalChecked:false,
        endChecked:false,
        completeChecked:false
      })
    }
  }
  //删除状态定义表格记录方法
  const dlt = (i)=>{
    data.list.splice(i,1);
  }
  //添加状态
  const addStatus = async ()=>{
    statusData.title=''
    statusData.describe=''
    statusData.icon='icon-a-lujing279'
    statusData.color='rgba(34, 215, 187,1)'
    statusData.type = 'add';
    await nextTick();
    statusDataModel.value.open();
  }

  //打开附加字段和权限设置窗口
  const openFieldAuth = ()=>{
    fieldAuthEdit.value.open();
  }
  let defalutData;
  const open = ()=> {
    current.value = 0;
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
  const save = ()=> {
    if(data.name.trim()==''){
      return message.warning('请输入工作流名称');
    }
    let obj = {
      title:data.name,
      describe:data.describe,
      checked:data.checked,
    }
    current.value += 1;
    //await nextTick();
    if(current.value>2){
      emit('save',obj);
      close();
    }
  }
  //返回上一页
  const goBack = ()=> {
    if(current.value==0){
      return close();
    }
    current.value -= 1;
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
.status-effect{
  display: inline-block;
  border-radius: 2px;
  padding: 2px 8px;
}
.steps{
  padding: 0 30px;
}
.content-left{
  width: 92px;
  text-align: right;
}
:deep(.ele-table thead tr th){
  background: var(--table-header-bg);
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
.add-button{
  border-style: dashed;
  margin: 10px 20px;
  width: calc(100% - 40px);
  background-color: var(--primary-1);
}

:deep(.dx-datagrid){
  border: 1px solid var(--border-color-base);
  max-height: 290px;
  width: calc(100% + 2px);
}
:deep(.dx-header-row > td){
  background: var(--table-header-bg);
  color: var(--heading-color);
  font-weight: 600;
  padding: 14px;
}
:deep(.dx-datagrid-table .dx-data-row.dx-state-hover:not(.dx-selection):not(.dx-row-inserted):not(.dx-row-removed):not(.dx-edit-row):not(.dx-row-focused) > td:not(.dx-row-focused)){
    background-color: var(--primary-1);
  }
:deep(.dx-datagrid .dx-row-alt > td){
  background: var(--table-row-hover-bg);
  border-top: unset;
  border-bottom: unset;
}
:deep(.dx-datagrid .dx-datagrid-rowsview .dx-freespace-row td.dx-pointer-events-none),
:deep(.dx-datagrid .dx-datagrid-headers .dx-row td.dx-pointer-events-none),
:deep(.dx-datagrid-rowsview .dx-data-row td.dx-pointer-events-none){
  border-left: unset;
  border-right: unset;
}
:deep(.dx-datagrid-headers),
:deep(.dx-datagrid-headers .dx-datagrid-table .dx-row > td){
  border-bottom: unset;
}
:deep(.dx-datagrid-headers + .dx-datagrid-rowsview){
  border-top: unset;
}
.gray-color{
  color:#dcdfe6;
}
</style>
