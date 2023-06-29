import {createRouter, createWebHashHistory} from 'vue-router'
import SignInView from "@/views/SignInView.vue";
import SignUpView from "@/views/SignUpView.vue";
import HomePageView from "@/views/HomePageView.vue";
import AccountManagementView from "@/views/AccountManagementView.vue";
import OrdersHistoricView from "@/views/OrdersHistoricView.vue";


const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePageView
    },
    {
        path: '/login',
        name: 'login',
        component: SignInView
    },
    {
        path: '/register',
        name: 'register',
        component: SignUpView
    },
    {
        path: '/account',
        name: 'account',
        component: AccountManagementView
    },
    {
        path: '/orders',
        name: 'orders',
        component: OrdersHistoricView
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router