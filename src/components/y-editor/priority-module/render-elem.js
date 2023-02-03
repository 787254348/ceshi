import { DomEditor } from '@wangeditor/editor'
import { h } from 'snabbdom'

/**
 * 渲染“附件”元素到编辑器
 * @param elem 附件元素，即上文的 myResume
 * @param children 元素子节点，void 元素可忽略
 * @param editor 编辑器实例
 * @returns vnode 节点（通过 snabbdom.js 的 h 函数生成）
 */

function renderPriority(elem, children, editor) { // JS 语法
  const selected = DomEditor.isNodeSelected(editor, elem)
  const { value = '' ,backgroundColor=''} = elem
  // 构建 vnode
  const vnode = h(
    'span',
    {
      props: {
        contentEditable: false, // 不可编辑
      },
      style: {
        background:backgroundColor,
        whiteSpace: 'nowrap',
        color:'#fff',
        borderRadius: '3px',
        padding: '2px 6px',
        margin: '0 3px',
      },
    },
    value // 如 `@张三`
  )
  return vnode
}
const renderPriorityElemConf = {
  type: 'priority', // 新元素 type ，重要！！！
  renderElem: renderPriority,
}
export default renderPriorityElemConf
