import { createStore } from "vuex"
import Coaches from "./modules/coach"
import Requests from "./modules/request"
import Auth from "./modules/auth"

export default createStore({
    modules: {
        coach: Coaches,
        req: Requests,
        auth: Auth,
    },
})