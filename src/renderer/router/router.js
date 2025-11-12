import { createRouter, createWebHashHistory } from "vue-router";
import DefaultView from "../views/DefaultView.vue";

const routes = [
  {
    //默认
    path: "/",
    component: DefaultView
  }
];

export const router = createRouter({
  //为了简单起见，在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes
});
