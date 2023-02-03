/**
 * @description elem to html
 * @author wangfupeng
 */


// 生成 html 的函数
function priorityToHtml(elem, childrenHtml){
  const { value = '',backgroundColor='', info = {} } = elem
  return `<span data-w-e-type="priority" style="background: ${backgroundColor}; color: rgb(255, 255, 255); border-radius: 3px; padding: 2px 6px;margin: 0 3px;">${value}</span>`

}

// 配置
const conf = {
  type: 'priority', // 节点 type ，重要！！！
  elemToHtml: priorityToHtml,
}

export default conf
