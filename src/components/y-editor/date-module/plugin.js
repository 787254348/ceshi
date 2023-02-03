import { DomEditor } from '@wangeditor/editor'



const  withDate = (editor)=> {                        // JS 语法
  const { isInline, isVoid } = editor
  const newEditor = editor

  newEditor.isInline = elem => {
    const type = DomEditor.getNodeType(elem)
    if (type === 'date') return true // 针对 type: attachment ，设置为 inline
    return isInline(elem)
  }

  newEditor.isVoid = elem => {
    const type = DomEditor.getNodeType(elem)
    if (type === 'date') return true // 针对 type: attachment ，设置为 void
    return isVoid(elem)
  }

  return newEditor // 返回 newEditor ，重要！！！
}

export default withDate
