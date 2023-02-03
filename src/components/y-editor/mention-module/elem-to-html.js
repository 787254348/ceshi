/**
 * @description elem to html
 * @author wangfupeng
 */


// 生成 html 的函数
function mentionToHtml(elem, childrenHtml){
  const { value = '', info = {} } = elem
  const infoStr = encodeURIComponent(JSON.stringify(info))
  return `<span data-w-e-type="mentions" style="color: rgb(64, 169, 255);border-radius: 3px; padding: 0px 3px 0px 0px;" data-value="${value}" data-info="${infoStr}">@${value}</span>`

}

// 配置
const conf = {
  type: 'mentions', // 节点 type ，重要！！！
  elemToHtml: mentionToHtml,
}

export default conf
