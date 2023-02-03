<template>
    <div class="y-background-color__box">
        <div class="y-background-color__title">字体颜色</div>
        <div class="y-background-color__content">
            <div class="y-background-color__color_wrap"  v-for="(item,index) in color_list" :style="colorStyle(item,index)">
                <div class="y-background-color__color" @click="selectColor(item)">A</div>
            </div>
        </div>
        <div class="y-background-color__title margin-top-20">背景颜色</div>
        <div class="y-background-color__content">
            <div class="y-background-color__color_wrap" v-for="(item,index) in background_color_list" :style="backgroundColorStyle(item,index)" @click="selectBackground(item)">
                <div class="y-background-color__color"  :style="{'background':item.background}">A</div>
            </div>
            <div class="y-background-color__color_wrap clear-background" @click="clear">
                <span class="iconfont icon-a-Rectangle24"></span>
            </div>
        </div>
        <div class="y-background-color__button_box"> <a-button class="y-background-color__button" type="link" @click="clear">恢复默认</a-button></div>
    </div>
</template>

<script>
    import {
        defineComponent,
        ref
    } from 'vue';
    export default defineComponent({
        props:{
            color:{
                type:String,
                default:'#000000'
            },
            background:{
                type:String,
                default:'none'
            }
        },
        data() {
            return{
                color:'#000000',
                color_list:['#F40000','#FA541C','#FA8C16','#FAAD14','#A0D911','#52C41A','#13C2C2','#2F54EB','#722ED1','#EB2F96','#000000','#8D8D8D'],
                background:'none',
                background_color_list:[
                    {color:'#ffffff',background:'#F40000',borderColor:'rgba(244, 0, 0, .5)'},
                    {color:'#ffffff',background:'#FA541C',borderColor:'rgba(250, 84, 28, .5)'},
                    {color:'#ffffff',background:'#FA8C16',borderColor:'rgba(250, 140, 22, .5)'},
                    {color:'#ffffff',background:'#FAAD14',borderColor:'rgba(250, 173, 20, .5)'},
                    {color:'#ffffff',background:'#A0D911',borderColor:'rgba(160, 217, 17, .5)'},
                    {color:'#ffffff',background:'#52C41A',borderColor:'rgba(82, 196, 26, .5)'},
                    {color:'#ffffff',background:'#13C2C2',borderColor:'rgba(19, 194, 194, .5)'},
                    {color:'#ffffff',background:'#2F54EB',borderColor:'rgba(47, 84, 235, .5)'},
                    {color:'#ffffff',background:'#722ED1',borderColor:'rgba(114, 46, 209, .5)'},
                    {color:'#ffffff',background:'#EB2F96',borderColor:'rgba(235, 47, 150, .5)'},
                    
                    {color:'#000000',background:'#FDCCCC',borderColor:'rgba(244, 0, 0, 1)'},
                    {color:'#000000',background:'#FEDDD2',borderColor:'rgba(250, 84, 28, 1)'},
                    {color:'#000000',background:'#FEE8D0',borderColor:'rgba(250, 140, 22, 1)'},
                    {color:'#000000',background:'#FEEFD0',borderColor:'rgba(250, 173, 20, 1)'},
                    {color:'#000000',background:'#ECF7CF',borderColor:'rgba(160, 217, 17, 1)'},
                    {color:'#000000',background:'#DCF3D1',borderColor:'rgba(82, 196, 26, 1)'},
                    {color:'#000000',background:'#D0F3F3',borderColor:'rgba(19, 194, 194, 1)'},
                    {color:'#000000',background:'#D5DDFB',borderColor:'rgba(47, 84, 235, 1)'},
                    {color:'#000000',background:'#E3D5F6',borderColor:'rgba(114, 46, 209, 1)'},
                    {color:'#000000',background:'#FBD5EA',borderColor:'rgba(235, 47, 150, 1)'},
                    
                    {color:'#ffffff',background:'#000000',borderColor:'rgba(0, 0, 0, .5)'},
                    {color:'#ffffff',background:'#8D8D8D',borderColor:'rgba(141, 141, 141, .5)'},
                    {color:'#ffffff',background:'#CCCCCC',borderColor:'rgba(204, 204, 204, .5)'},
                ]
            }
        },
        setup(props, ctx) {
            const color = ref(props.color);
            const background = ref(props.background);
            return {
                color,
                background
            }
        },
        methods:{
            colorStyle(color){
                let style = `color:${color};`;
                if(this.color==color){
                    style +=  `margin-top:8px;border:3px solid ${color};`;
                }else{
                    style +=  `height:25px;border:1px solid ${color};`;
                }
                return style;
            },
            backgroundColorStyle(item){
                let style = `color:${item.color};`;
                if(this.background==item.background){
                    style +=  `margin-top:8px;border:3px solid ${item.borderColor};`;
                }else{
                    style +=  `height:25px;border:1px solid ${item.background};`;
                }
                return style;
            },
            selectColor(color){
                this.color = color;
                this.background = 'none';
                this.emit();
            },
            selectBackground(item){
                this.color = item.color;
                this.background = item.background;
                this.emit();
            },
            emit(){
                let obj = {
                    color:this.color,
                    background:this.background
                }
                this.$emit('ok',obj)
            },
            clear(){
                this.color = '#000000';
                this.background = 'none';
                this.emit();
            }
        }
    })
</script>

<style lang="less" scoped>
.y-background-color__box{
    // padding: 20px 20px 10px;
    // background: #f5f5f5;
    border-radius: 4px;
    width: 304px;
    padding-top: 10px;
}
.margin-top-20{
    margin-top: 20px;
}
.y-background-color__title{
    height: 20px;
    font-style: normal;
    line-height: 20px;
    color: #8C8C8C;
    flex: none;
    order: 0;
    flex-grow: 0;
    text-align: left;
}
.y-background-color__content{
    display: flex;
    flex-wrap: wrap;
}
.y-background-color__color_wrap{
    margin-top: 10px;
    border-radius: 2px;
    margin-right:5px;
    cursor: pointer;
}
.y-background-color__color{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 23px;
    height: 23px;  
}
.clear-background{
    width: 25px;
    height: 25px;
    border: 1px solid #D9D9D9;
    line-height: 25px;
    text-align: center;
}
.clear-background span{
    font-size: 22px;
    color:#D9D9D9;
    line-height: 25px;
}
.y-background-color__button_box{
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    margin-top: 20px;
    text-align: center;
    padding-top: 10px;
}
.y-background-color__button{
    color: var(--primary-color);
    cursor: pointer;
}
</style>