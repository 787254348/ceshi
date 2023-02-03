<template>
  <a-modal :width="800" v-model:visible="visible" :centered="true"  @cancel="cancel" :maskClosable="false" :keyboard="false" >
    <template #title>
      <b>附加字段和权限设置</b>
    </template>
    <div>
      <div class="ele-cell">
        <h6>当前流转：</h6>
        <div class="status-effect margin-left-10" :style="tagStyle(data.status.before.color)"><span class="iconfont margin-right-5" :class="data.status.before.icon" :style="'color:'+data.status.before.color"></span>{{data.status.before.name}}</div>
        <span class="iconfont icon-triangle margin-left-10 margin-right-10 text-color-secondary" style="font-size:12px"></span>
        <div class="status-effect" :style="tagStyle(data.status.after.color)"><span class="iconfont margin-right-5" :class="data.status.after.icon" :style="'color:'+data.status.after.color"></span>{{data.status.after.name}}</div>
      </div>
      <h6 class="margin-top-20 margin-bottom-10">附加字段设置</h6>
      <table class="ele-table ele-table-border ele-table-stripe ele-table-medium" style="display: block;">
          <colgroup>
              <col width="40" />
              <col width="160" />
              <col width="290" />
              <col />
          </colgroup>
          <thead>
              <tr>
                  <th width="40"><em/></th>
                  <th width="160" style="color:var(--text-color-secondary);"><b>字段名称</b></th>
                  <th width="290" style="text-align: center;color:var(--text-color-secondary);"><b>默认值</b></th>
                  <th width="160" style="text-align: center;color:var(--text-color-secondary);"><b>是否必填</b></th>
                  <th width="100" style="text-align: center;color:var(--text-color-secondary);"><b>操作</b></th>
              </tr>
          </thead>
          <vue-draggable
             tag="tbody"
             item-key="id"
             v-model:list="data.list"
             :animation="300"
             handle=".demo-table-drag-handle"
             style="height: 210px;display: block;"
             class="ele-scrollbar-hover ele-scrollbar-mini"
          >
             <template #item="{ element,index }">
                <tr @mouseenter="hoverIndex=index" @mouseleave="hoverIndex=-1">
                  <td width="40" style="text-align: center;">
                      <span v-show="hoverIndex==index" class="iconfont icon-zu40 ele-text-info demo-table-drag-handle" style="cursor: move;"></span>
                  </td>
                  <td width="160">{{element.name}}</td>
                  <td width="290">
                    <a-select
                      v-if="element.type=='priority'"
                      ref="select"
                      v-model:value="element.value"
                      style="width: 100%"
                      :options="options"
                    ></a-select>
                    <y-user-select v-if="element.type=='user'" :isBody="true" mode="multiple" width="100%" v-model:value="element.value"></y-user-select>
                    <y-date v-if="element.type=='time'" width="100%" :showTime="true" dateFormat="YYYY-MM-DD HH:mm"></y-date>
                  </td>
                  <td width="160" style="text-align: center;"><a-checkbox v-model:checked="element.checked"></a-checkbox></td>
                  <td width="100" style="text-align: center;">
                      <span class="iconfont icon-close pointer" @click="dlt(index)"></span>
                  </td>
                </tr>
             </template>
          </vue-draggable>
      </table>
      <div class="ele-text-primary pointer margin-top-10" @click="addField"><span class="iconfont icon-Add ele-text-small margin-right-7"></span>添加字段</div>
      <div class="ele-cell margin-top-20">
        <h6>流转权限设置</h6>
        <div class="text-color-secondary margin-left-10">注：留空默认所有人都有权限</div>
      </div>
      <div class="ele-cell margin-top-20">
        <div class="title-left text-color-secondary">任务成员</div>
        <a-checkbox v-for="(item,i) in data.taskMemberList" v-model:checked="item.checked" class="margin-right-30">{{item.name}}</a-checkbox>
      </div>
      <div class="ele-cell margin-top-20">
        <div class="title-left text-color-secondary">权限成员</div>
        <y-user-select :isBody="true" mode="multiple" width="calc(100% - 66px)" v-model:value="data.authMember"></y-user-select>
      </div>
      <div class="ele-cell margin-top-20">
        <div class="title-left text-color-secondary">角色</div>
        <y-user-select :isBody="true" mode="multiple" width="calc(100% - 66px)" v-model:value="data.role"></y-user-select>
      </div>
      <div class="ele-cell margin-top-20">
        <div class="title-left text-color-secondary">用户组</div>
        <y-user-select :isBody="true" mode="multiple" width="calc(100% - 66px)" v-model:value="data.group"></y-user-select>
      </div>

    </div>
    <template #footer>
      <a-button type="primary" @click="save">保存</a-button>
      <a-button class="margin-left-10" @click="cancel">取消</a-button>
    </template>
  </a-modal>
  <!-- 字段选择窗口 -->
  <selectFieldModal ref="selectFieldEdit"></selectFieldModal>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,toRef,nextTick } from 'vue';
  import VueDraggable from 'vuedraggable';
  import { message } from 'ant-design-vue';
  import selectFieldModal from './select-field-modal.vue';
  const emit = defineEmits(["save"]);
  const props = defineProps({

  });
  const data = reactive({
      status:{
        before:{
          icon:'icon-a-lujing279',
          name:'xx状态',
          color:'rgba(34, 215, 187,1)',
        },
        after:{
          icon:'icon-a-lujing279',
          name:'xx状态',
          color:'rgba(249, 105, 170,1)',
        }
      },
      list:[
        {name:'优先级',value:'',type:'priority',checked:false},
        {name:'负责人',value:[],type:'user',checked:false},
        {name:'预计开始',value:'',type:'time',checked:false},
        {name:'截止时间',value:'',type:'time',checked:false},
        {name:'截止时间',value:'',type:'time',checked:false},
        {name:'截止时间',value:'',type:'time',checked:false},
      ],
      taskMemberList:[
        {name:'负责人',checked:false},
        {name:'创建人',checked:false},
        {name:'抄送人',checked:false},
        {name:'参与人',checked:false},
        {name:'处理人',checked:false},
      ],
      authMember:[],//权限成员
      role:[],//角色
      group:[]//用户组
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
  const visible = ref(false);
  const hoverIndex = ref(-1);
  const modal = ref(null);
  //计算状态效果的背景颜色
  const tagStyle = (color)=> {
      let v = color.replace("rgba(","");
      let arr = v.replace(")","").split(",");
      arr[3] = '0.2';
      let background = 'rgba('+arr.join(",")+')';
      return `background:${background}`
  }
  //删除表格记录方法
  const dlt = (i)=>{
    data.list.splice(i,1);
  }
  //添加字段方法
  const selectFieldEdit = ref(null);
  const addField = ()=> {
    selectFieldEdit.value.open();
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
.status-effect{
  display: inline-block;
  border-radius: 2px;
  padding: 2px 8px;
}
.title-left{
  width: 56px;
  text-align: right;
  margin-right: 10px;
}
</style>
