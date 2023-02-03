/**
 * @description priority module entry
 * @author wangfupeng
 */


import withPriority from './plugin'
import renderElemConf from './render-elem'
import elemToHtmlConf from './elem-to-html'


const priorityModule = {
  editorPlugin: withPriority,
  renderElems: [renderElemConf],
  elemsToHtml: [elemToHtmlConf],
}

export default priorityModule
