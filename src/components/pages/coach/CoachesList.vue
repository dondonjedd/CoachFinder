<template>
<section>
    Filter
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
import CoachItem from "../../Items/CoachItem.vue"
export default {
    components:{
        CoachItem
    },
    computed:{
        filteredCoaches(){
            return this.$store.getters["coach/coaches"]
        },

        hasCoaches(){
            return this.$store.getters["coach/hasCoaches"]
        }
    }
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