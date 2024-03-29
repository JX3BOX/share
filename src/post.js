Vue.config.productionTip = false;

// 第三方UI组件
import Vue from "vue";
import ElementUI from "element-ui";
Vue.use(ElementUI);

import PhotoSwipePlugin from "vue-photoswipe.js";
import 'vue-photoswipe.js/dist/static/css/photoswipe.css';
Vue.use(PhotoSwipePlugin, { pswpOptions: { showShare: false } });


// 通用UI模块
import JX3BOX_UI from '@jx3box/jx3box-common-ui'
import "@jx3box/jx3box-common/css/element.css";
import "@jx3box/jx3box-common/css/normalize.css";
Vue.use(JX3BOX_UI);
// import Comments from "@jx3box/jx3box-comment-ui"
// Vue.use(Comments)

// 数据与路由
import store from "@/store";

import App from "./Post.vue";
new Vue({
    store,
    render: h => h(App),
}).$mount("#app");

