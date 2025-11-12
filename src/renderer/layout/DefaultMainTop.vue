<script setup>
import { ref, reactive } from "vue";
</script>
<template>
  <div class="main-top">
    <div id="play-nav"></div>
  </div>
</template>

<style>
.main-top,
#play-nav {
  display: flex;
}

.main-top {
  flex-direction: column;
  height: 80px;
  -webkit-app-region: drag;
  background: #faf4f6;
}

.main-top #play-nav #play-meta {
  width: 34.33%;
}
</style>
