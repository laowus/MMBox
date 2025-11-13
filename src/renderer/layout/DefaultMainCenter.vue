<script setup>
import { storeToRefs } from "pinia";
import { inject, onActivated, onMounted, shallowRef, watch } from "vue";
import MainTop from "./DefaultMainTop.vue";
import MainContent from "./DefaultMainContent.vue";
import { useSettingStore } from "../store/settingStore";

const { lyricMetaPos, isDefaultLayout, isDefaultClassicLayout, isSimpleLayout } = storeToRefs(useSettingStore());
const { setupWindowZoomWithoutResize } = useSettingStore();
const minAppWidth = 1080,
  minAppHeight = 720;
const currentMainTop = shallowRef(null);
const currentMainBottom = shallowRef(null);

const setupDefaultLayout = () => {
  if (isDefaultClassicLayout.value) {
    //currentMainTop.value = ClassicMainTop;
  } else {
    currentMainTop.value = MainTop;
  }
};
onActivated(setupDefaultLayout);
onMounted(() => {
  //窗口大小变化事件监听
  window.addEventListener("resize", (e) => {
    if (!isDefaultLayout.value) return;
  });
});
</script>
<template>
  <div id="main-center">
    <component id="main-top" :is="currentMainTop"> </component>
    <MainContent id="main-content" :class="{ autopadding: isDefaultClassicLayout }"> </MainContent>
  </div>
</template>

<style>
#main-center {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  background: var(--main-center-bg);
}

#main-center,
#main-top,
#main-content,
#main-bottom {
  z-index: 1;
}
</style>
