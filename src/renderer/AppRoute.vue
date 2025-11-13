<script setup>
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import EventBus from "../common/EventBus";
import { useAppCommonStore } from "./store/appCommonStore";
import { usePlatformStore } from "./store/platformStore";
import { useUserProfileStore } from "./store/userProfileStore";

const { exploreModeCode } = storeToRefs(useAppCommonStore());
const { setExploreMode, setArtistExploreMode, setRadioExploreMode, setUserHomeExploreMode, hideAllCtxMenus, hidePlayingView, updateCommonCtxItem, hidePlaybackQueueView, setExitToHomeBtnVisible } = useAppCommonStore();

const { findCustomPlaylistIndex } = useUserProfileStore();

const { isArtistDetailVisitable, isAlbumDetailVisitable, updateCurrentPlatformByCode } = usePlatformStore();

const router = useRouter();

const autoSwitchExploreMode = (to) => {
  const path = to.path;
  if (path.includes("/playlists/")) {
    setExploreMode(0);
  } else if (path.includes("/artists/")) {
    setArtistExploreMode();
  } else if (path.includes("/radios")) {
    setRadioExploreMode();
  } else if (path.includes("/userhome")) {
    setUserHomeExploreMode();
  } else {
    //setExploreMode(0)
  }
};

const highlightPlatform = (to) => {
  const path = to.path;
  let platform = "";
  if (path.includes("/square") || path.includes("/playlist") || path.includes("/artist") || path.includes("/album")) {
    platform = path.split("/")[3];
  } else if (path.includes("/local")) {
    platform = "local";
  } else if (path.includes("/userhome")) {
    const parts = path.split("/");
    // /userhome/{code}
    if (parts.length === 3) platform = parts[2];
    // /userhome/customPlaylist/{id}
    if (parts.length === 4 && parts[2] === "customPlaylist") platform = "all";
  }
  updateCurrentPlatformByCode(platform);
};

//TODO 数据量大时，可能有卡顿风险
const highlightNavigationCustomPlaylist = (to, from) => {
  const path = to.path;
  let index = -1;
  if (path.includes("/customPlaylist/") && !path.includes("/create") && !path.includes("/edit")) {
    const id = path.split("/")[3];
    index = findCustomPlaylistIndex(id);
  }
  EventBus.emit("navigation-refreshCustomPlaylistIndex", index);
};

router.beforeResolve((to, from) => {
  console.log("[ ROUTE ] ==>>> " + to.path);
  //设置画面 歌曲/歌手/电台/本地
  autoSwitchExploreMode(to);
  highlightPlatform(to);
  highlightNavigationCustomPlaylist(to, from);
});
</script>

<template>
  <slot></slot>
</template>

<style scoped></style>
