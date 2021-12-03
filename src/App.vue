<template>
    <div id="app">
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
        <LeftSidebar>
            <Nav class="m-nav" />
        </LeftSidebar>
        <Main :withoutRight="true">
            <list class="m-main" />
            <!-- <el-alert
                class="m-single-notice"
                title="特别说明"
                type="warning"
                description="我们尊重和保护原作者版权，部分作品由网站团队自费从淘宝购买上传无法一一甄别原作是否付费，如有侵权，请联系admin@jx3box.com，我们将立即删除，亦欢迎作者自行上传推广自己作品。"
                show-icon
            ></el-alert>-->
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Info from "@/components/Info.vue";
import Nav from "@/components/list_nav.vue";
import list from "@/components/list.vue";
import { getQuery } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "App",
    props: [],
    data: function () {
        return {};
    },
    computed: {},
    methods: {},
    components: {
        Nav,
        list,
        Info
    },
    beforeCreate: function () {
        this.$store.state.subtype = getQuery("subtype");
    },
};
</script>

<style lang="less">
@import "./assets/css/app.less";
@media screen and (max-width: @phone) {
    .c-breadcrumb .u-op {
        .none;
    }
}
</style>
