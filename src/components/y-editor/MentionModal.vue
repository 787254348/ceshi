<template>
    <div class="mention-modal" ref="mentionModal" v-if="searchedList.length>0" :style="style">
        <ul id="mention-list">
            <li
                v-for="(item,index) in searchedList"
                :key="item.id"
                :class="{'on':index==select_index}"
                @click="insertMentionHandler(index)"
                @mouseenter="mouseenter(index)"
            >
              <img  class="user-img" src="/src/assets/user.png">
              <span>{{item.name}}</span>
            </li>
        </ul>

    </div>
</template>

<script>
    import { defineComponent, ref,reactive,toRef,toRefs } from 'vue'
export default {
    name: 'MentionModal',
    props:{
        searchVal:{//搜索值
            type:String,
            //default:'',
        },
        isFullScreen:{//是否全屏
            type:Boolean
        }
    },
    data() {
        return {
            select_index:0,
            // 定位信息
            style:'',
            // list 信息
            list: [
                { id: 'a', name: '张三' },
                { id: 'b', name: '李四' },
                { id: 'c', name: '小明' },
                { id: 'd', name: '小李' },
                { id: 'e', name: '小红' },
            ]
        }
    },
    setup(props,ctx){
        const searchVal = ref(props.searchVal);
        const isFullScreen = ref(props.isFullScreen);
        return {
           searchVal,
           isFullScreen
        }
    },
    computed: {
        //根据 <input> value 筛选 list
        searchedList() {
            const searchVal = this.searchVal.toLowerCase()
            return this.list.filter(item => {
                const name = item.name.toLowerCase()
                if (name.indexOf(searchVal) >= 0) {
                    return true
                }
                return false
            })
        }
    },
    methods: {
        insertMentionHandler(i) {
            const { id, name } = this.searchedList[i]
            this.$emit('insertMention', id, name)
            this.$emit('hideMentionModal') // 隐藏 modal
        },
        //监听键盘事件
        keyDown(e){
            let el = e || event || window.event || arguments.callee.caller.arguments[0]
            if(el && el.keyCode == 38){//向上箭头
                el.preventDefault()
                this.select_index -= 1
                if(this.select_index==-1) this.select_index = this.searchedList.length-1
                //设置滚动条的位置
                if(this.select_index>4){
                    document.getElementById('mention-list').scrollTop = (this.select_index-4)*32;
                }else{
                    document.getElementById('mention-list').scrollTop = 0
                }
            }else if(el && el.keyCode == 40){//向下箭头
                el.preventDefault()
                this.select_index += 1;
                if(this.select_index==this.searchedList.length) this.select_index = 0
                //设置滚动条的位置
                if(this.select_index>4){
                    document.getElementById('mention-list').scrollTop = (this.select_index-4)*32;
                }else{
                    document.getElementById('mention-list').scrollTop = 0
                }
            }else if(el && el.keyCode == 13){//enter键
                el.preventDefault()
                this.insertMentionHandler(this.select_index)
            }
        },
        mouseenter(i){
            this.select_index = i;
        },
        //清除监听事件
        removeEventListener(){
            document.removeEventListener('keydown', this.keyDown,false);
        }
    },
    mounted() {
        //获取光标位置
        const domSelection = document.getSelection()
        const domRange = domSelection?.getRangeAt(0)
        if (domRange == null) return
        const rect = domRange.getBoundingClientRect()

        // 定位 modal
        const top = this.isFullScreen ? rect.top + 20 : rect.top + window.scrollY - 160;
        this.style=`top:${top}px;left:${rect.left + window.scrollX + 5}px;`
        //this.$refs.input.focus
        //在body中插入元素
        let html = this.$refs.mentionModal;
        document.body.append(html);
        document.addEventListener('keydown',this.keyDown,false)
    },
    unmounted(){
        this.removeEventListener();
    }
}
</script>
<style lang="less" scoped>
.mention-modal {
    position: absolute;
    height: 162px;
    overflow-y: hidden;
    z-index: 999999999999;
    background: #FFFFFF;
    border: 0.5px solid #F0F0F0;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
}
.mention-modal input {
    width: 100px;
    outline: none;
}
.mention-modal ul {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 0;
    margin: 0;
}
.mention-modal ul li {
    list-style: none;
    cursor: pointer;
    /* padding: 5px 20px; */
    text-align: left;
    padding: 4px 82px 4px 8px;
    width: 164px;
    height: 32px;
    line-height: 24px;
}
.user-img{
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
    margin-top: -4px;
}
.on{
   background-color: #f5f5f5;
}
/*css主要部分的样式*/
/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
    width: 5px; /*对垂直流动条有效*/
    height: 10px; /*对水平流动条有效*/
}
/*定义滚动条的轨道颜色、内阴影及圆角*/
::-webkit-scrollbar-track{
    background-color: #fff;
}
/*定义滑块颜色、内阴影及圆角*/
::-webkit-scrollbar-thumb{
    border-radius: 3px;
    background-color: rgba(0,0,0,.3);
}
</style>
