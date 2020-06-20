<template>
    <div class="m-list-nav">
        <h5 class="u-title">分类导航</h5>
        <div class="m-nav-group m-share-nav">
            <a v-for="(item,i) in menu" :href="typeLink(item.slug)" :key="i" :class="{on:isActive(item.slug)}"><i :class="item.icon"></i><b>{{item.name}}</b><span>{{item.desc}}</span></a>
        </div>

        <h5 class="u-title">在线应用</h5>
        <div class="m-nav-group">
            <router-link to="/parse">
                <img svg-inline src="../assets/img/logo.svg" />
                <span>脸型数据分析</span>
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
            menu : [
                {
                    slug : '',
                    icon : 'el-icon-receiving',
                    name : '全部',
                    desc : 'All'
                },
                {
                    slug : '成男',
                    icon : 'el-icon-male',
                    name : '成男',
                    desc : 'Man'
                },
                {
                    slug : '成女',
                    icon : 'el-icon-female',
                    name : '成女',
                    desc : 'Woman'
                },
                {
                    slug : '正太',
                    icon : 'el-icon-male',
                    name : '正太',
                    desc : 'Boy'
                },
                {
                    slug : '萝莉',
                    icon : 'el-icon-female',
                    name : '萝莉',
                    desc : 'Girl'
                },
            ]
        };
    },
    computed: {
        subtype : function (){
            return this.$store.state.subtype || ''
        },
    },
    methods: {
        typeLink : function (subtype){
            return './?subtype=' + subtype
        },
        isActive : function (slug){
            return (this.$route.name == 'index') && (slug == this.subtype)
        }
    },
    mounted: function() {
    },
    components : {
        
    }
};
</script>
