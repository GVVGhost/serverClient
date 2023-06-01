import Vue from 'vue'
import VueRouter from 'vue-router'
import index from "@/store";

Vue.use(VueRouter)
Vue.prototype.$store = index;

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/components/HomeComponent.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('@/components/ProfileComponent.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/components/RegisterComponent.vue'),
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/components/LoginComponent.vue'),
        meta: {
            requiresAuth: false
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !localStorage.getItem('access_token'))
        next('/login');
    else next();
})

export default router