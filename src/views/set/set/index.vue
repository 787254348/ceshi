<template>
  <div class="ele-body">
    <div class="ant-card ant-card-body">
      <div class="ele-cell">
        <div class="content-left">水印文字：</div>
        <a-input v-model:value="textContent" placeholder=""  style="width: 400px;"/>
      </div>
      <div class="ele-cell margin-top-20">
        <div class="content-left">水印显示后缀：</div>
        <a-checkbox v-model:checked="nameChecked">显示员工姓名</a-checkbox>
        <a-checkbox v-model:checked="phoneChecked" style="margin-left:37px">显示号码后四位</a-checkbox>
        <a-checkbox v-model:checked="dateChecked" style="margin-left:37px">显示日期</a-checkbox>
      </div>

      <div class="ele-cell margin-top-20">
        <div class="content-left">水印字体设置：</div>
        <div class="ele-cell">
          <div>字体：</div>
          <a-select
            v-model:value="fontFamilyValue"
            style="width: 120px"
            :options="fontFamilyOptions"

          ></a-select>
        </div>
        <div class="ele-cell">
          <div class="content-item-left">字号：</div>
          <a-select
            v-model:value="fontSizeValue"
            style="width: 120px"
            :options="fontSizeOptions"

          ></a-select>
        </div>
        <div class="ele-cell">
          <div class="content-item-left">颜色：</div>
          <ele-color-picker :show-alpha="true" v-model:value="color" :predefine="predefineColors" style="width: 120px;"/>
        </div>
      </div>

      <div class="ele-cell margin-top-20">
        <div class="content-left">水印显示设置：</div>
        <div class="ele-cell">
          <div>密度：</div>
          <a-select
            v-model:value="densityValue"
            style="width: 120px"
            :options="densityOptions"

          ></a-select>
        </div>
        <div class="ele-cell">
          <div class="content-item-left">倾斜度：</div>
          <a-input v-model:value="angleValue" placeholder="0-90" style="width: 120px;"/>
        </div>
        <div class="ele-cell">
          <div class="content-item-left">透明度：</div>
          <a-input v-model:value="opacityValue" :controls="false" :keyboard="true" :min="0" :max="100" style="width: 120px;">
            <template #suffix>
              <span style="color:var(--border-color-base)">%</span>
            </template>
          </a-input>
        </div>
      </div>
      <!-- 预览效果 -->
      <div class="preview">

      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref,watch,defineProps,computed,toRefs } from 'vue';
  import { storeToRefs } from 'pinia';
  import { watermark } from '@/utils/watermark';
  import { watermarkSetStore } from '@/store/modules/watermark-set'
  const watermarkSet = watermarkSetStore()
  const { info,set } = storeToRefs(watermarkSet)
  const {textContent,nameChecked,phoneChecked,dateChecked,fontFamilyValue,fontSizeValue,densityValue,color,angleValue,opacityValue} = toRefs(set.value)
  const fontFamilyOptions = ref([{
      value: '微软雅黑',
      label: '微软雅黑',
    }, {
      value: '宋体',
      label: '宋体',
    },{
      value: '黑体',
      label: '黑体',
    }]);
  const fontSizeOptions = ref([{
      value: '12',
      label: '12',
    },{
      value: '14',
      label: '14',
    },{
      value: '16',
      label: '16',
    },{
      value: '18',
      label: '18',
    },{
      value: '20',
      label: '20',
    },{
      value: '22',
      label: '22',
    },{
      value: '24',
      label: '24',
    },{
      value: '26',
      label: '26',
    },{
      value: '28',
      label: '28',
    },{
      value: '30',
      label: '30',
    },{
      value: '32',
      label: '32',
    }]);
  const densityOptions = ref([{
      value: '正常',
      label: '正常',
    }, {
      value: '稀疏',
      label: '稀疏',
    },{
      value: '紧凑',
      label: '紧凑',
    }]);
   // 预设颜色
  const predefineColors = ref([
      'rgba(0, 0, 0, 1)',
      '#ff4500',
      '#ff8c00',
      '#ffd700',
      '#90ee90',
      '#00ced1',
      '#1e90ff',
      '#c71585',
      '#c7158577'
  ]);
  //限制输入框只能输入数字
  const format = (val, preVal) => {
  const reg = /^[0-9]+$/;
   if (reg.test(val) && Number(val) <= 90 || val=='') {
     angleValue.value = val;
   } else {
     angleValue.value = preVal;
   }
  };
  //限制输入框只能输入数字
  const format1 = (val, preVal) => {
    const reg = /^[0-9]+$/;
    if (reg.test(val) && Number(val) <= 100 || val=='') {
     opacityValue.value = val;
    } else {
     opacityValue.value = preVal;
    }
  };
  const watermark_set = computed(()=>{
    let obj = {
      textContent:textContent.value.trim(),
      nameChecked:nameChecked.value,
      phoneChecked:phoneChecked.value,
      dateChecked:dateChecked.value,
      fontFamilyValue:fontFamilyValue.value,
      fontSizeValue:fontSizeValue.value,
      color:color.value,
      densityValue:densityValue.value,
      angleValue:angleValue.value,
      opacityValue:opacityValue.value
    }
    return obj;
  })
  watch(
    [angleValue,opacityValue,watermark_set],
    (val, preVal) => {
      console.log(111,val)
    format(val[0], preVal[0])
    format1(val[1], preVal[1])
    //先清除dom元素再添加
    let dom = document.body.querySelector('#watermark')
    if(dom) document.body.removeChild(dom);
    watermarkSet.setInfo(val[2]);
    console.log(info)
    watermark(info.value);
  });



</script>

<style lang="less" scoped>
.margin-top-20{
  margin-top:20px;
}
.content-left{
  width: 100px;
  text-align: right;
}
.content-item-left{
  width: 60px;
  text-align: right;
  margin-left: 60px;
}
.preview{
  width: 100%;
  height: calc(100vh - 330px);
  margin-top: 20px;
  position: relative;
  overflow: hidden;
}
</style>
