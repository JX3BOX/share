<template>
    <div class="m-list-nav">
        <RightSideMsg>
            <em>休闲玩法交流群</em> :
            <strong>
                <a href="https://jq.qq.com/?_wv=1027&k=InbtJGcw">658035079</a>
            </strong>
        </RightSideMsg>

        <h5 class="u-title">分类导航</h5>
        <div class="m-nav-group m-share-nav">
            <router-link
                v-for="(item,i) in menu"
                :to="typeLink(item.slug)"
                :key="i"
                :class="{on:isActive(item.slug)}"
            >
                <i :class="item.icon"></i>
                <b>{{item.name}}</b>
                <span>{{item.desc}}</span>
            </router-link>
        </div>

        <h5 class="u-title">在线应用</h5>
        <div class="m-nav-group m-share-app">
            <a href="/app/facedata" target="_blank">
                <img svg-inline src="../assets/img/mirror.svg" />
                <span>捏脸数据解析器</span>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "list_nav",
    props: [],
    data: function () {
        return {
            menu: [
                {
                    slug: "",
                    icon: "el-icon-receiving",
                    name: "全部",
                    desc: "All",
                },
                {
                    slug: "成男",
                    icon: "el-icon-male",
                    name: "成男",
                    desc: "Male",
                },
                {
                    slug: "成女",
                    icon: "el-icon-female",
                    name: "成女",
                    desc: "Female",
                },
                {
                    slug: "正太",
                    icon: "el-icon-male",
                    name: "正太",
                    desc: "Boy",
                },
                {
                    slug: "萝莉",
                    icon: "el-icon-female",
                    name: "萝莉",
                    desc: "Girl",
                },
            ],
        };
    },
    computed: {
        subtype: function () {
            return this.$route.query.subtype || "";
        },
        client: function () {
            return this.$store.state.client;
        },
    },
    methods: {
        typeLink: function (subtype) {
            // return "./?subtype=" + subtype;
            return "/?subtype=" + subtype;
        },
        isActive: function (slug) {
            return this.$route.name == "index" && slug == this.subtype;
        },
    },
    mounted: function () {},
    components: {},
};
</script>
<style lang="less">
@import "../assets/css/nav.less";
</style>