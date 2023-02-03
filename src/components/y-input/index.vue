<template>
  <a-input  v-model:value="value"></a-input>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,nextTick,provide } from 'vue';
  const props = defineProps({
    value:{
      type:String,
    },

    negative:{//是否显示负数
      type:Boolean,
      default:true,
    },
    decimal:{//是否显示小数
      type:Boolean,
      default:true,
    },
    digits:{//小数位数
      type:Number,
      default:4,
    }
  })
  const value = ref(props.value);
  const { style,negative,decimal,digits } = toRefs(props);
  //限制输入框只能输入数字
  const format = (val, preVal) => {
      let reg;
      if(negative.value){//带负数
        if(decimal.value){//显示小数
          reg = new RegExp("^[-]?\\d+(?:\\.\\d{1,"+digits.value+"})?$");//保留4位小数的正负数,静态写法/^[-]?\d+(?:\.\d{1,4})?$/
        }else{
          reg = /^[-]?\d+$/;
          val = val.replace(".",'');//去掉小数点
        }
      }else{//正数
        if(decimal.value){//显示小数
          reg = new RegExp("^\\d+(?:\\.\\d{1,"+digits.value+"})?$");
        }else{
          reg = /^\d+$/;
          val = val.replace(".",'');
        }
      }
      if (reg.test(Number(val)) || (negative.value && val=='-')) {
        value.value = val;
      } else {
        value.value = preVal;
      }
  };
  watch(
    [
      () => props.value,
      value
    ],
    (val, preVal) => {
      if(val[0]!=preVal[0]){
        value.value = val[0];
      }
      if(val[1]!=preVal[1]){
        format(val[1], preVal[1])
      }
  },{deep:true});
</script>

<style>
</style>
