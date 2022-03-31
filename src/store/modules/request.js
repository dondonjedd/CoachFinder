export default {
    namespaced: true,
    state() {
        return {
            requests: [{
                id: "r1",
                email: "test@gmail.com",
                message: "hello",
            }]
        }
    },

    mutations: {
        addRequest(state, payload) {
            state.requests.push(payload)
        }

    },

    actions: {
        addRequest(context, payload) {
            context.commit("addRequest", payload)
        }
    },

    getters: {
        allRequests(state) {
            return state.requests
        }

    }
}