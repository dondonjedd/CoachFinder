export default {
    namespaced: true,
    state() {
        return {
            requests: []
        }
    },

    mutations: {
        addRequest(state, payload) {
            state.requests.push(payload)
        }

    },

    actions: {
        async addRequest(context, payload) {
            const newRequest = {
                email: payload.email,
                message: payload.message,
            }
            const cID = payload.coachId

            const response = await fetch(`https://vueproject-56465-default-rtdb.europe-west1.firebasedatabase.app/requests/${cID}.json`, {
                method: "POST",
                body: JSON.stringify(newRequest)
            })

            const responseData = await response.json()

            newRequest.id = responseData.name
            newRequest.coachId = cID

            if (!response.ok) {
                const error = new Error(responseData.message || "Failed to send requests")
                throw error
            }

            context.commit("addRequest", newRequest)
        }
    },

    getters: {
        allRequests(state) {
            return state.requests
        },

        requestReceived(state, _, _2, rootGetters) {
            return state.requests.filter(req => req.coachId === rootGetters.userId)

        },

        hasRequest(_, getters) {
            return getters.requestReceived && getters.requestReceived.length > 0
        }

    }
}