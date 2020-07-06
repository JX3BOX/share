<template>
    <div
        id="app"
        :class="{ 'p-list': mode == 'list', 'p-single': mode == 'single' }"
    >
        <Header></Header>
        <Breadcrumb
            name="捏脸分享"
            slug="share"
            root="/share"
            :publishEnable="true"
            :adminEnable="true"
            :feedbackEnable="true"
        >
            <img slot="logo" svg-inline src="./assets/img/face.svg" />
            <Info />
        </Breadcrumb>
        <!-- <template v-if="mode == 'single'">
            <LeftSidebar>
                <Nav />
            </LeftSidebar>
            <Main :withoutRight="true">
                <single />
                <Footer></Footer>
            </Main>
        </template>
        <div class="m-fullscreen-wrapper" v-else>
            <list class="m-facelist-page" />
            <Footer></Footer>
        </div> -->
        <LeftSidebar>
            <Nav />
        </LeftSidebar>
        <Main :withoutRight="true">
            <single v-if="mode == 'single'" />
            <list class="m-main" v-else />
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Info from "@/components/Info.vue";
import Nav from "@/components/Nav.vue";
import list from "@/components/list.vue";
// import Extend from "@/components/Extend.vue";
// import tabs from "@/components/tabs";
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
        this.$store.state.subtype = getRewrite("subtype");
        // this.$store.state.subtype = this.$route.params.subtype;
    },
    components: {
        Info,
        Nav,
        // Extend,
        // tabs,
        list,
        single,
    },
};
</script>

<style lang="less">
@import "./assets/css/app.less";
</style>
