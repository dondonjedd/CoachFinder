<template>
<base-dialog :show="!!error" @close="handleError" title="An error occured">
    <p>{{error}}</p>
</base-dialog>
<section>
    <base-card>
        <coach-filter @change-filter="updateFilters"></coach-filter>
    </base-card>
</section>
<section>
    <base-card>
        <div class=controls>
            <base-button mode="outline" @click="refreshCoaches(true)">Refresh</base-button>
            <base-button v-if="!isCoachRegistered && !isLoading" link to="/registration">Registration</base-button>
        </div>

        <div v-if="isLoading">
            <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches && !isLoading">
            <coach-item v-for="coach in filteredCoaches" :key="coach.id"
                    :id = "coach.id"
                    :first-name = "coach.firstName"
                    :last-name = "coach.lastName"
                    :areas = "coach.areas"
                    :description = "coach.description"
                    :hourly-rate = "coach.hourlyRate"
            >
            </coach-item>
        </ul>
        <ul v-else>No Coaches Available</ul>
    </base-card>
</section>
</template>

<script>
import CoachItem from "../../coaches/CoachItem.vue"
import CoachFilter from "../../coaches/CoachFilter.vue"
import BaseCard from '../../UI/BaseCard.vue'
export default {
    components:{
        CoachItem,
        CoachFilter,
        BaseCard
    },
    data() {
        return {
            error:null,
            isLoading:false,
            coachFilter:{
                frontend:true,
                backend:true,
                career:true,
            }
        }
    },
    created(){
        this.refreshCoaches();
    },

    computed:{
        filteredCoaches(){
            const allCoaches = this.$store.getters["coach/coaches"]
            return allCoaches.filter( coach => {
                if(coach.areas.includes('frontend')&&!this.coachFilter.frontend){
                    return false
                }
                if(coach.areas.includes('backend')&&!this.coachFilter.backend){
                    return false
                }
                if(coach.areas.includes('career')&&!this.coachFilter.career){
                    return false
                }
                return true
            } )

  
        },

        hasCoaches(){
            return this.$store.getters["coach/hasCoaches"]
        },

        isCoachRegistered(){
            const allCoaches = this.$store.getters["coach/coaches"]
            return allCoaches.some(coach=>coach.id===this.$store.getters.userId)
        }
    },
    methods: {
        updateFilters(updatedFilter){
            this.coachFilter=updatedFilter
        },

        async refreshCoaches(refresh=false){
            this.isLoading=true
            try {
                await this.$store.dispatch("coach/updateCoaches",{forceRefresh:refresh})
            } catch (error) {
                this.error = error.message || "Something went wrong"
            }

            this.isLoading=false
        },

        handleError(){
            this.error=null
        }
    },
}
</script>


<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>