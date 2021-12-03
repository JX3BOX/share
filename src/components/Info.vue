<template>
    <div class="m-info">
        <div class="m-info-notice">
            <!-- <span class="u-item" href="/app/facedata" target="_blank">💄 更换版块标志,移动适配优化</span> -->
            <!-- <a class="u-item" href="https://jq.qq.com/?_wv=1027&k=InbtJGcw" target="_blank">⚽️ 交流群</a> -->
        </div>

        <div class="m-info-router">
            <router-link to="/"><i class="el-icon-receiving"></i></router-link>
            <router-link to="/?subtype=成男"><i class="el-icon-male"></i></router-link>
            <router-link to="/?subtype=成女"><i class="el-icon-female"></i></router-link>
            <router-link to="/?subtype=正太"><i class="el-icon-cold-drink"></i></router-link>
            <router-link to="/?subtype=萝莉"><i class="el-icon-sugar"></i></router-link>
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
