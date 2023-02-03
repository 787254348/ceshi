//富文本编辑器自定义模块注册
import { DomEditor,createEditor,createToolbar, Boot,SlateText  } from '@wangeditor/editor'
import {menuEmotion,menuFullScreen,menuColor} from './menu.js'
import mentionModule from './mention-module/index.js'
import priorityModule from './priority-module/index.js'
import dateModule from './date-module/index.js'
// 注册。要在创建编辑器之前注册，且只能注册一次，不可重复注册。
const Module = {
    ...mentionModule,//注册其他插件等模块
    menus:[menuEmotion,menuFullScreen,menuColor],//注册表情符，全屏,颜色工具栏
}
Boot.registerModule(Module)
Boot.registerModule(priorityModule)
Boot.registerModule(dateModule)
