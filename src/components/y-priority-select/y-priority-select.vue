<template>
  <a-dropdown :trigger="['click']" placement="bottom" :disabled="disabled">
      <slot><span class="content pointer" :style="[contentStyle,tagStyle]">{{value || '--'}}</span></slot>
      <template #overlay>
        <a-menu class="y-priority-select">
          <a-menu-item>
            <div class="y-priority-select-popup" :style="[boxStyle]">
              <div class="y-priority-select-content ele-scrollbar-hover ele-scrollbar-mini">
                  <div class="y-priority-select-item y-priority-select-item__empty"
                      v-if="showEmpty"
                      @click="select({name:''})"
                  >
                      <span>-空-</span>
                  </div>
                  <div class="y-priority-select-item" v-for="(item,index) in list" :key="index"
                      :style="{'background':item.color}"
                      @click="select(item)"
                  >
                      <span>{{item.name}}</span>
                      <span class="iconfont icon-check-circle" v-if="item.name==value"></span>
                  </div>
              </div>
            </div>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,nextTick,provide } from 'vue';
  const props = defineProps({
		disabled:{//是否禁用
            type:Boolean,
            default:false
        },
	    tagStyle:{//标签样式
           type:String,
           default:''
        },
        showEmpty:{//是否显示空选项
            type:Boolean,
            default:true
        },
        maxItem:{ //下拉显示的最大项，超过则溢出隐藏
            type:Number,
            default:6
        },
        rowWidth:{//下拉选项的宽度
            type:Number,
        },
        value:{//选中的值
           type:String,
           default:''
        },
        list:{
            type:Array,
            default(){
                return [
                    {name:'紧急',color:'#ff3333'},
                    {name:'快办',color:'#ff8001'},
                    {name:'普通',color:'#2487f3'},
                    {name:'缓办',color:'#38c728'},
                    {name:'靠后',color:'#c2c2c2'},
                ]
            }
        }
    })
    const emit = defineEmits(["update:value","change"]);
    const {showEmpty,tagStyle,maxItem,rowWidth,list} = toRefs(props);
    const value = ref(props.value || '');
    const contentStyle = computed(()=>{
      let obj = list.value.find((item)=>{
        return item.name == value.value;
      })
      let style= 'color:#000';
      if(!!obj){
        style=`background:${obj.color};`;
      }
      return style;
    })
    const boxStyle = computed(()=>{
      let height = maxItem.value*35+5;
      let style=`height:${height}px;`;
      if(!!rowWidth.value){
        style += `width:${rowWidth.value}px;`
      }
      return style;
    })
    const select = (obj)=>{
      value.value = !!obj.name ? obj.name : '';
      emit('update:value', value.value);
      emit('change',obj);
    }


</script>

<style lang="less" scoped>
.content{
  padding: 2px 10px;
  color: #fff;
  display: inline-block;
  border-radius: 2px;
  text-align: center;
}
.y-priority-select{
    padding: 0 !important;
}
:global(.y-priority-select .ant-dropdown-menu-item){
  padding: 0;
}
.y-priority-select-content{
    width: 100%;
    height: 100%;
    overflow: auto;
    background: #fff;
    padding: 5px;
}
.y-priority-select-item{
    width: 100%;
    box-sizing: border-box;
    height: 30px;
    background: #f5f5f5;
    margin-bottom: 5px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    color: #fff;
    font-size: 14px;
}
.y-priority-select-item__empty{
    color: #000;
}
.y-priority-select-item:last-child{
    margin-bottom: 0;
}
.y-priority-select-item .iconfont{
    color: #fff;
}
.y-priority-select-popup{
  min-width: 150px;
  width: 100%;
}
</style>
