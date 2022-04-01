<template>
    <base-card>
        <h3>Coach Registration :</h3>
        <form @submit.prevent="submitForm">
            <div class="form-control" :class="{invalid: !firstName.isValid}">
                <label for="firstName">First name</label>
                <input type="text" name="firstName" id="firstName" v-model.trim="firstName.val"  @blur="checkValidity('firstName')">
                <p v-if="!firstName.isValid">First name must not be empty</p>
            </div>
            <div class="form-control" :class="{invalid: !lastName.isValid}">
                <label for="lastName">Last name</label>
                <input type="text" name="lastName" id="lastName" v-model.trim="lastName.val" @blur="checkValidity('lastName')">
                <p v-if="!lastName.isValid">Last name must not be empty</p>
            </div>
            <div  class="form-control"  :class="{invalid: !description.isValid}">
                <label for="description">Description</label>
                <textarea name="description" id="description" rows="3" v-model.trim="description.val" @blur="checkValidity('description')"></textarea>
                <p v-if="!description.isValid">Description name must not be empty</p>
            </div>
            <div class="form-control" :class="{invalid: !hourlyRate.isValid}">
                <label for="hourlyRate">Hourly Rate</label>
                <input type="numbers" name="hourlyRate" id="hourlyRate" v-model.number="hourlyRate.val" @blur="checkValidity('hourlyRate')">
                <p v-if="!hourlyRate.isValid">Rate must be more than 0</p>
            </div>
            <div class="form-control"  :class="{invalid: !areas.isValid}">
                <h3>Areas of expertise</h3>
                <div>
                    <input type="checkbox" value="frontend" id="frontend" v-model="areas.val" @change="checkValidity('areas')">
                    <label for="frontend">Frontend Development</label>
                </div>
                <div>
                    <input type="checkbox" value="backend" id="backend" v-model="areas.val" @change="checkValidity('areas')">
                    <label for="backend">Backend Development</label>
                </div>
                <div>
                    <input type="checkbox" value="career" id="career" v-model="areas.val" @change="checkValidity('areas')">
                    <label for="career">Career Advisory</label>
                </div>
                <p v-if="!areas.isValid">check at least one expertise</p>
            </div>
            <div class="button-control">
                <base-button>Submit</base-button>
            </div>
        </form>
    </base-card>
</template>

<script>
export default {
    data() {
        return {
            firstName:{
                val:"",
                isValid:true,
            },
            lastName:{
                val:"",
                isValid:true,
            },
            hourlyRate:{
                val:"",
                isValid:true,
            },
            description:{
                val:"",
                isValid:true,
            },
            areas:{
                val:[],
                isValid:true,
            },
            isFormValid:true,
        }
    },
    methods: {
        checkFormValidity(){
            this.isFormValid=true
            if(this.firstName.val===""){
                this.firstName.isValid=false
                this.isFormValid=false
            }
            if(this.lastName.val===""){
                this.lastName.isValid=false
                this.isFormValid=false
            }
            if(this.description.val===""){
                this.description.isValid=false
                this.isFormValid=false
            }
            if(!this.hourlyRate.val||this.hourlyRate.val<0){
                this.hourlyRate.isValid=false
                this.isFormValid=false
            }
            if(this.areas.val.length===0){
                this.areas.isValid=false
                this.isFormValid=false
            }
        },

        checkValidity(input){
            if(input==='hourlyRate'){
                if(!this.hourlyRate.val||this.hourlyRate.val<0){
                    this.hourlyRate.isValid=false;
                }else{
                    this.hourlyRate.isValid=true;
                }

            }else if(input==='areas'){
                if(this.areas.val.length===0){
                    this.areas.isValid=false;
                }else{
                    this.areas.isValid=true;
                }
            }else{
                if(this[input].val!=""){
                    this[input].isValid=true;
                }else{
                    this[input].isValid=false;
                }
            }
        },

        async submitForm(){
            this.checkFormValidity()
            if(!this.isFormValid){
                return
            }
            const newCoach = {
                firstName: this.firstName.val,
                lastName: this.lastName.val,
                areas: this.areas.val,
                description: this.description.val,
                hourlyRate: this.hourlyRate.val,
            }

            this.$store.dispatch("coach/addCoach",newCoach)
            this.$router.replace('/coaches')
        }
    },
}
</script>


<style scoped>
.form-control {
    margin: 0.5rem 0;
}

.button-control {
    margin-left: 80%
}

label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
}

input[type='checkbox']+label {
    font-weight: normal;
    display: inline;
    margin: 0 0 0 0.5rem;
}

input,
textarea {
    display: block;
    width: 100%;
    border: 1px solid #ccc;
    font: inherit;
}

input:focus,
textarea:focus {
    background-color: #f0e6fd;
    outline: none;
    border-color: #3d008d;
}

input[type='checkbox'] {
    display: inline;
    width: auto;
    border: none;
}

input[type='checkbox']:focus {
    outline: #3d008d solid 1px;
}

h3 {
    margin: 0.5rem 0;
    font-size: 1rem;
}

/* .invalid label {
    color: red;
} */

.invalid p {
    color: red;
}
/* .invalid h3 {
    color: red;
} */

.invalid input,
.invalid textarea {
    outline: 1px solid red;
}
</style>