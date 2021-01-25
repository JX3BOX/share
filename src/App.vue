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
import {getPID,getAppID,getQuery,getAppType} from '@jx3box/jx3box-common/js/utils'
import {__Root} from '@jx3box/jx3box-common/js/jx3box.json'

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
        let id = getAppID()
        let pid = getPID()

        // 旧单页链接跳转
        if(!id && pid){
            let type = getAppType()
            let test = __Root + type + '/' + pid
            location.href = __Root + type + '/' + pid
        }

        // 处理模式 & 文章ID
        this.$store.state.mode = id ? 'single' : 'list'
        this.$store.state.pid = id

        // 捕获subtype
        if(this.$store.state.mode == 'list'){
            this.$store.state.subtype = getQuery("subtype");
        }
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
