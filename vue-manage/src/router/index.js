import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Main from '../views/Main'
import Home from '../views/Main/Home'
import Mall from '../views/Main/Mall'
import User from '../views/Main/User'
import PageOne from '../views/Main/PageOne'
import PageTwo from '../views/Main/PageTwo'
import Login from '../views/Login.vue'

const routes = [
    {
        name: 'Main',
        path: '/',
        component: Main,
        // 重定向到home
        redirect: '/home',
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
            },
            {
                path: "/page1",
                name: "page1",
                component: PageOne,
            },
            {
                path: "/page2",
                name: "page2",
                component: PageTwo,
            }
        ]
    },
    {
        name: 'Login',
        path: '/login',
        component: Login,
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router