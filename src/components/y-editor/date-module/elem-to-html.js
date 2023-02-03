/**
 * @description elem to html
 * @author wangfupeng
 */


// 生成 html 的函数
function dateToHtml(elem, childrenHtml){
  const { value = '', info = {} } = elem
  return `<span data-w-e-type="date" style="background: rgb(230, 230, 230); border-radius: 3px; padding: 2px 6px; margin: 0px 3px;"><span class="iconfont icon-sj" style="color: rgb(64, 169, 255); margin-right: 5px;"></span><span style="color: rgb(131, 202, 95);">${value}</span></span>`
}

// 配置
const conf = {
  type: 'date', // 节点 type ，重要！！！
  elemToHtml: dateToHtml,
}

export default conf
