<template>
  <a-popover trigger="click" :class="className" overlayClassName="board-list" placement="bottomRight" v-model:visible="visible">
    <template #content>
      <div class="ele-scrollbar-hover ele-scrollbar-mini line-height-30 ele-border-info">
        <div class="ele-cell content-item item" v-for="(item,i) in list" :key="i" :class="{'ele-text-primary':item.value==value}" @click="select(item.value)">
          <span class="iconfont margin-left-10 margin-right-10" :class="item.icon"></span>
            {{item.name}}
        </div>
      </div>
    </template>
    <div class="button pointer">
      <span class="iconfont ele-inline-block text-color-secondary" :class="selectName.icon"></span>
      {{selectName.name}}
      <DownOutlined class="ele-text-small text-color-secondary"/>
    </div>
  </a-popover>
</template>

<script setup>
  import { ref,watch,defineProps,computed,toRefs } from 'vue';
  import { DownOutlined } from '@ant-design/icons-vue';
  const props = defineProps({
    className:{//类名
      type:String,
      default:'',
    }
  })
  const {className} = toRefs(props);
  const visible = ref(false);
  const value = ref('list');
  const list = ref([
    {name:'状态看板',value:'status',icon:'icon-a-lujing279'},
    {name:'日历看板',value:'date',icon:'icon-a-lianhe123'},
    {name:'甘特图',value:'gantt',icon:'icon-gantetu'},
    {name:'列表看板',value:'list',icon:'icon-a-lianhe121'}
  ])
  const selectName = computed(()=>{
    let obj = list.value.find(item=>item.value==value.value);
    return obj;
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
  :global(.board-list .ant-popover-inner-content){
    padding: 0;
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
    cursor: pointer;
  }
  .item{
    margin: 5px 0;
    width: 150px;
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
