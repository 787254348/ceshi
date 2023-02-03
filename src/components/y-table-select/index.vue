<template>
  <a-dropdown :trigger="['click']" placement="bottomLeft">
      <slot>
        <span class="pointer" :class="{'ant-input':bordered}">{{value || '-----'}}</span>
      </slot>
      <template #overlay>
        <a-menu class="y-table-select">
          <a-menu-item>
            <div :style="'width:'+rowWidth+'px;height:'+rowHeight+'px'">
              <div class="table-box ele-scrollbar-mini">
                <table class="ele-table  ele-table-stripe ele-table-medium">
                    <thead>
                        <tr>
                            <th v-for="(item,i) in columnData" :key="i" :width="item.width || 100">{{item.columnName}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(listItem,i) in list" :key="i" :class="{'ele-table-active': i%2==1}" @click="select(listItem,i)">
                            <td class="ele-elip" :style="selectIndex==i ? 'background-color: var(--primary-color);color:#fff;' : ''" v-for="(item,j) in columnData" :key="j" :width="item.width  || 100">{{listItem[item.fieldName]}}</td>
                        </tr>
                    </tbody>
                </table>
              </div>
            </div>
            <div class="ele-cell flex-end add-button" v-if="isAdd">
              <div class="pointer padding-right-10" @click="addList"><span class="iconfont icon-jiahao margin-right-5 font-size-14"></span>添加</div>
              <span class="iconfont icon-dangan pointer font-size-14 padding-left-10" @click="checkList"></span>
            </div>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,nextTick,provide } from 'vue';
  const emit = defineEmits(['update:value','select','addList','checkList']);
  const props = defineProps({
        value:{//选中的值
           type:String,
           default:''
        },
        selectIndex:{//选中的下标值
           type:Number,
           default:-1
        },
        rowWidth:{//下拉弹窗的宽度
            type:Number,
            default:410
        },
        rowHeight:{//下拉弹窗的高度
            type:Number,
            default:236
        },
        bordered:{//是否有边框
          type:Boolean,
          default:false
        },
        isAdd:{//是否显示添加按钮
          type:Boolean,
          default:false
        },
        columnData:{//表头数据
          type:Array,
          default() {
            return [
              {fieldName:'name', columnName: '客户',width:100},
              {fieldName:'type', columnName: '类别',width:100},
              {fieldName:'person', columnName: '联系人',width:100},
              {fieldName:'phone', columnName: '手机号',width:100},
            ];
          }
        },
        list:{
            type:Array,
            default(){
                return [
                    {name:'名称1',type:'类别1',person:'联系人啥的了解阿杀菌法律科技阿煞风景里看',phone:'13126466968'},
                    {name:'名称2',type:'类别1',person:'联系人',phone:'13126466968'},
                    {name:'名称3',type:'类别1',person:'联系人',phone:'13126466968'},
                    {name:'名称4',type:'类别1',person:'联系人',phone:'13126466968'},

                ]
            }
        }
    })
    const selectIndex = ref(props.selectIndex);
    const value = ref(props.value);
    //选中的方法
    const select = (item,i)=>{
      value.value = item?.name;
      selectIndex.value = i;
      emit('update:value',value.value)
      emit('select',item)
    }
    //点击添加档案
    const addList = ()=> {
      emit('addList')
    }
    //点击查看档案
    const checkList = ()=> {
      emit('checkList')
    }
</script>

<style lang="less" scoped>
  :global(.y-table-select .ant-dropdown-menu-item:hover){
    background-color: var(--dropdown-menu-bg);
  }
  .ele-table{
    border: 1px solid var(--border-color-split);
    display: inline-block;
  }
  :deep(.ele-table thead tr th){
    background: var(--table-row-hover-bg);
  }
  :deep(.ele-table.ele-table-medium th),
  :deep(.ele-table.ele-table-medium td){
    display: inline-block;
  }
  :deep(.ele-table tbody tr:hover td){
    background-color: var(--primary-color);
    color:#fff;
  }
  .table-box{
    width: 100%;
    overflow-x: scroll;
    overflow-y: scroll;
    height: 100%;
    margin-left: 4px;
    margin-top: 4px;
  }
  .add-button{
    color:#d9d9d9;
    div{
      border-right: 1px solid #d9d9d9;
    }
  }
</style>
