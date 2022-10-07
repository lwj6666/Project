import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Main from '../views/Main'
import Home from '../views/Home/Home'
import Mall from '../views/Mall/Mall'
import User from '../views/User/User'

const routes = [
    {
        name: 'Main',
        path: '/',
        component: Main,
        children: [
            {
                name: 'Home',
                path: '/home',
                component: Home,
            },
            {
                name: 'Mall',
                path: '/mall',
                component: Mall,
            },
            {
                name: 'User',
                path: '/user',
                component: User,
            }
        ]
    },
]

const router = new VueRouter({
    mode: 'hash',
    routes
})

export default router