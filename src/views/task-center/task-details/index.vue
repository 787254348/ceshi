<template>
    <a-drawer
      :width="1250"
      placement="right"
      :closable="false"
      :visible="visible"
      class="task-details-drawer"
      :footer="null"
    >
      <template #title>
        <div v-show="!isEditTitle" class="ele-cell"><b>{{title}}</b><span class="iconfont icon-edit pointer font-size-14 margin-left-10 text-color-secondary" @click="editTitle"></span></div>
        <a-input v-show="isEditTitle" ref="titleInput" class="title-input"  v-model:value="title" :autofocus="true" :bordered="false" :maxlength="60"  placeholder="请输入标题" @blur="isEditTitle=false">
        </a-input>
      </template>
      <template #extra>
        <a-tooltip placement="top" v-for="(item,i) in iconData" :key="item.key">
            <template #title>{{item.tips}}</template>
        	<span v-if="item.key=='gz' && isStar" class="iconfont icon-star-filled pointer margin-left-20 text-color-secondary" style="color:#ffc614" @click="operation(item.key)"></span>
            <span v-else class="iconfont pointer margin-left-20 text-color-secondary" :class="item.icon" @click="operation(item.key)"></span>
        </a-tooltip>
      </template>
      <div class="ele-cell" style="height: 100%;">
        <div class="ele-scrollbar-mini  ele-cell-content task-details-content-box">
          <div class="task-details-content ">
            <!-- 状态信息栏 -->
            <headerInformation></headerInformation>
            <!-- 内容 -->
            <a-tabs class="flex-1" v-model:activeKey="activeKey">
                <a-tab-pane key="1" tab="任务信息">
                  <information></information>
                </a-tab-pane>
                <a-tab-pane key="2" tab="子任务">
                  <subtask></subtask>
                </a-tab-pane>
                <a-tab-pane key="3" tab="关联信息">

                </a-tab-pane>
                <a-tab-pane key="4" tab="附件">
                  <fileList></fileList>
                </a-tab-pane>
                <a-tab-pane key="5" tab="状态详情">
                  <statusDetails></statusDetails>
                </a-tab-pane>
                <a-tab-pane key="6" tab="变更记录">
                  <changeLog></changeLog>
                </a-tab-pane>
                <a-tab-pane key="7">
                  <template #tab>
                    <span class="iconfont icon-Setting"></span>
                  </template>
                  <div class="margin-bottom-10"><span class="iconfont icon-Setting margin-right-5 ele-inline-block"></span><span class="font-size-16">系统信息</span></div>
                  <div class="flex ele-fluid flex-wrap">
                    <div class="set-item ele-cell margin-bottom-20 text-color-secondary">
                      <div class="set-item-left text-color-secondary">模板：</div>
                      <div>----</div>
                    </div>
                    <div class="set-item ele-cell margin-bottom-20 text-color-secondary">
                      <div class="set-item-left text-color-secondary">工作流：</div>
                      <div>----</div>
                    </div>
                  </div>
                  <div class="flex ele-fluid flex-wrap">
                    <div class="set-item ele-cell margin-bottom-20 text-color-secondary" v-for="(item,i) in setList" :key="i">
                      <div class="set-item-left text-color-secondary">{{item.name}}：</div>
                      <div>{{item.value || '----'}}</div>
                    </div>
                  </div>
                </a-tab-pane>
            </a-tabs>
              <!-- 底部状态信息 -->
            <div>
              <a-divider style="margin-top: 30px;margin-bottom: 20px;"/>
              <div class="margin-bottom-10 "><span class="iconfont icon-a-zu7336 margin-right-5 ele-inline-block" style="transform: scale(1.2);"></span><span class="font-size-16">下一状态</span></div>
              <!-- 状态标签数据 -->
              <div class="ele-cell flex-wrap">
                <div v-for="(item,i) in statusList" :key="i" class="status-tag ele-cell" :class="{'opacity-4':(!item.checked&&statusHoverIndex!=i)}" :style="(item.checked||statusHoverIndex==i) ? tagStyle(item.color) : ''" @mouseenter="statusHoverIndex=i" @mouseleave="statusHoverIndex=-1">
                  <span class="iconfont icon-a-lujing279 margin-right-5" :style="'color:'+item.color"></span>
                  {{item.name}}
                </div>
              </div>
              <div class="ele-cell margin-top-10">
                <div>负责人：</div>
                <div class="ele-cell-content"><y-user-select mode="multiple" width="100%"></y-user-select></div>
              </div>
              <div class="ele-cell margin-top-20">
                <div style="width: 56px;">评论：</div>
                <div class="ele-cell-content">
                  <y-editor ref="editor" v-model:valueHtml="valueHtml" :isUpload="false" :isButton="false" placeholder="@通知其他成员,添加评论/意见" style="border: 1px solid var(--border-color-base);min-height: 32px;padding: 3px 0 0 10px;line-height: 20px;width: 100%;" ></y-editor>
                </div>
              </div>
              <div class="ele-cell margin-top-20" style="margin-left:68px">
                <a-button type="primary">流转</a-button>
                <a-button class="ele-text-primary margin-left-20" @click="close">关闭</a-button>
              </div>
            </div>
          </div>
        </div>
        <!-- 右侧评论 -->
        <div style="width: 300px;height: 100%;background-color: #fafafa;"></div>
      </div>
    </a-drawer>
    <!-- 群聊窗口 -->
    <GroupChat ref="groupChatModal" @comfirm="chatComfirm"></GroupChat>
    <!-- 是否保存数据弹窗 -->
    <yModal ref="modal" title="是否保存数据" :showNotOk="true" okText="保存" notOkType="link" :centered="true" @ok="save" @notOk="notOk"></yModal>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,nextTick,provide } from 'vue';
  import dayjs from 'dayjs'
  import { message } from 'ant-design-vue';
  import information from '../components/information.vue';
  import headerInformation from '../components/header.vue';
  import fileList from '../components/file-list.vue';
  import changeLog from './components/change-log.vue';
  import statusDetails from './components/status-details.vue';
  import subtask from './components/subtask.vue';
  const visible = ref(false);
  const modal = ref(null);
  const title = ref('任务标题');
  const isStar = ref(false);//是否关注
  const isEditTitle = ref(false);
  const activeKey = ref('1');
  const iconData = ref([
  	{key:'lj',icon:'icon-lianjie',tips:'复制链接'},
  	{key:'ql',icon:'icon-xiaoxi',tips:'发起群聊'},
  	{key:'gz',icon:'icon-star',tips:'关注'},
  	{key:'sx',icon:'icon-a-zujian31115',tips:'刷新'},
    {key:'sc',icon:'icon-shanchu',tips:'删除'},
  	{key:'gb',icon:'icon-close',tips:'关闭'},
  ]);

  const titleInput = ref(null);
  const editTitle = ()=>{
    isEditTitle.value = true;
    setTimeout(()=>{
      titleInput.value.focus();
    },10)
  }
  //右上角的复制链接、群聊等点击事件
  const groupChatModal = ref(null);
  const operation = (key)=> {
  	switch(key){
  		case 'lj'://复制链接

  			break;
  		case 'ql'://群聊
        groupChatModal.value.open();
  			break;
  		case 'gz'://关注
  			isStar.value = !isStar.value;
  			break;
  		case 'sx'://刷新

  			break;
  		case 'gb'://关闭
  			close();
  			break;
  	}
  }
  //群聊窗口回调
  const chatComfirm = (e)=>{
    console.log(111,e)
  }
  //系统信息数据
  const setList = ref([
    {name:'结束人',value:''},
    {name:'结束时间',value:''},
    {name:'结束',value:''},
    {name:'完成人',value:''},
    {name:'完成时间',value:''},
    {name:'完成',value:''},
    {name:'变更人',value:''},
    {name:'变更时间',value:''},
    {name:'创建人',value:''},
    {name:'创建时间',value:'2020-08-12 12:12'},
  ])
  //状态数据
  const statusList = ref([
    {name:'xx状态',icon:'icon-a-lujing279',color:'rgba(252, 154, 174,1)',checked:true},
    {name:'xx状态',icon:'icon-a-lujing279',color:'rgba(34, 215, 187,1)',checked:false},
    {name:'xx状态',icon:'icon-a-lujing279',color:'rgba(45, 188, 255,1)',checked:false},
  ])
  const statusHoverIndex = ref(-1);//状态鼠标经过下标值
  //计算状态效果的背景颜色
  const tagStyle = (color)=> {
      let v = color.replace("rgba(","");
      let arr = v.replace(")","").split(",");
      arr[3] = '0.3';
      let background = 'rgba('+arr.join(",")+')';
      return `background:${background}`
  }
  //保存
  const save = ()=> {
    visible.value = false;
  }
  //不保存
  const notOk = ()=> {
    visible.value = false;
  }
  const open = () => {
    visible.value = true;
  };
  const close = () => {
    // if(JSON.stringify(setData) != JSON.stringify(defalutSetData)){
    //   modal.value.open();
    // }else{
      visible.value = false;
    //}
  };
  //暴露函数，给通过ref绑定的dom元素使用
  defineExpose({
    open,
    close
  })
</script>

<style lang="less" scoped>
:global(.title-input .ant-input:placeholder-shown){
  font-size: 16px;
}
:global(.title-input .ant-input){
  font-size: 16px;
}
:global(.task-details-drawer .ant-drawer-body){
  padding: 0;
}
.task-details-content-box{
  padding:24px;
  height: 100%;
  overflow-y: auto;
}
.task-details-content{
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
.task-details-drawer .ele-cell .ele-cell-desc{
  margin-top: 2px;
}
.ele-cell .ele-cell-title{
  font-size: 16px;
}

.set-item{
  width: 33.33%;
}
.set-item-left{
  width: 100px;
  text-align: right;
}
.status-tag{
  margin-left: 20px;
  padding: 3px 15px;
  border-radius: 2px;
  margin-bottom: 10px;
}
.opacity-4{
  opacity: 0.4;
}
</style>
