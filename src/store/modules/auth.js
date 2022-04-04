export default {
    state() {
        return {
            token: null,
            userId: null,
            tokenExpiration: null,
        }
    },

    mutations: {

        setUser(state, payload) {
            state.token = payload.token
            state.userId = payload.userId
            state.tokenExpiration = payload.tokenExpiration
        }
    },

    actions: {
        async signUp(context, payload) {
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAS69dnO-BFD01kiBG0NSdX8AXI0CRuroY", {
                method: "POST",
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true
                })
            })

            const responseData = await response.json()

            if (!response.ok) {
                console.log(responseData)
                const error = new Error(responseData.message || "Failed to sign up, check your sign up data")
                throw error
            }

            context.commit("setUser", {
                token: responseData.idToken,
                userId: responseData.localId,
                tokenExpiration: responseData.expiresIn,
            })
        }
    },

    getters: {
        userId(state) {
            return state.userId
        }
    }
}