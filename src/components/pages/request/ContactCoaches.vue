<template>
    <form @submit.prevent="addRequest">
        <div class="form-control">
            <label for="email">Email</label>
            <input type="text" name="email" id="email" v-model="email">
        </div>
        <div class="form-control">
            <label for="message">Message</label>
            <textarea name="message" id="message"  rows="4" v-model="message"></textarea >
        </div>
        <div class="actions">
            <base-button> submit </base-button>
        </div>
    </form>

</template>


<script>
export default {
    data() {
        return {
            email:"",
            message:"",
        }
    },
    methods: {
        addRequest(){
            const newRequest = {
                id: "r" +(this.$store.getters["req/allRequests"].length+1),
                email:this.email,
                message:this.message
            }
            this.$store.dispatch('req/addRequest',newRequest)
        }
    },
}
</script>


<style scoped>


.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: right;
  margin-top: 5%;
}
</style>