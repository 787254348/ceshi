<template>
    <a-drawer
      :width="600"
      placement="right"
      :closable="false"
      :visible="visible"
      class="settings-drawer"
    >
      <template #title>
        <b>审批人<span class="iconfont icon-edit ele-text-placeholder margin-left-10"></span></b>
      </template>
      <template #extra>
        <span class="iconfont icon-close pointer"  @click="close"></span>
      </template>
      <template #footer>
        <div class="ele-cell flex-end">
          <a-button type="primary" @click="save">保存</a-button>
          <a-button class="margin-left-8" @click="close">取消</a-button>
        </div>
      </template>
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="set" tab="设置审批人">
          <b>审批人设置</b>
          <a-radio-group v-model:value="setData.set" name="radioGroup" @change="setRadio">
            <a-radio class="margin-top-10 width-23" value="member">指定成员</a-radio>
            <a-radio class="margin-top-10 width-23" value="role">指定角色</a-radio>
            <a-radio class="margin-top-10 width-23" value="approval">多级审批</a-radio>
            <a-radio class="margin-top-10 width-23" value="oneself">发起人本人</a-radio>
            <a-radio class="margin-top-10 width-23" value="optional">发起人自选</a-radio>
            <a-radio class="margin-top-10 width-23" value="userGroup">指定用户组</a-radio>
          </a-radio-group>
          <a-checkbox v-show="setData.set!='approval' && setData.set!='oneself'" class="margin-top-10" v-model:checked="setData.applyChecked" :disabled="setData.set=='optional' ? true : false">提交申请时，允许发起人修改当前节点处理人</a-checkbox>
          <!-- 指定成员 -->
          <div v-show="setData.set=='member'">
            <div class="margin-top-20"><b>选择审批人</b></div>
            <yUserSelect class="margin-top-5"  width="550px" mode="multiple"   v-model:value="setData.staff"  @handleChange="handleChange"></yUserSelect>
          </div>
          <!-- 指定角色、指定用户组 -->
          <div v-show="setData.set=='role' || setData.set=='userGroup'">
            <div class="margin-top-20"><b>选择角色</b></div>
            <div class="input-style settings-drawer-tag ant-input margin-top-10 pointer">
              <a-tag v-for="(item,i) in setData[setData.set]" class="margin-top-2 margin-bottom-2" closable @close="log" color="var(--select-selection-item-bg)">{{item.name}}</a-tag>
            </div>
          </div>
          <!-- 多级审批 -->
          <div v-show="setData.set=='approval'">
            <div class="margin-top-20"><b>审批起点</b></div>
            <a-radio-group v-model:value="setData.approval.start.type" class="ele-fluid">
              <a-radio class="margin-top-10 width-23" value="1">发起人部门</a-radio>
              <a-radio class="margin-top-10 width-23" value="2">指定部门</a-radio>
            </a-radio-group>
            <yUserSelect class="margin-top-5"  width="550px" mode="multiple"   v-model:value="setData.approval.start.data"  @handleChange="handleChange1"></yUserSelect>
            <div class="margin-top-20"><b>审批终点</b></div>
            <div class="ele-cell margin-top-10">
              <div>通讯录中的</div>
              <a-select
                ref="select"
                v-model:value="setData.approval.end.value"
                style="width: 160px;margin-left: 10px;"
                :options="setData.approval.end.data"
              ></a-select>
            </div>
            <a-checkbox class="margin-top-10" v-model:checked="setData.approval.end.checked">找不到负责人时，由上级主管代审批</a-checkbox>
          </div>
          <!-- 发起人本人 -->
          <div v-show="setData.set=='oneself'">
            <div class="margin-top-20"><b>说明</b></div>
            <div class="margin-top-10"><span class="ele-text-danger">*</span>发起人本人将作为审批人。（一般用于发起人信息复核的场景）</div>
          </div>
          <!-- 发起人自选 -->
          <div v-show="setData.set=='optional'">
            <div class="margin-top-20"><b>自选范围</b></div>
            <a-radio-group v-model:value="setData.optional.type" class="ele-fluid">
              <a-radio class="margin-top-10 width-23" value="1">全员</a-radio>
              <a-radio class="margin-top-10 width-23" value="2">指定成员</a-radio>
              <a-radio class="margin-top-10 width-23" value="3">指定角色</a-radio>
            </a-radio-group>
            <div v-show="setData.optional.type=='2'">
              <yUserSelect class="margin-top-5"  width="550px" mode="multiple"   v-model:value="setData.optional.staff"  @handleChange="handleChange2"></yUserSelect>
            </div>
            <div v-show="setData.optional.type=='3'" class="input-style settings-drawer-tag ant-input margin-top-10 pointer">
              <a-tag v-for="(item,i) in setData.optional.role" class="margin-top-2 margin-bottom-2" closable @close="log" color="var(--select-selection-item-bg)">{{item.name}}</a-tag>
            </div>
          </div>

          <div v-show="setData.set!='oneself'">
            <div class="margin-top-20"><b>多人审批方式</b></div>
            <a-radio-group v-model:value="setData.mode">
              <a-radio class="margin-top-10 flex"  value="1">会签（需所有审批人同意）</a-radio>
              <a-radio class="margin-top-10 flex"  value="2">或签（一名审批人同意即可）</a-radio>
              <a-radio class="margin-top-10 flex" value="3">依次审批（按顺序依次审批）</a-radio>
            </a-radio-group>
          </div>
          <div class="margin-top-20"><b>审批意见</b></div>
          <a-radio-group v-model:value="setData.opinion">
            <a-radio class="margin-top-10 flex"  value="1">必填</a-radio>
            <a-radio class="margin-top-10 flex"  value="2">非必填</a-radio>
          </a-radio-group>
        </a-tab-pane>
        <a-tab-pane key="operation" tab="操作">
          <table class="ele-table ele-table-border  ele-table-medium">
              <colgroup>
                  <col width="180" />
                  <col width="180" />
                  <col />
              </colgroup>
              <thead>
                  <tr>
                      <th>操作按钮</th>
                      <th>显示名称</th>
                      <th>启用</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(item,i) in data.data" :key="item.key">
                      <td>{{item.name}}</td>
                      <td>
                        <div v-if="clickIndex!=i" class="content" @click="onClick(i)" @mouseenter="mouseenter(i)" @mouseleave="mouseleave(i)">
                          {{item.value}}
                          <span v-show="hoverIndex == i" class="iconfont icon-edit ele-text-placeholder ele-text-small"></span>
                        </div>
                        <a-input v-else :ref="setItemRef" v-model:value="item.value" placeholder="" @focus="onFocus" @blur="onBlur"/>
                      </td>
                      <td><a-checkbox v-model:checked="item.enable" :disabled="item.disabled"></a-checkbox></td>
                  </tr>
              </tbody>
          </table>
          <div class="margin-top-20"><b>触达页面</b></div>
          <div  class="margin-top-10 ele-cell">
            <a-checkbox v-model:checked="data.pageChecked">触达页面</a-checkbox>
            <a-input class="ele-cell-content" v-show="data.pageChecked" v-model:value="data.pageParameters" placeholder="请输入页面调用参数"></a-input>
          </div>
          <div v-show="data.data[3].enable">
            <div class="margin-top-20"><b>加签位置</b></div>
            <div  class="margin-top-10 ele-cell">
              <a-checkbox v-model:checked="data.beforeCountersign" @change="changeChecked('beforeCountersign')">前加签</a-checkbox>
              <a-checkbox v-model:checked="data.afterCountersign"  @change="changeChecked('afterCountersign')" style="margin-left: 40px;">后加签</a-checkbox>
            </div>
            <div class="margin-top-20"><b>加签结果</b></div>
            <a-radio-group v-model:value="data.countersignResult">
              <a-radio class="margin-top-10"  value="1">结果生效</a-radio>
              <a-radio class="margin-top-10 margin-left-18"  value="2">结果不生效</a-radio>
            </a-radio-group>
          </div>
          <div v-show="data.data[4].enable">
            <div class="margin-top-20"><b>退回位置</b></div>
            <div  class="margin-top-10 ele-cell">
              <a-checkbox v-model:checked="data.returnChecked1" @change="changeReturnChecked('returnChecked1')">退回发起人</a-checkbox>
              <a-checkbox v-model:checked="data.returnChecked2"  @change="changeReturnChecked('returnChecked2')" style="margin-left: 40px;">退回上一个节点</a-checkbox>
              <a-checkbox v-model:checked="data.returnChecked3"  @change="changeReturnChecked('returnChecked3')" style="margin-left: 40px;">退回任意节点</a-checkbox>
            </div>
          </div>


        </a-tab-pane>
      </a-tabs>
    </a-drawer>
    <!-- 是否保存数据弹窗 -->
    <yModal ref="modal" title="是否保存数据" :showNotOk="true" okText="保存" notOkType="link" :centered="true" @ok="save" @notOk="notOk"></yModal>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,nextTick,provide } from 'vue';
  import { message } from 'ant-design-vue';
  import yModal from '@/components/y-modal/index.vue';
  const visible = ref(false);
  const modal = ref(null);
  const setData = reactive({
    set:'member',
    applyChecked:false,
    staff:[],
    role:[
      {name:'张三'},
      {name:'张三'},
      {name:'张三'},
      {name:'张三'},
      {name:'张三'},
      {name:'张三'},
      {name:'张三'},
      {name:'张三'},
      {name:'张三'},
      {name:'张三'},
    ],
    userGroup:[],
    approval:{
      start:{
        type:'1',
        data:[],
      },
      end:{
        checked:false,
        data:[{
          value: '1',
          label: '第一级负责人',
        },{
          value: '2',
          label: '第二级负责人',
        },{
          value: '3',
          label: '第三级负责人',
        },{
          value: '4',
          label: '第四级负责人',
        }],
        value:'1'
      }
    },
    optional:{
      type:'1',
      staff:[],
      role:[],
    },
    mode:'1',
    opinion:'2'
  });
  const defalutSetData = JSON.parse(JSON.stringify(setData));
  const data = reactive({
    data:[
      {key:'agree',name:'同意',value:'同意',enable:true,disabled:true},
      {key:'refuse',name:'拒绝',value:'拒绝',enable:true,disabled:false},
      {key:'transmit',name:'转交',value:'转交',enable:true,disabled:false},
      {key:'countersign',name:'加签',value:'加签',enable:true,disabled:false},
      {key:'return',name:'退回',value:'退回',enable:true,disabled:false}
    ],
    pegeChecked:false,
    pageParameters:'',
    beforeCountersign:true,
    afterCountersign:false,
    countersignResult:'1',
    returnChecked1:true,
    returnChecked2:false,
    returnChecked3:false,
  });
  const defalutData = JSON.parse(JSON.stringify(data));
  const activeKey = ref('set');
  //审批人设置单选框回调
  const setRadio = (e)=> {
    if(e.target.value=='optional'){
      setData.applyChecked = true;
    }
  }
  //加签位置复选框回调方法
  const changeChecked = (key)=>{
    if(!data.beforeCountersign && !data.afterCountersign){
      data[key] = true;
      message.warning('取消失败，请保留至少一个加签位置');
    }
  }
  //退回位置复选框回调方法
  const changeReturnChecked = (key)=>{
    if(!data.returnChecked1 && !data.returnChecked2 && !data.returnChecked3){
      data[key] = true;
      message.warning('取消失败，请保留至少一个退回位置');
    }
  }
  const clickIndex = ref(-1);
  const hoverIndex = ref(-1);
  const contentInput = ref(null);
  // 赋值动态ref到变量
  const setItemRef = el => {
      if (el) {
          contentInput.value = el
      }
  }
  const mouseenter = (i)=> {
    hoverIndex.value = i;
  }
  const mouseleave = (i)=> {
    hoverIndex.value = -1;
  }
  const onClick = (i)=> {
    clickIndex.value = i;
    setTimeout(()=>{
      contentInput.value.focus();
    },100)
  }
  const onFocus = (e)=>{
    e.target.select()
  }
  const onBlur = ()=>{
    clickIndex.value = -1;
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
    console.log(111,data,defalutData)
    if(JSON.stringify(data) != JSON.stringify(defalutData) || JSON.stringify(setData) != JSON.stringify(defalutSetData)){
      modal.value.open();
    }else{
      visible.value = false;
    }
  };
  //暴露函数，给通过ref绑定的dom元素使用
  defineExpose({
    open,
    close
  })
</script>

<style lang="less" scoped>
  :global(.settings-drawer .ant-drawer-body){
    padding: 0 24px 24px 24px;
  }
  :global(.settings-drawer .ant-tabs){
    height: 100%;
  }
  :deep(.ele-table.ele-table-border th){
    height: 53px;
    border-width: 1px 0;
  }
  :deep(.ele-table.ele-table-border td){
    height: 53px;
    border-width: 1px 0;
  }
  .width-23{
    width: 23%;
  }
  table{
    border-left: 1px solid var(--border-color-split);
    border-right: 1px solid var(--border-color-split);
  }
  .content{
    height: 32px;
    line-height: 32px;
    cursor: pointer;
  }
  .content:hover{
    border: 1px solid var(--primary-5);
    border-radius: 2px;
    padding-left: 11px;
  }
  .settings-drawer-tag .ant-tag-has-color{
      color: #000;
  }
  :global(.settings-drawer-tag .ant-tag-has-color .anticon-close){
      color: #969799;
  }
  .input-style{
    width: 550px;
    padding: 1px 4px;
    min-height: 32px;
  }
</style>
