<template>
<section>
    <base-card>
        <coach-filter @change-filter="updateFilters"></coach-filter>
    </base-card>
</section>
<section>
    <base-card>
        <div class=controls>
            <base-button mode="outline">Refresh</base-button>
            <base-button link to="/registration">Registration</base-button>
        </div>
        <ul v-if="hasCoaches">
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
            coachFilter:{
                frontend:true,
                backend:true,
                career:true,
            }
        }
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
        }
    },
    methods: {
        updateFilters(updatedFilter){
            this.coachFilter=updatedFilter
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