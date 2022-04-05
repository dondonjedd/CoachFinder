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
            return context.dispatch("auth", {
                ...payload,
                mode: "signup"
            })
        },

        async logIn(context, payload) {
            return context.dispatch("auth", {
                ...payload,
                mode: "login"
            })
        },

        async auth(context, payload) {
            const mode = payload.mode
            let url = ""

            if (mode === "login") {
                url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAS69dnO-BFD01kiBG0NSdX8AXI0CRuroY"
            } else {
                url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAS69dnO-BFD01kiBG0NSdX8AXI0CRuroY"
            }

            const response = await fetch(url, {
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
                throw new Error(responseData.message || "Failed to authenticate, check your credentials")

            }

            localStorage.setItem('token', responseData.idToken)
            localStorage.setItem('userId', responseData.localId)

            context.commit("setUser", {
                token: responseData.idToken,
                userId: responseData.localId,
                tokenExpiration: responseData.expiresIn,
            })

        },

        autoLogin(context) {
            const token = localStorage.getItem('token')
            const userId = localStorage.getItem('userId')

            if (token && userId) {
                context.commit("setUser", {
                    token: token,
                    userId: userId,
                    tokenExpiration: null,
                })
            }
        },

        logOut(context) {
            context.commit("setUser", {
                token: null,
                userId: null,
                tokenExpiration: null,
            })
        }
    },

    getters: {
        userId(state) {
            return state.userId
        },

        token(state) {
            return state.token
        },

        isAuthenticated(state) {
            return !!state.token
        },
    }
}