<script setup>
import { onMounted, shallowRef, inject, watch, triggerRef } from "vue";
import EventBus from "../common/EventBus";
import { useSettingStore } from "./store/settingStore";
import DefaultLayout from "./layout/DefaultLayout.vue";
import SimpleLayout from "./layout/SimpleLayout.vue";
import { storeToRefs } from "pinia";

const { isStorePlayStateBeforeQuit, isStoreLocalMusicBeforeQuit, getWindowZoom, isSimpleLayout } = storeToRefs(useSettingStore());
const { setupWindowZoom, setupAppSuspension, setupTray, setupGlobalShortcut, setupAppGlobalProxy } = useSettingStore();

const currentAppLayout = shallowRef(null);

const setupLayout = () => {
  if (isSimpleLayout.value) {
    currentAppLayout.value = SimpleLayout;
  } else {
    currentAppLayout.value = DefaultLayout;
  }
};

onMounted(() => {
  setupLayout();
});
</script>
<template>
  <keep-alive :max="2">
    <component :is="currentAppLayout"> </component>
  </keep-alive>
  <slot></slot>
</template>

<style></style>
