import { DomEditor } from '@wangeditor/editor'
import { h } from 'snabbdom'

/**
 * 渲染“附件”元素到编辑器
 * @param elem 附件元素，即上文的 myResume
 * @param children 元素子节点，void 元素可忽略
 * @param editor 编辑器实例
 * @returns vnode 节点（通过 snabbdom.js 的 h 函数生成）
 */

function renderDate(elem, children, editor) { // JS 语法
  const selected = DomEditor.isNodeSelected(editor, elem)
  const { value = '' ,} = elem
  const vnode = h(
    'span',
    {
      props: {
        contentEditable: false, // 不可编辑
      },
      style: {
        background:'#e6e6e6',
        whiteSpace: 'nowrap',
        borderRadius: '3px',
        padding: '2px 6px',
        margin: '0 3px',
      },
    },
    [ h(
        'span',
        {
          className: 'iconfont icon-sj',
          style: {
            color:'#40a9ff',
            marginRight:'5px'
          },
        },
      ),
      h(
        'span',
        {
          style: {
            color:'#83ca5f',
          },
        },
        value // 如 `@张三`
      )
    ]
  )
  return vnode
}
const renderDateElemConf = {
  type: 'date', // 新元素 type ，重要！！！
  renderElem: renderDate,
}
export default renderDateElemConf
