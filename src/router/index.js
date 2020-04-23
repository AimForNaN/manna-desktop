import Vue from 'vue';
import VueRouter from 'vue-router';

import Bread from '../views/Bread.vue';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/bread',
        name: 'Bread',
        component: Bread,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
