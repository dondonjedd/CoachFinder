export default {
    namespaced: true,
    state() {
        return {
            requests: [{
                id: "r1",
                email: "test@gmail.com",
                message: "hello",
                coachId: "c1"
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
        },

        requestReceived(state, _, _2, rootGetters) {
            return state.requests.filter(req => req.coachId === rootGetters.userId)

        },

        hasRequest(_, getters) {
            return getters.requestReceived && getters.requestReceived.length > 0
        }

    }
}