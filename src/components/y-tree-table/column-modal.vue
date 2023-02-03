<template>
	<a-modal :class="{'column-modal':!darkMode}" :width="940" v-model:visible="visible" :centered="true"  :closable="false" :footer="null">
			<div class="title">
				<div class="title-left">
					<div>列配置</div>
					<div class="clear-button" @click="clear">清空布局</div>
				</div>
				<div @click="close"><span class="iconfont icon-close ele-text-info"></span></div>
			</div>
	        <div class="content">
				    <table class="ele-table ele-table-border ele-table-medium" style="display: block;">
				        <colgroup>
				            <!-- <col width="40" />
				            <col />
				            <col width="80" /> -->
				        </colgroup>
				        <thead>
				            <tr>
                        <th width="40"><span class="border-right">序</span></th>
				                <th width="36"><span class="border-right"><em/></span></th>
				                <th width="200"><span class="border-right">列名</span></th>
				                <th width="48"><span class="border-right">显示</span></th>
                        <th width="48"><span class="border-right">加粗</span></th>
                        <th width="80"><span class="border-right">宽度</span></th>
                        <th width="210"><span class="border-right">冻结</span></th>
                        <th width="230"><span class="border-right">对齐方式</span></th>
				            </tr>
				        </thead>
				        <vue-draggable
				            tag="tbody"
				            item-key="id"
				            v-model:list="list"
				            :animation="300"
				            handle=".demo-table-drag-handle"
                    style="max-height: 688px;display: block;"
                    class="ele-scrollbar-hover ele-scrollbar-mini"
				        >
				            <template #item="{ element,index }">
				                <tr v-if="!element.hideSet">
                            <td width="40">{{ index+1-hideIndex }}</td>
				                    <td width="36">
                                <span class="iconfont icon-zu40 ele-text-info demo-table-drag-handle" style="cursor: move;"></span>
				                    </td>
				                    <td width="200"><a-input v-model:value="element.columnName" placeholder="" :bordered="false" style="padding: 0;"/></td>
                            <td width="48"><a-checkbox v-model:checked="element.visible"></a-checkbox></td>
                            <td width="48"><a-checkbox v-model:checked="element.bold"></a-checkbox></td>
                            <td width="80">
                              <a-input
                              v-model:value="element.width"
                              placeholder=""
                              style="padding: 0;"
                              :bordered="false"
                            />
                            </td>
                            <td width="210">
                              <a-radio-group v-model:value="element.fixed" name="radioGroup">
                                <a-radio :value="false">无</a-radio>
                                <a-radio value="left">左边</a-radio>
                                <a-radio value="right">右边</a-radio>
                              </a-radio-group>
                            </td>
                            <td width="230">
                              <a-radio-group v-model:value="element.alignment" button-style="solid">
                                    <a-radio-button value="left">左对齐</a-radio-button>
                                    <a-radio-button value="center">居中</a-radio-button>
                                    <a-radio-button value="right">右对齐</a-radio-button>
                              </a-radio-group>
                            </td>
				                </tr>
				            </template>
				        </vue-draggable>
				    </table>
			</div>
	</a-modal>
</template>

<script setup>
    import { ref,watch,defineProps,computed,toRefs } from 'vue';
    import VueDraggable from 'vuedraggable';
    import { useThemeStore } from '@/store/modules/theme';
    import { storeToRefs } from 'pinia';
    const themeStore = useThemeStore();
    const {darkMode} = storeToRefs(themeStore);
    const props = defineProps({
        list:{
          type:Array,
          defalut() {
            return [];
          }
        },
        defalutData:{//默认的数据
          type:Array,
          defalut() {
            return [];
          }
        }
    })
    const { list, defalutData } = toRefs(props);
    const hideIndex = ref(list.value.findIndex(item=>{
      return !item.hideSet;
    }));
    
    //const emit = defineEmits(['updeta:list']);
    //限制输入框只能输入数字
     const format = (val, preVal,i) => {
          const reg = /^-?\d*(\.\d*)?$/;
          if (!isNaN(+val) && reg.test(val) || val === '' || val === '-') {
            list.value[i].width = val;
          } else {
            list.value[i].width = preVal;
          }
        }; // '.' at the end or only '-' in the input box.
      watch(
        ()=>JSON.parse(JSON.stringify(list.value)), //解决旧值和新值是一样的问题
        (val, preVal) => {
        console.log(1111,val,preVal)
        for(let i=0;i<val.length;i++){
          if(val[i].width != preVal[i].width){
            format(val[i].width, preVal[i].width,i)
          }
        }
      },{deep:true});

    const visible = ref(false);
    const showModal = () => {
      visible.value = true;
    };
    //关闭弹窗
    const close = ()=>{
      visible.value = false;
    }
    //清空布局
    const clear = ()=> {
      //防止数组赋值失去响应式必须要先清空然后push进去。
      list.value.length = 0;
      let arr = JSON.parse(JSON.stringify(defalutData.value))
      for(let i=0;i<arr.length;i++){
        list.value.push(arr[i])
      }
    }
    //暴露函数，给通过ref绑定的dom元素使用
    defineExpose({
      showModal,
      close
    })
</script>

<style lang="less" scoped>
  :global(.column-modal .ant-modal-content){
    background-color: var(--layout-body-background);
  }
  .title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .title-left{
    display: flex;
    align-items: center;
  }
  .clear-button{
    border: 1px solid #ccc;
    margin-left: 10px;
    padding: 2px 10px;
    border-radius: 2px;
    cursor: pointer;
    background-color: var(--component-background);
  }
  .icon-close{
    cursor: pointer;
  }
  .ele-table{
    box-shadow: 0 0 5px #ccc;
  }
  :deep(.ele-table.ele-table-border th){
  	border-width: 0;
    border-bottom-width: 1px;
  }
	:deep(.ele-table.ele-table-border td){
		border-width: 0;
    border-bottom-width: 1px;
	}
	:deep(.ele-table.ele-table-medium th){
		padding-left:0;
	}
	.border-right{
		border-left: 1px solid var(--border-color-split);
		display: inline-block;
		width: 100%;
		padding-left: 9px;
	}
    /* 表格行拖拽按下去样式 */
    .ele-table tr.sortable-chosen {
        background: hsla(0, 0%, 60%, 0.1);
    }
</style>
