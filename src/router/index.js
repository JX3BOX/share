import Vue from "vue";
import VueRouter from "vue-router";

const Index = () => import("../views/Index.vue");
// const Parse = () => import("../views/Parse.vue");

Vue.use(VueRouter);

const routes = [
    { name: "index", path: "/", component: Index },
    // { name: "parse", path: "/parse", component: Parse },
    // { name: "single", path: "/view/:id", component: Single },
];

const router = new VueRouter({
    routes,
});

export default router;
