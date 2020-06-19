<template>
    <div id="app" :class="{ 'p-list': mode == 'list', 'p-single': mode == 'single' }">
        <Header></Header>
        <Breadcrumb
            name="频道名称"
            slug="slug"
            root="/slug"
            :publishEnable="true"
            :adminEnable="true"
            :feedbackEnable="true"
        >
            <img slot="logo" svg-inline src="./assets/img/logo.svg" />
            <Info />
        </Breadcrumb>
        <LeftSidebar>
            <Nav />
        </LeftSidebar>
        <Main :withoutRight="false">
            <single v-if="mode == 'single'" />
            <div class="m-main" v-else>
                <tabs />
                <router-view />
            </div>
            <RightSidebar>
                <Extend />
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Info from "@/components/Info.vue";
import Nav from "@/components/Nav.vue";
import Extend from "@/components/Extend.vue";
import tabs from "@/components/tabs";
import single from "@/components/single.vue";
const { getRewrite } = require("@jx3box/jx3box-common/js/utils");

export default {
    name: "App",
    props: [],
    data: function() {
        return {};
    },
    computed: {
        mode: function() {
            return this.$store.state.mode;
        },
    },
    methods: {},
    beforeCreate: function() {
        let params = new URLSearchParams(location.search);
        this.$store.state.pid = params.get("pid") || getRewrite("pid");
        this.$store.state.mode = this.$store.state.pid ? "single" : "list";

        // 根据情况选择subtype取值
        // this.$store.state.subtype = getRewrite("subtype");
        // this.$store.state.subtype = this.$route.params.subtype;
    },
    components: {
        Info,
        Nav,
        Extend,
        tabs,
        single
    },
};
</script>

<style lang="less">
@import "./assets/css/app.less";
</style>
