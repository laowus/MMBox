<script setup>
import { onActivated, onDeactivated, onMounted, reactive, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import EventBus from "../../common/EventBus";
import PlaylistCategoryBar from "../components/PlaylistCategoryBar.vue";
import { usePlaylistSquareStore } from "../store/playlistSquareStore";
import { useAppCommonStore } from "../store/appCommonStore";

const squareContentRef = ref(null);
const back2TopBtnRef = ref(null);

//全部分类
const categories = reactive([]);
const orders = reactive([]);
const playlists = reactive([]);
const pagination = { offset: 0, limit: 35, page: 1 };
let markScrollTop = 0;

const { currentPlatformCode, currentCategoryCode, currentOrder } = storeToRefs(usePlaylistSquareStore());
const { currentVender, currentPlatformCategories, putCategories, putOrders, currentPlatformOrders } = usePlaylistSquareStore();
const { isPlaylistMode } = storeToRefs(useAppCommonStore());

const isLoadingCategories = ref(true);
const isLoadingContent = ref(true);

const setLoadingCategories = (value) => {
  isLoadingCategories.value = value;
};

const setLoadingContent = (value) => {
  isLoadingContent.value = value;
};

const scrollToLoad = () => {
  if (isLoadingContent.value) return;
  const scrollTop = squareContentRef.value.scrollTop;
  const scrollHeight = squareContentRef.value.scrollHeight;
  const clientHeight = squareContentRef.value.clientHeight;
  //markScrollState();
  //console.log(scrollTop + clientHeight, ' : ', scrollHeight)
  const allowedError = 10; //允许误差
  if (scrollTop + clientHeight + allowedError >= scrollHeight) {
    loadMoreContent();
  }
};
const onScroll = () => {
  scrollToLoad();
};

const resetPagination = () => {
  playlists.length = 0;
  pagination.offset = 0;
  pagination.page = 1;
};

const resetScrollState = () => {
  markScrollTop = 0;
  if (squareContentRef.value) squareContentRef.value.scrollTop = markScrollTop;
};

const resetBack2TopBtn = () => {
  if (back2TopBtnRef.value) back2TopBtnRef.value.setScrollTarget(squareContentRef.value);
};

const resetCommom = () => {
  resetPagination();
  resetScrollState();
 // resetBack2TopBtn();
};

const loadCategories = async () => {
  categories.length = 0;
  orders.length = 0;
  setLoadingCategories(true);
  setLoadingContent(true);
  let cachedCates = currentPlatformCategories();
  let cachedOrders = currentPlatformOrders();
  if (!cachedCates) {
    //获取vendor/qq.js
    const vendor = currentVender();
    if (!vendor || !vendor.categories) return;
    //获取分类
    const result = await vendor.categories();
    if (!result) return;
    cachedCates = result.data;
    cachedOrders = result.orders;
    if (!cachedCates) return;
    putCategories(result.platform, cachedCates);
    if (cachedOrders) putOrders(result.platform, result.orders);
  }
  categories.push(...cachedCates);
  if (cachedOrders) orders.push(...cachedOrders);
  EventBus.emit("playlistCategory-update");
  setLoadingCategories(false);
};

//TODO 后期需要梳理优化
/*-------------- 各种监听 --------------*/
onMounted(() => {
  resetCommom();
  loadCategories();
});
</script>
<template>
  <div class="playlist-square-view" ref="squareContentRef" @scroll="onScroll">
    <PlaylistCategoryBar :data="categories" :loading="isLoadingCategories"></PlaylistCategoryBar>
  </div>
</template>

<style>
.playlist-square-view {
  padding: 25px 33px 15px 33px;
  overflow: scroll;
}
</style>
