<template>
  <a-modal :width="width" v-model:visible="visible" :centered="true"  :closable="false" :footer="null">
  		<div class="title">
  			<div><b>{{title}}</b></div>
  			<div @click="close"><span class="iconfont icon-close ele-text-info"></span></div>
  		</div>
      <div class="content">
          <DxDataGrid
            ref="grid"
            id="gridContainer"
            v-model:data-source="listData"
            key-expr="id"
            :allow-column-resizing="true"
            :column-auto-width="true"
            :show-borders="true"
            :show-row-lines="true"
            :show-column-lines="true"
            :focused-row-enabled="false"
            :hoverStateEnabled="true"
            columnResizingMode="widget"
            @Saving="selectionChanged"
            :on-focused-cell-changing="onFocusedCellChanging"
          >
              <!-- 键盘导航 -->
              <DxKeyboardNavigation
                :edit-on-key-press="true"
                enter-key-action="moveFocus"
                enter-key-direction="row"
              />
              <!-- 是否允许编辑 -->
              <DxEditing
                :allow-updating="true"
                mode="cell"
                start-edit-action="dblClick"
              >
                <DxTexts confirm-delete-message=""/>
              </DxEditing>
              <DxColumn
               :width="60"
                caption=""
                cell-template="sort-num"
                :fixed="false"
                alignment="center"
                header-cell-template="sort-num-title"
                :allowSorting="false"
                :allow-editing="false"
              />
              <template #sort-num-title="{data}"><div style="cursor: pointer;" @click="openColumn">{{data.column.caption}}</div></template>
              <template #sort-num="{data}">
                <div class="table-index-box" style="height: 32px;line-height: 32px;" @mouseover="hoverIndex=data.rowIndex" @mouseout="hoverIndex=-1">
                    {{data.rowIndex+1}}
                    <div v-show="data.rowIndex == hoverIndex" @click="dlt(data.rowIndex)" class="delete-wrap ele-bg-info ele-cell"><span class="iconfont icon-shanchu"></span></div>
                </div>
              </template>
              <DxColumn
                v-for="(item,i) in columnData"
                v-model:visible="item.visible"
                v-model:caption="item.columnName"
                v-model:width="item.width"

                :css-class="item.bold==1 ? 'bold' : ''"
                v-model:alignment="item.alignment"
                :data-field="item.fieldName"
                :cell-template="item.fieldName"
                :allow-editing="item.allowEditing"
                :allowSorting="false"
              />
              <template v-for="(item,i) in columnData"  #[item.fieldName]="{data}">
                <slot :name="item.fieldName" :data="data">
                  <div style="height: 32px;line-height: 32px;">{{data.value}}</div>
                </slot>
              </template>
          </DxDataGrid>
      </div>
      <div class="footer">
        <a-button type="primary" @click="save">保存</a-button>
        <a-button class="margin-left-10" @click="close">取消</a-button>
      </div>
  </a-modal>
</template>

<script setup>
import { ref,watch,defineProps,computed,toRefs } from 'vue';
import {
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxTexts,
  DxKeyboardNavigation
} from 'devextreme-vue/data-grid';
const emit = defineEmits(["update:listData","delete"]);
const props = defineProps({
  title:{
    type:String,
    default:'【xxx】字段下拉选项'
  },
  width:{
    type:Number,
    default:700
  },
  delCallback:{//删除方法是否需要回调
    type:Boolean,
    default:true
  },
  listData:{//列表数据
    type:Array,
    default(){
      return []
    }
  },
  columnData:{//表头数据
    type:Array,
    default(){
      return [
        { id: 1, fieldName:'name', columnName: '选项名称', visible: true,bold:false,width:200,alignment:'center',allowEditing:true },
        { id: 2, fieldName:'sort', columnName: '排序', visible: true,bold:false,width:60,alignment:'center',allowEditing:true },
      ]
    }
  }
})
const listData = ref(props.listData);
const { title,width,columnData } = toRefs(props);
// for(let i=1;i<10;i++){
//    let obj ={id:i,name:'字段'+i,sort:i};
//    listData.value.push(obj)
// }

//
const grid = ref(null);
const onFocusedCellChanging = (e)=> {
  e.isHighlighted = true;
}
//编辑数据后的回调
const selectionChanged = (e)=>{
  console.log(111,e,listData.value)
  grid.value.instance.cancelEditData();
}

const hoverIndex = ref(-1);
const visible = ref(false);
//删除
const del = (i) => {
  grid.value.instance.deleteRow(i);
  console.log(listData)
  emit('update:listData',listData.value);
};
const dlt= (i) => {
  if(props.delCallback){
    emit('del',i);
  }else{
    del(i);
  }
}
const save = ()=> {
  close();
}
const open = () => {
  visible.value = true;
};
//关闭弹窗
const close = ()=>{
  visible.value = false;
}
//刷新表格的方法
const refresh = ()=> {
  grid.value.instance.refresh(true);
};
//暴露函数，给通过ref绑定的dom元素使用
defineExpose({
  open,
  close,
  del,
  refresh
})
</script>

<style lang="less" scoped>
  :deep(.dx-datagrid-headers .dx-datagrid-table .dx-header-row > td){
    background-color:var(--disabled-bg);
  }
  :deep(.dx-row > td),
  :deep(.dx-editor-cell .dx-texteditor .dx-texteditor-input),
  :deep(.dx-datagrid-rowsview.dx-empty .dx-scrollable-content),
  :deep(.dx-datagrid-borders > .dx-datagrid-filter-panel){
    background-color: var(--component-background);
  }
  :deep(.dx-datagrid) {
    color:var(--heading-color);
  }
  .title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .icon-close{
    cursor: pointer;
  }
  .footer{
    display: flex;
    justify-content: flex-end;
    margin-top: 40px;
  }
  .margin-left-10{
    margin-left: 10px;
  }
  .table-index-box{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .delete-wrap{
    position: absolute;
    justify-content: center;
    top: -7px;
    left: -7px;
    width: calc(100% + 14px);
    height: calc(100% + 14px);
    cursor: pointer;
  }
  .icon-shanchu{
    color: var(--text-color-inverse);
  }
</style>
