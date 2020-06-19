<template>
    <div class="m-list-side">

        <!-- 群号 -->
        <RightSideMsg>
            <em>家园玩法交流群</em> :
            <strong><a href="https://jq.qq.com/?_wv=1027&k=InbtJGcw">658035079</a></strong>
        </RightSideMsg>

        <!-- 排行榜 -->
        <div class="m-side-rank">
            <h3 class="c-sidebar-right-title">
                <img class="u-icon" svg-inline src="../assets/img/side/rank.svg" />
                最高花价
                <router-link class="u-more" to="/rank">完整榜单 &raquo;</router-link>
            </h3>
        </div>

        <!-- 其他链接 -->
        <div class="m-side-links">
            <h3 class="c-sidebar-right-title">
                <img class="u-icon" svg-inline src="../assets/img/side/puzzle.svg" />
                相关链接
            </h3>
            <div class="c-sidebar-right-list">
                <a class="u-item" href="https://www.jx3box.com/tool/13948/" target="_blank">如何导出家园蓝图？</a>
            </div>
        </div>

        <!-- <Github_REPO REPO="fb" coder="8"></Github_REPO> -->
    </div>
</template>

<script>

export default {
    name: "list_side",
    props: [],
    data: function() {
        return {
        };
    },
    computed: {},
    methods: {
    },
    mounted: function() {
    },
    components: {},
};
</script>
