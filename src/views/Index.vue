<template>
    <div class="v-index">
        <list />
    </div>
</template>

<script>
import { getPosts } from "../service/post";
import {
    authorLink,
    publishLink,
    showAvatar,
    resolveImagePath,
} from "@jx3box/jx3box-common/js/utils";
import { __ossMirror } from "@jx3box/jx3box-common/js/jx3box.json";
import lodash from "lodash";
import list from '@/components/list.vue'

export default {
    name: "Index",
    props: [],
    data: function() {
        return {
        };
    },
    computed: {
    },
    methods: {
    },
    created: function() {
    },
    components: {
        list
    },
};
</script>

<style lang="less">
// @import "../assets/css/index.less";
</style>
