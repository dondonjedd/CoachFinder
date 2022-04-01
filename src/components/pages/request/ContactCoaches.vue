<template>
    <form @submit.prevent="submitRequest">
        <div class="form-control" :class="{errors: !email.isValid}" >
            <label for="email">Email</label>
            <input type="text" name="email" id="email" v-model.trim="email.val" @blur="updateValidity('email')">
            <p v-if="!email.isValid" >Please enter a valid email address</p>
        </div>
        <div class="form-control" :class="{errors: !message.isValid}" >
            <label for="message">Message</label>
            <textarea name="message" id="message"  rows="4" v-model.trim="message.val" @blur="updateValidity('message')"></textarea >
            <p v-if="!message.isValid">Please enter a message</p>
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
            email:{
              val:"",
              isValid:true,
            },
            message:{
              val:"",
              isValid:true,
            },
            isFormValid:true,
        }
    },
    methods: {

        updateValidity(input){
          if(input==="email"){
            if(this.email.val===''|| !this.email.val.includes("@")){
              this.email.isValid=false
            }else{
              this.email.isValid=true
            }
          }else if(input==="message"){
            if(this.message.val===''){
              this.message.isValid=false
            }else{
              this.message.isValid=true
            }
          }
        },

        checkValidity(){
          this.isFormValid=true
          if(this.email.val===''|| !this.email.val.includes("@")){
            this.email.isValid=false
            this.isFormValid=false
          }

          if(this.message.val===''){
            this.message.isValid=false
            this.isFormValid=false
          }
        },

        submitRequest(){
            this.checkValidity()
            if(this.isFormValid===false){
              return
            }
            const newRequest = {
                id: "r" +(this.$store.getters["req/allRequests"].length+1),
                email:this.email.val,
                message:this.message.val
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

.errors p {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: right;
  margin-top: 5%;
}
</style>