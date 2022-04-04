<template>
<section>
    <base-dialog :show="!!error" title="An error has occured" @close="handleCLose">
        <p>{{error}}</p>
    </base-dialog>
    <base-card>
        <header>
            <h2>
                All Requests
            </h2>
        </header>
        <div v-if="isLoading">
            <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasRequest">
            <request-item v-for="req in requestReceived" :key="req.id" :email='req.email' :message="req.message"></request-item>
        </ul>
        <h3 v-else>You have no requests</h3>
    </base-card>
</section>
</template>


<script>
import RequestItem from "../../requests/RequestItem.vue"
export default {
  components: { RequestItem },
    computed:{
        allRequests(){
            return this.$store.getters["req/allRequests"]
        },

        requestReceived(){
            return this.$store.getters["req/requestReceived"]
        },

        hasRequest(){
            return this.$store.getters["req/hasRequest"]
        }
    },

    data() {
        return {
            isLoading:false,
            error:null
        }
    },
    created(){
        this.updateRequests()
    },

    methods:{
        async updateRequests(){
            this.isLoading =true
            try {
                await this.$store.dispatch("req/updateRequests")
            } catch (error) {
                this.error = error.message || "Something went wrong"
            }
            this.isLoading =false
        },

        handleCLose(){
            this.error=null
        }
    }
}
</script>


<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>