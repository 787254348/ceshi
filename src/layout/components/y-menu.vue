<template>
  <div class="y-menu" style="width:104px" :style="'background:'+(darkMode ? 'var(--component-background)' : '#f5f5f5')">
     <div class="y-meun-logo">
         <img :src="miniLogo" height="20">
     </div>
     <a-menu
        style="height:100%;width:80px;"
		:style="'background:'+(darkMode ? 'var(--component-background)' : '#f5f5f5')"
        mode="vertical"
        triggerSubMenuAction="hover"
        :inline-collapsed="collapsed"
      >
        <a-sub-menu class="y-menu-after" :popupOffset="[12,0]" v-for="(item,i) in list" :key="i" >
			<template #title>
				<div class="y-menu-title-content-box" @click="handleClick(item)">
					<!-- <span class="iconfont margin-right-5" :class="item.meta.icon"></span> -->
					<span class="iconfont margin-right-5 icon-check-circle"></span>
					<span class="y-menu-title-content-box-name">{{item.meta.title}}</span>
				</div>
			</template>

          <div class="y-menu-box" style="min-height:180px" :style="'max-height:'+childrenMenuHeight+'px;background:'+(darkMode ? 'var(--popover-bg)' : '#fff')" v-if="item.children">

              <div class="y-menu-content-box">
                  <div class="y-menu-content" v-for="(childrenItem) in item.children">
                      <div class="y-menu-item" @click="add(childrenItem,i)">
                          <div>
                              <span class="iconfont margin-right-5 icon-top gray icon-check-circle"></span>
                              <span>{{childrenItem.meta.title}}</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </a-sub-menu>
      </a-menu>
      <!-- 用户头像 -->
    <div class="y-meun-user margin-top-10">
        <a-popover placement="rightBottom" trigger="click" v-model:visible="userVisible">
          <template #title>
            <div class="space-between margin-5" style="min-width: 210px;">
                <div style="display: flex;">
                    <img class="margin-right-5" :src="userAvatar" height="40" width="40">
                    <div>
                        <div>姓名</div>
                        <div class="icon-gray">公司名称</div>
                    </div>
                </div>
                <span class="iconfont icon-youfanhui icon-gray font-size-12"></span>
            </div>
          </template>
          <template #content>
            <div class="space-between padding-5 pointer">
                <div>
                    <span class="iconfont icon-swap margin-right-5 icon-top"></span>
                    <span>切换企业/账套</span>
                </div>
                <span class="iconfont icon-youfanhui icon-gray font-size-12"></span>
            </div>
            <div class="space-between padding-5 pointer" @click="onLogout">
                <div>
                    <span class="iconfont icon-tuichuLogout margin-right-5 icon-top"></span>
                    <span>安全退出</span>
                </div>
                <span class="iconfont icon-youfanhui icon-gray font-size-12"></span>
            </div>
          </template>
          <img :src="userAvatar" height="40" width="40">
        </a-popover>
    </div>

  </div>
</template>
<script>
import { defineComponent, reactive, toRefs,ref,createVNode } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useThemeStore } from '@/store/modules/theme';
import { logout } from '@/utils/page-tab-util';
import { Modal } from 'ant-design-vue/es';
import {
    ExclamationCircleOutlined,
} from '@ant-design/icons-vue';
import { useI18n } from 'vue-i18n';
// let list_arr = [

//     {
//         id:2,name:'菜单2',icon:'icon-check-circle',quick_data:[],
//             children:[
//                 {
//                     title:'菜单2-1',
//                     data:[{id:3,name:'菜单2-1-1',icon:'icon-check-circle'},{id:4,name:'菜单2-1-2',icon:'icon-check-circle'}],
//                 },
//                 {
//                     title:'菜单2-2',
//                     data:[{id:5,name:'菜单2-2-1',icon:'icon-check-circle'},{id:6,name:'菜单2-2-2',icon:'icon-check-circle'}],
//                 },
//                 {
//                     title:'菜单2-3',
//                     data:[{id:7,name:'菜单2-3-1',icon:'icon-check-circle'},{id:8,name:'菜单2-3-2',icon:'icon-check-circle'}],
//                 }
//             ]

//     },
//     {
//         id:1,name:'菜单1',icon:'icon-check-circle',quick_data:[],children:[]
//     },
// ]
// for(let i=100;i<117;i++){
//     let obj ={
//         id:i,name:'菜单'+i,quick_data:[],children:[]
//     }
//     list_arr.push(obj)
// }
// for(let i=9;i<30;i++){
//     let obj ={
//         id:i,name:'菜单2-1-'+i
//     }
//     list_arr[0].quick_data.push(obj)
//     list_arr[0].children[0].data.push(obj)
//     for(let j=1;j<19;j++){
//         list_arr[j].quick_data.push(obj)
//     }

// }
export default defineComponent({
  props:{
      miniLogo:{//收起来之后的logo
          type:String,
          default:'/src/assets/yby_logo1.png'
      },
      userAvatar:{//用户头像
          type:String,
          default:'/src/assets/user.png'
      },
      list:{//菜单列表数据
          type: Array,
          default () {
              return[]
          }
      }
  },
  setup(props,ctx) {
	const { t } = useI18n();
	const { push } = useRouter();
    const userAvatar = ref(props.userAvatar);//用户头像
    const childrenMenuHeight = ref(document.body.scrollHeight - 100);//子菜单栏的高度
	const themeStore = useThemeStore();
	const {darkMode} = storeToRefs(themeStore);//是否黑暗模式
    const userVisible = ref(false);//是否展开用户信息弹出
    const list = ref(props.list);//列表数据
    const collapsed = ref(true);//菜单是否收起状态
    const handleClick = menuInfo => {
      console.log('click ', menuInfo);
    };
    //添加标签页
    const add = (item,i) => {
      console.log(111,item)
      push(item.path);
       ctx.emit('change',item);
    }
	//退出登陆
	const onLogout = () =>{
		userVisible.value = false;
		// 退出登录
		Modal.confirm({
		  title: t('layout.logout.title'),
		  content: t('layout.logout.message'),
		  icon: createVNode(ExclamationCircleOutlined),
		  maskClosable: true,
		  onOk: () => {
		    logout();
		  }
		});
	}
    return {
      userAvatar,
      childrenMenuHeight,
      handleClick,
      userVisible,
      list,
      add,
	  darkMode,
	  onLogout
    };
  },

});
</script>
<style lang="less" scoped>
	:deep(.ant-menu-vertical .ant-menu-submenu){
		padding: 2px 0 5px;
		margin: 5px 0;
	}
    :deep(.ant-menu-submenu-arrow){
        display: none;
    }
    :deep(.ant-menu){
        border-right: none;
    }
    :deep(.ant-menu-vertical .ant-menu-submenu-title){
        padding-right: 16px;
    }
    :deep(.ant-menu-vertical.ant-menu-sub:not([class*='-active'])){
        overflow-x: auto !important;
    }
    :deep(.ant-menu-submenu > .ant-menu) {
        border-radius: 0px !important;
    }
    .y-menu{
        min-height: 100vh;
        height: 100vh;
        display: flex;
        flex-direction: column;
        padding: 12px;
    }
    .y-meun-user,
    .y-meun-logo{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        cursor: pointer;
        flex-shrink: 0;
		margin-bottom: 12px;
    }
    :deep(.y-menu-after){
        border-radius: 5px;
    }
	:deep(.ant-menu-submenu-title:active){
	    background: var(--primary-color);
	}
    :deep(.y-menu-after:hover){
        background: var(--primary-color);
        border-radius: 5px;
    }
    :deep(.ant-menu-light .ant-menu-submenu-title:hover){
        color:#fff;
    }
	.y-menu-title-content-box{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		line-height: 22px !important;
	}
	.y-menu-title-content-box-name{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 80px;
		display: block;
		text-align: center;
	}
    .y-menu-box{
         display: flex;
         background: #fff;
         color: var(--text-color);
         padding: 10px 0;
    }
    .y-menu-content-box{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        writing-mode: vertical-lr;
    }
    .y-menu-content{
         display: flex;
         flex-direction: column;
         flex-wrap: wrap;
         writing-mode: horizontal-tb;
    }
    .y-menu-item-title,
    .y-menu-item{
         width: 160px;
         line-height: 40px;
         writing-mode: horizontal-tb;
         padding:0 20px;
         display: flex;
         justify-content: space-between;
    }
    .y-menu-item:hover {
      color: var(--primary-color);
      cursor: pointer;
      .iconfont{
          color: var(--primary-color) !important;
      }
    }
    .blod{
        font-weight: bold;
    }
    .pointer{
       cursor: pointer;
    }
    // .y-menu-box .iconfont{
    //     position: relative;
    //     top: 1px;
    //     color: rgba(0, 0, 0, 0.48);
    // }
    .y-menu-box .gray{
        color:#D9D9D9;
    }
    .icon-top{
        position: relative;
        top: 1px;
    }
    .icon-gray{
        color:#c7c7c7
    }
    .margin-right-5{
        margin-right: 5px;
    }
    .margin-5{
        margin: 5px 0;
    }
    .padding-5{
        padding: 5px 0;
    }
    .margin-top-10{
        margin-top: 10px;
    }
    .main-color{
        color: var(--primary-color) !important;
    }
    .font-size-12{
        font-size: 12px;
    }
    .y-menu-expend{
        height: auto;
        display: flex;
        align-items: center;
        border-left: 1px solid rgba(0, 0, 0, 0.06);
    }
    .y-menu-expend span{
        display: inline-block;
        vertical-align: middle;
        width: 10px;
        height: 55px;
        position: relative;
        text-align: center;
        background: #D9D9D9;
        border-radius: 0 20px 20px 0;
        cursor: pointer;
        color: rgba(0, 0, 0, 0.45);
        line-height: 55px;
    }
    // 拖动常用应用效果样式
    .ghost {
      // color:var(--primary-color) !important;
    }

    .chosenClass {
      // background-color: #f1f1f1 !important;
    }
    .space-between{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
