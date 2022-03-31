<template>
    <base-card>
        <h3>Coach Registration :</h3>
        <form @submit.prevent="submitForm">
            <div class="form-control">
                <label for="firstName">First name</label>
                <input type="text" name="firstName" id="firstName" v-model.trim="firstName">
            </div>
            <div class="form-control">
                <label for="lastName">Last name</label>
                <input type="text" name="lastName" id="lastName" v-model.trim="lastName">
            </div>
            <div  class="form-control">
                <label for="description">Description</label>
                <textarea name="description" id="description" rows="3" v-model.trim="description"></textarea>
            </div>
            <div class="form-control">
                <label for="hourlyRate">Hourly Rate</label>
                <input type="numbers" name="hourlyRate" id="hourlyRate" v-model.number="hourlyRate">
            </div>
            <div class="form-control">
                <h3>Areas of expertise</h3>
                <div>
                    <input type="checkbox" value="frontend" id="frontend" v-model="areas">
                    <label for="frontend">Frontend Development</label>
                </div>
                <div>
                    <input type="checkbox" value="backend" id="backend" v-model="areas">
                    <label for="backend">Backend Development</label>
                </div>
                <div>
                    <input type="checkbox" value="career" id="career" v-model="areas">
                    <label for="career">Career Advisory</label>
                </div>
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
            firstName:"",
            lastName:"",
            hourlyRate:"",
            description:"",
            areas:[]
        }
    },
    methods: {
        submitForm(){
            const newCoach = {
                id: "c"+(this.$store.getters["coach/coaches"].length+1),
                firstName: this.firstName,
                lastName: this.lastName,
                areas: this.areas,
                description: this.description,
                hourlyRate: this.hourlyRate,
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

.invalid label {
    color: red;
}

.invalid input,
.invalid textarea {
    border: 1px solid red;
}
</style>