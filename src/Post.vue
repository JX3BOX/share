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
        </Breadcrumb>
        <LeftSidebar>
            <Nav class="m-nav" />
        </LeftSidebar>
        <Main :withoutRight="true">
            <single />
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Nav from "@/components/single_nav.vue";
import single from "@/components/single.vue";
export default {
    name: "App",
    props: [],
    data: function () {
        return {};
    },
    methods: {},
    components: {
        Nav,
        single,
    },
    beforeCreate : function (){
        
    }
};
</script>

<style lang="less">
@import "./assets/css/app.less";
</style>
