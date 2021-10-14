import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../components/auth/LoginForm.vue';
import RegisterForm from '../components/auth/RegisterForm.vue';

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: LoginForm
        },

        {
            path: '/login',
            name: 'LoginForm',
            component: LoginForm
        },

        {
            path: '/register',
            name: 'RegisterForm',
            component: RegisterForm
        }
    ]
})