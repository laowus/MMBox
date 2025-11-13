<script setup>
import { storeToRefs } from "pinia";
import { onMounted, reactive } from "vue";
import EventBus from "../../common/EventBus";
import { useAppCommonStore } from "../store/appCommonStore";
import { usePlaylistSquareStore } from "../store/playlistSquareStore";
import { useSettingStore } from "../store/settingStore";
import CategoryBarLoadingMask from "./CategoryBarLoadingMask.vue";

const { currentCategoryItem } = storeToRefs(usePlaylistSquareStore());
const { updateCurrentCategoryItem } = usePlaylistSquareStore();
const { togglePlaylistCategoryView, hidePlaybackQueueView } = useAppCommonStore();
const { isPlaylistCategoryBarRandom } = storeToRefs(useSettingStore());

const props = defineProps({
  data: Array,
  loading: Boolean
});

const toggleCategory = () => {
  hidePlaybackQueueView();
  togglePlaylistCategoryView();
};

const isDiffCate = (item, row, col) => {
  const prevCate = currentCategoryItem.value;
  return prevCate ? prevCate.data.value != item.value || prevCate.row != row || prevCate.col != col : true;
};

const visitCateItem = (item, row, col, forceRefresh) => {
  const needRefresh = isDiffCate(item, row, col) || forceRefresh;
  updateCurrentCategoryItem(item, row, col);
  if (needRefresh) {
    EventBus.emit("playlistSquare-refresh");
  }
};

const flatData = reactive([]);
//TODO 随机打乱数据，感觉算法有问题，不够乱......
const shuffle = (arr) => {
  let i = arr.length;
  while (i) {
    let j = Math.floor(Math.random() * i--);
    [arr[j], arr[i]] = [arr[i], arr[j]];
  }
};

const getFlatData = () => {
  if (flatData.length <= 0) {
    //记录源数组原始坐标
    props.data.forEach((cate, row) => {
      cate.data.forEach((item, col) => {
        item.row = row;
        item.col = col;
        flatData.push(item);
      });
    });
    if (isPlaylistCategoryBarRandom.value) {
      const shuffleTimes = (Math.random(1024) % 3) + 1;
      for (var i = 0; i < shuffleTimes; i++) shuffle(flatData);
    }
  }
  return flatData;
};

const loadFirstCateData = () => {
  const flatData = getFlatData();
  if (!flatData || flatData.length < 1) return;
  const firstItem = flatData[0];
  visitCateItem(firstItem, firstItem.row, firstItem.col, true);
};

//TODO 实现方式很别扭
EventBus.on("playlistCategory-update", () => {
  flatData.length = 0;
  loadFirstCateData();
});
</script>

<template>
  <div class="playlist-category-bar">
    <div v-show="!loading">
      <i @click.stop="toggleCategory" class="iconfont icon-quanbu"></i>
      <template v-for="item in getFlatData()" v-show="data.length > 0">
        <span @click="visitCateItem(item, item.row, item.col)" :class="{ active: item.row == currentCategoryItem.row && item.col == currentCategoryItem.col }" v-html="item.key"> </span>
      </template>
    </div>
    <CategoryBarLoadingMask :count="16" v-show="loading"></CategoryBarLoadingMask>
  </div>
</template>

<style scoped>
.playlist-category-bar {
  margin-left: 10px;
  height: 36px;
  overflow: hidden;
  text-align: left;
}

.playlist-category-bar span {
  padding: 6px 15px;
  margin-right: 8px;
  vertical-align: middle;
  text-align: center;
  line-height: 36px;
  font-size: var(--text-size);
  cursor: pointer;
  white-space: nowrap;
  border-radius: 10rem;
  /*border: 1px solid transparent;*/
  color: var(--text-color);
}

.playlist-category-bar span:hover {
  background: var(--list-item-hover);
  color: var(--text-color);
}

.playlist-category-bar svg {
  fill: var(--svg-color);
  margin-right: 15px;
  cursor: pointer;
  transform: translateY(3px);
}

.playlist-category-bar svg:hover {
  fill: var(--hl-color);
}

.playlist-category-bar .active {
  border-color: var(--hl-color);
  border-color: transparent;
  background: var(--btn-bg) !important;
  color: var(--svg-btn-color) !important;
}
</style>
