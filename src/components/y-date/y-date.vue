<template>

      <a-dropdown :trigger="['click']" v-model:visible="visible" :placement="placement" overlayClassName="y-data">
        <!-- 输入框 -->
        <slot>
          <div class="y-data__input ant-input" :style="'width:'+ width+';height:'+ height">
              <a-input  v-model:value="date" style="width: 100%" :bordered="false" ref="startInput"   placeholder="" @focus="focus('start')" @blur="blur('start')" >
              </a-input>
              <span v-if="allowClear"><span v-show="date" class="iconfont icon-guanbi-shi" @click="clear"></span></span>
          </div>
        </slot>
        <!-- 日期弹窗 -->
        <template #overlay>
          <a-menu :style="showTime ? 'width: 409px;' : 'width: 280px;'">
            <a-menu-item style="height: 310px;" >

                  <!-- 开始时间弹窗 -->
                  <a-date-picker style="display: none;" :value="dateValue"  :open="open" :showToday="false"
                  :show-time="showTime"
                  :showNow="false"
                  :format="dateFormat"
                  @ok="startOk"
                  @change="change"
                  :getPopupContainer="triggerNode => {
                  return triggerNode.parentNode}"
                  >
                      <template #renderExtraFooter>
                           <div :class="{'text-center':!showTime}">
                              <a-button type="link" size="small" class="opacity-5" @click="quick('yesterday')">昨天</a-button>
                              <a-button type="link" size="small" @click="quick('today')">今天</a-button>
                              <a-button type="link" size="small" class="opacity-5" @click="quick('tomorrow')">明天</a-button>
                           </div>
                      </template>
                  </a-date-picker>

            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>


</template>
<script>
import dayjs from 'dayjs'
import { defineComponent, ref,reactive,toRef,toRefs } from 'vue'
export default defineComponent({
    props:{
        allowClear:{//是否显示清除按钮
            type:Boolean,
            default:true
        },
        width:{//宽度
            type:String,
            default:'160px'
        },
        height:{//高度
            type:String,
            default:'32px'
        },
        date:{//日期
            type:String,
        },
        showTime:[Object, Boolean],//增加时间选择功能
        dateFormat:{//日期显示格式,带时间格式 YYYY-MM-DD HH:mm
            type:String,
            default:'YYYY-MM-DD'
        },
        placement:{//弹出位置  bottomLeft | bottom | bottomRight | topLeft | top | topRight
          type:String,
          default:'bottomLeft'
        },
        isModel:{//是否让日期值变成响应式
            type:Boolean,
            default:false
        },
    },
    data(){
        return{
            open:true,
            visible:false,
        }
    },
    setup(props,ctx){
        const date = ref(props.date || dayjs().format(props.dateFormat));//输入框中的开始时间
        const dateValue = ref(props.date ? dayjs(props.date,props.dateFormat) : dayjs());//弹窗中的开始时间
        const beforeDateValue = dateValue.value;//记录上次的开始时间
        return {
           date,
           dateValue,
           beforeDateValue,
        }
    },
    mounted() {

    },
    methods:{
        //设置输入框的值
        setValue(date){
            let obj = {
                date:dayjs(date).format(this.dateFormat),
            }
            //记录一下确定时的值，以便于回滚
            this.beforeDateValue = dayjs(dayjs(date).format(this.dateFormat),this.dateFormat);
            //设置当前的值
            this.date = obj.date;
            if(this.isModel){
              this.$emit('update:date',this.date);
            }
            this.$emit('confirm',obj);
        },
        focus(){
           //this.open = true;
           if(this.date!=''){
               this.dateValue = dayjs(this.date.trim(),this.dateFormat);
           }else{
               this.dateValue = this.beforeDateValue;
           }
        },
        //隐藏弹窗
        hide(){
          setTimeout(()=>{
            this.visible = false;
          },0)
        },
        blur(){
            this.hide();
            //this.open = false;
            //处理手动输入值时，时间的处理
            if(this.date.trim()==''){//如果输入的值是空的的话就返回上一次的值
                this.setValue(this.beforeDateValue);
            }else{
                let startTemp = new Date(this.date).getTime();//开始时间戳
                //判断是否无效的值
                if (isNaN(startTemp)) {
                    this.setValue(this.beforeDateValue);
                    return false;
                }
                let date_reg3 = /^\d{4}(\-|\/|.)\d{1,2}(\-|\/|.)\d{1,2}/;
                let date_reg2 = /^\d{4}(\-|\/|.)\d{1,2}/;
                let date_reg1 = /^\d{4}/;//匹配的年必须是4位数，因为插件的时间年份不能选择低于4位数的
                let is_back = false;//是否设置为原来的值
                let that = this;
                let start_date = getDate(this.date.trim())
                //获取有效时间
                function getDate(date,type){
                    let date_arr = date.split(' ');
                    let date_value = '';
                    if(date_reg3.test(date_arr[0])){//匹配到年月日
                        date_value = date;
                    }else if(date_reg2.test(date_arr[0])){//匹配到年月
                        date_value = dayjs(date).startOf('month');
                        if(date_arr[1]){//如果存在时分的话，就不改变时分，只改变日期
                            let date_time = dayjs(date_value).format(that.dateFormat);
                            let date_time_value = date_time.split(' ')[0] +' '+date_arr[1];
                            date_value = dayjs(date_time_value,that.dateFormat);
                        }
                    }else if(date_reg1.test(date_arr[0])){//匹配到年
                        date_value = dayjs(date).startOf('year');
                        if(date_arr[1]){//如果存在时分的话，就不改变时分，只改变日期
                            let date_time = dayjs(date_value).format(that.dateFormat);
                            let date_time_value = date_time.split(' ')[0] +' '+date_arr[1];
                            date_value = dayjs(date_time_value,that.dateFormat);
                        }
                    }else{
                       is_back = true;
                    }
                    return date_value;
                }

                let dateTemp = new Date(start_date).getTime();//时间戳
                if(is_back || isNaN(dateTemp)){
                    this.setValue(this.beforeDateValue);
                }else{
                    this.setValue(start_date);
                }
            }

        },
        change(value){//因为没有设置显示时间的话，就不会显示确定按钮，所以需要这个方法来监听点击时间
          if(this.showTime) return;//如果设置了显示时间，就不触发点击确定按钮事件了。
          this.startOk(value);
        },
        //点击开始时间的确定按钮
        startOk(value){
            this.dateValue = value;
            this.setValue(this.dateValue);
            //隐藏弹窗
            this.hide();
        },
        //清空
        clear(){
            this.hide();

            this.date = '';
            this.$refs.startInput.blur();
            let obj = {
                date:'',
            }
            if(this.isModel){
              this.$emit('update:date','');
            }
            this.$emit('confirm',obj);
        },

        //快捷方式
        quick(type){
            let obj = this.getDate(type);
            console.log(111,obj.start_time)
            let date = obj.start_time;
            if(this.showTime && this.date!=''){//如果设置了时间的话，点击快捷键的时候时间是不改变的
                let dateValue = obj.start_time.split(' ')[0];
                let timeValue = this.date.split(' ')[1];
                date = dateValue+' '+timeValue;
            }
            this.dateValue = dayjs(date,this.dateFormat);
            console.log(222,date)
            this.setValue(this.dateValue);
            this.hide();
        },
        getDate(type){
            var dateObj = {};
            switch (type) {
                case 'yesterday':
                    dateObj['start_time'] = dayjs().subtract(1, 'day').format(this.dateFormat);
                    break;
                case 'today':
                    dateObj['start_time'] = dayjs().format(this.dateFormat);
                    break;
                case 'tomorrow':
                    dateObj['start_time'] = dayjs().subtract(-1, 'day').format(this.dateFormat);
                    break;
            }
            return dateObj;
        }
    }
})
</script>
<style lang="less" scoped>
:global(.y-data .ant-dropdown-menu){
    padding: 0;
}
:global(.y-data .ant-picker-footer){
    display: flex;
}
:global(.y-data .ant-picker-footer-extra){
    width: 100%;
}
:global(.y-data .ant-picker-ranges){
    padding-left: 1px;
    line-height: 30px;
}
:global(.y-data .ant-picker-footer-extra:not(:last-child)){
    border-bottom: none;
}
.y-data__input{
    display: flex;
    padding: 0;
    align-items: center;
}
.icon-guanbi-shi{
    color: rgba(0, 0, 0, 0.25);
    font-size: 12px;
    cursor: pointer;
    padding-right: 10px;
}
.opacity-5{
    opacity:0.5;
}
.text-center{
    text-align: center;
}
</style>
