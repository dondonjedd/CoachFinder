import { createStore } from "vuex"
import Coaches from "./modules/coach"
import Requests from "./modules/request"

export default createStore({
    modules: {
        coach: Coaches,
        req: Requests,
    },

    state() {
        return {
            userId: "c1",
        }
    },

    getters: {
        userId(state) {
            return state.userId
        }

    }

})