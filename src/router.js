import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from "./components/pages/coach/CoachesList.vue"
import CoachDetails from "./components/pages/coach/CoachDetails.vue"
import ContactCoaches from "./components/pages/request/ContactCoaches.vue"
import CoachRegis from "./components/pages/coach/CoachRegis.vue"
import RequestReceived from "./components/pages/request/RequestReceived.vue"
import NotFound from "./components/pages/NotFound.vue"
import Auth from "./components/pages/auth/Auth.vue"
import store from "./store"

const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: "/",
            redirect: "/coaches"
        },
        {
            path: "/auth",
            component: Auth,
            meta: { requiresUnauth: true }
        },

        {
            path: "/coaches",
            component: CoachesList
        },
        {
            path: "/coaches/:id",
            props: true,
            component: CoachDetails,
            children: [{
                path: "contact",
                component: ContactCoaches
            }, ]
        },
        {
            path: "/registration",
            component: CoachRegis,
            meta: { requiresAuth: true }
        },
        {
            path: "/request",
            component: RequestReceived,
            meta: { requiresAuth: true }
        },
        {
            path: "/:notFound(.*)",
            component: NotFound
        },

    ]
})


router.beforeEach((to, _, next) => {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next("/auth")
    } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
        next("/coaches")
    } else {
        next()
    }
})


export default router