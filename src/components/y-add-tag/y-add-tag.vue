<template>
    <div>
        <slot name="tag">
            <span class="tag" v-for="(item,i) in tagList" :style="tagStyle(item)">{{item.title}}</span>
        </slot>
        <a-popover placement="bottomLeft" arrowPointAtCenter trigger="click" v-model:visible="tagVisible">
            <template #content>
                <a-input ref="input" v-model:value="searchValue"   placeholder="搜索或新建标签" @change="change" @pressEnter="addData"></a-input>
                <div class="y-add-tag-content" v-show="!searchValue">
                    <div class="y-add-tag-item margin-top-10 pointer" v-for="(item,i) in list" :key="i" @click="checked(item)">
                        <div class="y-add-tag-item-color margin-right-5" :style="'background:'+item.color"></div>
                        <div class="y-add-tag-item-title">{{item.title}}</div>
                    </div>
                    <div class="flex-end">
                        <a-button type="link" style="padding: 0;" @click="addArchives">+标签档案</a-button>
                    </div>
                </div>

                <div class="y-add-tag-search-content" v-show="searchValue">
                    <div class="y-add-tag-item space-between margin-top-10 pointer" v-for="(item,i) in searchList" :key="i" @click="checked(item)">
                        <div v-if="item.title.indexOf(searchValue) > -1" class="y-add-tag-item-title">
                            {{ item.title.substr(0, item.title.indexOf(searchValue)) }}<span :style="'color:'+ item.color">{{ searchValue }}</span>{{ item.title.substr(item.title.indexOf(searchValue) + searchValue.length) }}
                        </div>
                        <div v-else class="y-add-tag-item-title">{{item.title}}</div>
                        <div class="y-add-tag-item-color" :style="'background:'+item.color"></div>
                    </div>
                    <div class="space-between margin-top-10">
                        <div class="pointer" @click="addData">
                            <span class="iconfont icon-jiahao margin-right-5 font-size-14"></span>
                            <span>新建[{{searchValue}}]标签</span>
                        </div>
                        <a-popover placement="bottom" arrowPointAtCenter trigger="click" overlayClassName="y-add-tag__select-color-box" v-model:visible="selectColorVisible" >
                            <template #content>
                                <div class="space-between">
                                    <div class="select-color-item pointer" v-for="(item,i) in colorList" :key="i" :style="'background:'+item" @click="selectColor(item)"></div>
                                </div>
                            </template>
                            <div class="y-add-tag-item-color pointer" style="line-height: 16px;" :style="'background:'+selectColorValue">
                                <span class="iconfont icon-xiala" style="color:#fff;"></span>
                            </div>
                        </a-popover>
                    </div>
                </div>
            </template>
            <slot>
               <span class="iconfont icon-tianjiabiaoqian pointer text-color-secondary ele-inline-block" style="transform: scale(1.3)"></span>
            </slot>
        </a-popover>
        <!-- 标签档案 -->
        <SimpleArchives ref="showModal" title="标签档案" :delCallback="false"  :width="570" v-model:listData="list" v-model:columnData="columnData">
          <template #color="{data}">
             <a-select
               :listHeight="160"
               v-model:value="data.data.color"
               style="width: 100%;display: block;"
               :showArrow="false"
               :bordered="false"
               class="y-add-tag"
               dropdownClassName="y-add-tag-option"
             >
               <a-select-option v-for="(item,i) in colorList" :value="item"><div class="status-select-item" :style="'background:'+item"></div></a-select-option>

             </a-select>
          </template>
        </SimpleArchives>
    </div>
</template>

<script setup>
import { defineComponent, reactive, toRefs,ref } from 'vue';

const props = defineProps({
    tagList:{//标签列表数据
        type:Array,
        default(){
            return [

            ]
        }
    },
    list:{//弹窗列表数据
        type:Array,
        default(){
            return [
                {id:1,color:'rgba(255, 51, 51,1)',title:'需要沟通',sort:1},
                {id:2,color:'rgba(255, 128, 0,1)',title:'xx事完成再做',sort:2},
                {id:3,color:'rgba(36, 135, 243,1)',title:'可能需要修改日期',sort:3},
                {id:4,color:'rgba(58, 197, 40,1)',title:'沟通完成',sort:4}
            ]
        }
    },
    colorList:{//弹窗颜色选择列表数据
        type:Array,
        default(){
            return [
                'rgba(66, 228, 222,1)','rgba(64, 230, 96,1)','rgba(64, 179, 230,1)','rgba(64, 83, 230,1)','rgba(217, 64, 230,1)','rgba(230, 64, 141,1)','rgba(255, 51, 51,1)','rgba(255, 128, 0,1)','rgba(36, 135, 243,1)','rgba(58, 197, 40,1)'
            ]
        }
    }
})
const emit = defineEmits(["add"]);
const input = ref(null);
const searchValue = ref('');
const tagList = ref(props.tagList);
const colorList = ref(props.colorList);
const list = ref(props.list);
const searchList = ref([]);
const selectColorValue = ref('rgba(255, 51, 51,1)');//新增标签时选中的颜色数据
const selectColorVisible = ref(false);//控制选择颜色弹窗的显示隐藏
const tagVisible = ref(false);//控制标签弹窗的显示隐藏
const showModal = ref(null);
const columnData = ref([
  { id: 1, fieldName:'title', columnName: '标签名称', visible: true,bold:false,width:200,alignment:'center',allowEditing:true },
  { id: 2, fieldName:'color', columnName: '风格', visible: true,bold:false,width:200,alignment:'center',allowEditing:true },
  { id: 3, fieldName:'sort', columnName: '排序', visible: true,bold:false,width:60,alignment:'center',allowEditing:true },
]);
//打开标签档案
const addArchives = ()=> {
  tagVisible.value = false;
  showModal.value.open();
}
//输入框变化事件
const change = e=> {
    let data = list.value.filter((item) => {
        return item.title.toLowerCase().indexOf(searchValue.value.toLowerCase()) >= 0;
    })
    searchList.value = data;
}
//点击记录行事件
const checked = item=> {
    tagVisible.value = false;
    setTimeout(()=>{
        tagList.value.push(item)
        emit('add',item);
    },100)
}
//添加记录数据事件
const addData = ()=> {
    if(searchValue.value.trim()=='') return;
    let id = Math.max.apply(Math,list.value.map(item => { return Number(item.id) }))
    let sort = Math.max.apply(Math,list.value.map(item => { return Number(item.sort) }))
    console.log(id)
    let obj = {
        id:id+1,
        color:selectColorValue.value,
        title:searchValue.value,
        sort:sort+1,
    }
    tagVisible.value = false;
    setTimeout(()=>{
        list.value.push(obj);
        searchList.value.push(obj);
        searchValue.value = '';
        tagList.value.push(obj)
        showModal.value.refresh();
        emit('add',obj);
    },200)
}
//选择颜色事件
const selectColor = value=> {
    selectColorValue.value = value;
    selectColorVisible.value = false;
    input.value.focus();
}
//处理标签样式方法
const tagStyle = item=> {
    let v = item.color.replace("rgba(","");
    let arr = v.replace(")","").split(",");
    arr[3] = '0.2';
    let background = 'rgba('+arr.join(",")+')';
    arr[3] = '0.4';
    let border_color = 'rgba('+arr.join(",")+')';
    let style = `color:${item.color};background:${background};border-color:${border_color}`;
    return style;
}


</script>

<style lang="less" scoped>
    .tag{
        padding: 1px 4px;
        border-radius: 3px;
        border: 1px solid #ccc;
        font-size: 12px;
        margin-right: 10px;
        margin-bottom: 10px;
        display: inline-block;
    }
    .pointer{
        cursor: pointer;
    }
    .margin-top-10{
        margin-top:10px;
    }
    .margin-right-5{
        margin-right:5px;
    }
    .font-size-14{
        font-size: 14px;
    }
    .flex-end{
        display: flex;
        justify-content: flex-end;
    }
    .space-between{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .y-add-tag-item{
        display: flex;
        align-items: center;
    }
    .y-add-tag-item-color{
        width: 16px;
        height: 16px;
        border-radius: 2px;
    }
    .select-color-item{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin: 5px;
    }
    :global(.y-add-tag__select-color-box .ant-popover-inner-content){
        padding: 5px;
    }
    :global(.y-add-tag .ant-select-selector){
      padding: 0px !important;
    }
    :global(.y-add-tag-option .ant-select-item){
      padding:2px 4px;
    }
    .status-select-item{
      width: 100%;
      height: 100%;
    }
</style>
