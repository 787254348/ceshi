<template>
  <a-modal :width="800" v-model:visible="visible" :centered="true"  @cancel="cancel" :maskClosable="false" :keyboard="false" class="rule-modal">
    <template #title>
      <b>推送触发规则配置</b>
    </template>
    <div class="ele-cell">
      <div class="margin-right-10 text-color-secondary">规则名称</div>
      <a-input class="ele-cell-content" v-model:value="data.name" placeholder="请输入规则名称" />
    </div>
    <div class="flex margin-top-20">
      <div class="margin-right-10 text-color-secondary">规则描述</div>
      <a-textarea style="flex:1" v-model:value="data.describe" placeholder="请输入规则描述" :rows="4" />
    </div>
    <h4 class="margin-top-20" style="margin-left: -20px;">触发规则</h4>
    <div class="ele-cell margin-top-20">
      <div class="margin-right-10 text-color-secondary">触发类型</div>
      <a-radio-group v-model:value="data.type" name="radioGroup" class="flex">
        <a-radio class="margin-right-20" value="1">事件触发</a-radio>
        <a-radio  value="2">定时触发</a-radio>
      </a-radio-group>
    </div>
    <!-- 触发事件 -->
    <div class="ele-cell margin-top-20" v-show="data.type=='1'">
      <div class="margin-right-10 text-color-secondary">触发事件</div>
      <div class="ele-cell">
        <a-select
          v-model:value="data.event.value1"
          style="width: 190px;"
          :options="eventOptions1"
        ></a-select>
        <div class="ele-cell" v-show="data.event.value1=='编辑'">
          <div class="margin-left-10 margin-right-10">当</div>
          <a-select
            v-model:value="data.event.value2"
            style="width: 190px;"
            mode="multiple"
            :options="eventOptions2"
          ></a-select>
          <div class="margin-left-10">发生变更时</div>
        </div>
        <div class="ele-cell" v-show="data.event.value1=='流程流转'">
          <a-select
            v-model:value="data.event.value2_1"
            style="width: 110px;"
            :options="eventOptions2_1"
            class="margin-left-10"
          ></a-select>
          <a-select
            v-model:value="data.event.value3"
            style="width: 190px;"
            :options="eventOptions3"
            class="margin-left-10"
            mode="multiple"
          ></a-select>
          <div class="margin-left-10">时</div>
        </div>
      </div>
    </div>
    <!-- 触发时间 -->
    <div class="ele-cell margin-top-20" v-show="data.type=='2'">
      <div class="margin-right-10 text-color-secondary">触发时间</div>
      <div class="ele-cell">
        <a-select
          v-model:value="data.time.value1"
          style="width: 190px;"
          :options="timeOptions1"
        ></a-select>
        <a-select
          v-model:value="data.time.value2"
          style="width: 100px;"
          :options="timeOptions2"
          class="margin-left-10"
        ></a-select>
        <a-time-picker v-model:value="data.time.value3" class="margin-left-10" format="HH:mm" />
      </div>
    </div>
    <!-- 通知对象 -->
    <div class="flex margin-top-20">
      <div class="margin-right-10 margin-top-5 text-color-secondary">通知对象</div>
      <div style="flex:1">
        <div class="ele-cell" style="width: 100%;">
          <a-checkbox v-model:checked="data.target.checked1" class="margin-right-14">指定成员</a-checkbox>
          <yUserSelect class="ele-cell-content" width="100%" placeholder="请选择指定成员" mode="multiple" v-model:value="data.target.value1"></yUserSelect>
        </div>
        <div class="ele-cell margin-top-20">
          <a-checkbox v-model:checked="data.target.checked2" class="margin-right-14">指定角色</a-checkbox>
          <yUserSelect class="ele-cell-content" width="100%" placeholder="请选择指定角色" mode="multiple" v-model:value="data.target.value2"></yUserSelect>
        </div>
        <div class="ele-cell margin-top-20">
          <a-checkbox v-model:checked="data.target.checked3">指定用户组</a-checkbox>
          <yUserSelect class="ele-cell-content" width="100%" placeholder="请选择指定用户组" mode="multiple" v-model:value="data.target.value3"></yUserSelect>
        </div>
        <div class="ele-cell margin-top-20">
          <a-checkbox v-model:checked="data.target.checked4">指定干系人</a-checkbox>
          <a-select
            v-model:value="data.target.value4"
            class="ele-cell-content"
            mode="multiple"
            style="width: 100%"
            placeholder="请选择指定干系人"
            :options="targetOptions4"
          ></a-select>
        </div>
      </div>
    </div>
    <!-- 通知方式 -->
    <div class="flex margin-top-20">
      <div class="margin-right-10 text-color-secondary">通知方式</div>
      <div style="flex:1">
        <div class="ele-cell">
          <a-checkbox v-model:checked="data.form.checked1" class="margin-right-10">站内通知</a-checkbox>
          <a-checkbox v-model:checked="data.form.checked2" class="margin-right-10">云布业</a-checkbox>
          <a-checkbox v-model:checked="data.form.checked3" class="margin-right-10">企微群</a-checkbox>
        </div>
        <div class="ele-cell margin-top-20" v-show="data.form.checked3">
          <div class="margin-right-10 text-color-secondary">webhook</div>
          <a-input v-model:value="data.form.value" class="ele-cell-content"></a-input>
        </div>
      </div>
    </div>
    <!-- 消息内容 -->
    <h4 class="margin-top-10" style="margin-left: -20px;">消息内容</h4>
    <div class="ele-cell margin-top-20">
      <div class="margin-right-10 text-color-secondary" style="width: 56px;text-align: right;">标题</div>
      <a-input-group compact class="ele-cell-content" style="padding: 0;">
        <a-input v-model:value="data.title" style="width: calc(100% - 106px);" />
        <a-dropdown :trigger="['click']" placement="bottomRight">
          <template #overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="模板1模板1模板1模板1模板1模板1">
                模板1模板1模板1模板1模板1模板1
              </a-menu-item>
              <a-menu-item key="模板2">
                模板2
              </a-menu-item>
              <a-menu-item key="模板3">
                模板3
              </a-menu-item>
            </a-menu>
          </template>
          <a-button>
            引用模板
            <DownOutlined />
          </a-button>
        </a-dropdown>
      </a-input-group>
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
  import { DownOutlined } from '@ant-design/icons-vue';
  import yModal from '@/components/y-modal/index.vue';
  import dayjs from 'dayjs';
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
    type:'1',
    event:{
      value1:'创建',
      value2:'单价',
      value2_1:'到达',
      value3:'xx节点',
    },
    time:{
      value1:'发起时间',
      value2:'之前',
      value3:dayjs('12:08', 'HH:mm')
    },
    target:{
      checked1:true,
      value1:[],
      checked2:true,
      value2:[],
      checked3:true,
      value3:[],
      checked4:true,
      value4:[],
    },
    form:{
      checked1:true,
      checked2:true,
      checked3:true,
      value:''
    },
    title:''
  })
  const eventOptions1 = ref([
    {
      value:'创建',
      lable:'创建'
    },
    {
      value:'评论',
      lable:'评论'
    },
    {
      value:'撤销',
      lable:'撤销'
    },
    {
      value:'编辑',
      lable:'编辑'
    },
    {
      value:'流程流转',
      lable:'流程流转'
    }
  ])
  const eventOptions2 = ref([
    {
      value:'优先级',
      lable:'优先级'
    },
    {
      value:'期望完成时间',
      lable:'期望完成时间'
    },
    {
      value:'单价',
      lable:'单价'
    },
  ])
  const eventOptions2_1 = ref([
    {
      value:'到达',
      lable:'到达'
    },
    {
      value:'操作',
      lable:'操作'
    },
  ])
  const eventOptions3 = ref([
    {
      value:'xx节点',
      lable:'xx节点'
    },
    {
      value:'转交',
      lable:'转交'
    },
  ])
  const timeOptions1 = ref([
    {
      value:'发起时间',
      lable:'发起时间'
    },
    {
      value:'期望完成时间',
      lable:'期望完成时间'
    },
    {
      value:'完成时间',
      lable:'完成时间'
    },
    {
      value:'提交时间',
      lable:'提交时间'
    },
    {
      value:'自定义字段',
      lable:'自定义字段'
    },
  ])
  const timeOptions2 = ref([
    {
      value:'之前',
      lable:'之前'
    },
    {
      value:'之后',
      lable:'之后'
    },
  ])
  const targetOptions4 = ref([
    {
      value:'发起人',
      lable:'发起人'
    },
    {
      value:'审批人',
      lable:'审批人'
    },
    {
      value:'执行人',
      lable:'执行人'
    },
    {
      value:'抄送人',
      lable:'抄送人'
    },
  ])
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
  const handleMenuClick = (e)=>{
    data.title = e.key;
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
