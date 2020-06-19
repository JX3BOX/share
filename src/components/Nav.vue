<template>
    <nav class="m-nav">
        <single_nav v-if="mode == 'single'" />
        <list_nav />
    </nav>
</template>

<script>
import single_nav from "./single_nav";
import list_nav from "./list_nav";
export default {
    name: "Nav",
    data: function() {
        return {};
    },
    computed: {
        mode: function() {
            return this.$store.state.mode;
        },
    },
    methods: {},
    mounted: function() {},
    components:{
        single_nav,
        list_nav,
    }
};
</script>

<style lang="less">
@import "../assets/css/nav.less";
</style>
