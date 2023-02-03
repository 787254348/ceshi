<template>
  <div>
    <!-- 基本信息 -->
    <div class="margin-bottom-10"><span class="iconfont icon-jb margin-right-5 ele-inline-block" style="transform: scale(1.2);"></span><span class="font-size-16">基本信息</span></div>
    <div class="information flex ele-fluid">
      <div class="information-item ele-cell margin-bottom-10">
        <div class="information-item-left text-color-secondary">优先级：</div>
        <y-priority-select class="priority margin-left-12" v-model:value="priority">
          <div class="priority-empty" v-if="!priority">-----</div>
        </y-priority-select>
      </div>
      <div class="information-item ele-cell margin-bottom-10" v-for="(item,i) in fieldList" :key="i">
        <div class="information-item-left text-color-secondary">{{item.title}}：</div>
        <div class="ele-cell-content margin-right-20">
          <a-input v-if="item.type=='text'" v-model:value="item.value" ></a-input>
          <a-select v-if="item.type=='single'" style="width: 100%;" v-model:value="item.value" :options="options"></a-select>
          <a-select v-if="item.type=='multiple'" style="width: 100%;" v-model:value="item.value" mode="multiple" :options="options"></a-select>
          <y-user-select v-if="item.type=='user'" :isBody="true" mode="multiple" width="100%" v-model:value="item.value"></y-user-select>
          <y-date v-if="item.type=='time'" width="100%" :showTime="true" dateFormat="YYYY-MM-DD HH:mm"></y-date>
          <y-input v-if="item.type=='number'" style="width: 100%;" v-model:value="item.value"></y-input>
        </div>
      </div>
    </div>
    <div class="information-item ele-cell margin-bottom-10" v-for="(item,i) in staffList" :key="i">
      <div class="information-item-left text-color-secondary">{{item.title}}：</div>
      <div class="ele-cell-content margin-right-20">
        <y-user-select :isBody="true" mode="multiple" width="100%" v-model:value="item.value"></y-user-select>
      </div>
    </div>
    <!-- 任务描述 -->
    <a-divider style="margin-top: 30px;margin-bottom: 20px;"/>
    <div class="margin-bottom-10 "><span class="iconfont icon-rw margin-right-5 ele-inline-block" style="transform: scale(1.2);"></span><span class="font-size-16">任务描述</span></div>
    <y-editor ref="editor" v-model:valueHtml="valueHtml" :isUpload="false" :isButton="false" :isEmotion="false" placeholder="请输入描述内容" style="border: 1px solid var(--border-color-base);min-height: 32px;padding: 3px 0 0 10px;line-height: 20px;width: 100%;" ></y-editor>
    <!-- 检查项 -->
    <a-divider style="margin-top: 30px;margin-bottom: 20px;"/>
    <div class="margin-bottom-10 ele-cell">
      <div class="margin-right-20"><span class="iconfont icon-jzx margin-right-5 ele-inline-block" style="transform: scale(1.2);"></span><span class="font-size-16">检查项</span></div>
      <div class="text-color-secondary">{{percent}}%</div>
      <a-progress class="ele-cell-content" :percent="percent" :showInfo="false"/>
    </div>
    <vue-draggable
        item-key="id"
        v-model:list="checkItems"
        :animation="300"
        handle=".drag-handle"
    >
      <template #item="{ element,index }">
        <div class="ele-cell margin-left-20 margin-bottom-10">
          <span class="drag-handle iconfont icon-zu40 margin-right-5 text-color-secondary cursor-move"></span>
          <a-checkbox class="margin-right-10" v-model:checked="element.checked"></a-checkbox>
          <div v-show="element.checked" class="ele-fluid check-content" style="padding: 3px 0px 0px 10px;min-height: 32px;" v-html="element.value"></div>
          <y-editor v-show="!element.checked"  v-model:valueHtml="element.value" class="gray-background"  :isUpload="false" :isButton="false" :isEmotion="false" :isA="true" :isDate="true" :isPriority="true"  placeholder="请输入检查内容" style="border: 0;min-height: 32px;padding: 3px 0 0 10px;line-height: 20px;width: 100%;background: var(--gray-3)" ></y-editor>
          <span class="iconfont icon-pl margin-left-10 pointer"></span>
        </div>
      </template>
    </vue-draggable>
    <a-button class="margin-left-20 ele-cell margin-top-20" type="primary" ghost @click="addCheck"><span class="iconfont icon-jzx margin-right-5"></span>添加检查项</a-button>
    <!-- 标签 -->
    <a-divider style="margin-top: 30px;margin-bottom: 20px;"/>
    <div class="margin-bottom-10 flex">
      <div class="margin-right-10"><span class="iconfont icon-bq margin-right-5 ele-inline-block" style="transform: scale(1.2);"></span><span class="font-size-16">标签</span></div>
      <div class="flex-1">
        <y-add-tag></y-add-tag>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,nextTick,provide } from 'vue';
  import dayjs from 'dayjs'
  import VueDraggable from 'vuedraggable';
  import { message } from 'ant-design-vue';
  const priority = ref('');//优先级数据
  const valueHtml = ref('');
  const fieldList = ref([
    {title:'文本框',type:'text',value:'',visible:false},
    {title:'单选框',type:'single',value:'',visible:false},
    {title:'多选框',type:'multiple',value:[],visible:false},
    {title:'用户多选框',type:'user',value:[],visible:false},
    {title:'日期',type:'time',value:'',visible:false},
    {title:'数值输入框',type:'number',value:'',visible:false}
  ])
  const staffList = ref([
    {title:'参与人',type:'user',value:[],visible:false},
    {title:'抄送人',type:'user',value:[],visible:false},
  ])
  const options = ref([{
      value: 'jack',
      label: 'Jack',
    }, {
      value: 'lucy',
      label: 'Lucy',
    }, {
      value: 'disabled',
      label: 'Disabled',
      disabled: true,
    }, {
      value: 'yiminghe',
      label: 'Yiminghe',
    }]);

  const checkItems = ref([//检查项数据
    {id:1,value:'',checked:false},
    {id:2,value:'',checked:false},
    {id:3,value:'',checked:false},
    {id:4,value:'',checked:false},
    {id:5,value:'',checked:false},
    {id:6,value:'',checked:false}
  ])
  //检查项的进度
  const percent = computed(()=>{
    let arr = checkItems.value.filter((item)=>{
      return item.checked;
    })
    let num = parseFloat((arr.length/checkItems.value.length*100).toFixed(2));
    return num || 0;
  })
  //添加检查项
  const addCheck = ()=> {
    checkItems.value.push({value:'',checked:false})
  }
</script>

<style lang="less" scoped>
  .information{
    flex-wrap: wrap;
  }
  .information-item{
    width: 33.33%;
  }
  .information-item-left{
    width: 100px;
    text-align: right;
  }
  .priority-empty{
    padding: 0 10px;
    cursor: pointer;
  }
  .priority-empty:hover{
    background-color: #f8f8f8;
    border-radius: 2px;
  }
  .check-content{
    text-decoration: line-through;
    color: #a0a5ab;
  }
  :global(.check-content p){
    margin-bottom: 0 !important;
  }
</style>
