<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import EventBus from "../../common/EventBus";
import { useIpcRenderer, isWinOS } from "../../common/Utils";
import { useAppCommonStore } from "../store/appCommonStore";
import { useSettingStore } from "../store/settingStore";

const props = defineProps({
  hideMinBtn: Boolean,
  hideMaxBtn: Boolean
});

const { quit, minimize, maximize } = useAppCommonStore();
const isMinBtnDisabled = ref(false);
const { getWindowZoom, isSimpleLayout } = storeToRefs(useSettingStore());

const setMinBtnDisabled = (value) => {
  isMinBtnDisabled.value = value;
};

const doMinimize = () => {
  if (isMinBtnDisabled.value) return;
  minimize();
};

const ipcRenderer = useIpcRenderer();

//TODO
const adjustTrafficLightCtlBtn = () => {
  const els = document.querySelectorAll(".win-traffic-light-btn");
  if (!els) return;
  const zoom = Number(getWindowZoom.value);
  const scale = 100 / zoom;
  /*
    const orginWidth = 56
    let width = orginWidth * scale
    els.forEach(el => {
        el.style.width = width + "px"
    })
    */

  const btnEls = document.querySelectorAll(".win-traffic-light-btn .ctl-btn");
  const orginBtnSize = 13,
    orginBtnMarginRight = 8;
  let btnSize = orginBtnSize * scale;
  let btnMarginRight = orginBtnMarginRight * scale;
  if (!btnEls) return;
  btnEls.forEach((btnEl) => {
    btnEl.style.width = btnSize + "px";
    btnEl.style.height = btnSize + "px";
    btnEl.style.marginRight = btnMarginRight + "px";
  });

  const orginSvgSize = 8;
  let svgSize = orginSvgSize * scale;
  const maxBtnSvgEls = document.querySelectorAll(".win-traffic-light-btn .max-btn svg");
  if (!maxBtnSvgEls) return;
  maxBtnSvgEls.forEach((svgEl) => {
    svgEl.style.width = svgSize + "px";
    svgEl.style.height = svgSize + "px";
  });
};

EventBus.on("app-zoom", adjustTrafficLightCtlBtn);

onMounted(() => {
  adjustTrafficLightCtlBtn();
});
</script>

<template>
  <div class="win-traffic-light-btn">
    <button @click="quit" class="close-btn" title="关闭">
      <i class="iconfont icon-guanbi1"></i>
    </button>

    <button @click="doMinimize" class="min-btn" title="最小化">
      <i class="iconfont icon-zuixiaohua"></i>
    </button>

    <button @click="maximize" class="max-btn" title="最大化">
      <i class="iconfont icon-zuidahua"></i>
    </button>
  </div>
</template>

<style>
.win-traffic-light-btn {
  display: flex;
  -webkit-app-region: none;
  margin: 5px;
}

.win-traffic-light-btn button {
  /* width: 16px; */
  border: 0px;
  width: 13px;
  height: 13px;
  border-radius: 100rem;
  margin-right: 8px;
  -webkit-app-region: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.win-traffic-light-btn button i {
  font-size: 8px;
  font-weight: bold;
  visibility: hidden;
  color: #555;
}
.win-traffic-light-btn:hover button i {
  cursor: pointer;
  visibility: visible;
}

.win-traffic-light-btn .close-btn {
  background-color: #fc605c;
}

.win-traffic-light-btn .min-btn {
  background-color: #fdbc40;
}

.win-traffic-light-btn .max-btn {
  background-color: #34c648;
  margin-right: 0px !important;
}
</style>
