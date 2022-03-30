import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from "./components/coach/CoachesList.vue"
import CoachDetails from "./components/coach/CoachDetails.vue"
import ContactCoaches from "./components/request/ContactCoaches.vue"
import CoachRegis from "./components/coach/CoachRegis.vue"
import RequestReceived from "./components/request/RequestReceived.vue"
import NotFound from "./components/NotFound.vue"


const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: "/",
            redirect: "/coaches"
        },
        {
            path: "/coaches",
            component: CoachesList
        },
        {
            path: "/coaches/:id",
            component: CoachDetails,
            children: [{
                path: "/contact",
                component: ContactCoaches
            }, ]
        },
        {
            path: "/registration",
            component: CoachRegis
        },
        {
            path: "/request",
            component: RequestReceived
        },
        {
            path: "/:notFound(.*)",
            component: NotFound
        },

    ]
})


export default router