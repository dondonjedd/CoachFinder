<template>
<section>
    <base-card>
        <h2>{{fullName}}</h2>
        <h3>${{rate}}/hour</h3>
            <base-badge v-for="area in areas" :key="area" :type="area">{{area.toUpperCase()}}</base-badge>
    <p>{{description}}</p>
    </base-card>
</section>
<section>
  <base-card>
    <header>
      <base-button v-if="!showContactForm" link :to="linkToCoach" >Contatct the coach</base-button>
      <router-view v-else></router-view>
    </header>
  </base-card>
</section>
</template>

<script>
import BaseCard from '../../UI/BaseCard.vue'
export default {
  components: { BaseCard },
    props:["id"],
    data() {
      return {
        coach:null,
        contactIsShowing:false,
      }
    },

    created(){
      this.coach = this.$store.getters["coach/coaches"].find(aCoach=>aCoach.id===this.id)
    },
    computed:{
        showContactForm(){
          return this.$route.matched.some(name => name.path.endsWith("contact"))
        },

        fullName(){
            return this.coach.firstName +" "+ this.coach.lastName
        },

        rate(){
          return this.coach.hourlyRate
        },

        description(){
          return this.coach.description
        },

        areas(){
          return this.coach.areas
        },

        linkToCoach(){
          return "/coaches/" + this.id +"/contact"
        },
    },

    methods: {
    },
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