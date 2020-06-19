<template>
    <div class="m-single-nav">
        <Author :author="author" v-if="$store.state.status"/>
        <Authorposts :uid="uid" v-if="$store.state.status"/>
        <!-- <ins 
            class="adsbygoogle"
            style="display:block;max-width:100%;overflow:hidden;margin:10px;"
            data-ad-client="ca-pub-4388499329141185"
            data-ad-slot="9773281887"
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins> -->
    </div>
</template>

<script>
export default {
    name: "single_nav",
    props: [],
    data: function() {
        return {
            
        };
    },
    computed: {
        author : function (){
            return this.$store.state.author
        },
        uid : function (){
            return this.author.uid
        }
    },
    methods: {
        
    },
    mounted: function() {},
};
</script>

