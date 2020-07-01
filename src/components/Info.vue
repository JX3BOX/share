<template>
    <div class="m-info">
        <div class="m-info-notice">
            <span class="u-item" href="/app/facedata" target="_blank">💄 妆容解析</span>
            <a class="u-item" href="https://jq.qq.com/?_wv=1027&k=InbtJGcw" target="_blank">⚽️ 交流群</a>
        </div>

        <div class="m-info-router">
            <router-link to="/"><i class="el-icon-collection"></i></router-link>
            <a href="/app/facedata" target="_blank"><i class="el-icon-set-up"></i></a>
        </div>
    </div>
</template>

<script>
export default {
    name: "Info",
    props: [],
    data: function() {
        return {};
    },
    computed: {},
    methods: {},
    mounted: function() {}
};
</script>

<style lang="less">
@import '../assets/css/info.less';
</style>
