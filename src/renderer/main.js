import { createApp } from "vue";
import App from "./App.vue";
import "./assets/styles/iconfont/iconfont.css";
//Pinia
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
//Router
import { router } from "./router/router";
//LazyLoad
import VueLazyLoad from "vue3-lazyload";
//状态管理
const pinia = createPinia();
pinia.use(piniaPersist);

//应用：创建、配置
const app = createApp(App);

//全局异常处理器
app.config.errorHandler = (err, vm, info) => {
  // 处理错误
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  console.log(err, vm, info);
};

app
  .use(pinia)
  .use(router)
  .use(VueLazyLoad, {
    loading: "default_cover.png",
    error: "default_cover.png",
    log: false,
    lifecycle: {
      error: (el) => {
        //console.log(el)
      }
    }
  })
  .mount("#app");
