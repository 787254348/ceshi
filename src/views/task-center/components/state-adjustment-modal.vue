<template>
  <a-modal :width="650" class="state-adjustment-edit" v-model:visible="visible" :centered="true" @cancel="close" :maskClosable="false" :keyboard="false">
    <template #title>
      <b>状态调整</b>
    </template>
    <div class="content flex ele-scrollbar-mini">
      <div class="content-left y-bg-gray-2">
        <div  v-for="(item,i) in statusList" :key="i" class="content-left-item ele-cell pointer" :class="{'opacity-4': (!item.checked&&hoverIndex!=i)}" :style="(item.checked||hoverIndex==i) ? tagStyle(item.color) : ''" @mouseenter="hoverIndex=i" @mouseleave="hoverIndex=-1" @click="onSelect(i)">
          <span class="iconfont margin-right-10" :class="item.icon" :style="'color:'+item.color"></span>
          <span>{{item.name}}</span>
          <span v-if="item.checked" class="triangle"></span>
        </div>
      </div>
      <div class="content-right flex-1">
        <div class="ele-cell">
          <div>负责人</div>
          <div class="ele-cell-content">
            <y-user-select  mode="multiple" width="100%"  :isBody="true"  ></y-user-select>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="ele-cell">
        <div class="ele-cell-content margin-right-12">
          <y-editor ref="editor" v-model:valueHtml="valueHtml" :isUpload="false" :isButton="false" placeholder="@通知其他成员,添加评论/意见" style="border: 1px solid var(--border-color-base);min-height: 32px;padding: 3px 0 0 10px;line-height: 20px;width: 100%;" ></y-editor>
        </div>
        <a-button type="primary" @click="save">流转</a-button>
      </div>
    </template>
  </a-modal>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,toRef,nextTick } from 'vue';
  import { message } from 'ant-design-vue';
  const emit = defineEmits(["save"]);
  const visible = ref(false);
  const hoverIndex = ref(-1);
  const valueHtml = ref('');
  //状态数据
  const statusList = ref([
    {name:'分配状态',icon:'icon-a-lujing279',color:'rgba(252, 154, 174,1)',checked:true},
    {name:'xx状态',icon:'icon-a-lujing279',color:'rgba(34, 215, 187,1)',checked:false},
    {name:'xx状态',icon:'icon-a-lujing279',color:'rgba(45, 188, 255,1)',checked:false},
    {name:'xx状态',icon:'icon-a-lujing279',color:'rgba(34, 215, 187,1)',checked:false},

  ])
  //计算状态效果的背景颜色
  const tagStyle = (color)=> {
      let v = color.replace("rgba(","");
      let arr = v.replace(")","").split(",");
      arr[3] = '0.3';
      let background = 'rgba('+arr.join(",")+')';
      return `background:${background}`
  }
  const onSelect = (i)=> {
    statusList.value.forEach(item=>{
      item.checked = false;
    })
    statusList.value[i].checked = true;
  }
  const save = ()=> {
    close();
  }
  const open = (data)=> {
    visible.value = true;
  }
  const close = ()=> {
    visible.value = false;
  }
  //暴露函数，给通过ref绑定的dom元素使用
  defineExpose({
    open,
    close
  })
</script>

<style lang="less" scoped>
  :global(.state-adjustment-edit .ant-modal-body){
    padding: 0;
  }
  :global(.state-adjustment-edit .ant-modal-footer){
    text-align: left;
  }
  .content{
    min-height: 370px;
    max-height: 500px;
    overflow-y: scroll;
  }
  .content-left{
    width: 170px;
    min-height: 370px;
    height: 100%;
  }
  .content-left-item{
    height: 56px;
    width: 100%;
    padding:0 20px;
    position: relative;
  }
  .triangle{
    width: 0px;
    height: 0px;
    border-right:var(--modal-content-bg) 8px solid;
    border-left:transparent 8px solid;
    border-bottom:transparent 8px solid;
    border-top:transparent 8px solid;
    position: absolute;
    right: 0;
  }
  .content-right{
    padding:20px;
  }
  .opacity-4{
    opacity: .4;
  }
</style>
