<template>
  <div class="ele-body">
      <div class="ele-cell">
        <a-select
          ref="select"
          v-model:value="search.name"
          style="width: 160px;"
          allowClear
          option-label-prop="label"
          class="tast-center-select"
          placeholder="请选择项目"
          showSearch
        >
          <a-select-option v-for="(item,i) in options"  :value="item.value">
            <div class="flex space-between">
              <span>{{item.label}}</span>
              <span v-if="item.type=='single'" class="iconfont icon-Setting" @click.stop="openSet"></span>
            </div>
          </a-select-option>
          <template #suffixIcon><span v-show="showSet" class="iconfont icon-Setting" @click.stop="openSet"></span></template>
        </a-select>
        <div v-for="(item,i) in statusList" :key="i" class="margin-left-40 pointer text-color-secondary" :class="{'tab-item-active':item.name==search.status}" @click="changeStatus(item.name)">{{item.name}}({{item.value}})</div>
        <div class="ele-cell flex-end ele-cell-content">
            <a-checkbox v-model:checked="search.checked" class="margin-right-20">与我相关</a-checkbox>
            <SelectDate v-model:startDate="startDate" v-model:endDate="endDate" v-model:type="type" offsetStyle="margin-left:-260px"></SelectDate>
            <boardList class="margin-left-20"></boardList>
            <SchemeSettings className="margin-left-20 margin-right-20"></SchemeSettings>
            <a-button type="primary" ghost class="ele-cell margin-right-10" @click="quickAddTask"><span class="iconfont icon-yxj margin-right-5"></span>快速创建</a-button>
            <a-button type="primary" class="ele-cell" @click="addTask"><span class="iconfont icon-plus-square margin-right-5"></span>创建任务</a-button>
        </div>
      </div>
      <div ref="content" class="ant-card flex title margin-top-16" @mousemove="mouseMoveTrigger">
        <div class="ant-card-body padding-top-5" v-show="isExpanded" :style="{ width: leftOffset + 'px' }">
          <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="任务分类">
              <y-tree width="100%" :isIcon="false" :showTitle="false" :menuList="menuList"></y-tree>
            </a-tab-pane>
            <a-tab-pane key="2" tab="日历">
              <y-date dateFormat="YYYY/MM/DD" @confirm="changeDate"><div class="text-center pointer">{{search.date}}</div></y-date>
            </a-tab-pane>
          </a-tabs>
        </div>
        <div class="move-line" v-show="isExpanded" @mousedown="mouseDownTrigger"><em/></div>
        <div class="sidebar-open-box ele-cell">
            <div class="sidebar-open-icon pointer" @click="expand"><i class="iconfont icon-dange ele-inline-block" style="font-size: 12px;" :style="'transform: rotate('+(!isExpanded ? 180 : 0)+'deg);'"></i></div>
        </div>
        <div class="ant-card-body" :style="contentWidth" style="height: calc(100vh - 150px);">
          <tableList></tableList>
        </div>
      </div>
      <!-- 选中项目弹窗 -->
      <selectProjectModal ref="selectProject"></selectProjectModal>
      <!-- 个人待办项目设置窗口 -->
      <projectSetModal ref="projectSet"></projectSetModal>
      <!-- 快速创建任务弹窗 -->
      <quickTaskModal ref="quickTask"></quickTaskModal>
      <!-- 创建任务普通弹窗 -->
      <createTaskDrawer ref="createTask"></createTaskDrawer>

  </div>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,nextTick,provide } from 'vue';
  import dayjs from 'dayjs';
  import { message } from 'ant-design-vue';
  import boardList from './components/board-list.vue';
  import selectProjectModal from './components/select-project-modal.vue';
  import projectSetModal from './components/project-set-modal.vue';
  import quickTaskModal from './components/quick-task-modal.vue';
  import createTaskDrawer from './components/create-task-drawer.vue';
  import tableList from '../components/table-list.vue';
  const search = reactive({
    name:'全部项目',
    status:'未完成',
    checked:false,
    date:dayjs(dayjs()).format('YYYY/MM/DD')
  })
  const options = ref([
    {
      value:'全部项目',
      label:'全部项目',
      type:'all'
    },
    {
      value:'个人项目',
      label:'个人项目',
      type:'single'
    },
    {
      value:'项目2',
      label:'项目2',
      type:'all'
    }
  ])
  const showSet = computed(()=>{
    let obj = options.value.find(item=>{
      return item.value == search.name;
    })
    return obj?.type=='single';
  })
  const statusList = ref([
    { name:'未完成', value:2},
    { name:'未分配', value:2},
    { name:'已逾期', value:2},
    { name:'全部', value:6}
  ])
  
  const type = ref('预计开始');
  const startDate = ref('');
  const endDate = ref('');


  const activeKey = ref('1');
  const isExpanded = ref(true);//侧边栏是否展开
  const menuList = ref([
     {key:'addChlidren',name:'创建子分类'},
     {key:'delete',name:'删除分类'},
  ])

  //点击顶部状态标签
  const changeStatus = (value)=>{
    search.status = value;
  }

  //点击快速创建任务的方法
  const quickTask = ref(null);
  const quickAddTask = ()=>{
    quickTask.value.open();
  }
  //点击创建任务的方法
  const createTask = ref(null);
  const selectProject = ref(null);
  const addTask = ()=>{
    if(search.name){
      createTask.value.open();
    }else{
      selectProject.value.open();
    }
  }

  //打开个人待办项目设置窗口
  const projectSet = ref(null);
  const openSet = ()=> {
    console.log(333)
    projectSet.value.open();
  }
  //点击侧边栏日历里的日期回调方法
  const changeDate=(e)=>{
    search.date = e.date
  }

  //侧边栏拖动效果
  const leftOffset = ref(300);
  let defalutLeftOffset = leftOffset.value;
  const contentWidth = computed(()=>{
    let x = leftOffset.value+32;
    return `width:calc(100% - ${x}px)`;
  })
  const triggerDragging = ref(false);
  const content = ref(null);
  const mouseMoveTrigger = (event)=> {
    let width = content.value.offsetWidth;
    if (!event.which) triggerDragging.value = false;
    if (triggerDragging.value ) {
      let result = event.clientX - 125;
      if(result < width*0.15){
        result = width*0.15;
      }
      if(result > width*0.4){
        result = width*0.4;
      }
      leftOffset.value = result;
      defalutLeftOffset = result;
    }
  }
  const mouseDownTrigger = (event)=> {
    triggerDragging.value = true;
  }
  //侧边栏展开收缩点击事件
  const expand = ()=> {
    isExpanded.value = !isExpanded.value;
    if(isExpanded.value){
      leftOffset.value = defalutLeftOffset;
    }else{
      leftOffset.value = 0;
    }
  }
</script>

<style lang="less" scoped>
  :global(.tast-center-select .ant-select-selector){
    background: none !important;
  }
  :global(.tast-center-select .ant-select-arrow){
    right: 30px;
    pointer-events: unset;
    margin-top: -8px;
  }
  .icon-Setting:hover{
    color: var(--primary-color);
  }
  .tab-item-active{
    color: var(--primary-color);
    border-bottom: 2px solid var(--primary-color);
  }
  .dot{
    width: 8px;
    height: 8px;
    background: #c8c9cc;
    border-radius: 50%;
    margin-right: 5px;
  }
  .sidebar-open-box{
    height: calc(100vh - 150px);
    background: var(--layout-body-background);
  }
  .sidebar-open-icon {
      height: 75px;
      line-height: 75px;
      color: #fff;
      width: 12px;
      background-color: #cecfd0;
      border-radius: 0 20px 20px 0px;
      margin-top: 20%;
      cursor: pointer;
      margin-right:10px;
  }
  .move-line{
    width: 10px;
    height: calc(100vh - 150px);
    background: var(--component-background);
    cursor: e-resize;
  }

</style>
