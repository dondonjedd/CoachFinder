export default {
    namespaced: true,
    state() {
        return {
            coaches: [{
                id: 'c1',
                firstName: 'Maximilian',
                lastName: 'Schwarzmüller',
                areas: ['frontend', 'backend', 'career'],
                description: "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
                hourlyRate: 30
            }, {
                id: 'c2',
                firstName: 'Julie',
                lastName: 'Jones',
                areas: ['frontend', 'career'],
                description: 'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
                hourlyRate: 30
            }]
        }
    },

    mutations: {
        addCoach(state, payload) {
            state.coaches.push(payload)
        },

        updateCoaches(state, payload) {
            state.coaches = payload
        }
    },

    actions: {
        async addCoach(context, payload) {
            const userId = context.rootGetters.userId

            const response = await fetch(`https://vueproject-56465-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json`, {
                method: "PUT",
                body: JSON.stringify(payload)
            })


            if (!response.ok) {
                const error = new Error(response.message || "Failed to send requests")
                throw error
            }

            context.commit("addCoach", {
                ...payload,
                id: userId
            })
        },

        async updateCoaches(context) {
            const response = await fetch(`https://vueproject-56465-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`)

            const responseData = await response.json()

            if (!response.ok) {
                const error = new Error(responseData.message || "Failed to fetch requests")
                throw error
            }

            const coaches = []


            for (const key in responseData) {
                const coach = {
                    id: key,
                    firstName: responseData[key].firstName,
                    lastName: responseData[key].lastName,
                    areas: responseData[key].areas,
                    description: responseData[key].description,
                    hourlyRate: responseData[key].hourlyRate
                }

                coaches.push(coach)
            }


            context.commit("updateCoaches", coaches)
        }
    },

    getters: {
        coaches(state) {
            return state.coaches
        },

        hasCoaches(state) {
            return state.coaches && state.coaches.length > 0
        }
    }
}