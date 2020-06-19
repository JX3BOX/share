<template>
    <div class="m-single-side">
        <div id="directory"></div>
        <!-- v-if="$store.state.status" -->
        <!-- <Author :author="author"/>
        <Authorposts :uid="uid"/>
        <ins 
            class="adsbygoogle"
            style="display:block;max-width:100%;overflow:hidden;"
            data-ad-client="ca-pub-4388499329141185"
            data-ad-slot="9773281887"
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins> -->
    </div>
</template>

<script>
export default {
    name: "single_side",
    props: [],
    data: function() {
        return {
        };
    },
    computed: {
        // author : function (){
        //     return this.$store.state.author
        // },
        // uid : function (){
        //     return this.author.uid
        // }
    },
    methods: {
        
    },
    filters : {
    },
    mounted: function() {},
};
</script>
