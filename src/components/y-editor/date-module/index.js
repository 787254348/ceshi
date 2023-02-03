/**
 * @description date module entry
 * @author wangfupeng
 */


import withDate from './plugin'
import renderElemConf from './render-elem'
import elemToHtmlConf from './elem-to-html'


const dateModule = {
  editorPlugin: withDate,
  renderElems: [renderElemConf],
  elemsToHtml: [elemToHtmlConf],
}

export default dateModule
