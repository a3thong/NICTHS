import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Dashboard.vue'
import Login from '../views/login.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/survey',
            component: () => import('../views/Survey.vue')
        },
        {
            path: '/team',
            component: () => import('../views/teams.vue')
        },
        {
            path: '/contact',
            component: () => import('../views/contacts.vue')
        },
        {
            path: '/Settings',
            component: () => import('../views/Settings.vue')
        },
        // {
        //     path: '/logout',
        //     component: () => import('../views/logout.vue')
        // },
        {
            path: '/Login',
            component: () => import('../views/login.vue')
        }
            
    ]
})

export default router