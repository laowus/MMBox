<script setup>
import { ref, reactive } from "vue";
import WinTrafficLightBtn from "../components/WinTrafficLightBtn.vue";
import EventBus from "../../common/EventBus";
import { useUseCustomTrafficLight } from "../../common/Utils";

//是否使用自定义交通灯控件
const useCustomTrafficLight = useUseCustomTrafficLight();

let isUserMouseWheel = ref(false),
  userMouseWheelCancelTimer = null;
</script>
<template>
  <div id="main-left" :class="{ mousewheelViewpoint: isUserMouseWheel }">
    <div class="header">
      <WinTrafficLightBtn v-show="useCustomTrafficLight"></WinTrafficLightBtn>
    </div>
  </div>
</template>

<style>
#main-left {
  width: 211px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 3px var(--main-left-border-color);
  background: var(--main-left-bg);
}

#main-left .header,
#main-left .center,
#main-left .bottom {
  width: 100%;
}
</style>
