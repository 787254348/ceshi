<template>
  <a-popover trigger="click" :class="className" placement="bottomRight"   v-model:visible="visible">
    <template #content>
        <div class="ele-cell">
          <a-popover trigger="click" placement="bottom" overlayClassName="scheme-set" v-model:visible="typeVisible">
              <template #content>
                <div class="line-height-30 padding-16 content-item" v-for="(item,i) in typeList" :key="i" :class="{'bg-primary ele-text-primary':item.name==type}" @click="selectType(item.name)">{{item.name}}</div>
              </template>
              <div class="ele-text-primary pointer ele-text-right" style="width: 70px;"><ins>{{type}}</ins>：</div>
          </a-popover>
          <yDateRange width="300px" :offsetStyle="offsetStyle" :startDate="startDate" :endDate="endDate" @confirm="confirm"></yDateRange>
        </div>
    </template>
    <div class="button pointer">
      <span class="iconfont icon-a-lianhe26 ele-inline-block text-color-secondary"></span>
      {{selectName}}
      <DownOutlined class="ele-text-small text-color-secondary" />
    </div>
  </a-popover>
</template>

<script setup>
  import { ref,watch,defineProps,computed,toRefs } from 'vue';
  import { DownOutlined } from '@ant-design/icons-vue';
  import yDateRange from '@/components/y-date-range/index.vue';
  import dayjs from 'dayjs';
  const props = defineProps({
    className:{//类名
      type:String,
      default:'',
    },
    type:{
      type:String,
      default:'预计开始',
    },
    typeList:{
      type:Array,
      default(){
        return [
          {name:'预计开始'},
          {name:'截止时间'},
          {name:'xx时间'}
        ]
      }
    },
    startDate:{//开始日期
        type:Object,
        default:dayjs()
    },
    endDate:{//结束日期
        type:Object,
        default:dayjs()
    },
    offsetStyle:{
      type:String,
    }
  })
  const emit = defineEmits(["update:type","update:startDate","update:endDate"]);
  const visible = ref(false);
  const {type,typeList,startDate,endDate,className,offsetStyle} = toRefs(props);
  // const startDate = ref(dayjs());
  // const endDate = ref(dayjs());
  const confirm = (obj) => {
    // startDate.value = obj.startDate;
    // endDate.value = obj.endDate;
    emit('update:startDate',obj.startDate);
    emit('update:endDate',obj.endDate);
    visible.value = false;
  }
  const typeVisible = ref(false);
  // const typeList = ref([
  //   {name:'预计开始'},
  //   {name:'截止时间'},
  //   {name:'xx时间'}
  // ]);
  // const type = ref('预计开始');
  const selectName = computed(()=>{
    return !!startDate.value ? type.value : '查询时间';
  })
  const selectType = value => {
    emit('update:type',value);
    typeVisible.value = false;
  };

  const add = ()=> {
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
