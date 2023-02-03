<template>
  <a-modal :width="550" class="group-chat-modal" v-model:visible="visible" :centered="true" @cancel="close" :maskClosable="false" :keyboard="false">
    <template #title>
      <b>创建群聊</b>
    </template>
    <div style="height: 350px;" class="ele-scrollbar-mini ele-scrollbar-hover">
      <a-checkbox v-for="(item,i) in list" :key="i" class="ele-cell checkbox-item" v-model:checked="item.checked"><div class="ele-cell"><img :src="item.img" class="user-img margin-right-8" />{{item.name}}</div></a-checkbox>
    </div>
    <template #footer>
      <a-button type="primary" @click="comfirm">创建</a-button>
      <a-button class="margin-left-10" @click="close">取消</a-button>
    </template>
  </a-modal>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,toRef,nextTick,inject  } from 'vue';
  const emit = defineEmits(['comfirm']);
  const visible = ref(false);
  const list = ref([
    {name:'张三',img:'/src/assets/user.png',checked:false},
    {name:'张三',img:'/src/assets/user.png',checked:false},
    {name:'张三',img:'/src/assets/user.png',checked:false},
  ])

  const comfirm = (e)=> {
    let arr = list.value.filter(item=>{
      return item.checked;
    })
    emit('comfirm',arr);
    close();
  }
  const open = ()=> {
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
:global(.group-chat-modal .ant-checkbox){
  top: 0;
}
.checkbox-item{
  margin:0 0 5px 0;
  padding:5px;
}
.checkbox-item:hover{
  background: var(--primary-1);
}
.user-img{
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>
