import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from "./components/pages/coach/CoachesList.vue"
import CoachDetails from "./components/pages/coach/CoachDetails.vue"
import ContactCoaches from "./components/pages/request/ContactCoaches.vue"
import CoachRegis from "./components/pages/coach/CoachRegis.vue"
import RequestReceived from "./components/pages/request/RequestReceived.vue"
import NotFound from "./components/pages/NotFound.vue"


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
                path: "contact",
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