export default {
    namespaced: true,
    state() {
        return {
            coaches: [],
            lastFetchedTime: null,
        }
    },

    mutations: {
        addCoach(state, payload) {
            state.coaches.push(payload)
        },

        updateCoaches(state, payload) {
            state.coaches = payload
        },

        setLastFetchedTime(state) {
            state.lastFetchedTime = new Date().getTime()
        }
    },

    actions: {
        async addCoach(context, payload) {
            const userId = context.rootGetters.userId
            const token = context.rootGetters.token

            const response = await fetch(`https://vueproject-56465-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=${token}`, {
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

        async updateCoaches(context, payload) {
            if (!payload.forceRefresh && !context.getters.shouldUpdate) { return }

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
            context.commit("setLastFetchedTime")
        },

    },

    getters: {
        coaches(state) {
            return state.coaches
        },

        hasCoaches(state) {
            return state.coaches && state.coaches.length > 0
        },

        shouldUpdate(state) {
            const currentFetchTime = new Date().getTime()
            return ((currentFetchTime - state.lastFetchedTime) / 1000) > 60
        }
    }
}