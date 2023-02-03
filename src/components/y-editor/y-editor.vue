<template>

        <div class="comment-box"  >
            <div class="editor-box">
              <Toolbar
                id="toolbar-container"
                style="border-bottom: 1px solid #ccc"
                :editor="editorRef"
                :defaultConfig="toolbarConfig"

                v-show="isFullScreen"
              />
              <Editor
                id="editor-container"
                v-model="valueHtml"
                :defaultConfig="editorConfig"
                @onCreated="handleCreated"
                @onChange="handleChange"
                @onBlur="handleBlur"
              />
              <mention-modal
                  v-if="isShowModal"
                  :top="top"
                  :left="left"
                  :searchVal="searchVal"
                  :isFullScreen="isFullScreen"
                  @hideMentionModal="hideModal"
                  @insertMention="insertMention"
              ></mention-modal>
            </div>

            <div class="comment-operation" v-show="!isFullScreen">
                <div class="comment-operation-icon">
                      <a-upload
                        name="file"
                        :showUploadList="false"
                        @change="uploadFile"
                        v-if="isUpload"
                      >
                        <a-tooltip>
                            <template #title>图片</template>
                            <span class="iconfont icon-file text-color-secondary font-size-14 margin-right-10"></span>
                        </a-tooltip>
                      </a-upload>

                    <a-popover v-if="isEmotion"  trigger="click" v-model:visible="visible">
                      <template #content>
                        <div class="emotion-img-box">
                            <img v-for="item in emoDataArr" :title="item.text"   :src="'/src/assets/emotion/'+item.name+'.png'" @click="addEmotion">
                        </div>
                      </template>
                      <a-tooltip>
                          <template #title>表情</template>
                          <span class="iconfont icon-emotion text-color-secondary font-size-14 margin-right-10"></span>
                      </a-tooltip>
                    </a-popover>
                    <a-tooltip v-if="isA">
                        <template #title>@</template>
                        <b><span class="iconfont icon-a- text-color-secondary font-size-15 margin-right-10" @click="insertNode"></span></b>
                    </a-tooltip>
                    <y-date v-if="isDate" :showTime="true" dateFormat="YYYY-MM-DD HH:mm" @confirm="insertDate">
                      <a-tooltip>
                          <template #title>截止日期</template>
                          <span class="iconfont icon-sj text-color-secondary font-size-18 margin-right-10"></span>
                      </a-tooltip>
                    </y-date>
                    <y-priority-select v-if="isPriority" @change="insertPriority">
                      <a-tooltip>
                          <template #title>优先级</template>
                          <span class="iconfont icon-yxj1 text-color-secondary font-size-18 margin-right-10"></span>
                      </a-tooltip>
                    </y-priority-select>
                    <a-tooltip>
                        <template #title>全屏</template>
                        <span class="iconfont icon-quanping text-color-secondary font-size-13 margin-right-10"  @click="fullScreen"></span>
                    </a-tooltip>
                </div>
                <a-button v-if="isButton" type="link" style="padding: 0;" @click="ok">发送</a-button>
            </div>
        </div>


</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {h, withDirectives,onBeforeUnmount, ref, shallowRef, onMounted,defineComponent, reactive, toRefs } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { DomEditor,createEditor,createToolbar, Boot,SlateText  } from '@wangeditor/editor'
import MentionModal from './MentionModal.vue'
import  emoData  from '/src/assets/emotion/diaoyong.js'


const emit = defineEmits(["ok","update:valueHtml"]);
const props = defineProps({
    valueHtml:{
      type:String,
      default:''
    },
    placeholder:{
        type:String,
        default:'请输入内容...'
    },
    isUpload:{//是否显示图片上传
        type:Boolean,
        default:true
    },
    isButton:{//是否显示发送按钮
      type:Boolean,
      default:true
    },
    isEmotion:{//是否显示表情符按钮
      type:Boolean,
      default:true
    },
    isA:{//是否显示@快捷键符号
      type:Boolean,
      default:false
    },
    isDate:{//是否显示日期快捷键按钮
      type:Boolean,
      default:false
    },
    isPriority:{//是否显示优先级快捷键按钮
      type:Boolean,
      default:false
    },
})

const emoDataArr = ref(emoData);//表情数据
const visible = ref(false);
const isFullScreen = ref(false);//是否全屏
const top = ref(0);
const left = ref(0);
const searchVal = ref('');
const isShowModal = ref(false);
const showEditor = ref(false);
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref(props.valueHtml)

// 模拟 ajax 异步获取内容
onMounted(() => {

    // setTimeout(() => {
    //     valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
    // }, 1500)

})

const toolbarConfig = reactive({
    toolbarKeys:[
        "bold",
        "underline",
        "through",
        "italic",
        // "color",
        // "bgColor",
        "color_menu",
        "clearStyle",
        "|",
        "bulletedList",
        "numberedList",
        "todo",
        {
            "key": "group-justify",
            "title": "对齐",
            "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z\"></path></svg>",
            "menuKeys": [
                "justifyLeft",
                "justifyRight",
                "justifyCenter",
                "justifyJustify"
            ]
        },
        {
            "key": "group-indent",
            "title": "缩进",
            "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M0 64h1024v128H0z m384 192h640v128H384z m0 192h640v128H384z m0 192h640v128H384zM0 832h1024v128H0z m0-128V320l256 192z\"></path></svg>",
            "menuKeys": [
                "indent",
                "delIndent"
            ]
        },
        "|",
        {
            "key": "group-image",
            "title": "图片",
            "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z\"></path></svg>",
            "menuKeys": [
                "insertImage",
                "uploadImage"
            ]
        },
        "insertLink",
        "emotion_menu",
        "undo",
        "redo",
        "|",
        "full_screen_menu",
    ],
    // insertKeys:{//插入工具菜单
    //     index: 5, // 插入的位置，基于当前的 toolbarKeys
    //     keys: ['emotion_menu']//emotion_menu为自定义的表情符菜单
    // },
    // excludeKeys:[//需要删掉的工具菜单
    //     'emotion'
    // ]
})


//添加表情
const addEmotion = (e)=> {
    visible.value = false;
    let node = {
            alt: "",
            children: [{text:' '}],
            href: "",
            src: e.target.src,
            style: {width: '20px', height: '20px'},
            type: "image",
    }
    const editor = editorRef.value
    editor.restoreSelection() // 恢复选区
    editor.insertNode(node)
    editor.move(1)
}
//全屏事件
const fullScreen = ()=>{
    const editor = editorRef.value
    editor.fullScreen()
}
// 显示弹框
const  showModal = (editor)=> {
  isShowModal.value = true
}

// 隐藏弹框
const hideModal = (editor)=> {
  // 隐藏 modal
  isShowModal.value = false
}
//@提及触发方法
const insertMention = (id, name)=> {
    const mentionNode = {
        type: 'mentions',//自定义的mentions模块
        value: name,
        info: { id },
        children: [{ text: `@${name}`}], // 必须有一个空 text 作为 children
    }
    const editor = editorRef.value

    if (editor) {
        editor.restoreSelection() // 恢复选区
        for(let i=0;i<searchVal.value.length+1;i++){
            editor.deleteBackward() // 删除 '@'
        }
        editor.insertNode(mentionNode) // 插入 mention
        editor.move(1) // 移动光标
    }
}
//@快捷键插入节点
const insertNode = ()=> {
  const editor = editorRef.value
  const node = {  text: '@' }
  editor.focus()
  setTimeout(()=>{
    editor.insertNode(node)
  },200)
}
//优先级快捷键
const insertPriority = (e)=> {
  const editor = editorRef.value
  const node = {
      type: 'priority',
      value: e.name,
      backgroundColor:e.color,
      info: { },
      children: [{ text: e.name}], // 必须有一个空 text 作为 children
  }
  editor.focus()
  editor.insertNode(node)
  editor.move(1)
}
//日期快捷键
const insertDate = (e)=> {
  let arr = e.date.split(' ');
  let dateArr = arr[0].split('-');
  let date = `${dateArr[0]}年${dateArr[1]}月${dateArr[2]}日 ${arr[1]}`;
  const editor = editorRef.value
  const node = {
      type: 'date',
      value: date,
      info: { },
      children: [{ text: date}], // 必须有一个空 text 作为 children
  }
  editor.focus()
  editor.insertNode(node)
  editor.move(1)
}
const editorConfig = {
    autoFocus:false,//是否自定聚焦
    placeholder: props.placeholder ,
    MENU_CONF: {

    },
    EXTEND_CONF: {
      mentionConfig: {

      },
    },
    hoverbarKeys:{//配置文本选中时显示的菜单
        'text':{
            menuKeys: [ 'bold', 'underline','through', 'color_menu','insertLink'],
        },
        'image': {
            // 清空 image 元素的 hoverbar
            menuKeys: [],
        }
    }

}
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor) => {
   editorRef.value = editor // 记录 editor 实例，重要！
   editor.on('fullScreen', () => {//监听全屏事件
       isFullScreen.value = true;
       editor.focus()
    })
   editor.on('unFullScreen', () => {//监听取消全屏事件
        isFullScreen.value = false;
    })
}
//获取元素内容
const getHtml = ()=> {
  const editor = editorRef.value
  const html = editor.getHtml()
  return html;
}
const getText = ()=> {
  const editor = editorRef.value
  const text = editor.getText()
  return text;
}
//点击发送事件
const ok = ()=> {
    emit('ok');
}

const handleBlur = () => {
   const editor = editorRef.value
   const toolbar = DomEditor.getToolbar(editor)
   const curToolbarConfig = toolbar.getConfig()
}
const handleChange = (editor) => {
   //获取光标位置
   setTimeout(()=>{
       const domSelection = window.getSelection()
       const domRange = domSelection?.getRangeAt(0)
       if (domRange == null) return
       console.log(editor.children)
       let text = domRange.commonAncestorContainer?.textContent;//获取当前节点的文本内容
       let i = text.lastIndexOf('@');
       console.log(domRange)
       let is_mention_node = domRange?.commonAncestorContainer?.parentNode?.style[0];//判读当前节点内容是否为@模块。
       if(i>-1 && !is_mention_node){
           let value = text.slice(i+1,domRange.endOffset);
           console.log(i,value,value.length)
           isShowModal.value = false;
           setTimeout(()=>{
                 searchVal.value = value;
                 isShowModal.value = true;
           },200)
       }else{
          isShowModal.value = false;
       }
       if(domRange.commonAncestorContainer.className){//如果光标选中是在最后且为图片的时候，自动偏移一位，不然会默认选中图片
           editor.move(1)
       }

      emit('update:valueHtml',editor.getHtml())
   },200)
}

//上传文件
const uploadFile = info => {
  if (info.file.status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === 'done') {

  } else if (info.file.status === 'error') {
        getBase64(info.file.originFileObj, base64Url => {
                  //imageUrl.value = base64Url;
                  console.log(base64Url)
                  let node = {    alt: "",
                                  children: [{text:''}],
                                  href: "",
                                  src: base64Url,
                                  style: {width: '100px'},
                                  type: "image",
                              }
                  const editor = editorRef.value
                  editor.restoreSelection() // 恢复选区
                  editor.insertNode(node)
                  editor.move(1)
        });
  }

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
};
//暴露函数，给通过ref绑定的dom元素使用
defineExpose({
  getHtml,
  getText,
})
</script>

<style  scoped>
.comment-box{
    display: flex;
    padding: 12px;
    width: 420px;
    min-height: 157px;
    background: var(--input-bg);
    /* Neutral/4 */
    border-top: 1px solid #F0F0F0;
}
.editor-box{
    /* width: calc(100% - 100px); */
    flex: 1;
}
.comment-operation{
    /* width: 90px; */
    height: 100%;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
}
.comment-operation-icon{
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    margin-top: 2px;
}
.comment-operation-icon span{
    cursor: pointer;
}
:global(.comment-box .w-e-full-screen-container){
    z-index: 999;
}
:global(.comment-box .w-e-text-container [data-slate-editor]) {
    padding: 0;
}
:global(.comment-box .w-e-text-container [data-slate-editor] .w-e-image-container){
    margin: 0;
    vertical-align: top;
}
:global(.comment-box  .w-e-text-container p){
    margin: 0 !important;
}

:global(.comment-box  .w-e-scroll::-webkit-scrollbar){
    width: 4px !important;
    height: 8px !important;
}
:global(.comment-box  .w-e-scroll::-webkit-scrollbar-thumb){
    border-radius: 5px !important;
    box-shadow: 0 0 2px #fff !important;
    background-color: #ddd !important;
}
:global(.comment-box .w-e-scroll::-webkit-scrollbar-track){
    border-radius: 0;
    box-shadow: inset 0 0 2px #fff;
}
:global(.comment-box .w-e-text-placeholder){
  top: 2px;
  left: 0px;
  font-style: unset;
  color: var(--input-placeholder-color);
}
.emotion-img-box,
:global(.comment-box .emotion-img-box){
    width: 406px;
    text-align: left;
}
.emotion-img-box img,
:global(.comment-box .emotion-img-box img){
    width: 25px;
    height: 25px;
    cursor: pointer;
    margin: 2px;
}
:global(.w-e-text-container){
  background-color:var(--modal-content-bg);
  color: var(--text-color);
}
:global(.gray-background .w-e-text-container){
    background: var(--gray-3);
}
</style>
