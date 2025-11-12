<script setup>
import MainLeft from "./DefaultMainLeft.vue";
import MainCenter from "./DefaultMainCenter.vue";
</script>

<template>
  <div class="default-layout">
    <MainLeft></MainLeft>
    <MainCenter></MainCenter>
  </div>
</template>

<style>
.default-layout {
  flex: 1;
  display: flex;
}
</style>
