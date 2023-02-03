<template>
    <div class="ele-body">
        <div class="ele-cell ant-card ant-card-body margin-bottom-1" style="padding: 15px 24px;">
          <div class="ele-cell ele-cell-content">
            <!-- <a-input v-model:value="search" placeholder="请输入关键字搜索" style="width: 250px;">
              <template #prefix>
                <span class="iconfont icon-search2" style="color: var(--text-color-secondary)"></span>
              </template>
            </a-input> -->
			<y-search v-model:value="search"></y-search>
        
            <a-switch v-model:checked="checked" size="small" class="margin-left-20 margin-right-5"/>
            <span style="color: var(--text-color-secondary)">显示停用</span>
          </div>
          <a-button type="primary" class="ele-cell" @click="add"><span class="iconfont icon-plus-square margin-right-5"></span>添加项目</a-button>
        </div>
        <div class="ant-card ant-card-body">
            <yTable
              ref="grid"
              v-model:listData="listData"
              v-model:columnData="columnData"
              :defalutData="defalutData"
              style="height: calc(100vh - 250px);"
            >
              <!-- 自定义表格方法  FirstName是自定义字段名称-->
              <template #enable="{data}">
                <a-switch v-model:checked="data.data.enable" size="small" @change="changeEnable(data.row.rowIndex)"/>
              </template>
              <template #operation="{data}">
                <div class="ele-cell justify-center">
                  <div class="pointer" @click="edit('edit',data)"><span class="iconfont icon-rename margin-right-5" ></span>字段</div>
                  <div class="margin-left-20 pointer"  @click="edit('copy',data)"><span class="iconfont icon-fuzhi margin-right-5"></span>流程</div>
                  <a-dropdown trigger="click" placement="bottom">
                     <div class="margin-left-20 pointer"><span class="iconfont icon-menu margin-right-5"></span>更多</div>
                     <template #overlay>
                       <a-menu v-model:visible="visible" @click="handleMenuClick($event,data.row.rowIndex)">
                         <a-menu-item key="edit">
                           <span class="iconfont icon-edit margin-right-5"></span>编辑
                         </a-menu-item>
                         <a-menu-item key="view">
                           <span class="iconfont icon-eye" style="margin-left: -2px;margin-right: 2px;"></span>视图
                         </a-menu-item>
                         <a-menu-item key="auth">
                           <span class="iconfont icon-Setting margin-right-5"></span>权限
                         </a-menu-item>
                         <a-menu-item key="del">
                           <span class="iconfont icon-shanchu margin-right-5"></span>删除
                         </a-menu-item>
                       </a-menu>
                     </template>
                   </a-dropdown>
                </div>
              </template>
            </yTable>

            <!-- 停用确认提示弹窗 -->
            <yModal ref="modal" title="停用确认" :closable="false" content="停用该项目将导致项目对应的审批申请无法使用,请确认停用" okText="停用"  :centered="true" @ok="ok"></yModal>
            <!-- 删除提示弹窗 -->
            <yModal ref="delModal" title="删除提示" :closable="false" content="删除后将不可恢复,请确认删除" okText="删除" :danger="true" :centered="true" @ok="dlt"></yModal>
            <!-- 编辑信息弹窗 -->
            <taskDataEdit ref="editModal" :title="editData.title" :describe="editData.describe" :checked="editData.checked" @save="save"></taskDataEdit>
        </div>
    </div>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,nextTick,provide } from 'vue';
  import { message } from 'ant-design-vue';
  import yTable from '@/components/y-table/index.vue';
  import yModal from '@/components/y-modal/index.vue';
  import taskDataEdit from './components/task-data-edit.vue';

  //列表数据
  const listData = ref([{
          id: 1,
          project_id:'56452313164651x',
          name: '采购订单1',
          project_description: '采购订单、单价描述',
          creator:'张三',
          creation_time:'2022-11-21',
          update_person:'李四',
          update_time:'2022-11-21',
          enable : true,
        }, {
          id: 2,
          project_id:'56452313164651x',
          name: '采购订单2',
          project_description: '采购订单、单价描述',
          creator:'张三',
          creation_time:'2022-11-21',
          update_person:'李四',
          update_time:'2022-11-21',
          enable : true,
        }, {
          id: 3,
          project_id:'56452313164651x',
          name: '采购订单3',
          project_description: '采购订单、单价描述',
          creator:'张三',
          creation_time:'2022-11-21',
          update_person:'李四',
          update_time:'2022-11-21',
          enable : true,
        }]);
  //表头数据
  const columnData = ref([
      { id: 1, type:'string', fieldName:'project_id', columnName: '项目ID', visible: true,bold:false,width:200,fixed:false,alignment:'center' },
      { id: 2, type:'string', fieldName:'name', columnName: '项目名称', visible: true,bold:false,width:200,fixed:false,alignment:'center' },
      { id: 3, type:'string',fieldName:'project_description', columnName: '项目描述', visible: true,bold:false,width:200,fixed:false,alignment:'center' },
      { id: 4, type:'string',fieldName:'creator', columnName: '创建人', visible: false,bold:false,width:100,fixed:false,alignment:'center' },
      { id: 5, type:'string',fieldName:'creation_time', columnName: '创建时间', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 6, type:'string',fieldName:'update_person', columnName: '修改人', visible: false,bold:false,width:100,fixed:false,alignment:'center' },
      { id: 7, type:'string',fieldName:'update_time', columnName: '修改时间', visible: false,bold:false,width:150,fixed:false,alignment:'center' },
      { id: 8, type:'Boolean',fieldName:'enable', columnName: '启用', visible: true,bold:false,width:100,fixed:false,alignment:'center' },
      { id: 9, type:'string',fieldName:'operation', columnName: '设置', visible: true,bold:false,width:300,fixed:false,alignment:'center' },
    ])
  const defalutData = ref(JSON.parse(JSON.stringify(columnData.value)));
  const grid = ref(null);
  const search = ref('');
  const checked = ref(false);
  const visible = ref(false);
  const modal = ref(null);
  const delModal = ref(null);
  const editModal = ref(null);
  const operation = reactive({
    status:'edit',//当前操作状态
    index:0//当前操作的下标值
  })
  //编辑弹窗记录数据
  const editData = reactive({
    title:'',
    describe:'',
    checked:false,
  })
  const changeEnable = (i)=> {
    if(!listData.value[i].enable){
      listData.value[i].enable = true;
      operation.index = i;
      setTimeout(()=>{
        modal.value.open();
      },100)
    }
  }
  //添加项目方法
  const add = async ()=> {
	  console.log(11111,search.value)
    operation.status = 'add';
    editData.title = '';
    editData.describe = '';
    editData.checked = false;
    await nextTick();
    editModal.value.open();
  }
  //点击更多菜单栏
  const handleMenuClick = async (e,i) => {
    console.log('click', e,i);
    operation.index = i;
    let obj = listData.value[i];
    switch(e.key){
      case 'edit'://编辑
        operation.status = 'edit';
        editData.title = obj.name;
        editData.describe = obj.project_description;
        editData.checked = obj.enable;
        await nextTick();
        editModal.value.open();
        break
      case 'view'://视图

        break
      case 'auth'://权限

        break
      case 'del'://删除
        delModal.value.open();
        break
    }
  };
  //保存接口
  const save = e=>{
    console.log(333,e)
    if(operation.status == 'add'){
      let obj = {
        id: 4,
        project_id:'56452313164651x',
        name: e.title,
        project_description: e.describe,
        creator:'张三',
        creation_time:'2022-11-21',
        update_person:'李四',
        update_time:'2022-11-21',
        enable : !e.checked,
      }
      listData.value.push(obj);
      grid.value.refresh();
    }
    if(operation.status == 'edit'){
      listData.value[operation.index].name = e.title;
      listData.value[operation.index].project_description = e.describe;
      listData.value[operation.index].enable = !e.checked;
    }

  };
  //点击记录表中的删除弹窗的回调
  const dlt = ()=>{
    listData.value.splice(operation.index,1)
    grid.value.refresh();
    message.success('删除成功');
  }
  //点击记录表中的启用开关停用弹窗的回调
  const ok = ()=>{
    modal.value.close();
    setTimeout(()=>{
      listData.value[operation.index].enable = false;
    },100)
    message.success('停用成功');
  }

</script>

<style lang="less" scoped>
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
