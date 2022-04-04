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
        },
        updateRequests(state, payload) {
            state.requests = payload
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
        },

        async updateRequests(context) {
            const cID = context.rootGetters.userId
            const token = context.rootGetters.token

            const response = await fetch(`https://vueproject-56465-default-rtdb.europe-west1.firebasedatabase.app/requests/${cID}.json?auth=${token}`)

            const responseData = await response.json()

            if (!response.ok) {
                const error = new Error(responseData.message || "Failed to fetch requests")
                throw error
            }

            const requests = []


            for (const key in responseData) {
                const req = {
                    id: key,
                    email: responseData[key].email,
                    message: responseData[key].message,
                    coachId: cID
                }

                requests.push(req)
            }


            context.commit("updateRequests", requests)
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