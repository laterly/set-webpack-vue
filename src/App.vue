<template>
    <div class="container">
    <router-view></router-view>
    </div>
</template>

<script>
import Index from '@/views/Index.vue'
export default {
    components:{
        Index
    },
    data(){
        return{
          msg:'webpack配置啦啦啦'      
        }
    },
    methods: {
        
    }       
}
</script>
<style lang="stylus" scoped>
    .container{
        min-height:100vh;
    }
</style>



