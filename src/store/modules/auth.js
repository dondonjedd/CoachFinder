let timer;
export default {
    state() {
        return {
            token: null,
            userId: null,
            didAutoLogout: false,
        }
    },

    mutations: {

        setUser(state, payload) {
            state.token = payload.token
            state.userId = payload.userId
            state.didAutoLogout = false
        },

        setAutoLogout(state) {
            state.didAutoLogout = true
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
            // const expireIn = +responseData.expiresIn * 1000
            const expireIn = 5000
            const expireDate = new Date().getTime() + expireIn


            localStorage.setItem('token', responseData.idToken)
            localStorage.setItem('userId', responseData.localId)
            localStorage.setItem('TokenExiprationDate', expireDate)

            timer = setTimeout(function() {
                context.dispatch("setAutoLogout")
            }, expireIn)

            context.commit("setUser", {
                token: responseData.idToken,
                userId: responseData.localId,
            })

        },

        autoLogin(context) {
            const token = localStorage.getItem('token')
            const userId = localStorage.getItem('userId')
            const expireDate = localStorage.getItem('TokenExiprationDate')

            const dateDiff = +expireDate - new Date().getTime()

            if (dateDiff < 0) {
                return
            } else {
                timer = setTimeout(function() {
                    context.dispatch("setAutoLogout")
                }, dateDiff)
            }


            if (token && userId) {
                context.commit("setUser", {
                    token: token,
                    userId: userId,
                })
            }
        },

        logOut(context) {
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            localStorage.removeItem('TokenExiprationDate')

            context.commit("setUser", {
                token: null,
                userId: null,
            })

            clearTimeout(timer)
        },

        setAutoLogout(context) {
            context.dispatch("logOut")
            context.commit("setAutoLogout")
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

        didAutoLogout(state) {
            return state.didAutoLogout
        },
    }
}