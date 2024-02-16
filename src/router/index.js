import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Dashboard.vue'

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
        }
            
    ]
})

export default router