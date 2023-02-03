import { defineStore } from 'pinia';
export const watermarkSetStore = defineStore({
  id: 'watermark',
  state: () => ({
    // 绘制水印的信息
    info: {
      
    },
    //水印设置页的数据
    set:{
      textContent:'',
      nameChecked:true,
      phoneChecked:true,
      dateChecked:false,
      fontFamilyValue:'微软雅黑',
      fontSizeValue:'12',
      densityValue:'正常',
      color:'rgba(0, 0, 0, 1)',
      angleValue:30,
      opacityValue:10
    }
  }),
  actions: {
    //更新水印信息
    setInfo(obj) {
      this.set = obj;
      let watermark_txt = obj.textContent
      if(obj.nameChecked){
         if( watermark_txt != '') watermark_txt += ' '
         watermark_txt += '张三'
      }
      if(obj.phoneChecked){
         if( watermark_txt != '') watermark_txt += ' '
         watermark_txt += '6969'
      }
      if(obj.dateChecked){
         if( watermark_txt != '') watermark_txt += ' '
         watermark_txt += '20221104'
      }
      let watermark_x_space = 0,watermark_y_space = 0;
      if(obj.densityValue=='稀疏'){
        watermark_x_space = 40;
        watermark_y_space = 40;
      }else if(obj.densityValue=='紧凑'){
        watermark_x_space = -40;
        watermark_y_space = -40;
      }
      this.info = {
        watermark_txt,
        watermark_font:obj.fontFamilyValue,
        watermark_fontsize:obj.fontSizeValue+'px',
        watermark_color:obj.color,
        watermark_angle:obj.angleValue,
        watermark_alpha:Number(obj.opacityValue)/100,
        watermark_x_space,
        watermark_y_space
      }
    },
  }
})
