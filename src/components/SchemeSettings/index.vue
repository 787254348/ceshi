<template>
  <a-popover trigger="click" :class="className" overlayClassName="scheme-set" placement="bottomRight" v-model:visible="visible">
    <template #content>
      <div class="ele-cell line-height-30 padding-16 content-item" :class="value=='all' ? 'bg-primary ele-text-primary' : 'gray'" @click="select('all')">
        <span class="iconfont icon-search width-30"></span>
        所有的
      </div>
      <div class="main-item ele-scrollbar-hover ele-scrollbar-mini line-height-30 ele-border-info">
        <div class="ele-cell content-item item padding-16" v-for="(item,i) in list" :key="i" :class="{'bg-primary ele-text-primary':item.value==value}" @click="select(item.value)">
          <div class="ele-cell">
            <div class="width-30"><span v-if="item.value==value" class="iconfont icon-Check"></span></div>
            {{item.name}}
          </div>
          <span v-if="item.value==value && item.isSingle" class="iconfont icon-upload margin-left-10"></span>
        </div>
      </div>
      <div class="ele-cell line-height-30 padding-16  content-item" @click="add"><span class="iconfont icon-Add width-30" ></span>添加查询方案</div>
      <div class="ele-cell line-height-30 padding-16  content-item"><span class="iconfont icon-set width-30"></span>配置查询方案</div>
    </template>
    <div class="button pointer">
      <span v-if="value=='all'" class="iconfont icon-search   ele-inline-block text-color-secondary"></span>
      {{selectName}}
      <DownOutlined class="ele-text-small text-color-secondary"/>
    </div>
  </a-popover>
  <selectModal ref="modal" title="666" radioValue="2"></selectModal>
</template>

<script setup>
  import { ref,watch,defineProps,computed,toRefs } from 'vue';
  import { DownOutlined } from '@ant-design/icons-vue';
  import selectModal from '@/components/SchemeSettings/modal.vue';
  const props = defineProps({
    className:{//类名
      type:String,
      default:'',
    }
  })
  const {className} = toRefs(props);
  const visible = ref(false);
  const value = ref('all');
  const list = ref([
    {name:'A方案',value:'A',isSingle:true},
    {name:'最近一个月',value:'month',isSingle:false},
    {name:'紧急的',value:'crash',isSingle:false}
  ])
  const selectName = computed(()=>{
    let val;
    if(value.value=='all'){
      val = '所有的';
    }else{
      let obj = list.value.find(item=>item.value==value.value);
      val = obj.name;
    }
    return val;
  })
  const select = v => {
    value.value = v;
    visible.value = false;
  }
  const modal = ref(null);
  const add = ()=> {
    modal.value.open();
    visible.value = false;
  }


</script>

<style lang="less" scoped>
  :global(.scheme-set .ant-popover-inner-content){
    padding: 12px 0;
  }
  .button{
    display: inline-block;
  }
  .button:hover{
    color: var(--primary-color);
    span{
      color: var(--primary-color);
    }
  }
  .content-item:hover{
    background: var(--primary-1);
    color: var(--primary-color);
    cursor: pointer;
  }
  .main-item{
    border-top: 1px solid;
    border-bottom: 1px solid;
    max-height: 150px;
  }
  .item{
    justify-content: space-between;
    display: flex;
    margin: 5px 0;
  }
  .pointer{
    cursor: pointer;
  }
  .width-30{
    width: 30px;
  }
  .margin-left-10{
    margin-left: 10px;
  }
  .padding-16{
    padding: 0 16px;
  }
  .margin-top-20{
    margin-top:20px;
  }
  .bg-primary{
    background: var(--primary-1);
  }
  .line-height-30{
    line-height: 30px;
  }
  .gray{
    color: var(--text-color-secondary);
  }

</style>
