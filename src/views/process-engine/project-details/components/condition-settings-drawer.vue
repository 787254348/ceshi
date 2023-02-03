<template>
    <a-drawer
      :width="640"
      placement="right"
      :closable="false"
      :visible="visible"
    >
      <template #title>
        <b>条件1<span class="iconfont icon-edit ele-text-placeholder margin-left-10"></span></b>
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
      <a-alert message="条件分支:分支间有优先级,只执行优先级最高的分支" type="info" show-icon />
      <div class="ele-cell space-between margin-top-20">
        <div>规则条件</div>
        <div style="margin-right: -15px;">
            条件间的关系：
            <a-radio-group v-model:value="setData.value">
               <a-radio :value="1" :class="{'ele-text-primary':setData.value==1}">且</a-radio>
               <a-radio :value="2" :class="{'ele-text-primary':setData.value==2}">或</a-radio>
             </a-radio-group>
        </div>
      </div>
      <div class="ele-cell margin-top-20" v-for="(item,i) in setData.data" :key="i">
        <a-select
          v-model:value="item.value1"
          style="width: 160px;"
          :options="fieldOptions"
          @change = "handleChange($event,i)"
        ></a-select>
        <a-select
          v-model:value="item.value2"
          style="width: 160px;margin-left: 10px;"
          :options="formulaOptions[item.type]"
        ></a-select>
        <div class="margin-left-10">
          <a-input v-if="item.type=='text'" style="width: 225px;" v-model:value="item.value3"></a-input>
          <yUserSelect v-if="item.type=='multiple'" width="225px" mode="multiple" v-model:value="item.value3"></yUserSelect>
          <a-select  v-if="item.type=='select'" v-model:value="item.value3" style="width: 225px;" :options="staffOptions"></a-select>
          <y-date-range v-if="item.type=='date'" width="225px" offsetStyle="margin-left:-320px"></y-date-range>
          <!-- <a-input v-if="item.type=='number'" style="width: 225px;" v-model:value="item.value3"></a-input> -->
          <y-input v-if="item.type=='number'" style="width: 225px;"  v-model:value="item.value3"></y-input>
        </div>
        <span class="iconfont icon-shanchu pointer margin-left-10"  @click="dlt(i)"></span>
      </div>
      <!-- 添加条件按钮 -->
      <a-button type="dashed" size="large" class="add-button margin-top-20"  @click="add">
        <span class="iconfont icon-Add pointer margin-right-10"></span>
        添加条件
      </a-button>
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
    value:1,
    data:[
      {value1:'发起人',value2:'等于',value3:[],type:'multiple'}
    ],
  });
  const fieldOptions = ref([
    {
      value: '发起人',
      label: '发起人',
      key:'multiple'
    },
    {
      value: '文本类型',
      label: '文本类型',
      key:'text'
    },
    {
      value: '选项类型',
      label: '选项类型',
      key:'select'
    },
    {
      value: '时间类型',
      label: '时间类型',
      key:'date'
    },
    {
      value: '数值类型',
      label: '数值类型',
      key:'number'
    }
  ]);
  const staffOptions = ref([
    {
      value: '张三',
      label: '张三',
    },
    {
      value: '李四',
      label: '李四',
    },
  ])
  const arr = [
    {
      value: '等于',
      label: '等于',
    },
    {
      value: '不等于',
      label: '不等于',
    },
    {
      value: '包含',
      label: '包含',
    },
    {
      value: '不包含',
      label: '不包含',
    },
    {
      value: '为空',
      label: '为空',
    },
    {
      value: '不为空',
      label: '不为空',
    }
  ]
  const arr1 = [
    {
      value: '等于',
      label: '等于',
    },
    {
      value: '大于',
      label: '大于',
    },
    {
      value: '小于',
      label: '小于',
    },
    {
      value: '大于等于',
      label: '大于等于',
    },
    {
      value: '小于等于',
      label: '小于等于',
    },
    {
      value: '为空',
      label: '为空',
    },
    {
      value: '不为空',
      label: '不为空',
    }
  ]
  const formulaOptions = reactive({
    text:arr,
    multiple:[...arr,{value: '当前登录账号',label: '当前登录账号'}],
    select:arr,
    date:[{value: '时间范围',label: '时间范围'},...arr,{value: '日历时间',label: '日历时间'}],
    number:[{value: '数值范围',label: '数值范围'},...arr]
  })
  const defalutSetData = JSON.parse(JSON.stringify(setData));
  //目标字段选择回调
  const handleChange = (e,i)=>{
    let obj = fieldOptions.value.find((item)=>{
      return item.value == e;
    })
    setData.data[i].type = obj.key;
    setData.data[i].value2 = '等于';
    if(obj.key=='multiple'){
      setData.data[i].value3 = [];
    }else{
      setData.data[i].value3 = '3';
      setTimeout(()=>{
        setData.data[0].value3 = '5';
      },1000)
      setTimeout(()=>{
        setData.data[0].value3 = '7';
      },2000)
    }
  }
  //删除条件
  const dlt = (i)=>{
    setData.data.splice(i,1);
  }
  //添加条件
  const add = ()=>{
    setData.data.push({value1:'发起人',value2:'等于',value3:[],type:'multiple'})
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
    if(JSON.stringify(setData) != JSON.stringify(defalutSetData)){
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
  .add-button{
    width: 100%;
    color: var(--primary-color);
    border-color: var(--primary-color);
    background-color: var(--primary-1);
  }
</style>
