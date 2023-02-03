<template>
  <a-modal :width="600" class="auth-edit-modal" v-model:visible="visible" :centered="true"  title="项目权限管理" @cancel="cancel" :maskClosable="false" :keyboard="false">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane  v-for="item in tabsData" :key="item.name" :tab="item.name">
        <div class="ele-scrollbar-mini content-box">
          <div class="ele-cell space-between margin-bottom-15" v-for="(childrenItem,i) in authData[item.key]" :key="i">
            <div>{{childrenItem.name}}</div>
            <a-dropdown :trigger="['click']" placement="bottomRight" overlayClassName="auth-edit-dropdown">
              <a class="ant-dropdown-link" @click.prevent>
                {{childrenItem.authName}}
                <DownOutlined />
              </a>
              <template #overlay>
                <a-menu style="width: 120px;" @click="handleMenuClick($event,item.key,i)">
                  <a-menu-item key="0"><div class="padding-5">仅查看</div></a-menu-item>
                  <a-menu-item key="1"><div class="padding-5">可编辑</div></a-menu-item>
                  <a-menu-item key="2"><div class="ele-text-primary padding-5" style="background: var(--primary-1);">管理员</div></a-menu-item>
                  <a-menu-item key="3"><div class="ele-text-danger padding-5" style="background: var(--red-1);">删除</div></a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
      </a-tab-pane>
      <template #rightExtra>
        <a-button type="dashed" class="ele-cell ele-text-primary"><span class="iconfont icon-Add margin-right-5 ele-text-small"></span>添加{{activeKey}}</a-button>
      </template>
    </a-tabs>
    <template #footer>
      <a-button type="primary" @click="save">保存</a-button>
      <a-button class="margin-left-10" @click="cancel">取消</a-button>
    </template>
  </a-modal>
  <!-- 是否保存数据弹窗 -->
  <yModal ref="modal" title="是否保存数据" :showNotOk="true" okText="保存" notOkType="link" :centered="true" @ok="save" @notOk="notOk"></yModal>
  <!-- 删除提示弹窗 -->
  <yModal ref="dltModal" title="删除提示" okText="删除" content="删除后对应用户将无法查看及操作该项目的审批申请,请确认删除"  :centered="true" :closable="false"  :danger="true" @ok="dlt"></yModal>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,toRef,nextTick,inject  } from 'vue';
  import { message } from 'ant-design-vue';
  import yModal from '@/components/y-modal/index.vue';
  import { DownOutlined } from '@ant-design/icons-vue';
  const emit = defineEmits(["save"]);
  const props = defineProps({

  })
  const tabsData = ref([
    {name:'用户',key:'user'},
    {name:'角色',key:'role'},
    {name:'用户组',key:'usergroup'}
  ]);
  const activeKey = ref('用户');
  const authData = reactive({
    user:[
      {name:'李娜',authName:'仅查看'},
      {name:'张三',authName:'仅查看'},
      {name:'李娜',authName:'仅查看'},
      {name:'张三',authName:'仅查看'},
      {name:'李娜',authName:'仅查看'},
      {name:'张三',authName:'仅查看'},
      {name:'李娜',authName:'仅查看'},
      {name:'张三',authName:'仅查看'},
      {name:'李娜',authName:'仅查看'},
      {name:'张三',authName:'仅查看'},
      {name:'李娜',authName:'仅查看'},
      {name:'张三',authName:'仅查看'},
      {name:'李娜',authName:'仅查看'},
      {name:'张三',authName:'仅查看'},
      {name:'李娜',authName:'仅查看'},
      {name:'张三',authName:'仅查看'},
      {name:'李娜',authName:'仅查看'},
      {name:'张三',authName:'仅查看'}
    ],
    role:[
      {name:'李娜1',authName:'仅查看'},
      {name:'张三1',authName:'仅查看'}
    ],
    usergroup:[
      {name:'李娜2',authName:'仅查看'},
      {name:'张三2',authName:'仅查看'}
    ],
  })
  const defalutData = JSON.parse(JSON.stringify(authData));
  const title = ref(props.title);
  const describe = ref(props.describe);
  const checked = ref(props.checked);
  const visible = ref(false);
  const modal = ref(null);
  const dltModal = ref(null);
  const operation = reactive({
    type:'user',//当前操作状态
    index:0//当前操作的下标值
  })
  const open = ()=> {
    title.value = props.title;
    describe.value = props.describe;
    checked.value = props.checked;
    visible.value = true;
  }
  const close = ()=> {
    visible.value = false;
  }
  const handleMenuClick = (e,type,i)=> {
    console.log(e,type,i)
    operation.type = type;
    operation.index = i;
    switch(e.key){
      case '0':
        authData[type][i].authName = '仅查看';
        break;
      case '1':
        authData[type][i].authName = '可编辑';
        break;
      case '2':
        authData[type][i].authName = '管理员';
        break;
      case '3'://删除
        dltModal.value.open();
        break;
    }
  }
  const dlt = ()=> {
    authData[operation.type].splice(operation.index,1);
    message.success('删除成功');
  }
  //取消
  const cancel = ()=> {
    if(JSON.stringify(authData) != JSON.stringify(defalutData)){
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
    emit('save',authData.value);
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
  :global(.auth-edit-dropdown .ant-dropdown-menu .ant-dropdown-menu-item:hover){
    background-color: var(--dropdown-menu-bg);
  }
  .content-box{
    height: 400px;
    overflow: scroll;
  }
  .padding-5{
    padding: 5px 10px;
  }
  .space-between{
    justify-content: space-between;
  }
  .margin-bottom-15{
    margin-bottom:15px;
  }
  .margin-top-20{
    margin-top:20px;
  }
  .margin-right-5{
    margin-right: 5px;
  }
  .pointer{
    cursor: pointer;
  }
</style>
