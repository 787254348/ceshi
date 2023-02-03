<template>
		  <DxDataGrid
        ref="grid"
		    id="gridContainer"
		    v-model:data-source="listData"
		    key-expr="id"
		    :allow-column-reordering="true"
		    :allow-column-resizing="true"
		    :column-auto-width="true"
		    :show-borders="true"
		    :show-row-lines="true"
			  :show-column-lines="false"
        :focused-row-enabled="false"
        :hoverStateEnabled="true"
        columnResizingMode="widget"
        :style="style"
        @CellClick="CellClick"
		  >
        <!-- 行拖拽效果 -->
        <DxRowDragging
          :allow-reordering="rowDragging"
          :on-reorder="onReorder"
          :show-drag-icons="true"
        />
          <!-- <DxColumnChooser :enabled="true"/> -->
          <!-- 设置是否可排序-->
        <DxColumnFixing :enabled="true"/>
        <!-- 标题栏右边是否显示搜索按钮 -->
        <DxHeaderFilter :visible="true"/>
        <!-- 标题栏下面是否显示搜索框 -->
        <DxFilterRow :visible="true" />
        <!-- 表格底部是否显示搜索过滤面板 -->
        <DxFilterPanel :visible="true"/>
        <!-- 分页配置 -->
        <DxPaging :page-size="pageSize" :pageIndex="Number(pageValue)-1"/>
        <!-- visible配置底部是否显示分页按钮 -->
        <DxPager
          :visible="false"
          display-mode="compact"
          :showInfo="true"
          :showPageSizeSelector="true"
          :show-navigation-buttons="true"
        >

        </DxPager>
        <!-- 分组 -->
        <DxGrouping :context-menu-enabled="true"/>
         <!-- <DxGroupPanel :visible="true"/> -->
         <!--竖向滚动条 -->
         <DxScrolling mode="standard"></DxScrolling>
        <DxColumn
         data-field="sort"
         :width="60"
          caption="序号"
          cell-template="sort"
          :fixed="true"
          alignment="center"
          header-cell-template="sort-title"
          :allowReordering="false"
          :allowSorting="false"
          :allowHeaderFiltering="false"
          :allowFiltering="false"
          :allowGrouping="false"
          :allowFixing="false"
        >

        </DxColumn>
        <template #sort-title="{data}"><div style="cursor: pointer;" @click="openColumn">{{data.column.caption}}</div></template>
        <template #sort="{data}"><div>{{data.rowIndex+1}}</div></template>
        <DxColumn
          v-for="(item,i) in columnData"
          v-model:visible="item.visible"
          v-model:caption="item.columnName"
          v-model:width="item.width"
          :css-class="item.bold==1 ? 'bold' : ''"
          v-model:fixed="item.fixed"
          v-model:fixed-position="item.fixed"
          v-model:alignment="item.alignment"
          :data-field="item.fieldName"
          :cell-template="item.fieldName"
          :data-type="item.type"
          cssClass="cell-hover"
        />
        <template v-for="(item,i) in columnData"  #[item.fieldName]="{data}">
          <slot :name="item.fieldName" :data="data">
            <div>{{data.value}}</div>
          </slot>
        </template>
        <!-- 合计 -->
        <DxSummary>
          <!-- 底部合计 -->
            <DxTotalItem
                column="sort"
                display-format="合计"
            />

            <DxTotalItem
                column="num"
                summary-type="sum"
                display-format="{0}"
            />
            <DxTotalItem
                column="Position"
                summary-type="sum"
                display-format="{0}"
            />
            <!-- 分组合计 -->
            <DxGroupItem
                column="sort"
                summary-type="count"
            />
            <DxGroupItem
              :show-in-group-footer="false"
              :align-by-column="true"
              column="num"
              summary-type="sum"
            />
            <DxGroupItem
                :show-in-group-footer="true"
                column="money"
                summary-type="sum"
                display-format="合计: ${0}"
            />
            <!-- <DxGroupItem
                column="BirthDate"
                summary-type="max"
            /> -->
        </DxSummary>
		  </DxDataGrid>
      <!-- 表2 -->
      <DxDataGrid
        ref="grid1"
        id="gridContainer1"
        v-model:data-source="listData1"
        key-expr="id"
        :allow-column-reordering="true"
        :allow-column-resizing="true"
        :column-auto-width="true"
        :show-borders="true"
        :show-row-lines="true"
        :show-column-lines="false"
        :focused-row-enabled="false"

        columnResizingMode="widget"
        style="height: 36px;"
      >
        <!-- 是否允许编辑 -->
        <DxEditing
          :allow-updating="true"
          mode="cell"
        >

        </DxEditing>

        <DxColumn
         data-field="sort"
         :width="60"

          cell-template="sort"
          :fixed="true"
          alignment="center"
          header-cell-template="sort-title"
          :allowReordering="false"
          :allowSorting="false"
          :allowHeaderFiltering="false"
          :allowFiltering="false"
          :allowGrouping="false"
          :allowFixing="false"
        >

        </DxColumn>
        <template #sort-title="{data}"><div style="cursor: pointer;" @click="openColumn">{{data.column.caption}}</div></template>
        <template #sort="{data}"><div>比例</div></template>
        <DxColumn
          v-for="(item,i) in columnData"
          v-model:visible="item.visible"

          v-model:width="item.width"
          :css-class="item.bold==1 ? 'bold' : ''"
          v-model:fixed="item.fixed"
          v-model:fixed-position="item.fixed"
          v-model:alignment="item.alignment"
          :data-field="item.fieldName"
          :cell-template="item.fieldName"
          :data-type="item.type"
          :allow-editing="true"
          cssClass="cell-hover"
        />
        <template v-for="(item,i) in columnData"  #[item.fieldName]="{data}">
          <slot :name="item.fieldName" :data="data">
            <div>{{data.value=='' ? '输入' : data.value}}</div>
          </slot>
        </template>
      </DxDataGrid>


	  <ColumnModal ref="showModal" v-model:list="columnData" :defalutData="defalutData" ></ColumnModal>
    <!-- 序号下面搜索栏的提示语 -->
    <div ref="tips" style="cursor: pointer;">
      <a-tooltip >
        <template #title>点击记录行进行搜索</template>
        <span class="iconfont icon-guolv " ></span>
      </a-tooltip>
    </div>
</template>
<script setup>
import { ref,watch,defineProps,computed,toRefs,toRef,onBeforeUnmount } from 'vue';
import {
  DxDataGrid,
  DxColumn,
  DxColumnChooser,
  DxColumnFixing,
  DxHeaderFilter,
  DxFilterRow,
  DxFilterPanel,
  DxPaging,
  DxPager,
  DxGrouping,
  DxGroupPanel,
  DxSummary,
  DxTotalItem,
  DxGroupItem,
  DxScrolling,
  DxRowDragging,
  DxEditing
} from 'devextreme-vue/data-grid';
import ColumnModal from './column-modal.vue';
  const emit = defineEmits(["update:listData"]);
 const props = defineProps({
        style:{
          type:String,
          default:'height:740px',
        },
        rowDragging:{//是否允许拖动行排序
          type:Boolean,
          default:false,
        },
        focusedRow:{//点击单元格是否显示选中的效果
          type:Boolean,
          default:false,
        },
        listData:{
          type:Array,
          default() {
            return [];
          }
        },
        defalutData:{//默认的表头数据
          type:Array,
          default() {
            return [];
          }
        },
        columnData:{//实际的表头数据
          type:Array,
          default() {
            return [];
          }
        },
        showPage:{//是否显示分页
          type:Boolean,
          default:true,
        },
        pageSize:{
          type:Number,
          default:20,
        }
    })
    const selectOptions = ref([{
         value: 10,
         label: '10条/页',
       }, {
         value: 20,
         label: '20条/页',
       }, {
         value: 30,
         label: '30条/页',
       }, {
         value: 40,
         label: '40条/页',
       }]);
    const { style,rowDragging,focusedRow,showPage } = toRefs(props);
    const pageSize = ref(props.pageSize);
    const listData = ref(props.listData);
    const listData1 = ref([
      {
        id: 1,
        FirstName: '',
        LastName: '',
        Position: '',
        BirthDate: '',
        Address: '',
        Email: '',
        num:'',
        money:''
      }
    ])
    const grid = ref(null);
    const pageValue = ref(1)
    const totalNum = ref(300)
    const totalPage = ref(30);
    //刷新表格的方法
    const refresh = ()=> {
      grid.value.instance.refresh(true);
    };
    //在序号下面的搜索栏添加提示语
    const tips = ref(null);
    const grid1 = ref(null);
    setTimeout(()=>{
      let node = grid.value.$el.querySelector('.dx-datagrid-headers .dx-datagrid-content-fixed .dx-datagrid-filter-row td');
      node.append(tips.value);
    },300)

    setTimeout(()=>{
      //隐藏表2的表头
      grid1.value.$el.querySelector('.dx-datagrid-headers').style = "display:none";
      //监听表1的滚动，为了联动表2的滚动
      let scrollWrap = grid.value.$el.querySelector('.dx-scrollable-container');
      scrollWrap.addEventListener('scroll',scrollEvent)
      //监听表2的滚动，为了联动表1的滚动
      let scrollWrap1 = grid1.value.$el.querySelector('.dx-scrollable-container');
      scrollWrap1.addEventListener('scroll',scrollEvent1)
    },300)
    //设置表2的滚动条
    const scrollEvent = ()=>{
      let scrollWrap = grid.value.$el.querySelector('.dx-scrollable-container');
      let scrollLeft = scrollWrap.scrollLeft;
      let scrollWrap1 = grid1.value.$el.querySelector('.dx-scrollable-container');
      scrollWrap1.scrollLeft = scrollLeft;
    }
    //设置表1的滚动条
    const scrollEvent1 = ()=>{
      let scrollWrap1 = grid1.value.$el.querySelector('.dx-scrollable-container');
      let scrollLeft = scrollWrap1.scrollLeft;
      let scrollWrap = grid.value.$el.querySelector('.dx-scrollable-container');
      scrollWrap.scrollLeft = scrollLeft;
    }
    //组件卸载前触发方法
    onBeforeUnmount(() => {
      console.log(777)
      //移除监听滚动事件
      let scrollWrap = grid.value.$el.querySelector('.dx-scrollable-container');
      scrollWrap.removeEventListener('scroll',scrollEvent, true);
      let scrollWrap1 = grid1.value.$el.querySelector('.dx-scrollable-container');
      scrollWrap1.removeEventListener('scroll',scrollEvent1, true);
    })
    //行拖拽方法
    const onReorder = (e)=> {
      const visibleRows = e.component.getVisibleRows();
      const toIndex = listData.value.findIndex((item) => item.id === visibleRows[e.toIndex].data.id);
      const fromIndex = listData.value.findIndex((item) => item.id === e.itemData.id);
      const newTasks = [...listData.value];

      newTasks.splice(fromIndex, 1);
      newTasks.splice(toIndex, 0, e.itemData);

      listData.value = newTasks;
      emit('update:listData',listData.value);
    };
    //表格单击事件
    const CellClick = e=>{
      if(focusedRow.value){
        renderRecord(e)
      }
    };
    //渲染单元格行和列都选中的效果
    const renderRecord  = e=>{
      console.log(3333,e)
      //设置点击表格时，当前点击元素的横向和纵向的选中效果
       if(e.rowType!='data' || e.column.type=='drag') return;
       let dom1 = e.element.querySelectorAll('.dx-scrollable-wrapper tbody tr');
       let dom2 = e.element.querySelectorAll('.dx-fixed-columns .dx-datagrid-content-fixed tbody tr');
       //没有固定的表格元素
       dom1.forEach((d,i)=>{
         if(e.rowIndex == i){
           d.style.color = '#fff';
           d.style.background = '#5c95c5'
         }else{
           d.style.background = 'unset'
           d.style.color = 'unset';
         }
         d.children.forEach((childrenDom,childrenI)=>{
           if(e.cellElement.cellIndex==childrenI && !e.column.fixed){
              childrenDom.style.color = '#fff';
              childrenDom.style.background = '#5c95c5'
           }else{
              childrenDom.style.background = 'unset'
              childrenDom.style.color = 'unset';
           }
         })
       })
       //固定显示的表格元素
       dom2.forEach((d,i)=>{
         if(e.rowIndex == i){
           d.style.color = '#fff';
           d.style.background = '#5c95c5'
         }else{
           d.style.background = 'unset'
           d.style.color = 'unset';
         }
         d.children.forEach((childrenDom,childrenI)=>{
           if(e.cellElement.cellIndex==childrenI  && e.column.fixed){
              childrenDom.style.color = '#fff';
              childrenDom.style.background = '#5c95c5'
           }else{
              childrenDom.style.background = 'unset'
              childrenDom.style.color = 'unset';
           }
         })
       })
    };
    //选择分页条数事件
    const handleChange = value => {
      pageSize.value = value;
      totalPage.value = Math.ceil(totalNum.value/value);
      if(totalPage.value < pageValue.value){
        pageValue.value = totalPage.value;
      }
    };
    //限制输入框只能输入数字
    const format = (val, preVal) => {
        const reg = /^[0-9]+$/;
        if (!isNaN(+val) && reg.test(val) && Number(val) !=0 && Number(val) <=totalPage.value  || val === '') {
          pageValue.value = val;
        } else {
          pageValue.value = preVal;
        }
    }; // '.' at the end or only '-' in the input box.
    watch(
      pageValue,
      (val, preVal) => {
      format(val, preVal)
    });
    const turnPages = type => {
      switch (type){
        case 'first':
                pageValue.value = 1
              break;
        case 'prev':
                pageValue.value = Number(pageValue.value) - 1 < 1  ? 1 :  Number(pageValue.value) - 1;
              break;
        case 'next':
                pageValue.value = Number(pageValue.value) + 1 > totalPage.value  ? totalPage.value :  Number(pageValue.value) + 1;
              break;
        case 'last':
                pageValue.value = totalPage.value
              break;
      }
    }

    const expanded = ref(true)
    console.log(222,props)

	  // setTimeout(()=>{
		 //  document.body.querySelector("#dx-col-2").focus();
	  // },200)



    // calculateCellValue(data) {
    //   return [data.Title, data.FirstName, data.LastName].join(' ');
    // },
    const showModal = ref(null);
    const openColumn = ()=>{
      showModal.value.showModal();
    }

    //暴露函数，给通过ref绑定的dom元素使用
    defineExpose({
      refresh
    })


</script>

<style lang="less" scoped>
  :deep(.dx-row > td),
  :deep(.dx-editor-cell .dx-texteditor .dx-texteditor-input),
  :deep(.dx-datagrid-rowsview.dx-empty .dx-scrollable-content),
  :deep(.dx-datagrid-borders > .dx-datagrid-filter-panel){
    background-color: var(--component-background);
  }
  :deep(.dx-datagrid-nodata){
    color:var(--text-color-secondary);
    z-index: 9;
  }
	:deep(.dx-datagrid) {
	  color:var(--heading-color);
	}
  :deep(.dx-datagrid-rowsview .dx-row-focused.dx-group-row > td){
      background-color: #5c95c5;
      color: #fff;
  }

  :deep(.dx-column-indicators .dx-header-filter::before){
    content: "" !important;
  }
  :deep(.dx-datagrid-headers .dx-datagrid-table .dx-row > td:hover){
     .dx-column-indicators .dx-header-filter::before{
      content: "\f050" !important;
    }
  }

  :deep(.dx-menu-base .dx-menu-item .dx-menu-item-content .dx-icon){
    display: none;
  }
  :deep(.dx-datebox-calendar .dx-dropdowneditor-icon){
    display: none;
  }
  :deep(.dx-editor-with-menu:hover){
    .dx-datebox-calendar .dx-dropdowneditor-icon,
    .dx-menu-base .dx-menu-item .dx-menu-item-content .dx-icon{
      display: inline-block;
    }
  }

	.main-color{
		color:var(--primary-color)
	}
  :deep(.dx-data-row .bold) {
    font-weight: bold;
  }

  // 分页样式
  .page-box{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 20px;
  }
  .padding-8{
    padding: 8px;
  }
  .page-box .iconfont{
    cursor: pointer;
  }
</style>
