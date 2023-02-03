<!-- 主题设置抽屉 -->
<template>
  <a-drawer
    :width="280"
    :visible="visible"
    :body-style="{ padding: 0 }"
    :header-style="{
      position: 'absolute',
      top: '16px',
      right: 0,
      padding: 0,
      background: 'none'
    }"
    :z-index="1001"
    @update:visible="updateVisible"
  >
    <div :class="['ele-setting-wrapper', { 'ele-setting-dark': darkMode }]">
      <div class="ele-setting-title">{{ t('layout.setting.title') }}</div>


      <!-- 主题色 -->
      <div class="ele-setting-colors">
        <div
          v-for="item in themes"
          :key="item.name"
          :style="{ 'background-color': item.color || item.value }"
          class="ele-setting-color-item"
          @click="updateColor(item.value)"
        >
          <check-outlined v-if="item.value ? item.value === color : !color" />
          <a-tooltip :title="t('layout.setting.colors.' + item.name)">
            <div class="ele-setting-color-tooltip"></div>
          </a-tooltip>
        </div>
        <!-- 颜色选择器 -->
        <ele-color-picker
          v-model:value="colorValue"
          :predefine="predefineColors"
          custom-class="ele-setting-color-picker"
          @change="updateColor"
        />
      </div>
      <!-- 暗黑模式 -->
      <div class="ele-setting-item">
        <div class="setting-item-title">{{ t('layout.setting.darkMode') }}</div>
        <div class="setting-item-control">
          <a-switch size="small" :checked="darkMode" @change="updateDarkMode" />
        </div>
      </div>
      <a-divider />
	  <!-- 页面切换动画 -->
      <!-- 切换动画 -->
      <div class="ele-setting-item">
        <div class="setting-item-title">
          {{ t('layout.setting.transitionName') }}
        </div>
        <div class="setting-item-control">
          <a-select
            size="small"
            :value="transitionName"
            style="width: 100px"
            @change="updateTransitionName"
          >
            <a-select-option value="slide-right">
              {{ t('layout.setting.transitions.slideRight') }}
            </a-select-option>
            <a-select-option value="slide-bottom">
              {{ t('layout.setting.transitions.slideBottom') }}
            </a-select-option>
            <a-select-option value="zoom-in">
              {{ t('layout.setting.transitions.zoomIn') }}
            </a-select-option>
            <a-select-option value="zoom-out">
              {{ t('layout.setting.transitions.zoomOut') }}
            </a-select-option>
            <a-select-option value="fade">
              {{ t('layout.setting.transitions.fade') }}
            </a-select-option>
          </a-select>
        </div>
      </div>
      <!-- 提示 -->
      <a-divider />
<!--      <a-alert show-icon type="warning" :message="t('layout.setting.tips')">
        <template #icon>
          <sound-outlined />
        </template>
      </a-alert> -->
      <!-- 重置 -->
      <a-button block type="dashed" @click="resetSetting">
        {{ t('layout.setting.reset') }}
      </a-button>
    </div>
  </a-drawer>
</template>

<script setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { storeToRefs } from 'pinia';
  import { message } from 'ant-design-vue/es';
  import { CheckOutlined, SoundOutlined } from '@ant-design/icons-vue';
  import { messageLoading } from 'ele-admin-pro/es';
  import { useThemeStore } from '@/store/modules/theme';

  defineProps({
    // drawer 是否显示, v-model
    visible: Boolean
  });

  const emit = defineEmits(['update:visible']);

  const { t } = useI18n();
  const themeStore = useThemeStore();

  const {
    showTabs,
    showFooter,
    headStyle,
    sideStyle,
    layoutStyle,
    sideMenuStyle,
    tabStyle,
    transitionName,
    fixedHeader,
    fixedSidebar,
    fixedBody,
    bodyFull,
    logoAutoSize,
    colorfulIcon,
    sideUniqueOpen,
    weakMode,
    darkMode,
    color
  } = storeToRefs(themeStore);

  // 主题列表
  const themes = ref([
    {
      name: 'default',
      color: '#1890ff'
    },
    {
      name: 'dust',
      value: '#5f80c7'
    },
    {
      name: 'sunset',
      value: '#faad14'
    },
    {
      name: 'volcano',
      value: '#f5686f'
    },
    {
      name: 'purple',
      value: '#9266f9'
    },
    {
      name: 'green',
      value: '#33cc99'
    },
    {
      name: 'geekblue',
      value: '#32a2d4'
    }
  ]);

  // 颜色选择器预设颜色
  const predefineColors = ref([
    '#f5222d',
    '#fa541c',
    '#fa8c16',
    '#faad14',
    '#a0d911',
    '#52c41a',
    '#13c2c2',
    '#2f54eb',
    '#722ed1',
    '#eb2f96'
  ]);

  // 颜色选择器选中颜色
  const colorValue = ref(void 0);

  const updateVisible = (value) => {
    emit('update:visible', value);
  };

  const updateShowTabs = (value) => {
    themeStore.setShowTabs(value);
  };

  const updateShowFooter = (value) => {
    themeStore.setShowFooter(value);
  };

  const updateHeadStyle = (value) => {
    themeStore.setHeadStyle(value);
  };

  const updateSideStyle = (value) => {
    themeStore.setSideStyle(value);
  };

  const updateLayoutStyle = (value) => {
    themeStore.setLayoutStyle(value);
  };

  const updateSideMenuStyle = (value) => {
    themeStore.setSideMenuStyle(value ? 'mix' : 'default');
  };

  const updateTabStyle = (value) => {
    themeStore.setTabStyle(value);
  };

  const updateTransitionName = (value) => {
    themeStore.setTransitionName(value);
  };

  const updateFixedHeader = (value) => {
    themeStore.setFixedHeader(value);
  };

  const updateFixedSidebar = (value) => {
    themeStore.setFixedSidebar(value);
  };

  const updateFixedBody = (value) => {
    themeStore.setFixedBody(value);
  };

  const updateBodyFull = (value) => {
    themeStore.setBodyFull(!value);
  };

  const updateLogoAutoSize = (value) => {
    themeStore.setLogoAutoSize(value);
  };

  const updateColorfulIcon = (value) => {
    themeStore.setColorfulIcon(value);
  };

  const updateSideUniqueOpen = (value) => {
    themeStore.setSideUniqueOpen(value);
  };

  const updateWeakMode = (value) => {
    themeStore.setWeakMode(value);
  };

  const updateDarkMode = (value) => {
    doWithLoading(() => themeStore.setDarkMode(value));
  };

  const updateColor = (value) => {
    doWithLoading(() => themeStore.setColor(value));
  };

  const resetSetting = () => {
    doWithLoading(() => themeStore.resetSetting());
  };

  const doWithLoading = (fun) => {
    const hide = messageLoading('正在加载主题..', 0);
    setTimeout(() => {
      fun()
        .then(() => {
          hide();
          initColorValue();
        })
        .catch((e) => {
          hide();
          console.error(e);
          message.error('主题加载失败');
        });
    }, 0);
  };

  const initColorValue = () => {
    if (color?.value && !themes.value.some((t) => t.value === color.value)) {
      colorValue.value = color.value;
    } else {
      colorValue.value = void 0;
    }
  };

  initColorValue();
</script>

<style lang="less">
  .ele-setting-wrapper {
    padding: 20px 18px;

    .ele-setting-title {
      font-size: 13px;
      margin-bottom: 15px;
    }

    /* 主题风格 */
    .ele-setting-theme > div {
      width: 52px;
      height: 36px;
      line-height: 1;
      border-radius: 3px;
      margin: 0 20px 30px 0;
      padding: 16px 0 0 26px;
      box-sizing: border-box;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
      display: inline-block;
      vertical-align: top;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      transition: background-color 0.2s;

      &:before,
      &:after,
      & > .ele-bg-primary {
        content: '';
        width: 100%;
        height: 10px;
        background: #fff;
        position: absolute;
        left: 0;
        top: 0;
        transition: background-color 0.2s;
      }

      &:after {
        width: 14px;
        height: 100%;
      }

      &.ele-side-dark:after,
      &.ele-head-dark:before,
      &.ele-layout-mix:before,
      &.ele-layout-mix:after {
        background: #001529;
      }

      &.ele-head-light:before,
      &.ele-head-dark:before,
      & > .ele-bg-primary {
        z-index: 1;
      }

      &.ele-layout-top {
        padding-left: 19px;

        &:after {
          display: none;
        }
      }
    }

    /* 主题色选择 */
    .ele-setting-colors {
      color: #fff;
      margin-bottom: 20px;
    }

    .ele-setting-color-item {
      width: 20px;
      height: 20px;
      line-height: 20px;
      border-radius: 2px;
      margin: 8px 8px 0 0;
      display: inline-block;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
      vertical-align: top;
      position: relative;
      text-align: center;
      cursor: pointer;

      .ele-setting-color-tooltip {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }

    /* 主题配置项 */
    .ele-setting-item {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      .setting-item-title {
        flex: 1;
        line-height: 28px;
      }

      .setting-item-control {
        line-height: 1;
      }
    }

    .ant-divider {
      margin-bottom: 20px;
    }

    .ant-alert + .ant-btn {
      margin-top: 12px;
    }

    /* 暗黑模式 */
    &.ele-setting-dark .ele-setting-theme > div {
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.55);

      &:before,
      &:after,
      & > .ele-bg-primary {
        background: #1f1f1f;
      }

      &.ele-side-dark:after,
      &.ele-head-dark:before,
      &.ele-layout-mix:before,
      &.ele-layout-mix:after {
        background: #262626;
      }
    }
  }

  /* 颜色选择器 */
  .ele-setting-color-picker.ele-color-picker-trigger {
    padding: 0;
    width: 20px;
    height: 20px;
    margin-top: 8px;
    border: none !important;
    background: none !important;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);

    & > .ele-color-picker-trigger-inner {
      background: none;

      &.is-empty {
        background: conic-gradient(
          from 90deg at 50% 50%,
          rgb(255, 0, 0) -19.41deg,
          rgb(255, 0, 0) 18.76deg,
          rgb(255, 138, 0) 59.32deg,
          rgb(255, 230, 0) 99.87deg,
          rgb(20, 255, 0) 141.65deg,
          rgb(0, 163, 255) 177.72deg,
          rgb(5, 0, 255) 220.23deg,
          rgb(173, 0, 255) 260.13deg,
          rgb(255, 0, 199) 300.69deg,
          rgb(255, 0, 0) 340.59deg,
          rgb(255, 0, 0) 378.76deg
        );

        & + .ele-color-picker-trigger-arrow {
          display: none;
        }
      }
    }
  }
</style>
