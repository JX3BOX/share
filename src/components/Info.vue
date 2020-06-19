<template>
    <div class="m-info">
        <div class="m-info-notice">
            <span class="u-item" href="/macro/#/">🌈 全新宏库上线啦 支持多套奇穴</span>
            <!-- <span class="u-item" href="/macro/#/">🌈 <span>即将上线</span> · 私人宏仓库</span> -->
            <!-- <span class="u-item" href="/macro/#/">✨ <span>即将上线</span> · 云端宏一键同步</span> -->
            <!-- <span class="u-item" href="/house/#/rank">⚽️ <span>即将上线</span> · 云端宏排行榜</span> -->
        </div>

        <div class="m-info-router">
            <router-link to="/"><i class="el-icon-collection"></i></router-link>
            <router-link to="/rank"><i class="el-icon-s-data"></i></router-link>
            <router-link to="/bucket"><i class="el-icon-receiving"></i></router-link>
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
