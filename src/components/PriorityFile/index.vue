<template>
    <SimpleArchives ref="showModal" title="优先级档案" v-model:listData="listData" v-model:columnData="columnData" @del="del">
      <template #style="{data}">
         <a-dropdown trigger="click" placement="bottom" overlayClassName="priority-file-dropdown">
            <div class="pointer" style="height: 32px;" :style="'background-color:'+data.value" ></div>
            <template #overlay>
              <a-menu v-model:visible="visible" style="margin-top: 10px;">
                <a-menu-item>
                  <div class="ele-cell" style="flex-wrap: wrap;">
                    <div class="pointer color-item" v-for="(item,i) in colorList" :key="i" :style="'background-color:'+item" @click="selectType(item,data)"><b><span v-if="data.value == item" class="iconfont icon-Check"></span></b></div>
                  </div>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
      </template>
    </SimpleArchives>
    <!-- 删除提示弹窗 -->
    <yModal ref="modal" title="删除提示" :closable="false" content="删除后以往使用改优先级的相关字段值将会被清空,并显示空白!" okText="删除" :danger="true" :centered="true" @ok="ok"></yModal>
</template>

<script setup>
  import { ref,watch,defineProps,computed,toRefs,nextTick } from 'vue';
  import { message } from 'ant-design-vue';
  import SimpleArchives from '@/components/SimpleArchives/index.vue';
  const emit = defineEmits(["update:listData","delete"]);
  const props = defineProps({
    listData:{//列表数据
      type:Array,
      default(){
        return []
      }
    },
  })
  const columnData = ref([
    { id: 1, fieldName:'name', columnName: '优先级名称', visible: true,bold:false,width:200,alignment:'center',allowEditing:true },
    { id: 2, fieldName:'style', columnName: '风格', visible: true,bold:false,width:200,alignment:'center',allowEditing:true },
    { id: 3, fieldName:'sort', columnName: '排序', visible: true,bold:false,width:60,alignment:'center',allowEditing:true },
  ]);
  const listData = ref(props.listData);
  for(let i=1;i<10;i++){
     let obj ={id:i,name:'优先级'+i,style:'#22d7bb',sort:i};
     listData.value.push(obj)
  }
  const colorList = ref(['#22d7bb','#18bfa4','#2cccda','#2dbcff','#4e8af9','#7076fa','#9473fd','#c472ee','#ef7ede','#f969aa','#fc587b','#fa5a55','#ff7747','#ffa415','#ffd234','#99d75a','#66c060','#39ba5d']);
  const visible = ref(false);
  const selectType = (value,data)=>{
    console.log(333,data)
    listData.value[data.row.rowIndex].style = value;
    visible.value = false;
    emit('update:listData',listData.value);
  }
  const showModal = ref(null);
  const open = ()=>{
    showModal.value.open();
  }
  const modal = ref(null);
  let delIndex = -1;//删除的下标值
  const del = (i)=>{
    delIndex = i;
    modal.value.open();
  }
  const ok = ()=>{
    showModal.value.del(delIndex);
    emit('update:listData',listData.value);
     message.success('删除成功');
  }
  //暴露函数，给通过ref绑定的dom元素使用
  defineExpose({
    open,
    close,
  })
</script>

<style lang="less" scoped>
  :global(.priority-file-dropdown .ant-dropdown-menu .ant-dropdown-menu-item:hover){
    background-color: var(--dropdown-menu-bg);
  }
  .color-item{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: 5px;
    cursor: pointer;
  }
  .pointer{
    cursor: pointer;
  }
  .icon-Check{
    color: #fff;
    font-size: 12px;
    margin-left: 3px;
  }
</style>
