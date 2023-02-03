<template>
  <ele-config-provider
    :map-key="MAP_KEY"
    :locale="eleLocale"
    :keep-alive="keepAlive"
    :license="LICENSE_CODE"
  >
    <a-config-provider :locale="antLocale">
      <router-view />
    </a-config-provider>
  </ele-config-provider>
</template>

<script setup>
  import { unref, computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useThemeStore } from '@/store/modules/theme';
  import { MAP_KEY, LICENSE_CODE, TAB_KEEP_ALIVE } from '@/config/setting';
  import { useSetDocumentTitle } from '@/utils/document-title-util';
  import { watermark } from '@/utils/watermark';
  import { watermarkSetStore } from '@/store/modules/watermark-set'
  import { useLocale } from '@/i18n/use-locale';
  //表格中文化
  // import zhMessages from "devextreme/localization/messages/zh.json";
  import zhMessages from "@/i18n/zh.json";
  import {
  		locale,
  		loadMessages
  } from "devextreme/localization";

	loadMessages(zhMessages);
	locale(navigator.language);
  //添加水印
  const watermarkSet = watermarkSetStore()
  const { info,set } = storeToRefs(watermarkSet)
  watermarkSet.setInfo(set.value);
  watermark(info.value);

  const themeStore = useThemeStore();
  const { showTabs } = storeToRefs(themeStore);

  // 恢复主题
  themeStore.recoverTheme();

  // 切换路由自动更新浏览器页签标题
  useSetDocumentTitle();

  // 国际化配置
  const { antLocale, eleLocale } = useLocale();

  // 用于内链 iframe 组件获取 KeepAlive
  const keepAlive = computed(() => TAB_KEEP_ALIVE && unref(showTabs));
</script>
