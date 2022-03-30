<template>
        <base-card>
        <h3>{{coach.firstName}}  {{coach.lastName}}</h3>
        <h4>${{coach.hourlyRate}}/hour</h4>
        <h4>{{coach.description}}/hour</h4>
        <base-button link :to="linkToCoach">Contatct the coach</base-button>
        <router-view></router-view>
    </base-card>
</template>

<script>
import BaseButton from '../../UI/BaseButton.vue'
export default {
  components: { BaseButton },
    props:["id"],
    computed:{
        linkToCoach(){
            return "/coaches/" + this.id +"/contact"
        },

        coach(){
            const allCoaches =this.$store.getters["coach/coaches"]
            return allCoaches.find(aCoach=>aCoach.id===this.id)
        }
    }
}
</script>


<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>