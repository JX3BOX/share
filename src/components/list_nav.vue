<template>
    <div class="m-list-nav">
        <h5 class="u-title">在线应用</h5>
        <div class="m-nav-group">
            <router-link to="/furniture">
                <img svg-inline src="../assets/img/logo.svg" />
                <span>家具图鉴</span>
                <i class="u-mark isnew">全新上线</i>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "list_nav",
    props: [],
    data: function() {
        return {
        };
    },
    computed: {
    },
    methods: {
    },
    mounted: function() {},
    components : {
        
    }
};
</script>
