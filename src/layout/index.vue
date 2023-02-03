<template>
  <a-layout style="height: 100vh;">
    <a-layout-sider :width="104"  :trigger="null" collapsible >
		<yMenu :list="menus" @change="ss" v-model:darkMode="darkMode"></yMenu>
      <!-- <div class="logo" />
      <a-menu  theme="dark" mode="inline">
        <a-menu-item key="1">
          <user-outlined />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu> -->
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="ele-admin-tabs"  style="padding: 0;height: 40px;">
			<a-tabs  v-model:activeKey="activeKey" hide-add type="editable-card"  @edit="onEdit">
			  <template #leftExtra>
				  <div class="ele-admin-tabs-arrow" @click="computeTransform('left')">
					<left-outlined />
				  </div>
			  </template>
			  <a-tab-pane  v-for="pane in tabs" :key="pane.key"  :closable="pane.closable" >
				  <template #tab>
					  <a-dropdown :trigger="['contextmenu']">
						<div class="ele-admin-tab-title ant-dropdown-trigger" @click.native="onChange(pane.key)">{{pane.meta.title}}</div>
						   <template #overlay>
							 <a-menu @click="onTabContextMenu($event.key,pane.key,pane)">
								<a-menu-item key="reload">刷新当前</a-menu-item>
								<a-menu-item key="left">关闭左侧</a-menu-item>
								<a-menu-item key="right">关闭右侧</a-menu-item>
								<a-menu-item key="other">关闭其他</a-menu-item>
							  </a-menu>
							</template>
					  </a-dropdown>
				  </template>
			  </a-tab-pane>
			  <template #rightExtra>
					<div class="ele-admin-tabs-arrow" @click="computeTransform('right')">
						<right-outlined />
					</div>
					<div class="ele-admin-tabs-drop ant-dropdown-trigger" @click="openSetting">
						<span class="iconfont icon-more2" ></span>
					</div>
			  </template>
			</a-tabs>
      </a-layout-header>
      <a-layout-content
        :style="{minHeight: '280px',overflow:'scroll' }"
      >
        <!-- 路由出口 -->
        <router-layout />
      </a-layout-content>
    </a-layout>
  </a-layout>
  <!-- 主题设置抽屉 -->
  <setting-drawer v-model:visible="settingVisible" />
</template>


<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { useI18n } from 'vue-i18n';
  import { message } from 'ant-design-vue/es';
  import { toggleFullscreen, isFullscreen } from 'ele-admin-pro/es';
  import { useUserStore } from '@/store/modules/user';
  import { useThemeStore } from '@/store/modules/theme';
  import RouterLayout from '@/components/RouterLayout/index.vue';
  import HeaderTools from './components/header-tools.vue';
  import PageFooter from './components/page-footer.vue';
  import MenuTitle from './components/menu-title.vue';
  import yMenu from './components/y-menu.vue';
  import SettingDrawer from './components/setting-drawer.vue';
  import {
	LeftOutlined,
	RightOutlined,
  } from '@ant-design/icons-vue';
  import {
    HIDE_SIDEBARS,
    HIDE_FOOTERS,
    REPEATABLE_TABS,
    HOME_TITLE,
    HOME_PATH,
    LAYOUT_PATH,
    REDIRECT_PATH,
    I18N_ENABLE
  } from '@/config/setting';
  import {
    addPageTab,
    removePageTab,
    removeAllPageTab,
    removeLeftPageTab,
    removeRightPageTab,
    removeOtherPageTab,
    reloadPageTab,
    setHomeComponents
  } from '@/utils/page-tab-util';

  const { push,currentRoute } = useRouter();
  const { t, locale } = useI18n();
  const userStore = useUserStore();
  const themeStore = useThemeStore();

  // 项目名
  const projectName = import.meta.env.VITE_APP_NAME;

  // 是否全屏
  const fullscreen = ref(false);

  // 菜单数据
  const { menus,homePath } = storeToRefs(userStore);

  // 布局风格
  const {
	darkMode,
    tabs,
    collapse,
    sideNavCollapse,
    bodyFullscreen,
    showTabs,
    showFooter,
    headStyle,
    sideStyle,
    layoutStyle,
    sideMenuStyle,
    tabStyle,
    fixedHeader,
    fixedSidebar,
    fixedBody,
    bodyFull,
    logoAutoSize,
    colorfulIcon,
    sideUniqueOpen
  } = storeToRefs(themeStore);

  /* 侧栏折叠切换 */
  const updateCollapse = (value) => {
    themeStore.setCollapse(value);
  };

  /* 双侧栏一级折叠切换 */
  const updateSideNavCollapse = (value) => {
    themeStore.setSideNavCollapse(value);
  };

  /* 内容区域全屏切换 */
  const updateBodyFullscreen = (value) => {
    themeStore.setBodyFullscreen(value);
  };

  /* logo 点击事件 */
  const onLogoClick = (isHome) => {
    isHome || push(LAYOUT_PATH);
  };

  /* 监听屏幕尺寸改变 */
  const screenSizeChange = () => {
    themeStore.updateScreenSize();
    fullscreen.value = isFullscreen();
  };

  /* 全屏切换 */
  const onFullscreen = () => {
	  console.log(111,tabs.value)
    try {
      fullscreen.value = toggleFullscreen();
    } catch (e) {
      message.error('您的浏览器不支持全屏模式');
    }
  };

  /* 页签右键菜单点击事件 */
  const onTabContextMenu = ( key, tabKey,item) => {
	const tabKey_i = tabs.value.findIndex((t) => t.key === tabKey || t.fullPath === tabKey);//当前点击目标的下标值
	const active_i = tabs.value.findIndex((t) => t.key === activeKey.value || t.fullPath === activeKey.value);//当前打开标签页的下标值
    switch (key) {
      case 'reload': // 刷新
        reloadPageTab({
          isHome: !item,
          fullPath: item?.fullPath ?? tabKey
        });
		activeKey.value = tabKey;
        break;
      // case 'close': // 关闭当前
      //   removePageTab({
      //     key: item?.fullPath ?? tabKey,
      //     active:activeKey.value
      //   });
      //   break;
      case 'left': // 关闭左侧
        removeLeftPageTab({
          key: tabKey,
          active:activeKey.value
        });
		if(tabKey_i > active_i) activeKey.value = tabKey;
        break;
      case 'right': // 关闭右侧
        removeRightPageTab({
          key: tabKey,
          active:activeKey.value
        });
		if(tabKey_i < active_i) activeKey.value = tabKey;
        break;
      case 'other': // 关闭其他
        removeOtherPageTab({
          key: tabKey,
          active:activeKey.value
        });
		activeKey.value = tabKey;
        break;
    }
  };

  /* 菜单标题国际化 */
  const i18n = (_path, key) => {
    if (!I18N_ENABLE || !key) {
      return;
    }
    const k = 'route.' + key + '._name';
    const title = t(k);
    if (title !== k) {
      return title;
    }
  };



  console.log(77,menus,homePath)
  const homeObj = {//工作台标签页数据
	  closable:false,
	  fullPath: "/dashboard/workplace",
	  key: "/dashboard/workplace",
	  meta:{
		  title:"工作台"
	  },
	  path: "/dashboard/workplace"
  }
  addPageTab(homeObj)
  if(currentRoute.value.path != homeObj.path){//最后打开的不是工作台标签页就插入进去
	  currentRoute.value.key = currentRoute.value.path;
	  currentRoute.value.closable = true;
	  addPageTab(currentRoute.value)
  }
  const activeKey = ref(tabs.value[tabs.value.length-1].key);
  const ss = (item)=>{
	  item.key = item.path;
	  item.fullPath = item.path;
	  item.closable = true;
	  activeKey.value = item.key;
	  addPageTab(item)
	  console.log(333,tabs.value)
  }
  const onChange = (key)=>{
	  console.log(key)
	  activeKey.value = key
	  push(key);
  }

	const onEdit = targetKey => {
		const i = tabs.value.findIndex((t) => t.key === targetKey || t.fullPath === targetKey);
		const path = tabs.value[i - 1]?.fullPath;
		removePageTab({ key: targetKey,active:activeKey.value});
		if(targetKey==activeKey.value) activeKey.value = path;
	};

	// 是否显示主题设置抽屉
	const settingVisible = ref(false);
	/* 打开主题设置抽屉 */
	const openSetting = () => {
	  settingVisible.value = true;
	};
	//标签页左右点击滚动事件
	const computeTransform = (type) => {
		const offsetWidth = document.body.querySelector(".ele-admin-tabs .ant-tabs-nav-list").offsetWidth;
		const parentWidth = document.body.querySelector(".ele-admin-tabs .ant-tabs-nav-wrap").offsetWidth;
		const maxTransform = parentWidth - offsetWidth;//获取最右边的偏移量
		const transform = document.body.querySelector(".ele-admin-tabs .ant-tabs-nav-list").style.transform;
		const arr = transform.match(/\((\S*)p/);//截取偏移量数据
		const num = Number(arr[1]);
		let value;
		if(type=='left'){
			value = num+100<0 ? num+100 : 0;
		}else{
			value = num-100>maxTransform ? num-100 : (maxTransform > 0 ? 0 : maxTransform);
		}
		console.log(num,maxTransform)
		document.body.querySelector(".ele-admin-tabs .ant-tabs-nav-list").style.transform = `translate(${value}px, 0px)`
	}
</script>

<script>
  import * as MenuIcons from './menu-icons';

  export default {
    name: 'EleLayout',
    components: MenuIcons
  };
</script>

<style lang="less">
  // 侧栏菜单徽章样式，定位在右侧垂直居中并调小尺寸
  .ele-menu-badge {
    position: absolute;
    top: 50%;
    right: 14px;
    line-height: 1;
    margin-top: -9px;
    font-size: 0;

    .ant-badge-count {
      height: 18px;
      line-height: 18px;
      border-radius: 9px;
      box-shadow: none;
      min-width: 18px;
      padding: 0 4px;
    }

    .ant-scroll-number-only {
      height: 18px;

      & > p.ant-scroll-number-only-unit {
        height: 18px;
      }
    }
  }

  // 父级菜单标题中右侧多定位一点，避免与箭头重合
  .ant-menu-submenu-title > .ant-menu-title-content .ele-menu-badge {
    right: 36px;
  }

  // 折叠悬浮中样式调整
  .ant-menu-submenu-popup {
    .ant-menu-submenu-title > .ant-menu-title-content .ele-menu-badge {
      right: 30px;
    }
  }

  // 顶栏菜单标题中样式调整
  .ele-admin-header-nav > .ant-menu {
    & > .ant-menu-item,
    & > .ant-menu-submenu > .ant-menu-submenu-title {
      & > .ant-menu-title-content .ele-menu-badge {
        position: static;
        right: auto;
        top: auto;
        display: inline-block;
        vertical-align: 5px;
        margin: 0 0 0 4px;
      }
    }
  }

  // 双侧栏时一级侧栏菜单中样式调整，定位在右上角
  .ele-admin-sidebar-nav-menu > .ant-menu {
    & > .ant-menu-item,
    & > .ant-menu-submenu > .ant-menu-submenu-title {
      & > .ant-menu-title-content .ele-menu-badge {
        top: 0;
        right: 0;
        margin: 0;
      }
    }
  }

  // 双侧栏时一级侧栏菜单折叠后样式调整
  .ele-admin-nav-collapse .ele-admin-sidebar-nav-menu > .ant-menu {
    & > .ant-menu-item,
    & > .ant-menu-submenu > .ant-menu-submenu-title {
      & > .ant-menu-title-content .ele-menu-badge {
        top: 0;
        right: 0;
      }
    }
  }

  // 菜单折叠后在 tooltip 中不显示徽章
  .ant-tooltip-inner .ele-menu-badge {
    display: none;
  }
</style>
