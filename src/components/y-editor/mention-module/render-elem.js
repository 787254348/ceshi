import { DomEditor } from '@wangeditor/editor'
import { h } from 'snabbdom'

/**
 * 渲染“附件”元素到编辑器
 * @param elem 附件元素，即上文的 myResume
 * @param children 元素子节点，void 元素可忽略
 * @param editor 编辑器实例
 * @returns vnode 节点（通过 snabbdom.js 的 h 函数生成）
 */

function renderMentions(elem, children, editor) { // JS 语法
  const selected = DomEditor.isNodeSelected(editor, elem)
  const { value = '' } = elem
  // 构建 vnode
  const vnode = h(
    'span',
    {
      props: {
        contentEditable: false, // 不可编辑
      },
      style: {
        // marginLeft: '3px',
        // marginRight: '3px',
        color:'#40a9ff',
        border: selected // 选中/不选中，样式不一样
          ? '1px solid #40a9ff' // wangEditor 提供了 css var https://www.wangeditor.com/v5/theme.html
          : '1px solid transparent',
        borderRadius: '3px',
        padding: '0 3px 0 0',
      },
    },
    `@${value}` // 如 `@张三`
  )
  return vnode
}
const renderMentionsElemConf = {
  type: 'mentions', // 新元素 type ，重要！！！
  renderElem: renderMentions,
}
export default renderMentionsElemConf
