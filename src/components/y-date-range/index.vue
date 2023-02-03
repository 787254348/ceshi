<template>
    <div class="y-data-range">
        <a-input :style="'width:'+ width+';height:'+ height" v-model:value="value" ref="input"   placeholder="开始时间 ~ 结束时间" @focus="focus" @blur="blur" >
            <template #suffix v-if="allowClear">
                <span v-show="value" class="iconfont icon-guanbi-shi" @click="clear"></span>
            </template>
        </a-input>
        <div style="position: relative;" :style="offsetStyle">
            <a-date-picker style="display: none;" dropdownClassName="y-data-range1" v-model:value="startDateValue"  :open="open" :showToday="false"
            :format="dateFormat"
            :picker="mode"
            :disabled-date="disabledDate1"
            :getPopupContainer="triggerNode => {
            return triggerNode.parentNode}"
            @change="change"
            @panelChange="panelChange"
            >
                <template #renderExtraFooter>
                     <div style="display: flex;justify-content: space-between;">
                         <div style="display: flex;">
                             <div class="y-data-range-button__mode">
                                 <a-button v-for="item in modeButton" :class="{'ant-btn-primary':item.type==mode}" size="small"    @click="changeMode(item.type)">{{item.name}}</a-button>
                             </div>
                             <div>
                                 <a-button   size="small" :class="{'ant-btn-primary':selectMode=='单'}"    @click="changeSelectMode">{{selectMode}}</a-button>
                             </div>
                             <div>
                                <!-- 近期、昨天、今天等快捷键 -->
                                <a-button v-for="item in rangesValue"  size="small" class="y-data-range-button__date" @click="quick(item.type)">{{item.name}}</a-button>
                             </div>
                         </div>
                         <div>
                            <!-- <a-button type="primary" ghost size="small" class="y-data-range-button__date" @click="clear">清空</a-button> -->
                             <a-button v-if="selectMode=='双'" type="primary" size="small"  @click="confirm">确定</a-button>
                         </div>
                     </div>
                </template>
            </a-date-picker>
            <a-date-picker style="display: none;" dropdownClassName="y-data-range2" v-model:value="endDateValue" :open="open1" :showToday="false"
            :format="dateFormat"
            :picker="mode"
            :disabled-date="disabledDate2"
            :getPopupContainer="triggerNode => {
            return triggerNode.parentNode}"
            >
            </a-date-picker>
        </div>
    </div>

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
            default:'210px'
        },
        height:{//高度
            type:String,
            default:'32px'
        },
        modeButton:{//模式按钮
           type:Array,
           default(){
               return[
                    {name: '年', type: 'year'},
                    {name: '月', type: 'month'},
                    {name: '日', type: 'date'},
                ]
           }
        },
        ranges:{//快捷方式选择日期
           type:Array,
           default(){
               return[
                    {name: '上月', type: 'last_month'},
                    {name: '本月', type: 'this_month'},
                    {name: '近30天', type: 'recent'},
                    {name: '近15天', type: 'nearly_15_days'},
                    {name: '近7天', type: 'nearly_7_days'},
                    {name: '昨天', type: 'yesterday'},
                    {name: '今天', type: 'today'},
                ]
           }
        },
        startDate:{//开始日期
            type:Object,
            default:dayjs()
        },
        endDate:{//结束日期
            type:Object,
            default:dayjs()
        },
        picker:{//设置选择器类型  date | week | month | quarter | year
            type:String,
            default:'date'
        },
        dateFormat:{//日期显示格式
            type:String,
            default:'YYYY-MM-DD'
        },
        offsetStyle:{//日期弹窗偏移样式
            type:String,
        }
    },
    data(){
        return{
            open:false,
            open1:false,
            value:'',
            selectMode:'双',//日期选择界面模式
        }
    },
    watch:{
       open(value){
           setTimeout(()=>{
              //监听选中节点的点击事件，就是为了解决在单面板选择时点击已经选中的日期没有回调事件
              let d = document.querySelector('.ant-picker-cell-selected');//获取选中日期的节点
              d.addEventListener('click',this.noChange,);
           },100)
       },
       mode(){
           setTimeout(()=>{
              //监听选中节点的点击事件，就是为了解决在单面板选择时点击已经选中的日期没有回调事件
              let d = document.querySelector('.ant-picker-cell-selected');//获取选中日期的节点
              d.addEventListener('click',this.noChange,);
           },100)
       }
    },
    computed:{
        rangesValue(){
            let result = [];
            if(this.ranges.length>0){
                if(this.mode=='year'){//如果模式是年的话就显示上年，本年快捷按钮
                    result = [
                        {name: '上年', type: 'last_year'},
                        {name: '本年', type: 'this_year'},
                    ]
                }else if(this.mode=='month'){//如果模式是月的话就显示上月，本月快捷按钮
                    result = [
                        {name: '上月', type: 'last_month'},
                        {name: '本月', type: 'this_month'},
                    ]
                }else{
                   result = this.ranges;
                }
            }
            return result;
        }
    },
    setup(props,ctx){
        const startDateValue = ref(props.startDate || dayjs());
        const endDateValue = ref(props.endDate || dayjs());
        const beforeStartDateValue = startDateValue.value;//记录上次的开始时间
        const beforeEndDateValue = endDateValue.value;//记录上次的结束时间
        const mode = ref(props.picker);
        return {
           startDateValue,
           endDateValue,
           beforeStartDateValue,
           beforeEndDateValue,
           mode,
        }
    },
    mounted() {
        //this.setValue(this.startDateValue,this.endDateValue);
        if(!!this.startDate){
           this.value = dayjs(this.startDate).format(this.dateFormat)+' ~ '+dayjs(this.endDate).format(this.dateFormat);
        }

    },
    methods:{
        //单面板选择时点击已经选中的日期事件
        noChange(e){
            if(this.selectMode=='单'){
                let date = e.target.parentNode.title;
                let dateFormat = this.mode =='year' ? 'YYYY' : (this.mode =='month' ? 'YYYY-MM' : 'YYYY-MM-DD');
                this.startDateValue = dayjs(date,dateFormat);
                this.endDateValue = dayjs(date,dateFormat);
                this.confirm();
            }
        },
        //日期变化回调
        change(e){
          if(this.selectMode=='单'){
              this.startDateValue = e;
              this.endDateValue = e;
              this.confirm();
          }
        },
        //单双模式的切换
        changeSelectMode(){
            this.selectMode = this.selectMode=='双' ? '单' : '双';
            if(this.selectMode=='双'){
                this.open1 = true;
            }else{
                this.open1 = false;
            }
        },
        //设置输入框的值
        setValue(startDate,endDate){
            //记录一下确定时的值，以便于回滚
            this.beforeStartDateValue = dayjs(dayjs(startDate).format(this.dateFormat),this.dateFormat);
            this.beforeEndDateValue = dayjs(dayjs(endDate).format(this.dateFormat),this.dateFormat);
            this.value = dayjs(startDate).format(this.dateFormat)+' ~ '+dayjs(endDate).format(this.dateFormat);
        },
        focus(){
           this.open = true;
           if(this.selectMode=='双'){
              this.open1 = true;
           }
           if(this.value!=''){
               let arr = this.value.split('~');
               this.startDateValue = dayjs(arr[0],this.dateFormat);
               this.endDateValue = dayjs(arr[1],this.dateFormat);
           }else{
               this.startDateValue = this.beforeStartDateValue;
               this.endDateValue = this.beforeEndDateValue;
           }
        },
        blur(){
            this.open = false;
            this.open1 = false;
            //处理手动输入值时，时间的处理
            if(this.value.indexOf('~')==-1){//如果输入的值没有~分隔符的话就返回上一次的值
                this.setValue(this.beforeStartDateValue,this.beforeEndDateValue);
            }else{
                let newDateArr = this.value.split('~');
                let startTemp = new Date(newDateArr[0]).getTime();//开始时间戳
                let endTemp = new Date(newDateArr[1]).getTime();//结束时间戳
                //结束时间小于开始时间，就还原为之前的值
                if (isNaN(startTemp) || isNaN(endTemp) || startTemp > endTemp) {
                    this.setValue(this.beforeStartDateValue,this.beforeEndDateValue);
                    return false;
                }
                let date_reg3 = /^\d{4}(\-|\/|.)\d{1,2}(\-|\/|.)\d{1,2}/;
                let date_reg2 = /^\d{4}(\-|\/|.)\d{1,2}/;
                let date_reg1 = /^\d{4}/;//匹配的年必须是4位数，因为插件的时间年份不能选择低于4位数的
                let is_back = false;//是否设置为原来的值
                let start_date = getDate(newDateArr[0].trim(),'start')
                let end_date = getDate(newDateArr[1].trim(),'end')
                //获取有效时间
                function getDate(date,type){
                    let date_value = '';
                    if(date_reg3.test(date)){//匹配到年月日
                        date_value = date;
                    }else if(date_reg2.test(date)){//匹配到年月
                        date_value = type=='start' ? dayjs(date).startOf('month') : dayjs(date).endOf('month');
                    }else if(date_reg1.test(date)){//匹配到年
                        date_value = type=='start' ? dayjs(date).startOf('year') : dayjs(date).endOf('year');
                    }else{
                       is_back = true;
                    }
                    return date_value;
                }
                if(is_back){
                    this.setValue(this.beforeStartDateValue,this.beforeEndDateValue);
                }else{
                    this.setValue(start_date,end_date);
                }
            }

        },
        disabledDate1(current){
            if(this.selectMode=='双'){
               return current && current > this.endDateValue;
            }
        },
        disabledDate2(current){
             return current && current < this.startDateValue;
        },
        //确定
        confirm(){
            if(this.mode != 'date'){//如果当前显示的模式不是初始化时的模式 (就是点击了底部年月切换了显示模式)
                this.startDateValue = dayjs(this.startDateValue).startOf(this.mode);//获取当前年或月份的开始时间
                this.endDateValue = dayjs(this.endDateValue).endOf(this.mode);//获取当前年或月份的结束时间
            }
            this.setValue(this.startDateValue,this.endDateValue);

            let obj = {
                startDate:dayjs(this.startDateValue).format(this.dateFormat),
                endDate:dayjs(this.endDateValue).format(this.dateFormat),
            }

            console.log(dayjs(this.beforeEndDateValue).format(this.dateFormat))
            this.$emit('confirm',obj);
            this.$refs.input.blur();
        },
        //清空
        clear(){
            this.value = '';
            this.$refs.input.blur();
            let obj = {
                startDate:'',
                endDate:'',
            }
            this.$emit('confirm',obj);
        },
        //切换模式方式
        changeMode(type){
            console.log(this.mode,type)
            if(this.mode != type){
                this.mode = type;
            }
        },
        //快捷方式
        quick(type){
            let obj = this.getDate(type);
            this.startDateValue = dayjs(obj.start_time,this.dateFormat);
            this.endDateValue = dayjs(obj.end_time,this.dateFormat);
            this.confirm();
        },
        getDate(type){
            var dateObj = {};
            switch (type) {
                case 'recent':
                    dateObj['start_time'] = dayjs().subtract(30, 'day').format(this.dateFormat);
                    dateObj['end_time'] = dayjs().format(this.dateFormat);
                    break;
                case 'nearly_15_days':
                    dateObj['start_time'] = dayjs().subtract(15, 'day').format(this.dateFormat);
                    dateObj['end_time'] = dayjs().format(this.dateFormat);
                    break;
                case 'nearly_7_days':
                    dateObj['start_time'] = dayjs().subtract(7, 'day').format(this.dateFormat);
                    dateObj['end_time'] = dayjs().format(this.dateFormat);
                    break;
                case 'yesterday':
                    dateObj['start_time'] = dayjs().subtract(1, 'day').format(this.dateFormat);
                    dateObj['end_time'] = dateObj['start_time'];
                    break;
                case 'today':
                    dateObj['start_time'] = dayjs().format(this.dateFormat);
                    dateObj['end_time'] = dateObj['start_time'];
                    break;
                case 'this_month':
                    dateObj['start_time'] = dayjs().startOf('month').format(this.dateFormat);
                    dateObj['end_time'] = dayjs().endOf('month').format(this.dateFormat);
                    break;
                case 'last_month':
                    var tmpDate = dayjs().startOf('month').subtract(1, 'month');
                    dateObj['start_time'] = tmpDate.format(this.dateFormat);
                    dateObj['end_time'] = tmpDate.endOf('month').format(this.dateFormat);
                    break;
                case 'this_year':
                    dateObj['start_time'] = dayjs().startOf('year').format(this.dateFormat);
                    dateObj['end_time'] = dayjs().endOf('year').format(this.dateFormat);
                    break;
                case 'last_year':
                    var tmpDate = dayjs().startOf('year').subtract(1, 'year');
                    dateObj['start_time'] = tmpDate.format(this.dateFormat);
                    dateObj['end_time'] = tmpDate.endOf('year').format(this.dateFormat);
                    break;
            }
            return dateObj;
        }
    }
})
</script>
<style lang="less" scoped>
:global(.y-data-range1 .ant-picker-footer){
    width: 560px;
}
:global(.y-data-range2){
     left: 280px;
 }
:global(.y-data-range2 .ant-picker-panel-container){
    //box-shadow: 4px 4px 6px 0px rgb(0 0 0 / 12%), 4px 0px 6px 0 rgb(0 0 0 / 8%);
    box-shadow:none;
}

:global(.y-data-range .ant-picker-year-panel .ant-picker-content),
:global(.y-data-range .ant-picker-month-panel .ant-picker-content){
    height: 228px;
}
:global(.y-data-range .ant-picker-decade-panel .ant-picker-content){
    height: 269px;
}
.icon-guanbi-shi{
    color: rgba(0, 0, 0, 0.25);
    font-size: 12px;
    cursor: pointer;
}
.y-data-range-button__mode{
    margin-right: 3px;
}
.y-data-range-button__mode .ant-btn{
    padding:0 5px;
}
.y-data-range-button__mode .ant-btn:first-child{
    border-radius: 2px 0 0 2px;
}
.y-data-range-button__mode .ant-btn:nth-child(2){
    border-left: 0;
    border-radius: 0;
}
.y-data-range-button__mode .ant-btn:last-child{
    border-left: 0;
    border-radius: 0 2px 2px 0;
}
.y-data-range-button__date{
    margin: 0 3px;
    padding: 0 5px;
}
</style>
