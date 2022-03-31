<template>
    <li v-for="req in allRequests" :key="req.id">{{req.email}}</li>
</template>


<script>
export default {
    computed:{
        allRequests(){
            return this.$store.getters["req/allRequests"]
        }
    }
}
</script>