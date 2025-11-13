import { createRouter, createWebHashHistory } from "vue-router";
import PlaylistSquareView from "../views/PlaylistSquareView.vue";
import DefaultView from "../views/DefaultView.vue";

const routes = [
  {
    //默认
    path: "/",
    redirect: "/playlists/square/qq"
  },
  {
    //歌单广场
    path: "/playlists/square/:platform",
    component: PlaylistSquareView
  }
];

export const router = createRouter({
  //为了简单起见，在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes
});
