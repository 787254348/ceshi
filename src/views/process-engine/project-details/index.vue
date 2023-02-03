<template>
    <div class="ele-body">
        <div class="ant-card ant-card-body title">
          <h6>项目详情</h6>
          <div @click="openSet('global')">全局设置</div>
          <div @click="openSet('promoter')">发起人节点设置</div>
          <div @click="openSet('approver')">审批人节点设置</div>
          <div @click="openSet('executor')">执行人节点设置</div>
          <div @click="openSet('cc')">抄送人节点设置</div>
          <div @click="openSet('condition')">分支条件节点设置</div>

        </div>
        <div class="ant-card ant-card-body project-produce margin-bottom-20">
          <div class="ele-elip margin-bottom-20">项目ID：787545313</div>
          <div class="ele-elip margin-bottom-20">项目名称：采购订单</div>
          <div class="ele-elip margin-bottom-20">项目描述：采购订单询价、单价审核</div>
          <div class="ele-elip">创建人：彭于晏</div>
          <div class="ele-elip">创建时间：2022-04-08</div>
        </div>
        <div class="project-centent ant-card">
            <a-tabs v-model:activeKey="activeKey">
              <a-tab-pane v-for="(item,key) in tableData" :key="key" :tab="item.title">
                <yTable
                  :ref="setItemRef"
                  v-model:listData="item.listData"
                  v-model:columnData="item.columnData"
                  :defalutData="item.defalutData"
                  :showPage="false"
                  style="height: calc(100vh - 370px);"
                >
                  <!-- 自定义表格方法  FirstName是自定义字段名称-->
                  <template #enable="{data}">
                    <a-switch v-model:checked="data.data.enable" size="small" @change="changeEnable(data.row.rowIndex)"/>
                  </template>
                  <template #name="{data}">
                    <div class="pointer" @click="editDataModal(data)">{{data.value}}</div>
                  </template>
                  <template #operation="{data}">
                    <!-- 字段操作栏 -->
                    <div class="ele-cell justify-center" v-show="activeKey=='field'">
                      <div class="pointer" @click="openAuthModal(data)"><span class="iconfont icon-Setting margin-right-5" ></span>权限</div>
                      <div class="margin-left-20 pointer"  @click="openSelect(data)"><span class="iconfont icon-a-Seticon1 margin-right-5"></span>选项</div>
                      <a-dropdown trigger="click" placement="bottom">
                         <div class="margin-left-20 pointer"><span class="iconfont icon-menu margin-right-5"></span>更多</div>
                         <template #overlay>
                           <a-menu v-model:visible="visible" @click="handleMenuClick($event,data.row.rowIndex)">
                             <a-menu-item key="copy">
                               <span class="iconfont icon-edit margin-right-5"></span>复制
                             </a-menu-item>
                             <a-menu-item key="del">
                               <span class="iconfont icon-shanchu margin-right-5"></span>删除
                             </a-menu-item>
                           </a-menu>
                         </template>
                       </a-dropdown>
                    </div>
                    <!-- 流程操作栏 -->
                    <div class="ele-cell justify-center" v-show="activeKey=='process' || activeKey=='rule' || activeKey=='template'">
                      <div class="pointer" @click="handleMenuClick({key:'edit'},data.row.rowIndex)"><span class="iconfont icon-edit margin-right-5" ></span>编辑</div>
                      <div class="margin-left-20 pointer"  @click="handleMenuClick({key:'copy'},data.row.rowIndex)"><span class="iconfont icon-fuzhi margin-right-5"></span>复制</div>
                      <div class="margin-left-20 pointer"  @click="handleMenuClick({key:'del'},data.row.rowIndex)"><span class="iconfont icon-shanchu margin-right-5"></span>删除</div>
                    </div>
                  </template>
                </yTable>
              </a-tab-pane>
            <!--  <a-tab-pane key="流程" tab="流程">


              </a-tab-pane> -->
              <template #rightExtra>
                <div class="ele-cell">
                  <a-switch v-model:checked="checked" size="small" class=" margin-right-5"/>
                  <span>显示停用</span>
                  <a-button type="primary" class="ele-cell margin-left-20" @click="add"><span class="iconfont icon-plus-square margin-right-5"></span>添加{{tableData[activeKey].title}}</a-button>
                </div>

              </template>
            </a-tabs>



            <!-- 停用确认提示弹窗 -->
            <yModal ref="modal" title="停用确认" :closable="false" :content="modalContent" okText="停用"  :centered="true" @ok="ok"></yModal>
            <!-- 启用确认提示弹窗 -->
            <yModal ref="enableModal" title="启用确认" :closable="false" content="启用当前流程将关闭原启用流程,请确认启用" okText="启用"  :centered="true" @ok="ok"></yModal>
            <!-- 删除提示弹窗 -->
            <yModal ref="delModal" title="删除提示" :closable="false" content="删除后将不可恢复,请确认删除" okText="删除" :danger="true" :centered="true" @ok="dlt"></yModal>
            <!-- 编辑字段信息弹窗 -->
           <taskDataEdit ref="editModal" :title="editData.title" :describe="editData.describe" :checked="editData.checked" @save="save"></taskDataEdit>
           <!-- 编辑流程信息弹窗 -->
           <processDataEdit ref="processEditModal" :title="editData.title" :describe="editData.describe"  @save="save"></processDataEdit>
           <!-- 权限设置弹窗 -->
           <authEdit ref="authModal"></authEdit>
           <!-- 下拉选项弹窗 -->
           <SimpleArchives ref="tableModal" :title="tableTitle" v-model:listData="selectListData" @del="dltSelect"></SimpleArchives>
           <!-- 推送触发规则配置弹窗 -->
           <ruleDataEdit ref="ruleEditModal" :title="editData.title" :describe="editData.describe" :checked="editData.checked" @save="save"></ruleDataEdit>
           <!-- 消息模板配置弹窗 -->
           <templateDataEdit ref="templateEditModal" :title="editData.title" :describe="editData.describe" :checked="editData.checked" @save="save"></templateDataEdit>
           <!-- 全局设置侧边栏窗口 -->
           <globalSettingsDrawer ref="setModal"></globalSettingsDrawer>
           <promoterSettingsDrawer ref="promoterSetModal"></promoterSettingsDrawer>
           <approverSettingsDrawer ref="approverSetModal"></approverSettingsDrawer>
           <executorSettingsDrawer ref="executorSetModal"></executorSettingsDrawer>
           <ccSettingsDrawer ref="ccSetModal"></ccSettingsDrawer>
           <conditionSettingsDrawer ref="conditionSetModal"></conditionSettingsDrawer>
        </div>
    </div>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,nextTick,provide } from 'vue';
  import { message } from 'ant-design-vue';
  import yTable from '@/components/y-table/index.vue';
  import yModal from '@/components/y-modal/index.vue';
  import taskDataEdit from './components/task-data-edit.vue';
  import processDataEdit from './components/process-data-edit.vue';
  import authEdit from './components/auth-edit.vue';
  import SimpleArchives from '@/components/SimpleArchives/index.vue';
  import ruleDataEdit from './components/rule-data-edit.vue';
  import templateDataEdit from './components/template-data-edit.vue';
  import globalSettingsDrawer from './components/global-settings-drawer.vue';
  import promoterSettingsDrawer from './components/promoter-settings-drawer.vue';
  import approverSettingsDrawer from './components/approver-settings-drawer.vue';
  import executorSettingsDrawer from './components/executor-settings-drawer.vue';
  import ccSettingsDrawer from './components/cc-settings-drawer.vue';
  import conditionSettingsDrawer from './components/condition-settings-drawer.vue';
  const activeKey = ref('field');
  //列表数据
  const listData = [{
          id: 1,
          project_id:'56452313164651x',
          name: '字段1',
          project_description: 'prospero',
          creator:'张三',
          creation_time:'2022-11-21',
          update_person:'李四',
          update_time:'2022-11-21',
          enable : true,
        }, {
          id: 2,
          project_id:'56452313164651x',
          name: '字段2',
          project_description: 'prospero',
          creator:'张三',
          creation_time:'2022-11-21',
          update_person:'李四',
          update_time:'2022-11-21',
          enable : true,
        }, {
          id: 3,
          project_id:'56452313164651x',
          name: '字段3',
          project_description: 'prospero',
          creator:'张三',
          creation_time:'2022-11-21',
          update_person:'李四',
          update_time:'2022-11-21',
          enable : true,
        }];
    const listData1 = [{
            id: 1,
            project_id:'56452313164651x',
            name: '字段1',
            project_description: 'prospero',
            creator:'张三',
            creation_time:'2022-11-21',
            update_person:'李四',
            update_time:'2022-11-21',
            enable : false,
          }, {
            id: 2,
            project_id:'56452313164651x',
            name: '字段2',
            project_description: 'prospero',
            creator:'张三',
            creation_time:'2022-11-21',
            update_person:'李四',
            update_time:'2022-11-21',
            enable : false,
          }, {
            id: 3,
            project_id:'56452313164651x',
            name: '字段3',
            project_description: 'prospero',
            creator:'张三',
            creation_time:'2022-11-21',
            update_person:'李四',
            update_time:'2022-11-21',
            enable : false,
          }];
  const listData2 = [{
          id: 1,
          project_id:'56452313164651x',
          name: '规则名称1',
          project_description: 'prospero',
          creator:'张三',
          creation_time:'2022-11-21',
          update_person:'李四',
          update_time:'2022-11-21',
          enable : false,
        }, {
          id: 2,
          project_id:'56452313164651x',
          name: '规则名称2',
          project_description: 'prospero',
          creator:'张三',
          creation_time:'2022-11-21',
          update_person:'李四',
          update_time:'2022-11-21',
          enable : false,
        }, {
          id: 3,
          project_id:'56452313164651x',
          name: '规则名称3',
          project_description: 'prospero',
          creator:'张三',
          creation_time:'2022-11-21',
          update_person:'李四',
          update_time:'2022-11-21',
          enable : false,
        }];
  const listData3 = [{
          id: 1,
          project_id:'56452313164651x',
          name: '规则名称1',
          project_description: 'prospero',
          creator:'张三',
          creation_time:'2022-11-21',
          update_person:'李四',
          update_time:'2022-11-21',
          enable : false,
        }, {
          id: 2,
          project_id:'56452313164651x',
          name: '规则名称2',
          project_description: 'prospero',
          creator:'张三',
          creation_time:'2022-11-21',
          update_person:'李四',
          update_time:'2022-11-21',
          enable : false,
        }, {
          id: 3,
          project_id:'56452313164651x',
          name: '规则名称3',
          project_description: 'prospero',
          creator:'张三',
          creation_time:'2022-11-21',
          update_person:'李四',
          update_time:'2022-11-21',
          enable : false,
        }];
  //表头数据
  const columnData = [
      { id: 1, type:'string', fieldName:'project_id', columnName: '字段ID', visible: true,bold:false,width:200,fixed:false,alignment:'center' },
      { id: 2, type:'string', fieldName:'name', columnName: '字段名称', visible: true,bold:false,width:200,fixed:false,alignment:'center' },
      { id: 3, type:'string',fieldName:'project_description', columnName: '来源ID', visible: true,bold:false,width:200,fixed:false,alignment:'center' },
      { id: 4, type:'string',fieldName:'creator', columnName: '创建人', visible: false,bold:false,width:100,fixed:false,alignment:'center' },
      { id: 5, type:'string',fieldName:'creation_time', columnName: '创建时间', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 6, type:'string',fieldName:'update_person', columnName: '修改人', visible: false,bold:false,width:100,fixed:false,alignment:'center' },
      { id: 7, type:'string',fieldName:'update_time', columnName: '修改时间', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 8, type:'Boolean',fieldName:'enable', columnName: '启用', visible: true,bold:false,width:100,fixed:false,alignment:'center' },
      { id: 9, type:'string',fieldName:'operation', columnName: '设置', visible: true,bold:false,width:300,fixed:false,alignment:'center' },
    ]
    const columnData1 = [
        { id: 1, type:'string', fieldName:'project_id', columnName: '流程ID', visible: true,bold:false,width:200,fixed:false,alignment:'center' },
        { id: 2, type:'string', fieldName:'name', columnName: '流程名称', visible: true,bold:false,width:200,fixed:false,alignment:'center' },
        { id: 3, type:'string',fieldName:'project_description', columnName: '流程描述', visible: true,bold:false,width:200,fixed:false,alignment:'center' },
        { id: 4, type:'string',fieldName:'creator', columnName: '创建人', visible: false,bold:false,width:100,fixed:false,alignment:'center' },
        { id: 5, type:'string',fieldName:'creation_time', columnName: '创建时间', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
        { id: 6, type:'string',fieldName:'update_person', columnName: '修改人', visible: false,bold:false,width:100,fixed:false,alignment:'center' },
        { id: 7, type:'string',fieldName:'update_time', columnName: '修改时间', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
        { id: 8, type:'Boolean',fieldName:'enable', columnName: '启用', visible: true,bold:false,width:100,fixed:false,alignment:'center' },
        { id: 9, type:'string',fieldName:'operation', columnName: '设置', visible: true,bold:false,width:300,fixed:false,alignment:'center' },
      ]
    const columnData2 = [
        { id: 1, type:'string', fieldName:'project_id', columnName: '规则ID', visible: true,bold:false,width:200,fixed:false,alignment:'center' },
        { id: 2, type:'string', fieldName:'name', columnName: '规则名称', visible: true,bold:false,width:200,fixed:false,alignment:'center' },
        { id: 3, type:'string',fieldName:'project_description', columnName: '规则描述', visible: false,bold:false,width:200,fixed:false,alignment:'center' },
        { id: 4, type:'string',fieldName:'creator', columnName: '创建人', visible: false,bold:false,width:100,fixed:false,alignment:'center' },
        { id: 5, type:'string',fieldName:'creation_time', columnName: '创建时间', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
        { id: 6, type:'string',fieldName:'update_person', columnName: '修改人', visible: false,bold:false,width:100,fixed:false,alignment:'center' },
        { id: 7, type:'string',fieldName:'update_time', columnName: '修改时间', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
        { id: 8, type:'Boolean',fieldName:'enable', columnName: '启用', visible: true,bold:false,width:100,fixed:false,alignment:'center' },
        { id: 9, type:'string',fieldName:'operation', columnName: '设置', visible: true,bold:false,width:300,fixed:false,alignment:'center' },
      ]
    const columnData3 = [
        { id: 1, type:'string', fieldName:'project_id', columnName: '模板ID', visible: true,bold:false,width:200,fixed:false,alignment:'center' },
        { id: 2, type:'string', fieldName:'name', columnName: '模板名称', visible: true,bold:false,width:200,fixed:false,alignment:'center' },
        { id: 3, type:'string',fieldName:'project_description', columnName: '模板描述', visible: false,bold:false,width:200,fixed:false,alignment:'center' },
        { id: 4, type:'string',fieldName:'creator', columnName: '创建人', visible: false,bold:false,width:100,fixed:false,alignment:'center' },
        { id: 5, type:'string',fieldName:'creation_time', columnName: '创建时间', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
        { id: 6, type:'string',fieldName:'update_person', columnName: '修改人', visible: false,bold:false,width:100,fixed:false,alignment:'center' },
        { id: 7, type:'string',fieldName:'update_time', columnName: '修改时间', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
        { id: 8, type:'Boolean',fieldName:'enable', columnName: '启用', visible: true,bold:false,width:100,fixed:false,alignment:'center' },
        { id: 9, type:'string',fieldName:'operation', columnName: '设置', visible: true,bold:false,width:300,fixed:false,alignment:'center' },
      ]
  //const defalutData = ref(JSON.parse(JSON.stringify(columnData)));
  const setModal = ref(null);
  const promoterSetModal = ref(null);
  const approverSetModal = ref(null);
  const executorSetModal = ref(null);
  const ccSetModal = ref(null);
  const conditionSetModal = ref(null);
  const openSet = (value)=>{
    if(value=='global'){
      setModal.value.open();
    }
    if(value=='promoter'){
      promoterSetModal.value.open();
    }
    if(value=='approver'){
      approverSetModal.value.open();
    }
    if(value=='executor'){
      executorSetModal.value.open();
    }
    if(value=='cc'){
      ccSetModal.value.open();
    }
    if(value=='condition'){
      conditionSetModal.value.open();
    }
  }


  const grid = ref(null);
  const search = ref('');
  const checked = ref(false);
  const visible = ref(false);
  const modal = ref(null);
  const modalContent = ref('');
  const delModal = ref(null);
  const editModal = ref(null);
  const enableModal = ref(null);
  const processEditModal = ref(null);
  const authModal = ref(null);
  const tableModal = ref(null);
  const ruleEditModal = ref(null);
  const templateEditModal = ref(null);
  const operation = reactive({
    status:'edit',//当前操作状态
    index:0//当前操作的下标值
  })
   // 赋值动态ref到变量
  const setItemRef = el => {
      if (el) {
          grid.value = el
      }
  }
  const tableData = reactive({
    field:{
      title:'字段',
      listData:listData,
      columnData:columnData,
      defalutData:JSON.parse(JSON.stringify(columnData))
    },
    process:{
      title:'流程',
      listData:listData1,
      columnData:columnData1,
      defalutData:JSON.parse(JSON.stringify(columnData1))
    },
    rule:{
      title:'推送规则',
      listData:listData2,
      columnData:columnData2,
      defalutData:JSON.parse(JSON.stringify(columnData2))
    },
    template:{
      title:'消息模板',
      listData:listData3,
      columnData:columnData3,
      defalutData:JSON.parse(JSON.stringify(columnData3))
    }
  })

  //编辑弹窗记录数据
  const editData = reactive({
    title:'',
    describe:'',
    checked:false,
  })
  //表格启用停用回调方法
  const changeEnable = (i)=> {
    if(!tableData[activeKey.value].listData[i].enable && (activeKey.value=='field' || activeKey.value=='rule')){
      tableData[activeKey.value].listData[i].enable = true;
      operation.index = i;
      if(activeKey.value=='field'){
        modalContent.value = '停用该字段将导致该字段无法使用,请确认停用';
      }else{
        modalContent.value = '停用该规则将导致对应的消息无法推送,请确认停用';
      }
      setTimeout(()=>{
        modal.value.open();
      },100)
    }
    if(activeKey.value=='process'){
      if(tableData[activeKey.value].listData[i].enable){
        tableData[activeKey.value].listData[i].enable = false;
        operation.index = i;
        setTimeout(()=>{
          enableModal.value.open();
        },100)
      }else{
        let index = tableData[activeKey.value].listData.findIndex((item)=>{
          return item.enable==true;
        });
        if(index==-1){
          tableData[activeKey.value].listData[i].enable = true;
          message.warning('停用失败：流程列表中至少需要一条启用流程');
        }
      }
    }
  }
  //添加项目方法
  const add = async ()=> {
    operation.status = 'add';
    editData.title = '';
    editData.describe = '';
    editData.checked = false;
    await nextTick();
    if(activeKey.value=='field'){
      editModal.value.open();
    }
    if(activeKey.value=='process'){
      processEditModal.value.open();
    }
    if(activeKey.value=='rule'){
      ruleEditModal.value.open();
    }
    if(activeKey.value=='template'){
      templateEditModal.value.open();
    }

  }
  //点击名称弹窗
  const editDataModal = (data)=> {
    if(activeKey.value=='field'){
      handleMenuClick({key:'edit'},data.row.rowIndex);
    }
  }
  //点击权限设置方法
  const openAuthModal = ()=> {
    authModal.value.open();
  }
  //点击选项的方法
  const tableTitle = ref('');
  const selectListData = ref([]);
  for(let i=1;i<10;i++){
     let obj ={id:i,name:'xx选项'+i,sort:i};
     selectListData.value.push(obj)
  }
  const openSelect = async (data)=> {
    tableTitle.value = `【${data.data.name}】字段下拉选项`;
    await nextTick();
    tableModal.value.open();
  }
  const dltSelect = (i)=> {
    tableModal.value.del(i);
  }
  //点击更多菜单栏
  const handleMenuClick = async (e,i) => {
    console.log('click', e,i);
    operation.index = i;
    let obj = tableData[activeKey.value].listData[i];
    switch(e.key){
      case 'copy'://复制
      case 'edit'://编辑
        operation.status = e.key;
        editData.title = obj.name;
        editData.describe = obj.project_description;
        editData.checked = obj.enable;
        await nextTick();
        if(activeKey.value=='field'){
          editModal.value.open();
        }
        if(activeKey.value=='process'){
          processEditModal.value.open();
        }
        if(activeKey.value=='rule'){
          ruleEditModal.value.open();
        }
        if(activeKey.value=='template'){
          templateEditModal.value.open();
        }
        break
      case 'del'://删除
        delModal.value.open();
        break
    }
  };
  //保存接口
  const save = e=>{
    console.log(333,e)
    if(operation.status == 'add' || operation.status == 'copy'){
      let obj = {
        id: 4,
        project_id:'56452313164651x',
        name: e.title,
        project_description: 'prospero',
        creator:'张三',
        creation_time:'2022-11-21',
        update_person:'李四',
        update_time:'2022-11-21',
        enable : !e.checked,
      }
      tableData[activeKey.value].listData.push(obj);
      grid.value.refresh();
    }
    if(operation.status == 'edit'){
      tableData[activeKey.value].listData[operation.index].name = e.title;
      tableData[activeKey.value].listData[operation.index].project_description = e.describe;
      tableData[activeKey.value].listData[operation.index].enable = !e.checked;
    }

  };
  //点击记录表中的删除弹窗的回调
  const dlt = ()=>{
    tableData[activeKey.value].listData.splice(operation.index,1);
    //listData.value.splice(operation.index,1)
    grid.value.refresh();
    message.success('删除成功');
  }
  //点击记录表中的启用开关停用弹窗的回调
  const ok = ()=>{
    setTimeout(()=>{
      if(activeKey.value=='field'){
        modal.value.close();
        tableData[activeKey.value].listData[operation.index].enable = false;
      }
      if(activeKey.value=='process'){
        enableModal.value.close();
        tableData[activeKey.value].listData.forEach((item)=>{
          item.enable = false;
        })
        tableData[activeKey.value].listData[operation.index].enable = true;
      }
      message.success('停用成功');
    },100)
  }

</script>

<style lang="less" scoped>
  :global(.project-centent .ant-tabs-nav){
    padding:0 24px;
  }
  :global(.project-centent .ant-tabs-content-holder){
    padding:0 24px 24px;
  }
  .title{
    border-bottom: 1px solid var(--modal-header-border-color-split);
    padding:20px 24px;
  }
  .project-produce{
    display: flex;
    flex-wrap: wrap;
  }
  .project-produce div{
    width: 33.3%;
  }
  .justify-center{
    justify-content: center;
  }
  .margin-bottom-20{
    margin-bottom: 20px;
  }
  .margin-left-20{
    margin-left: 20px;
  }
  .margin-right-5{
    margin-right: 5px;
  }
  .pointer{
    cursor: pointer;
  }
  .margin-bottom-16{
    margin-bottom:16px;
  }
</style>
