/**
 * @description mention module entry
 * @author wangfupeng
 */


import withMention from './plugin'
import renderElemConf from './render-elem'
import elemToHtmlConf from './elem-to-html'


const mentionModule = {
  editorPlugin: withMention,
  renderElems: [renderElemConf],
  elemsToHtml: [elemToHtmlConf],
}

export default mentionModule
