import  emoData  from '/src/assets/emotion/diaoyong.js'
import {h,createApp} from 'vue'
import yBackgroundColor from '@/components/y-background-color/y-background-color.vue'
import { SlateEditor, SlateElement, SlateNode,SlateTransforms } from '@wangeditor/editor'
//表情菜单
class MyDropPanelMenu {                           // JS 语法

    constructor() {
        this.title = '表情'
        this.iconSvg = '<svg viewBox="0 0 1024 1024"><path d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512-230.4 512-512 512z m0-102.4c226.742857 0 409.6-182.857143 409.6-409.6S738.742857 102.4 512 102.4 102.4 285.257143 102.4 512s182.857143 409.6 409.6 409.6z m-204.8-358.4h409.6c0 113.371429-91.428571 204.8-204.8 204.8s-204.8-91.428571-204.8-204.8z m0-102.4c-43.885714 0-76.8-32.914286-76.8-76.8s32.914286-76.8 76.8-76.8 76.8 32.914286 76.8 76.8-32.914286 76.8-76.8 76.8z m409.6 0c-43.885714 0-76.8-32.914286-76.8-76.8s32.914286-76.8 76.8-76.8c43.885714 0 76.8 32.914286 76.8 76.8s-32.914286 76.8-76.8 76.8z"></path></svg>'
        this.tag = 'button'
        this.showDropPanel = true
    }

    // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
    isActive(editor) {                      // JS 语法
        return false
    }

    // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
    getValue(editor) {                               // JS 语法
        return ''
    }

    // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
    isDisabled(editor) {                     // JS 语法
        return false
    }

    // 点击菜单时触发的函数
    exec(editor, value) {                              // JS 语法
        // DropPanel menu ，这个函数不用写，空着即可
    }

    // 定义 DropPanel 内部的 DOM Element
    getPanelContentElem(editor) {                        // JS 语法
        // PS：也可以把 $list 缓存下来，这样不用每次重复创建、重复绑定事件，优化性能
        let node_arr = '';
        console.log(emoData)

        emoData.forEach((item)=>{
            node_arr += `<img class="emotion-img" title="${item.text}"  src="/src/assets/emotion/${item.name}.png">`
        })
        let clickShowDrop = (e)=>{
            console.log(e)
            const node = {  alt: "",
                            children: [{text:''}],
                            href: "",
                            src: e.target.src,
                            style: {width: '20px', height: '20px'},
                            type: "image",
                        }

            editor.insertNode(node)
            editor.move(1)
        }
        setTimeout(() => {
            let node_body_arr = document.body.querySelectorAll('.emotion-img'); //获取节点数据
            node_body_arr.forEach((d, i) => {
                d.removeEventListener('click', clickShowDrop,true); //先移除之前的监听事件，防止触发多次
                d.addEventListener('click', clickShowDrop)
            })
        }, 300)
        return `<div class="emotion-img-box">
                    ${node_arr}
               </div>`;

    }
}
export const menuEmotion = {
  key: 'emotion_menu', // 定义 menu key ：要保证唯一、不重复（重要）
  factory() {
    return new MyDropPanelMenu() // 把 `YourMenuClass` 替换为你菜单的 class
  },
}

//全屏菜单
class fullScreen {                       // JS 语法

    constructor() {
        this.title = '取消全屏' // 自定义菜单标题
        this.iconSvg = '<svg t="1663903932244" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3704" width="200" height="200"><path d="M384 323.669333V85.333333h85.333333v341.333334a42.666667 42.666667 0 0 1-42.666666 42.666666H85.333333v-85.333333h238.336L12.458667 72.874667 72.874667 12.458667 384 323.669333zM640 700.330667V938.666667h-85.333333V597.333333a42.666667 42.666667 0 0 1 42.666666-42.666666h341.333334v85.333333H700.330667l311.210666 311.125333-60.330666 60.416L640 700.330667z" fill="#000000" fill-opacity=".85" p-id="3705"></path></svg>' // 可选
        this.tag = 'button'
    }

    // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
    getValue(editor) {                              // JS 语法
        return ' hello '
    }

    // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
    isActive(editor) {                    // JS 语法
        return false
    }

    // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
    isDisabled(editor) {                     // JS 语法
        return false
    }

    // 点击菜单时触发的函数
    exec(editor, value) {                              // JS 语法
        //if (this.isDisabled(editor)) return
        editor.unFullScreen()
    }

}

export const menuFullScreen = {
  key: 'full_screen_menu', // 定义 menu key ：要保证唯一、不重复（重要）
  factory() {
    return new fullScreen() // 把 `YourMenuClass` 替换为你菜单的 class
  },
}

//颜色菜单
class ColorDropPanelMenu {                           // JS 语法

    constructor() {
        this.title = '文字颜色'
        this.iconSvg = '<svg viewBox="0 0 1024 1024"><path d="M64 864h896v96H64zM360.58 576h302.85l81.53 224h102.16L579.24 64H444.77L176.89 800h102.16l81.53-224zM512 159.96L628.49 480H395.52L512 159.96z"></path></svg>'
        this.tag = 'button'
        this.showDropPanel = true
        this.id = new Date().getTime();
    }

    // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
    isActive(editor) {                      // JS 语法
        return false
    }

    // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
    getValue(editor) {                               // JS 语法
        return ''
    }

    // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
    isDisabled(editor) {                     // JS 语法
        return false
    }

    // 点击菜单时触发的函数
    exec(editor, value) {                              // JS 语法
        // DropPanel menu ，这个函数不用写，空着即可
        setTimeout(()=>{
          //设置弹窗显示的位置，防止在最左、右边显示时被遮挡
          let dom = document.body.querySelector('#background-'+this.id).parentElement
          let rect = dom.getBoundingClientRect();
          if(rect.x < rect.width+10){
            dom.style.right = 'unset';
            dom.style.left = '-120px';
          }else{
            dom.style.left = 'unset';
          }
        },100)
    }

    // 定义 DropPanel 内部的 DOM Element
    getPanelContentElem(editor) {                        // JS 语法
        // PS：也可以把 $list 缓存下来，这样不用每次重复创建、重复绑定事件，优化性能
        const nodeEntries = SlateEditor.nodes(editor, {
            match: (node) => {          // JS syntax
                if (SlateElement.isElement(node)) {
                    if (node.type === 'paragraph') {
                        return true // 匹配 paragraph
                    }
                }
                return false
            },
            universal: true,
        })
        let selectNode;
        if (nodeEntries == null) {
            console.log('当前未选中的 paragraph')
        } else {
            for (let nodeEntry of nodeEntries) {
                const [node, path] = nodeEntry
                //获取选中节点数据
                let i = editor.selection.anchor.path[1];
                selectNode = node.children[i];
            }
        }
        let that = this;
        let app = createApp(
            h(
                yBackgroundColor,
                {
                    color:selectNode.color || '#000000',
                    background:selectNode.bgColor || 'none',
                    onOk(obj){
                        let text = editor.getSelectionText();//获取选中的值
                        editor.deleteFragment();//删除选中的节点
                        let nodes = {
                                       text:text,
                                       color:obj.color,
                                       bgColor:obj.background,
                                   }
                        editor.insertNode(nodes);//插入节点

                    }
                },
            )
        );
        setTimeout(()=>{
            app.mount('#background-'+this.id)
        },100)
        return `<div id="background-${this.id}" style="width:304px"></div>`;

    }
}
export const menuColor = {
  key: 'color_menu', // 定义 menu key ：要保证唯一、不重复（重要）
  factory() {
    return new ColorDropPanelMenu() // 把 `YourMenuClass` 替换为你菜单的 class
  },
}
