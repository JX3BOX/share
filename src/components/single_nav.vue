<template>
    <div class="m-single-nav">
        <Author :uid="uid"/>
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
        uid : function (){
            return this.$store.state.user_id
        }
    },
    methods: {
        
    },
    mounted: function() {},
};
</script>

